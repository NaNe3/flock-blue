import { supabase } from "./supabase"

import { supabasePlan, supabaseUserPlan } from "./format"

const getCurrentWeekNumber = () => {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const pastDaysOfYear = (currentDate - startOfYear) / 86400000; // 86400000 ms in a day

  const calculatedWeek = Math.floor((pastDaysOfYear + startOfYear.getDay()) / 7);

  return currentDate.getDay() === 0 ? calculatedWeek - 1 : calculatedWeek;
}

export const getPlanItemsOfCurrentWeek = async () => {
  const { data, error } = await supabase
    .from('plan_item')
    .select()
    .eq('week', getCurrentWeekNumber())

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

export const getPlansUserIsStudying = async ({ userId }) => {
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

    const plans = data.map(item => {
      const { denomination, ...rest } = item.plan_id

      return {
        ...rest,
        religion: denomination?.religion_id?.religion ?? null,
        denomination: denomination?.denomination ?? null,
        last_studied: item.last_studied
      }
    })
    return { plans, error }
  } catch (error) {
    console.error("Error getting plans user is studying:", error);
    return { data: null, error: error }
  }
}