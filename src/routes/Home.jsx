import { useState, useEffect, useMemo } from 'react';
import { AppStoreIcon, PlayStoreIcon } from '@hugeicons-pro/core-solid-rounded';
import { HugeiconsIcon } from '@hugeicons/react';
import './Home.css';

import LandingPhoto from '../assets/preview/home-landing-backup.png';
import Preview1 from '../assets/preview/home-preview-1.png';
import Preview2Backup from '../assets/preview/home-preview-2-backup.png';
import Preview3 from '../assets/preview/home-preview-3.png';

import CircleInnunciated from '../components/CircleInnunciated';
import TextInnunciated from '../components/TextInnunciated';
import RainbowButton from '../components/RainbowButton';
import BasicButton from '../components/BasicButton';
import StoreActionRow from '../components/StoreActionRow';

import { useTheme } from '../context/ThemeProvider';
import { useFont } from '../context/FontProvider';

const windowHeight = window.innerHeight/2;
const attentionString = 'growing closer to GOD starts with creating positive habits. let\'s make it happen together';
const attentionArray = attentionString.split(' ');

export default function Home() {
  const { theme } = useTheme()
  const { font } = useFont()
  const styles = useMemo(() => style(theme, font), [theme, font]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const isMobileOrSafari = useMemo(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
    return /iPad|iPhone|iPod|Android/i.test(userAgent) || isSafari;
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const attention = useMemo(() => {
    const progress = scrollY - windowHeight-200;
    const completedWords = Math.floor((progress / 2000) * (attentionArray.length+1))

    if (progress > 0) {
      return [
        attentionArray.slice(0, completedWords).join(' '),
        attentionArray.slice(completedWords).join(' '),
      ];
    } else {
      return ['', 'growing closer to GOD starts with creating positive habits. let\'s make it happen together'];
    }
  }, [scrollY]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > windowHeight-60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJoin = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.open('https://apps.apple.com/us/app/flock-group-study/id6744551484', '_blank');
    } else if (/android/i.test(userAgent)) {
      window.open('https://play.google.com/store/apps/details?id=com.flock.groupstudy', '_blank');
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div style={styles.homeContainer}>
      <div className="full-screen relative">
        <div className='home-content'>
          <div className='home-video-container'>
            {/* {!isMobileOrSafari ? (
              <video
                src={LandingVideo}
                autoPlay
                muted
                playsInline
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'transparent',
                }}
                onEnded={(e) => e.target.pause()}
              />
            ) : ( */}
              <img src={LandingPhoto} alt="Landing" style={{ width: '100%', height: '100%', objectFit: 'cover', marginLeft: -20  }} />
            {/* )} */}
          </div>
          <div className='home-info-container'>
            <h1 style={styles.title}>Christ = 👑</h1>
            <p style={styles.subtitle}>gathering disciples of Christ to feast upon his words—together</p>
            <StoreActionRow />
          </div>
        </div>
        <div className='gradient-overlay' style={styles.gradientOverlay}></div> {/* Gradient overlay */}
      </div>
      <div className="scroll-section">
        <div className="full-screen sticky">
          <div className='full-screen-content'>
            <h1 className='attention-text'>
              <span style={styles.innunciated}>{attention[0]}</span> <span style={styles.uninnunciated}>{attention[1]}</span>
            </h1>
            <p style={styles.scrollIndicator}>keep scrolling :D</p>
          </div>
        </div>
      </div>
      <div className='full-screen'>
        <div className='full-screen-content'>
          <div className='temporary-break' />
          <CircleInnunciated
            text={'the movement'}
            color1={'#0ba3ff'}
            color2={'#1dd1a1'}
          />
          <h1 style={styles.title}>the 🍊s of our labor</h1>

          <h1 style={styles.infoDisclaimer}>570k</h1>
          <p style={{ ...styles.subtitle, marginBottom: 0 }}>minutes studied on flock</p>
        </div>
      </div>
      <div className='showcase'>
        <div className='showcase-container'>
          <div className='showcase-information home-preview-content-1'>
            <TextInnunciated 
              text={'study together'}
              color={'#AF69EE'}
            />
            <p style={styles.showcaseInfoText}>Our Lord and Savior has given us the perfect example of charity and love. By studying the word of God with friends and family, we will find ourselves becoming more like Him. </p>
            <BasicButton
              text='I need this!'
              color={'#AF69EE'}
              onClick={handleJoin}
            />
          </div>
          <div className='showcase-img-container home-preview-1' >
            <img src={Preview1} />
          </div>
        </div>
        <div className='showcase-container'>
          <div className='showcase-img-container home-preview-2'>
            <img src={Preview2Backup} alt="Landing" style={{ width: '100%', height: '100%' }} />
          </div>
          <div className='showcase-information'>
            <TextInnunciated 
              text={'track progress'}
              color={'#ff6b6b'}
            />
            <p style={styles.showcaseInfoText}>
              Sometimes it can be difficult to see how far we have come! Visualize the remarkable results that come from consistent study</p>
            <BasicButton
              text='Okay. Im in!'
              color={'#ff6b6b'}
              onClick={handleJoin}
            />
          </div>
        </div>
        <div className='showcase-container'>
          <div className='showcase-information home-preview-content-3'>
            <TextInnunciated 
              text={'targeted learning'}
              color={'#2ed573'}
            />
            <p style={styles.showcaseInfoText}>
              With structured study plans and the input from scholars, you can learn the word of God in a way that is tailored to your needs.
            </p>
            <BasicButton
              text='thats... kinda 🔥'
              color={'#2ed573'}
              onClick={handleJoin}
            />
          </div>
          <div 
            className='showcase-img-container home-preview-3'
          >
            <img src={Preview3} />
          </div>
        </div>
      </div>
      <div className='full-screen'>
        <div className='full-screen-content'>
          <h1 style={styles.title}>complete your first study today!</h1>
          <p style={styles.subtitle}>available to download on iOS and Android</p>
          <div className='store-row'>
            {/* <img className='store-icon' src={PlayHDIcon} />
            <img className='store-icon' src={AppleHDIcon} /> */}
            <RainbowButton
              onClick={() => {
                window.location.href = 'https://apps.apple.com/us/app/flock-group-study/id6744551484';
              }}
              color1={'#bbb'}
              color2={'#0ba3ff'}
            >
              <HugeiconsIcon
                icon={AppStoreIcon}
                size={24}
                color="#0a0a0a"
                
              /> 
              <p style={styles.storeItem}>try on iOS</p>
            </RainbowButton>
            <RainbowButton
              onClick={() => { }}
              color1={'#0ba3ff'}
              color2={'#bbb'}
            >
              <HugeiconsIcon
                icon={PlayStoreIcon}
                size={24}
                color="#0a0a0a"
              /> 
              <p style={styles.storeItem}>try on android</p>
            </RainbowButton>
          </div>
        </div>
      </div>
    </div>
  );
}

const style = (theme, font) => ({
  homeContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  gradientOverlay: {
    background: `linear-gradient(to top, ${theme.primaryBackground}, transparent)`,
  },

  title: {
    fontSize: 60,
    color: theme.tertiaryText,
    ...font.regular,

    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 32,
    color: theme.tertiaryText,
    ...font.regular,

    textAlign: 'center',
    marginBottom: 40,
    marginTop: 10,
    opacity: 0.5,
  },

  infoDisclaimer: {
    fontSize: 180,
    color: theme.secondaryText,
    ...font.bold,

    textAlign: 'center',
    lineHeight: 1,
  },
  innunciated: { color: theme.primaryText },
  uninnunciated: { color: theme.tertiaryText, opacity: 0.3 },
  scrollIndicator: {
    color: theme.tertiaryText,
    ...font.bold,
    fontSize: 24,

    position: 'absolute',
    bottom: 60,
    opacity: 0.3,
  },

  showcaseInfoText: {
    fontSize: 20,
    color: theme.tertiaryText,
    ...font.regular,

    marginTop: 20,
    marginBottom: 40,
  },

  storeRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    width: 300,
    marginTop: 20,
  },
  storeIcon: {
    width: 170,
    height: 170,
    marginTop: 20,
    cursor: 'pointer',
  },
  storeItem: {
    fontSize: 22,
    color: '#000',
    ...font.bold,

    textAlign: 'center',
    lineHeight: 1,
    marginLeft: 5,
  }
});