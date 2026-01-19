import { useEffect, useMemo, useState } from "react"
import { getCommentsFromVerse } from "../../utility/db-chapter"

import { HugeiconsIcon } from "@hugeicons/react"
import { MultiplicationSignIcon } from "@hugeicons-pro/core-solid-rounded"

import FadeInView from "../FadeInView"
import Avatar from "../Avatar"

import { timeAgo } from "../../utility/time"

import { useTheme } from "../../context/ThemeProvider"
import { useFont } from "../../context/FontProvider"

export default function VerseOverviewComments({ location, setSidebar }) {
  const { theme } = useTheme()
  const { font } = useFont()
  const styles = useMemo(() => style(theme, font), [theme, font])

  const [comments, setComments] = useState(null)
  const [replies, setReplies] = useState(null)
  
  useEffect(() => {
    const init = async () => {
      const { comments, replies, error } = await getCommentsFromVerse({ location })

      if (!error) {
        setComments(comments ?? [])
        setReplies(replies ?? [])
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

  return (
    <div style={styles.container}>
      {comments && (
        <FadeInView style={styles.commentOptionContainer}>
          <div 
            className="circle-button" 
            style={styles.closeButton}
            onClick={handleSidebarClose}
          >
            <HugeiconsIcon
              icon={MultiplicationSignIcon}
              size={24}
              color={theme.primaryText}
            />
          </div>

          <p style={styles.subjectText}>{comments?.length} Comment{comments?.length !== 1 && 's'}</p>
        </FadeInView>
      )}

      {comments && (
        <FadeInView style={styles.comments}>
          {comments.map((comment, index) => {
            const time = timeAgo(comment?.created_at);

            return (
              <div 
                key={`comment-${index}`}
                className="hover-background"
                style={styles.commentContainer} 
              >
                <div 
                  style={{ ...styles.avatarContainer, borderColor: comment?.user?.color || theme.primaryText }}
                >
                  <Avatar
                    imagePath={comment?.user?.avatar_path}
                    type="profile"
                    style={styles.avatar}
                  />
                </div>
                <div style={styles.commentContent}>
                  <p 
                    style={styles.commentAuthor}
                  >{comment?.user?.fname} {comment?.user?.lname} • <span style={styles.secondary}>{time}</span></p>
                  <p style={styles.commentText}>{comment.comment}</p>
                  {replies && replies[comment?.activity_id] > 0 && (
                    <div style={styles.replyButton}>
                      <p style={{ ...styles.secondary, ...styles.allRepliesButton }}>View {replies[comment?.activity_id]} more replies</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </FadeInView>
      )}
    </div>
  )
}

const style = (theme, font) => ({
  container: {
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,

    // padding: '0px 30px'
  },

  commentOptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 20,

    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    left: 0,
  },
  subjectText: {
    fontSize: 20,
    color: theme.primaryText,
    ...font.regular,
  },

  comments: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,

    width: '100%',
    borderRadius: 30,
    paddingBottom: 0,
  },
  commentContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

    border: `1px solid ${theme.secondaryBackground}`,
    borderRadius: 20,
    padding: 10,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderWidth: 3,
    borderColor: theme.secondaryBackground,
    borderRadius: 25,
    padding: 2,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },

  commentContent: {
    flex: 1,
    borderRadius: 20,
    paddingRight: 15,
    justifyContent: 'center',
  },
  commentAuthor: {
    fontSize: 16,
    ...font.regular,
    color: theme.primaryText,

    marginBottom: 2,
  },
  commentText: {
    fontSize: 16,
    ...font.regular,
    color: theme.primaryText,
  },
  replyButton: {
    marginTop: 5,
  },
  allRepliesButton: {
    marginTop: 5,
    marginLeft: 40,
  },

  secondary: {
    fontSize: 16,
    fontWeight: 700,
    color: theme.secondaryText,
  },
})
