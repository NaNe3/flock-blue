import { useEffect } from 'react'
import StoreActionRow from '../components/StoreActionRow';

export default function Share() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.open('https://apps.apple.com/us/app/flock-study-together/id6744551484', '_blank');
    } else if (/android/i.test(userAgent)) {
      window.open('https://play.google.com/store/apps/details?id=io.lingerlonger.flock&hl=en_US', '_blank');
    }
  }, []);

  return (
    <div style={styles.container}>
      <div className="full-screen">
        <h3 style={styles.title}>because growing closer to GOD was never meant to be done alone</h3>
        <StoreActionRow />
      </div>

    </div>
  )
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  }
}

