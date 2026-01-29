import { useEffect, useMemo, useRef, useState } from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import { HeartAddIcon } from "@hugeicons-pro/core-solid-rounded"
import Avatar from "../Avatar"
import FadeInView from "../FadeInView"

import { reactToComment } from "../../utility/db-comment"
import { timeAgo } from "../../utility/time"

import { useTheme } from "../../context/ThemeProvider"
import { useMedic } from "../../context/MedicProvider"
import { useFont } from "../../context/FontProvider"
import EmojiPicker from "emoji-picker-react"

export default function BasicComment({
  comment,
  reactions,
  children,
  avatarSize = 32,

  handleReact,
}) {
  const { theme } = useTheme()
  const { font } = useFont()
  const styles = useMemo(() => style(theme, font), [theme, font])  

  const { publishError } = useMedic()

  const time = timeAgo(comment?.created_at);
  const reactionsToSend = useRef([]);
  const debouncedQuery = useRef(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  // ...existing functions...

  const openEmojiPicker = () => {
    setShowEmojiPicker(true);
  }

  const handleEmojiClick = (emojiObject) => {
    handleReactToComment(emojiObject.emoji);
    setShowEmojiPicker(false);
  }

  const handleReactToComment = (emoji='🔥') => {
    handleReact({comment_id: comment.comment_id, emoji })

    const existingIndex = reactionsToSend.current.findIndex(e => e.emoji === emoji);
    if (existingIndex > -1) {
      reactionsToSend.current[existingIndex].count += 1;
    } else {
      const count = reactions && reactions.find(r => r.emoji === emoji) ? reactions.find(r => r.emoji === emoji).count + 1 : 1;
      reactionsToSend.current.push({ emoji, count });
    }

    if (debouncedQuery.current) clearTimeout(debouncedQuery.current);
    debouncedQuery.current = setTimeout(() => {
      handleSendReactionQuery();
    }, 1000);
  }

  const handleSendReactionQuery = async () => {
    const { error } = await reactToComment({
      comment_id: comment.comment_id,
      emojis: reactionsToSend.current,
    })

    if (error) {
      publishError({ message: 'Error reacting to comment', error })
    }
  }

  return (
    <div style={styles.commentContainer}>
      <div style={{ ...styles.avatarContainer, width: avatarSize, height: avatarSize }}>
        <Avatar
          imagePath={comment?.user?.avatar_path}
          type="profile"
          style={styles.avatar}
        />
      </div>
      <div style={styles.commentContent}>
        <p
          style={styles.commentAuthor}
        >{comment?.user?.full_name ?? `${comment?.user?.fname} ${comment?.user?.lname}`} <span style={styles.secondary}>{time}</span></p>
        <p style={styles.commentText}>{comment.comment}</p>
        {/* <p className='hover-underline' style={styles.replyText}>reply</p> */}
        <div style={styles.reactionRow}>
          {reactions && reactions.find(r => r.emoji === '🔥') ? null : (
            <div className='hover-background' style={styles.reactionText} onClick={() => handleReactToComment('🔥')}>🔥 0</div>
          )}
          {reactions && reactions.map((reaction, index) => (
            <div 
              key={`emoji-${reaction.emoji}-${index}`} 
              className='hover-background'
              style={styles.reactionText}
              onClick={() => handleReactToComment(reaction.emoji)}
            >{reaction.emoji} {reaction.count}</div>
          ))}
          <div className='hover-background' style={styles.reactionText} onClick={openEmojiPicker}>
            <HugeiconsIcon
              icon={HeartAddIcon}
              size={16}
              color={theme.secondaryText}
            /> 
          </div>
          {showEmojiPicker && (
            <FadeInView ref={emojiPickerRef} style={styles.emojiPicker}>
              <EmojiPicker 
                theme="dark"
                onEmojiClick={handleEmojiClick}
                reactionsDefaultOpen
              />
            </FadeInView>
          )}
        </div>
        {children && (
          <div style={styles.commentChildren}>
            {children}
          </div>
        )}
      </div>
    </div>

  )
}

const style = (theme, font) => ({
  commentContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

    position: 'relative',
  },
  avatarContainer: {
    width: 30,
    height: 30,
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
    color: theme.primaryText,
    ...font.regular,
  },
  
  replyText: {
    fontSize: 16,
    color: theme.secondaryText,
    ...font.regular,

    display: 'inline-block',
    // textDecoration: 'underline',
    // cursor: 'pointer',
  },

  commentChildren: {
    padding: '20px 0px 0px 0px',
    flexDirection: 'column',
    display: 'flex',
    gap: 15,
  },
  secondary: {
    fontSize: 16,
    fontWeight: 700,
    color: theme.secondaryText,

    marginLeft: 5,
  },

  reactionRow: {
    flexDirection: 'row',
    display: 'flex',
    padding: '10px 0px 0px 0px',
    gap: 10,

    flexWrap: 'wrap',
  },
  reactionText: {
    fontSize: 14,
    height: 30,
    color: theme.secondaryText,
    ...font.regular,

    border: `1px solid ${theme.secondaryBackground}`,
    padding: '4px 6px',
    borderRadius: 11,
    cursor: 'pointer',

    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    gap: 4,

    userSelect: 'none',
  },

  emojiPicker: {
    position: 'fixed',
    zIndex: 10,

    display: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
})