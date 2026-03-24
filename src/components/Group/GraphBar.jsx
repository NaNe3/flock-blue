import { useMemo, useState } from "react"
import { useFont } from "../../context/FontProvider"
import { useTheme } from "../../context/ThemeProvider"
import { msToMinSec, timeAgoSuperSpecific } from "../../utility/time"
import Avatar from "../Avatar"

export default function GraphBar({ 
  barHeight, 
  selected,
  timestamp, 
  logs,

  hovering,
  setHovering
}) {
  const { theme } = useTheme()
  const { font } = useFont()
  const styles = useMemo(() => style(theme, font), [theme, font])
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const initiateHover = () => {
    setHovering(timestamp)
  }

  const endHover = () => {
    setHovering(null)
  }

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const display = useMemo(() => {
    if (hovering !== timestamp) return null;

    if (selected === "highestUniqueUsers") {
      const uniqueUsers = {}
      logs.forEach(log => {
        if (!uniqueUsers[log.user_id.id]) {
          uniqueUsers[log.user_id.id] = log.user_id;
        }
      })
      return (
        <div style={styles.toolContent}>
          <p style={{ ...styles.toolText, padding: '10px 0px' }}>{Object.keys(uniqueUsers).length} unique users studied</p>
          {Object.values(uniqueUsers).map(user => (
            <div key={`unique-${user.id}`} style={styles.toolRow}>
              <Avatar
                key={user.id}
                imagePath={user?.avatar_path}
                style={styles.toolAvatar}
              />
              <p style={styles.toolText}>{user.full_name}</p>
            </div>
          ))}
        </div>
      )
    } else if (selected === "highestLogs") {
      return (
        <div style={styles.toolContent}>
          <p style={{ ...styles.toolText, padding: '10px 0px' }}>{logs.length} sections completed</p>
        </div>
      )
    } else if (selected === "highestTimeStudied") {
      const totalTimeStudiedThatDay = logs.reduce((total, log) => total + log.time_studied, 0);
      const totalFormattedTime = msToMinSec(totalTimeStudiedThatDay);

      const timeByPerson = {}
      logs.forEach(log => {
        if (!timeByPerson[log.user_id.id]) {
          timeByPerson[log.user_id.id] = { ...log.user_id, time: 0 }
        }
        timeByPerson[log.user_id.id].time += log.time_studied;
      })
      return (
        <div style={styles.toolContent}>
          <p style={{ ...styles.toolText, padding: '10px 0px' }}>{totalFormattedTime} minutes studied</p>
          {Object.values(timeByPerson).map(user => (
            <div 
              key={`time-${user.id}`}
              style={styles.toolRow}
            >
              <Avatar
                key={user.id}
                imagePath={user?.avatar_path}
                style={styles.toolAvatar}
              />
              <p style={styles.toolText}>{user.full_name} - {msToMinSec(user.time)}</p>
            </div>
          ))}
        </div>
      )
    } else {
      return <p>WAAAAA</p>
    }
  }, [hovering])

  const toolTipHeight = useMemo(() => {
    if (hovering !== timestamp) return 0;

    if (selected === "highestUniqueUsers") {
      return 60 + (logs.reduce((uniqueUsers, log) => {
        if (!uniqueUsers.includes(log.user_id.id)) {
          uniqueUsers.push(log.user_id.id);
        }
        return uniqueUsers;
      }, []).length * 22);
    } else if (selected === "highestLogs") {
      return 60;
    } else if (selected === "highestTimeStudied") {
      return 60 + (Object.values(logs.reduce((timeByPerson, log) => {
        if (!timeByPerson[log.user_id.id]) {
          timeByPerson[log.user_id.id] = { ...log.user_id, time: 0 }
        }
        timeByPerson[log.user_id.id].time += log.time_studied;
        return timeByPerson;
      }, {})).length * 22);
    } else {
      return 60;
    }
  }, [display])

  return (
    <>
      <div 
        className="hover-transition"
        key={timestamp} 
        style={{ ...styles.bar, height: barHeight, opacity: hovering === timestamp ? 0.8 : 1 }}
        onMouseEnter={initiateHover}
        onMouseLeave={endHover}
        onMouseMove={handleMouseMove}
      />
      
      {hovering === timestamp && (
        <div 
          style={{
            ...styles.tooltip,
            left: mousePosition.x + 20,
            top: mousePosition.y > window.innerHeight / 2 
              ? mousePosition.y - toolTipHeight
              : mousePosition.y
          }}
        >
          <p style={styles.toolText}>{timeAgoSuperSpecific(timestamp)}</p>
          {display}
        </div>
      )}
    </>
  )
}

const style = (theme, font) => ({
  bar: {
    display: 'flex',
    flex: 1,
    backgroundColor: theme.actionText,
    borderRadius: 2,
    cursor: 'pointer',
  },
  tooltip: {
    position: 'fixed',
    backgroundColor: theme.primaryBackground,
    color: theme.primaryText,
    padding: '8px 12px',
    borderRadius: 12,
    border: `1px solid ${theme.primaryBorder}`,
    fontSize: 14,
    zIndex: 1000,
    pointerEvents: 'none',
    ...font.regular,
  },

  toolRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  }, 
  toolText: {
     color: theme.primaryText,
     fontSize: 14,
     ...font.regular,
   },
   toolAvatar: {
     width: 18,
     height: 18,
     borderRadius: '50%',
   },
})