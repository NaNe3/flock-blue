import { useEffect } from "react";

import OverviewLanding from "../components/Overview/OverviewLanding";

import { useDashboard } from "../context/DashboardProvider";
import OverviewPassport from "../components/Overview/OverviewPassport";

export default function Overview() {
  const { dashboard, setDashboard } = useDashboard();

  useEffect(() => {
    if (dashboard.width !== 800) {
      setDashboard((prev) => ({
        ...prev,
        width: 800
      }))
    }
  }, []);
  
  return (
    <div style={styles.container}>
      {/* <SocialLeftColumn /> */}
      {/* <OverviewLeftColumn /> */}
      <div style={styles.content}>
        {/* <OverviewLandingDisplay /> */}
        {/* <OverviewLandingPlan /> */}
        <OverviewPassport />

        <OverviewLanding />
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
    padding: '40px 30px',

    flexDirection: 'column',
    display: 'flex',
    gap: 60,
  }
}