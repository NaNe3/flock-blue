import { useEffect } from "react";

import OverviewPassport from "../components/Overview/OverviewPassport";
import OverviewLanding from "../components/Overview/OverviewLanding";
import SocialLeftColumn from "../components/Social/SocialLeftColumn";

import { useDashboard } from "../context/DashboardProvider";

export default function Overview() {
  const { dashboard, setDashboard } = useDashboard();

  useEffect(() => {
    if (dashboard.width !== 1100) {
      setDashboard((prev) => ({
        ...prev,
        width: 1100
      }))
    }
  }, []);
  
  return (
    <div style={styles.container}>
      <SocialLeftColumn />
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