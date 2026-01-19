import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './NavigationBar.css';

import { HugeiconsIcon } from '@hugeicons/react';
import { Menu04Icon } from '@hugeicons-pro/core-solid-rounded';

import InteractiveLink from "./InteractiveLink";
import FlockBlock from "./FlockBlock";
import Avatar from "./Avatar";

import { useHolos } from "../context/HolosProvider";
import { useTheme } from "../context/ThemeProvider";
import { useFont } from "../context/FontProvider";

export default function NavigationBar() {
  const { theme } = useTheme();
  const { font } = useFont();
  const styles = useMemo(() => style(theme, font), [theme, font]);

  const { color, user } = useHolos();
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
          onClick={() => handleNavigate('/home')}
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
          {!user ? (
            <InteractiveLink
              text='sign in'
              color={color}
              onClick={() => handleNavigate('/signin')}
              style={styles.link}
            />
          ) : (
            <div 
              className="circle-button"
              onClick={() => navigate('/')}
            >
              <Avatar
                imagePath={user.avatar_path}
                style={styles.avatar}
              />
            </div>
          )}
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

const style = (theme, font) => ({
  link: {
    fontSize: 18,
    color: theme.actionText,
    ...font.regular,

    cursor: 'pointer',
    userSelect: 'none',
    transition: '0.2s',
  },
  contentLink: {
    fontSize: 24,
    textAlign: 'center',
    color: theme.actionText,
    ...font.regular,

    width: '100%',
    cursor: 'pointer',
    userSelect: 'none',
    transition: '0.2s'
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    cursor: 'pointer',
  }
})
