import { supabase } from "./supabase"

export const invokeSendPushNotification = async (message) => {
  if (!message) return
  const { data, error } = await supabase.functions.invoke('send-push-notification', {
    body: message
  })

  if (error) {
    console.log("Error invoking send-push-notification", error)
  }

  console.log("Send push notification function response", data)
}

export const createNotification = async ({
  user_id,
  recipient_id,
  group_id,
  log_id,
  reaction_id,
  media_comment_id,
  activity_id,
  relationship_id,
  group_member_id,
  type=null,
}) => {
  if (user_id === recipient_id) return { error: 'User cannot be recipient of their own notification' }
  if (type === null) {
    if (reaction_id) {
      type = 'reaction'
    } else if (media_comment_id) {
      type = 'media_comment'
    } else if (activity_id) {
      type = 'activity'
    } else if (log_id) {
      type = 'log' 
    } else {
      return { error: 'No type provided' }
    }
  }

  const { data, error } = await supabase
    .from('notification')
    .insert([
      { type, user_id, recipient_id, group_id, log_id, reaction_id, media_comment_id, activity_id, relationship_id, group_member_id },
    ])
    .select('notification_id')

  if (error) {
    console.error('Error creating notification:', error)
    return { error: 'Error creating notification' }
  } else {
    await invokeSendPushNotification({
      notification_id: data[0].notification_id,
    })
    return { error: null }
  }
}