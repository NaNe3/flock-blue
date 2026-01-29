import { useMemo } from "react"

import Avatar from "../Avatar"

import { timeAgo } from "../../utility/time"

import { useFont } from "../../context/FontProvider"
import { useTheme } from "../../context/ThemeProvider"

export default function BasicReply({
  reply,
}) {
  const { theme } = useTheme()
  const { font } = useFont()
  const styles = useMemo(() => style(theme, font), [theme, font])  

  const time = timeAgo(reply?.created_at);

  return (
    <div style={styles.replyContainer}>
      <div style={styles.avatarContainer}>
        <Avatar
          imagePath={reply?.user?.avatar_path}
          type="profile"
          style={styles.avatar}
        />
      </div>
      <div style={styles.replyContent}>
        <p
          style={styles.replyAuthor}
        >{reply?.user?.full_name} <span style={styles.secondary}>{time}</span></p>
        <p style={styles.replyText}>{reply.comment}</p>
        {/* <p className='hover-underline' style={styles.replyButton}>reply</p> */}
      </div>
    </div>

  )
}

const style = (theme, font) => ({
  replyContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

    // border: `1px solid ${theme.primaryBorder}`,
    borderRadius: 20,
  },
  avatarContainer: {
    width: 30,// 22,
    height: 30,
    borderRadius: 13,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },

  replyContent: {
    flex: 1,
    borderRadius: 20,
    paddingRight: 15,
    justifyContent: 'center',
  },
  replyAuthor: {
    fontSize: 16,
    ...font.regular,
    color: theme.primaryText,

    marginBottom: 2,
  },
  replyText: {
    fontSize: 16,
    color: theme.primaryText,
    ...font.regular,
  },
  
  replyButton: {
    fontSize: 16,
    color: theme.secondaryText,
    ...font.regular,

    display: 'inline-block',
    // textDecoration: 'underline',
    // cursor: 'pointer',
  },
  allRepliesButton: {
    marginTop: 5,
    marginLeft: 20,
  },

  secondary: {
    fontSize: 16,
    fontWeight: 700,
    color: theme.secondaryText,

    marginLeft: 5,
  },

})