import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Avatar from "./Avatar"

import { useHolos } from "../context/HolosProvider"
import { useTheme } from "../context/ThemeProvider";
import { useFont } from "../context/FontProvider";

export default function GroupListView() {
  const { theme } = useTheme()
  const { font } = useFont()
  const styles = useMemo(() => style(theme, font), [theme, font]);  

  const { groups } = useHolos()
  const navigate = useNavigate();

  const handleGroupClick = ({ groupId }) => {
    navigate(`/group/${groupId}`);
  }

  return (
    <div style={styles.contentColumnContainer}>
      {groups.map((group) => (
        <div 
          className="hover-background"
          key={`group-${group.group_id}`}
          style={styles.contentRow}
          onClick={() => handleGroupClick({ groupId: group.group_id })}
        >
          <Avatar
            imagePath={group.group_image}
            style={styles.avatar}
          />
          <p style={styles.contentName}>{group.group_name}</p>
        </div>
      ))}
    </div>
  )
}

const style = (theme, font) => ({
  contentColumnContainer: {
    display: 'flex',
    // flex: 1,
    flexDirection: 'column',
  },
  contentRow: {
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    padding: '10px 15px',
  },
  avatar: {
    width: 32,
    height: 32,
    flexShrink: 0,
  },
  contentName: {
    fontSize: 16,
    color: theme.secondaryText,
    ...font.regular,

    alignSelf: 'center',
  },
})