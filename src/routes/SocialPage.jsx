import { useEffect } from "react";

import SocialLeftColumn from "../components/Social/SocialLeftColumn"

import { useDashboard } from "../context/DashboardProvider";
import { Outlet } from "react-router-dom";

export default function SocialPage() {
  const { setDashboard } = useDashboard();
  
  useEffect(() => {
    setDashboard((prev) => ({
      ...prev,
      width: 1100
    }))
  }, []);

  return (
    <div style={styles.container}>
      <SocialLeftColumn />
      <div style={styles.content}>
        <Outlet />
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
    padding: '30px 20px',

    flexDirection: 'column',
    display: 'flex',
    gap: 60,
  }
}