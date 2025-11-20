import { useHolos } from "../../context/HolosProvider"
import Avatar from "../Avatar"

export default function OverviewLandingDisplay() {
  const { groups } = useHolos()

  return (
    <div style={styles.container}>
      {groups.map((group, idx) => (
        <div key={idx} style={styles.groupContainer}>
          <Avatar
            imagePath={group.group_image}
            style={styles.groupAvatar}
          />
          <div style={styles.groupContent}>
            <p style={styles.groupName}>{group.group_name}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',    
    width: '100%',

    flexDirection: 'column',
    gap: 20,
    flexWrap: 'wrap',
    // padding: 20,
    // borderRadius: 20,

    // backgroundColor: '#222',
  },

  groupContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  groupAvatar: {
    width: 25,
    height: 25,
    borderRadius: 40,

    flexShrink: 0,
  },
  groupName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#aaa',
  }
}