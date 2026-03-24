import { useMemo } from "react";
import { useFont } from "../../../context/FontProvider";
import { useTheme } from "../../../context/ThemeProvider";
import Avatar from "../../Avatar";

export default function GroupMemberHeader({ member }) {
  const { theme } = useTheme()
  const { font } = useFont()
  const styles = useMemo(() => style(theme, font), [theme, font]);

  return (
    <div style={styles.headerContainer}>
      <Avatar
        imagePath={member?.avatar_path}
        style={styles.avatar}
      />
      <div style={styles.groupDetails}>
        <h1 style={styles.groupName}>{member?.full_name}</h1>
      </div>
    </div>
  )
}

const style = (theme, font) => ({
  headerContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    gap: 20,

    padding: '100px 20px 60px 20px',
  },
  groupDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 40,
    marginTop: 15,
  },
  avatar: {
    width: 100,
    height: 100,

    borderRadius: 70,
  },
  groupName: {
    fontSize: 28,
    color: theme.primaryText,
    ...font.bold,
  },
})