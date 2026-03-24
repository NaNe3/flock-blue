import GroupLogOverview from "../../components/Group/GroupLogOverview"
import GroupWeekActivity from "../../components/Group/GroupWeekActivity"

export default function GroupLandingOverview() {
  return (
    <div style={styles.container}>
      <GroupWeekActivity />
      <GroupLogOverview />
    </div>
  )
}

const styles = {
  container: {
    padding: '0px 20px',
    flexDirection: 'column',
    display: 'flex',
    gap: 40,
  },
}
