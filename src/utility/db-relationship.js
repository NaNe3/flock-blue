import { formatFriendsFromSupabase } from "./format";
import { supabase } from "./supabase";

export const getUserRelationships = async ({ user_id }) => {
  try {
    const { data, error } = await supabase
      .from('relationship')
      .select(`
        relationship_id, status, invited_by, created_at,
        user_two (id, fname, lname, full_name, avatar_path, last_studied(created_at), color_id(color_hex), last_impression),
        user_one (id, fname, lname, full_name, avatar_path, last_studied(created_at), color_id(color_hex), last_impression)
      `)
      .or(`user_one.eq.${user_id},user_two.eq.${user_id}`)

    if (error) {
      console.error("Error getting relationships:", error);
      return { error: error }
    }

    const relationships = formatFriendsFromSupabase(data, user_id)
    return { data: relationships, error: null }
  } catch (error) {
    console.error("Error getting relationships:", error);
    return { error: error }
  }
}

export const getUserByQuery = async ({ query }) => {
  const { data, error } = await supabase
    .from('user')
    .select(`id, full_name, avatar_path`)
    .ilike('full_name', `%${query}%`)
    .limit(20);

  if (error) {
    console.error("Error searching users:", error);
    return { error: error }
  }

  return { data: data, error: null }
}