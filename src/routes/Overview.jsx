import { useEffect } from "react";

import OverviewLeftColumn from "../components/Overview/OverviewLeftColumn";

import { useDashboard } from "../context/DashboardProvider";

export default function Overview() {
  const { setDashboard } = useDashboard();
  
  useEffect(() => {
    setDashboard((prev) => ({
      ...prev,
      width: 1100
    }))
  }, []);
  
  return (
    <div style={styles.container}>
      <OverviewLeftColumn />
      <div style={styles.content}>
        {/* <OverviewLandingDisplay /> */}
        {/* <OverviewLandingPlan /> */}
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '101vh',
    width: '100%',

    flexDirection: 'row',
  },
  content: {
    flex: 1,
    height: '100%',
    maxWidth: 800,
    padding: '40px 20px',

    flexDirection: 'column',
    display: 'flex',
    gap: 60,
  }
}