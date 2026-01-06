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
    const { data: completedPlanItemIds, error: completionError } = await checkPlanItemsForCompletion({ planItemIds, userId })

    if (completionError) {
      console.error("Error checking plan item completion:", completionError);
      return { data: null, error: completionError }
    }

    // mark plan items as completed or not
    const markedData = data.map(item => ({
      ...item,
      completed: completedPlanItemIds.includes(item.plan_item_id)
    }))

    return { data: markedData, error: null }
  } catch (error) {
    console.error("Error fetching subsequent plan items:", error);
    return { data: null, error }
  }
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
      return { data: null, error }
    }

    const completedPlanItemIds = data.map(item => item.plan_item_id)

    return { data: completedPlanItemIds, error: null }
  } catch (error) {
    console.error("Error checking plan items for completion:", error);
    return { data: null, error }
  }
}
