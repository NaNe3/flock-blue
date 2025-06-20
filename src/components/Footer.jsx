import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './Footer.css';
import FlockAlpha from '../assets/icon-alpha.png';
import { useHolos } from '../context/HolosProvider';
import InteractiveLink from './InteractiveLink';

export default function Footer() {
  const location = useLocation()
  const { color } = useHolos()
  const navigate = useNavigate()
  const [path, setPath] = useState(location.pathname)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    setPath(location.pathname)
  }, [location])

  const handleNavigate = (location) => {
    navigate(location)
    scrollToTop()
  }

  return (
    <div id="footer-container">
      <div id="footer-logo-container" style={{...styles.iconContainer, backgroundColor: color }}>
        <img id="footer-logo" src={FlockAlpha} />
      </div>
      <div id="footer-content">
        <div className="footer-col">
          <h3 className='footer-col-header'>Download</h3>
          <InteractiveLink
            text='flock iOS'
            color={color}
            onClick={() => {}}
            style={styles.link}
          />
          <InteractiveLink
            text='flock Android'
            color={color}
            onClick={() => {}}
            style={styles.link}
          />
        </div>
        <div className="footer-col">
          <h3 className='footer-col-header'>Navigation</h3>
          <InteractiveLink
            text='home'
            color={color}
            onClick={() => handleNavigate('/')}
            style={styles.link}
          />
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

          <h3 
            className='footer-col-item' 
            onClick={scrollToTop}
            style={{ marginTop: 15 }}
          >Back to top</h3>
        </div>
        <div className="footer-col">
          <h3 className='footer-col-header'>Privacy and Terms</h3>
          <InteractiveLink
            text='community guidlines'
            color={color}
            onClick={() => handleNavigate('/community-guidlines')}
            style={styles.link}
          />
          <InteractiveLink
            text='privacy policy'
            color={color}
            onClick={() => handleNavigate('/privacy-policy')}
            style={styles.link}
          />
          <InteractiveLink
            text='terms of service'
            color={color}
            onClick={() => handleNavigate('/terms-of-service')}
            style={styles.link}
          />
        </div>
      </div>
      <h3 id="footer-copyright">©2025 Linger Longer Inc. All rights reserved.</h3>
    </div>
  )
}

const styles = {
  iconContainer: {
    borderRadius: 25,
    width: 150,
    height: 150,
    marginBottom: 80,
    borderRadius: 20,
    cursor: 'pointer',
    transition: '0.2s',
  },
  link: {
    display: 'block',
    fontWeight: 700,
    fontSize: '18px',
    fontFamily: 'Nunito',
    userSelect: 'none',
    textDecoration: 'none',

    color: '#616161',
    cursor: 'pointer',
    transition: '0.2s',
  }
}