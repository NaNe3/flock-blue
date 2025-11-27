import { Outlet } from "react-router-dom";
import OnboardSkeleton from "../components/Onboard/OnboardSkeleton";
import { OnboardProvider } from "../context/OnboardProvider";

export default function Onboard() {
  // CHECK ONBOARDING STATUS

  return (
    <div style={styles.container}>
      <div 
        className="landing-content"
        style={styles.content}
      >
        <OnboardProvider>
          <OnboardSkeleton>
            <Outlet />
          </OnboardSkeleton>
        </OnboardProvider>
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
    width: '100%',
    maxWidth: 600
  }
}