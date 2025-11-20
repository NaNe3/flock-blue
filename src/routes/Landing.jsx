import { Outlet, useNavigate } from "react-router-dom";

import LandingNavigationBar from "../components/LandingNavigationBar";

import { useDashboard } from "../context/DashboardProvider";
import { useHolos } from "../context/HolosProvider";
import { useEffect } from "react";

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useHolos();
  const { dashboard } = useDashboard();

  useEffect(() => { if (!user) navigate('/home') }, [user]);

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <LandingNavigationBar />
      </div>
      <div 
        className="landing-content"
        style={{
          ...styles.content,
          width: dashboard?.width
        }}
      >
        <Outlet />
      </div>
    </div>
  )
}

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',

    position: 'relative',
  },

  left: {
    height: '100vh',
    padding: '0px 20px',

    position: 'sticky',
    top: 0,

    display: 'flex',

    zIndex: 2,
  },
  content: {
  }
}