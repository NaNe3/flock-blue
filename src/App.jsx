import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import Share from './routes/Share';
import NavigationBar from './components/NavigationBar';
import HolosProvider from './context/HolosProvider';
import Footer from './components/Footer';

import Home from './routes/Home';
import Invite from './routes/Invite';

import Features from './routes/Features';
import Vision from './routes/Vision';
import Scholars from './routes/Scholars';

import CommunityGuidlines from './routes/legal/CommunityGuidlines';
import PrivacyPolicy from './routes/legal/PrivacyPolicy';
import TermsOfService from './routes/legal/TermsOfService';
import Account from './routes/Account';

function App() {
  const special = ['invite']
  const [currentPath, setCurrentPath] = useState('/')

  const TrackPath = ({ setCurrentPath }) => {
    const location = useLocation();

    useEffect(() => {
      setCurrentPath(location.pathname.replace('/', ''));
    }, [location]);

    return null; // This component doesn't render anything
  };

  return (
    <HolosProvider>
      <Router>
        <TrackPath setCurrentPath={setCurrentPath} />
        <div className="container">
          {!special.includes(currentPath) && <NavigationBar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/invite" element={<Invite />} />            
            <Route path="/account" element={<Account />} />            

            <Route path="/features" element={<Features />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/scholars" element={<Scholars />} />

            <Route path="/community-guidlines" element={<CommunityGuidlines />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/share" element={<Share />} />
          </Routes>
          {!special.includes(currentPath) && <Footer />}
        </div>
      </Router>
    </HolosProvider>
  )
}

export default App
