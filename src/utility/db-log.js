import { supabase } from "./supabase"

export const getLogsByUserId = async (userId) => {
  const date = new Date()
  date.setHours(0, 0, 0, 0)  

  const { data, error } = await supabase
    .from('log')
    .select()
    .eq('user_id', userId)
    .gte('created_at', date.toISOString())

  if (error) {
    console.error(error)
    return { error }
  }

  return { data }
}

export const getAllLogsOfUsersStudyingGroupPlan = async ({ userIds, planId }) => {
  const { data, error } = await supabase
    .from('log')
    .select(`
      log_id, created_at, time_studied, user_id(id, full_name, avatar_path)
    `)
    .in('user_id', userIds)
    .eq('plan_id', planId)

  return { data, error }
}