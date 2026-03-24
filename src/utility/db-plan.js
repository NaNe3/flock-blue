import { supabase } from "./supabase"

import { formatUserPlansFromSupabase, supabasePlan, supabaseUserPlan } from "./format"

const getCurrentWeekNumber = () => {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const pastDaysOfYear = (currentDate - startOfYear) / 86400000; // 86400000 ms in a day

  const calculatedWeek = Math.floor((pastDaysOfYear + startOfYear.getDay()) / 7);

  return currentDate.getDay() === 0 ? calculatedWeek - 1 : calculatedWeek;
}

export const getDateSpanForNextFiveDays = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const fiveDaysLater = new Date();
  fiveDaysLater.setDate(today.getDate() + 5);

  return [
    today.toISOString(),
    fiveDaysLater.toISOString()
  ]
}

export const getDateSpanForNextOneHundredDays = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const oneHundredDaysLater = new Date();
  oneHundredDaysLater.setDate(today.getDate() + 100);
  return [
    today.toISOString(),
    oneHundredDaysLater.toISOString()
  ]
}

export const getPlanItemsOfCurrentWeek = async ({ planIds }) => {
  const { data, error } = await supabase
    .from('plan_item')
    .select()
    .eq('week', getCurrentWeekNumber())
    .in('plan_id', planIds)

  if (error) console.error("Error fetching plan items for current week:", error);

  return { data, error }
}

export const findLogsOfThesePlanItemsForThisWeek = async ({ planItemIds, userIds }) => {
  const { data, error } = await supabase
    .from('log')
    .select('plan_item_id, user_id(avatar_path)')
    .in('plan_item_id', planItemIds)
    // .in('user_id', userIds)

  if (error) {
    console.error("Error getting logs of these plan items for this week:", error);
    return { error: error }
  }

  // const items = data.map(item => item.user_id)

  const items = {}
  for (const item of data) {
    if (!items[item?.plan_item_id]) items[item?.plan_item_id] = []
    if (items[item?.plan_item_id].some(former => former?.avatar_path === item?.user_id?.avatar_path)) continue
    items[item?.plan_item_id].push(item?.user_id)
  }

  return { data: items, error: null }
}

export const getRecommendedPlans = async () => {
  try {
    const { data, error } = await supabase
      .from('plan')
      .select(supabasePlan)
      .eq('is_public', true)
      .order('plan_id', { ascending: false })
      .limit(10)

    if (error) {
      console.error("Error getting newest plans:", error);
      return { data: null, error }
    }

    return { data, error: null }
  } catch (error) {
    console.error("Error getting newest plans:", error);
    return { data: null, error }
  }
}

export const getPlansUserIsStudying = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_plan')
      .select(supabaseUserPlan)
      .eq('user_id', userId)
      .order('user_plan_id', { ascending: true })

    if (error) {
      console.error("Error getting plans user is studying:", error);
      return { data: null, error: error }
    }

    const plans = formatUserPlansFromSupabase(data)
    return { plans, error }
  } catch (error) {
    console.error("Error getting plans user is studying:", error);
    return { data: null, error: error }
  }
}

export const fetchSubsequentPlanItems = async ({ userId }) => {
  try {
    const { plans, error } = await getPlansUserIsStudying({ userId })

    if (!error) {
      const planIds = plans.map(plan => plan.plan_id)
      const [ start, end ] = getDateSpanForNextFiveDays()

      const { data, error } = await supabase
        .from('plan_item')
        .select()
        .in('plan_id', planIds)
        .gte('date_due', start)
        .lte('date_due', end)
        .order('date_due', { ascending: true })

      if (error) {
        console.error("Error fetching subsequent plan items:", error);
        return { data: null, error }
      }

      return { data, error: null }
    }
  } catch (error) {
    console.error("Error fetching subsequent plan items:", error);
    return { data: null, error }
  }
}

