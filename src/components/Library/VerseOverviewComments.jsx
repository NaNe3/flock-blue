import { useEffect, useMemo, useState } from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon, ArrowLeft02Icon, MultiplicationSignIcon, PlaneIcon, QuillWrite01Icon, Sent02Icon } from "@hugeicons-pro/core-solid-rounded"

import BasicComment from "../Chapter/BasicComment"
import BasicReply from "../Chapter/BasicReply"
import FadeInView from "../FadeInView"

import { createNotification } from "../../utility/db-notification"
import { getCommentsFromVerse } from "../../utility/db-chapter"
import { publishMainComment } from "../../utility/db-comment"

import { useHolos } from "../../context/HolosProvider"
import { useMedic } from "../../context/MedicProvider"
import { useTheme } from "../../context/ThemeProvider"
import { useFont } from "../../context/FontProvider"

export default function VerseOverviewComments({ 
  location, 
  planInfo,
  setSidebar 
}) {
  const { theme } = useTheme()
  const { font } = useFont()
  const styles = useMemo(() => style(theme, font), [theme, font])

  const { publishError } = useMedic()
  const { user } = useHolos()

  const [comments, setComments] = useState(null)
  const [reactions, setReactions] = useState(null)
  const [replies, setReplies] = useState(null)
  
  const [comment, setComment] = useState('')
  const [publishing, setPublishing] = useState(false)
  
  useEffect(() => {
    const init = async () => {
      const { comments, replies, reactions, error } = await getCommentsFromVerse({ location })

      if (!error) {
        setComments(comments ?? [])
        setReplies(replies ?? [])
        setReactions(reactions ?? {})
      }
    }
    init()
  }, [])

  const handleSidebarClose = () => {
    setSidebar(prev => ({
      ...prev,
      open: false,
      route: null,
    }))
  }

  const handleTextareaChange = (e) => {
    setComment(e.target.value)
    // Auto-resize textarea
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px'
  }

  const handlePublishComment = async () => {
    if (publishing || comment.trim().length === 0) return;
    setPublishing(true);

    try {
      const { result, error } = await publishMainComment({
        comment: comment.trim(),
        color_scheme: 0,
        user_id: user?.id,
        location: location,
        group_id: planInfo?.group_id ?? null,
        plan_item_id: planInfo?.plan_item_id ?? null,
        isPrivate: false,
      })

      if (!error) {
        handleUpdateComments(result);
        // const { error: notificationError } = await createNotification({ 
        //   user_id: user?.id,
        //   group_id: planInfo?.group_id ?? null,
        //   activity_id: result.activity_id,
        // })
        // if (notificationError) {
        //   publishError({
        //     message: 'error notifying friends',
        //     error: notificationError,
        //   })
        // }
      } else {
        publishError({
          message: 'Error publishing comment',
          error: error,
        })
      }
    } catch (error) {
      publishError({
        message: 'Error publishing comment',
        reason: error,
      })
    } finally {
      setPublishing(false);
    }
  }

  const handleUpdateComments = (newComment) => {
    setComments(prevComments => [newComment, ...prevComments]);
    setComment('');
  }

  const handleReactToComment = async ({comment_id, emoji='🔥'}) => {
    setReactions(prevReactions => {
      const commentReactions = prevReactions[comment_id] || [];
      const reactionIndex = commentReactions.findIndex(r => r.emoji === emoji);
      
      let updatedCommentReactions;
      if (reactionIndex !== -1) {
        // Increment existing reaction count
        updatedCommentReactions = [...commentReactions];
        updatedCommentReactions[reactionIndex] = {
          ...updatedCommentReactions[reactionIndex],
          count: updatedCommentReactions[reactionIndex].count + 1,
        };
      } else {
        // Add new reaction
        updatedCommentReactions = [
          ...commentReactions,
          { emoji, count: 1 },
        ];
      }
      
      return {
        ...prevReactions,
        [comment_id]: updatedCommentReactions,
      };
    })
  }

  return comments && (
    <FadeInView style={styles.container}>
      <div style={styles.commentOptionContainer}>
        <div 
          className="circle-button" 
          style={styles.closeButton}
          onClick={handleSidebarClose}
        >
          <HugeiconsIcon
            icon={ArrowLeft02Icon}
            size={20}
            color={theme.actionText}
          />
        </div>
      </div>

      <div style={styles.comments}>
        {comments.map((comment, index) => (
          <BasicComment
            key={`comment-overview-${index}`}
            comment={comment}
            reactions={reactions[comment?.comment_id] ?? []}
            handleReact={handleReactToComment}
            children={replies[comment?.activity_id]?.map((reply, replyIndex) => (
              <BasicReply
                key={`comment-overview-reply-${replyIndex}`}
                reactions={reactions[reply?.comment_id] ?? []}
                reply={reply}
              />
            )) ?? null}
          />
        ))}
      </div>
      
      <div style={styles.commentBar}>
        <textarea
          placeholder="Add a comment..."
          style={styles.commentInput}
          value={comment}
          onChange={handleTextareaChange}
          rows={1}
        />
        <div 
          className="circle-button"
          style={styles.commentButton}
          onClick={handlePublishComment}
        >
          <HugeiconsIcon
            icon={QuillWrite01Icon}
            size={20}
            color={theme.actionText}
          />
        </div>
      </div>
    </FadeInView>
  )
}

const style = (theme, font) => ({
  container: {
    width: 400,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'relative',

  },

  commentOptionContainer: {
    width: 400,
    // padding: 5,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,

    // border: `1px solid ${theme.primaryBorder}`,
    // backgroundColor: theme.primaryBackground,
    borderRadius: 40,

    position: 'fixed',
    zIndex: 2,
    top: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: '50%',

    border: `1px solid ${theme.primaryBorder}`,
  },
  subjectText: {
    fontSize: 20,
    color: theme.actionText,
    ...font.regular,
  },

  comments: {
    display: 'flex',
    flexDirection: 'column',

    gap: 20,

    width: '100%',
    padding: '80px 0px 40px 0px',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    overflowY: 'auto',
  },

  commentBar: {
    width: 400,
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 10,

    position: 'sticky',
    zIndex: 2,
    bottom: 0,

    boxShadow: `0 -20px 20px ${theme.primaryBackground}`,
  },
  commentInput: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    border: `1px solid ${theme.primaryBorder}`,
    padding: '15px',
    resize: 'none',
    overflow: 'hidden',

    fontSize: 16,
    color: theme.primaryText,
    backgroundColor: theme.primaryBackground,
    ...font.regular,

    fontFamily: 'inherit',
    lineHeight: 1.4,
  },
  commentButton: {
    border: `1px solid ${theme.primaryBorder}`,
  },
})
