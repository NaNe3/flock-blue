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