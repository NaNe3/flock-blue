import { useEffect, useMemo, useRef, useState } from "react";
import { HugeiconsIcon } from '@hugeicons/react';
import { Menu04Icon } from '@hugeicons-pro/core-solid-rounded';

import './NavigationBar.css';
import { useHolos } from "../context/HolosProvider";
import { useNavigate } from "react-router-dom";
import InteractiveLink from "./InteractiveLink";
import FlockBlock from "./FlockBlock";

export default function NavigationBar() {
  const { color } = useHolos();
  const navigate = useNavigate();

  const [showNavigationScreen, setShowNavigationScreen] = useState(false);
  const navScreenRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navScreenRef.current && !navScreenRef.current.contains(event.target)) {
        setShowNavigationScreen(false);
      }
    };

    if (showNavigationScreen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNavigationScreen]);

  const handleNavigate = (location) => {
    setShowNavigationScreen(false)
    navigate(location)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleNavigationScreen = () => {
    setShowNavigationScreen(!showNavigationScreen);
  }

  return (
    <>
      <div className='nav-bar'>
        <FlockBlock 
          onClick={() => handleNavigate('/')}
          color={color}
          girth={50}
        />
        <div className="nav-links">
          <InteractiveLink
            text='our vision'
            color={color}
            onClick={() => handleNavigate('/vision')}
            style={styles.link}
          />
          <InteractiveLink
            text='features'
            color={color}
            onClick={() => handleNavigate('/features')}
            style={styles.link}
          />
          <InteractiveLink
            text='scholars'
            color={color}
            onClick={() => handleNavigate('/scholars')}
            style={styles.link}
          />
        </div>
        <div 
          className="hamburger"
          onClick={toggleNavigationScreen}
        >
          <HugeiconsIcon
            icon={Menu04Icon}
            size={35}
            color="#fff"
          />
        </div>
      </div>
      {showNavigationScreen && (
        <div className="nav-screen" ref={navScreenRef}>
          <div className="nav-screen-content">
            <div className="nav-screen-links">
              <InteractiveLink
                text='our vision'
                color={color}
                onClick={() => handleNavigate('/vision')}
                style={styles.contentLink}
              />
              <InteractiveLink
                text='features'
                color={color}
                onClick={() => handleNavigate('/features')}
                style={styles.contentLink}
              />
              <InteractiveLink
                text='scholars'
                color={color}
                onClick={() => handleNavigate('/scholars')}
                style={styles.contentLink}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const styles = {
  link: {
    fontWeight: 700,
    fontSize: 18,
    cursor: 'pointer',
    userSelect: 'none',
    color: '#616161',
    transition: '0.2s'
  },
  contentLink: {
    fontWeight: 700,
    fontSize: 24,
    width: '100%',
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    color: '#ffffff',
    transition: '0.2s'
  }
}
