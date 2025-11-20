import { useState, useEffect, useMemo } from 'react';
import { AppStoreIcon, PlayStoreIcon } from '@hugeicons-pro/core-solid-rounded';
import { HugeiconsIcon } from '@hugeicons/react';
import './Home.css';

import LandingPhoto from '../assets/preview/home-landing-backup.png';
import Preview1 from '../assets/preview/home-preview-1.png';
import Preview2Backup from '../assets/preview/home-preview-2-backup.png';
import Preview3 from '../assets/preview/home-preview-3.png';

import { useHolos } from '../context/HolosProvider';

import BasicButton from '../components/BasicButton';
import CircleInnunciated from '../components/CircleInnunciated';
import TextInnunciated from '../components/TextInnunciated';
import RainbowButton from '../components/RainbowButton';

const windowHeight = window.innerHeight/2;
const attentionString = 'growing closer to GOD starts with creating positive habits. let\'s make it happen together';
const attentionArray = attentionString.split(' ');

export default function Home() {
  const { color } = useHolos();

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
      // Check if the user is on iOS
      window.location.href = 'https://apps.apple.com/us/app/flock-group-study/id6744551484';
    } else if (/android/i.test(userAgent)) {
      // Check if the user is on Android
      window.location.href = 'https://play.google.com/store/apps/details?id=com.flock.groupstudy';
    } else {
      // Otherwise, assume desktop
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
            <h1 className='info-header'>Christ = 👑</h1>
            <p className='info-subheader'>gathering disciples of Christ to feast upon his words—together</p>
            {/* <BasicButton
              text='join the flock'
              color={color}
              onClick={() => {
                window.location.href = 'https://flockblue.com';
              }}
            /> */}
            <div className='landing-action-row'>
              <RainbowButton
                onClick={() => {
                  window.location.href = 'https://apps.apple.com/us/app/flock-group-study/id6744551484';
                }}
                color1={'#bbb'}
                color2={color}
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
                color1={color}
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
        <div className='gradient-overlay'></div> {/* Gradient overlay */}
      </div>
      <div className="scroll-section">
        <div className="full-screen sticky">
          <div className='full-screen-content'>
            <h1 className='attention-text'>
              <span style={styles.innunciated}>{attention[0]}</span> {attention[1]}
            </h1>
            <p className='scroll-indicator'>keep scrolling :D</p>
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
          <h1 className='info-header'>the 🍊s of our labor</h1>

          <h1 className='info-disclaimer'>570k</h1>
          <p className='info-subheader' style={{ marginBottom: 0 }}>minutes studied on flock</p>
        </div>
      </div>
      <div className='showcase'>
        <div className='showcase-container'>
          <div className='showcase-information home-preview-content-1'>
            <TextInnunciated 
              text={'study together'}
              color={'#AF69EE'}
            />
            <p className='showcase-info-text'>Our Lord and Savior has given us the perfect example of charity and love. By studying the word of God with friends and family, we will find ourselves becoming more like Him. </p>
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
            {/* {!isMobileOrSafari ? (
              <video
                src={Preview2}
                autoPlay
                muted
                playsInline
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
                onEnded={(e) => e.target.pause()}
              />
            ) : ( */}
              <img src={Preview2Backup} alt="Landing" style={{ width: '100%', height: '100%',  }} />
            {/* )} */}
          </div>
          <div className='showcase-information'>
            <TextInnunciated 
              text={'track progress'}
              color={'#ff6b6b'}
            />
            <p className='showcase-info-text'>
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
            <p className='showcase-info-text'>
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
          <h1 className='info-header'>complete your first study today!</h1>
          <p className='info-subheader'>available to download on iOS and Android</p>
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

const styles = {
  homeContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  infoDisclaimer: {
    fontSize: 180,
    fontWeight: 900,
    lineHeight: 1,
    color: '#ccc',
    textAlign: 'center',
  },
  innunciated: { color: '#aaa' },

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
    fontWeight: 800,
    lineHeight: 1,
    color: '#0a0a0a',
    textAlign: 'center',
    marginLeft: 5,
  }
};