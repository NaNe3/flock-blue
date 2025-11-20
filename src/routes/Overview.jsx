import { useEffect } from "react";

import OverviewLandingPlan from "../components/Overview/OverviewLandingPlan";
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
        {/* <h1>Overview Page</h1>
        <button onClick={() => handleWidthChange(expandedWidth)}>expand</button>
        <button onClick={() => handleWidthChange('60%')}>shrink</button> */}
        {/* <OverviewLandingDisplay /> */}
        <OverviewLandingPlan />
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
    // padding: '30px 0',
    padding: '40px 20px',

    flexDirection: 'column',
    display: 'flex',
    gap: 60,
  }
}