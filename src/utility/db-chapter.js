import { supabase } from "./supabase"

export const getVersesWithActivity = async ({ work, book, chapter }) => {
  try {
    const { data, error } = await supabase
      .from('activity')
      .select(`
        activity_id, verse,
        user(color_id(color_hex), avatar_path),
        media(duration, media_path), comment(comment_id)
      `)
      .eq('work', work)
      .eq('book', book)
      .eq('chapter', chapter)
      .or('media_id.not.is.null,comment_id.not.is.null')
      // .or(`user_id.eq.${userId},user_id.in.(${focusIds.join(',')}),group_id.in.(${groupIds.join(',')})`)
      // .or(`private.eq.false,and(private.eq.true,user_id.eq.${userId})`)

    if (error) {
      console.error(error)
      return { error }
    }

    // const activity = formatActivityFromSupabase(data)
    return { data }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

export const getCommentsFromVerse = async ({ location }) => {
  try {
    const { data, error } = await supabase
      .from('activity')
      .select(`
        created_at, activity_id,
        comment_id(comment_id, comment),
        user(id, fname, lname, avatar_path, color_id(color_hex))
      `)
      .eq('work', location?.work)
      .eq('book', location?.book)
      .eq('chapter', location?.chapter)
      .eq('verse', location?.verse)
      // .or(`user_id.eq.${userId},user_id.in.(${focusIds.join(',')}),group_id.in.(${groupIds.join(',')})`)
      // .or(`private.eq.false,and(private.eq.true,user_id.eq.${userId})`)
      .not('comment_id', 'is', null)
      .limit(10)

    if (error) {
      console.error(error)
      return { error: error }
    }

    // Format the data to match the expected structure
    const comments = data.map(comment => {
      const { comment_id, ...newComment } = comment
      const { color_id, ...user } = newComment.user
      const newUser = { ...user, color: color_id ? color_id.color_hex : null, }

      return {
        ...newComment,
        comment: comment_id.comment,
        comment_id: comment_id.comment_id,
        user: newUser,
      }
    })

    // fetch initial replies for each comment
    const activityIds = comments.map(comment => comment?.activity_id)
    const replies = await getReplyCountForEachComment(activityIds)

    return { comments, replies, error }
  } catch (error) {
    console.error(error)
    return { error: error }
  }
}

const getReplyCountForEachComment = async (activityIds) => {
  try {
    const replies = {}

    await Promise.all(activityIds.map(async (activityId) => {
      const { count, error } = await supabase
        .from('media_comment')
        .select('*', { count: 'exact', head: true })
        .eq('activity_id', activityId)
      
      if (error) {
        console.error(`Error fetching replies for activity ID ${activityId}:`, error)
        replies[activityId] = 0
      } else {
        replies[activityId] = count || 0
      }
    }))

    return replies
  } catch (error) {
    console.error(error)
    return { error: error }
  }
}
