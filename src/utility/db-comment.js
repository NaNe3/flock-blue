import { supabase } from "./supabase"

import { formatCommentReactionsFromSupabase, formatMainCommentFromSupabase, supabaseMainComment } from "./format"

export async function publishMainComment({ comment, color_scheme, user_id, group_id, location, isPrivate }) {
  // 1. create comment row
  const { data, error } = await supabase
    .from('comment')
    .insert([ { comment: comment, color_scheme: color_scheme } ])
    .select()

  if (!error) {
    // 2. create activity row
    // reqs: work, book, chapter, verse, user_id, group_id, comment_id
    const { data: activity, error: activityError } = await supabase
      .from('activity')
      .insert([
        {
          work: location?.work,
          book: location?.book,
          chapter: location?.chapter,
          verse: location?.verse,
          group_id: group_id,
          user_id: user_id,
          comment_id: data[0].comment_id,
          private: isPrivate,
        }
      ])
      .select(supabaseMainComment)
  
    if (activityError) {
      console.error('activityError', activityError)
      return { error: activityError }
    }

    const comment = formatMainCommentFromSupabase(activity)

    // await updateLastImpression({ user_id, recipient_id: group_id })
    return { result: comment[0], error: null }
  } else {
    console.error('error in creating commetn: ', error)
    return { error }
  }
}

export const reactToComment = async ({ comment_id, emojis }) => {
  try {
    const { data, error } = await supabase
      .from('reaction')
      .upsert(
        emojis.map(e => ({
          comment_id,
          emoji: e.emoji,
          count: e.count,
        })),
        { onConflict: ['comment_id', 'emoji'] }
      )
      .select()

    return { data, error }
  } catch (error) {
    console.error('unexpected error in reacting to comment: ', error)
    return { error }
  }
}

export const getCommentReactions = async (commentIds) => {
  try {
    const { data, error } = await supabase
      .from('reaction')
      .select()
      .in('comment_id', commentIds)

    return { data: data ? formatCommentReactionsFromSupabase(data) : null, error }
  } catch (error) {
    console.error(error)
    return { error }
  }
}