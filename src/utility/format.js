export const formatFriendsFromSupabase = (data, user_id) => {
  if (Array.isArray(data)) {
    return data.map(item => {
      const focus = item.user_two.id !== user_id ? item.user_two : item.user_one
      const { color_id, ...user} = focus

      const lastStudied = user.last_studied ? user.last_studied.created_at : null
      return {
        status: item.status,
        invited_by: item.invited_by,
        color: color_id.color_hex,
        ...user,
        created_at: item.created_at,
        relationship_id: item.relationship_id,
        last_studied: lastStudied,
      }
    })
  } else {
    const focus = data.user_two.id !== user_id ? data.user_two : data.user_one
    const { color_id, ...user} = focus

    const lastStudied = user.last_studied ? user.last_studied.created_at : null
    return {
      status: data.status,
      invited_by: data.invited_by,
      color: color_id.color_hex,
      ...user,
      created_at: data.created_at,
      relationship_id: data.relationship_id,
      last_studied: lastStudied,
    }
  }
}

export const formatScriptureString = (string) => {
  if (string === null || string === undefined) return ''
  return string
    .replace('Doctrine And Covenants', 'D&C')
    .replace('Joseph Smith History', 'JS - History')
    .replace('Joseph Smith Matthew', 'JS - Matthew')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const getDurationString = (duration) => {
  if (duration === null || duration === undefined) return "";
  return `${Math.floor(duration / 60)}:${(duration % 60)
    .toString()
    .padStart(2, "0")}`;
}

export const supabaseMainUser = `
  id, fname, lname, avatar_path, email, phone_number, current_streak, token_last_verified,
  denomination(denomination_id, denomination), religion(religion_id, religion),
  onboarding_complete, words_read, verses_read, time_studied, gems, last_seen_notification,
  color_id(color_id, color_name, color_hex),
  last_studied(created_at)
`

export const supabasePlan = `
  plan_id, plan_name, plan_type, description, is_public,
  denomination(religion_id(religion), denomination),
  primary(color_id, color_hex), secondary(color_id, color_hex)
`

export const supabaseUserPlan = `
  plan_id(plan_id, plan_name, plan_type, description, denomination(religion_id(religion), denomination), primary(color_id, color_hex), secondary(color_id, color_hex)),
  last_studied
`

export const supabasePlanItem = `
  plan_item_id, plan_id, 
  work, book, chapter, verses,
  week, day, time, summary, context
`