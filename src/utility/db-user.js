import { supabase } from "./supabase"

export const updateUserNameById = async ({ userId, fname, lname }) => {
  const { data, error } = await supabase
    .from('user')
    .update({
      fname: fname,
      lname: lname,
      full_name: `${fname} ${lname}`,
    })
    .eq('id', userId)

  if (error) {
    console.error(error)
    return { data: null, error }
  }

  return { data, error }
}

export const updateUserHandleById = async ({ userId, handle }) => {
  const { data, error } = await supabase
    .from('user')
    .update({
      handle: handle,
    })
    .eq('id', userId)

  if (error) {
    console.error(error)
    return { data: null, error }
  }

  return { data, error }
}

export const isHandleAvailable = async (handle) => {
  const { data, error } = await supabase
    .from('user')
    .select('id')
    .eq('handle', handle)

  if (error) {
    console.error(error)
    return { available: false, error }
  }

  return { available: data.length === 0, error: null }
}

export const updateUserAvatarPath = async (userId, avatarPath) => {
  const { data, error } = await supabase
    .from('user')
    .update({
      avatar_path: avatarPath,
    })
    .eq('id', userId)

  if (error) {
    console.error(error)
    return { data: null, error }
  }

  return { data, error }
}

export const updateUserOnboardComplete = async (userId) => {
  const { data, error } = await supabase
    .from('user')
    .update({
      onboarding_complete: true,
    })
    .eq('id', userId)

  if (error) {
    console.error(error)
    return { data: null, error }
  }

  return { data, error }
}