export const fetchDateSpanOfPlanItems = async ({ planIds, userId, initial_timestamp, final_timestamp }) => {
  try {
    const { data, error } = await supabase
      .from('plan_item')
      .select()
      .in('plan_id', planIds)
      .gte('date_due', initial_timestamp)
      .lte('date_due', final_timestamp)
      .order('date_due', { ascending: true })

    if (error) {
      console.error("Error fetching subsequent plan items:", error);
      return { data: null, error }
    }

    // check which plan items have been completed by the user
    const planItemIds = data.map(item => item.plan_item_id)
    const { completed, completionists } = await getPlanItemAuxiliaryData({ planItemIds, userId })

    // with auxiliary data
    const markedData = data.map(item => ({
      ...item,
      completed: completed?.includes(item.plan_item_id),
      completionists: completionists?.[item.plan_item_id] || []
    }))

    return { data: markedData, error: null }
  } catch (error) {
    console.error("Error fetching subsequent plan items:", error);
    return { data: null, error }
  }
}

const getPlanItemAuxiliaryData = async ({ planItemIds, userId }) => {
  const [
    { completed, error: completionError },
    { completionists, error: completionistsError }
  ] = await Promise.all([
    checkPlanItemsForCompletion({ planItemIds, userId }),
    getPlanItemCompletionists({ planItemIds })
  ]);

  return {
    completed,
    completionists,
    error: completionError || completionistsError
  };
}

export const checkPlanItemsForCompletion = async ({ planItemIds, userId }) => {
  try {
    const { data, error } = await supabase
      .from('log')
      .select('plan_item_id')
      .in('plan_item_id', planItemIds)
      .eq('user_id', userId)

    if (error) {
      console.error("Error checking plan items for completion:", error);
      return { completed: null, error }
    }

    const completedPlanItemIds = data.map(item => item.plan_item_id)

    return { completed: completedPlanItemIds, error: null }
  } catch (error) {
    console.error("Error checking plan items for completion:", error);
    return { completed: null, error }
  }
}

export const getPlanItemCompletionists = async ({ planItemIds }) => {
  try {
    const { data, error } = await supabase
      .from('log')
      .select('plan_item_id, user_id(avatar_path)')
      .in('plan_item_id', planItemIds)

    const completionists = {}
    if (!error && data) {
      data.forEach(item => {
        if (!completionists[item.plan_item_id]) completionists[item.plan_item_id] = []
        if (completionists[item.plan_item_id].some(former => former === item?.user_id?.avatar_path)) return
        completionists[item.plan_item_id].push(item?.user_id?.avatar_path)
      })
    }

    return { completionists, error }
  } catch (error) {
    console.error("Error getting plan item completionists:", error);
    return { completionists: null, error }
  }
}

export const createUserPlanFromGroup = async ({ groupId, userId }) => {
  // get plan_id of group_plan
  const { data: group, error } = await supabase
    .from('group')
    .select('plan_id')
    .eq('group_id', groupId)
    .single()

  // create the user_plan rows for the user
  if (!error && group.plan_id) {
    const { data, error: insertError } = await supabase
      .from('user_plan')
      .insert([
        { plan_id: group.plan_id, group_id: groupId, user_id: userId }
      ])
      .select(supabaseUserPlan)

    if (insertError) {
      console.error('Error creating user plan from group:', insertError)
      return { data: null, error: insertError }
    }
    const plans = formatUserPlansFromSupabase(data)
    return { data: plans[0], error: null }
  }
}

export const firstAndLastPlanItemsForPlan = async ({ planId }) => {
  try {
    const [
      { data, error },
      { data: lastData, error: lastError }
    ] = await Promise.all([
      supabase
        .from('plan_item')
        .select()
        .eq('plan_id', planId)
        .order('date_due', { ascending: true })
        .limit(1),
      supabase
        .from('plan_item')
        .select()
        .eq('plan_id', planId)
        .order('date_due', { ascending: false })
        .limit(1)
    ])

    if (error || lastError) {
      console.error("Error fetching first and last plan items for plan:", error || lastError);
      return { data: null, error: error || lastError }
    }

    return { data: { first: data?.[0] || null, last: lastData?.[0] || null }, error: null }
  } catch (error) {
    console.error("Error fetching first and last plan items for plan:", error);
    return { data: null, error }
  }
}

export const getLogsOfPlanByUserId = async ({ userId, planId, dates }) => {
  try {
    const { data, error } = await supabase
      .from('log')
      .select()
      .eq('user_id', userId)
      .eq('plan_id', planId)
      .gte('created_at', dates[0])
      .lte('created_at', dates[1])

    if (error) {
      console.error("Error fetching logs of plan by user id:", error);
      return { data: null, error }
    }

    return { data, error: null }
  } catch (error) {
    console.error("Error fetching logs of plan by user id:", error);
    return { data: null, error }
  }
}