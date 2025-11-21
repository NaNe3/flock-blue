import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import NavigationBar from './components/NavigationBar';
import HolosProvider from './context/HolosProvider';
import FlockBlock from './components/FlockBlock';
import Footer from './components/Footer';

import CommunityGuidlines from './routes/legal/CommunityGuidlines';
import TermsOfService from './routes/legal/TermsOfService';
import PrivacyPolicy from './routes/legal/PrivacyPolicy';
import Scholars from './routes/Scholars';
import Features from './routes/Features';
import Account from './routes/Account';
import Landing from './routes/Landing';
import Vision from './routes/Vision';
import Invite from './routes/Invite';
import Signin from './routes/Signin';
import Share from './routes/Share';
import Home from './routes/Home';
import Overview from './routes/Overview';
import DashboardProvider from './context/DashboardProvider';
import StudyProvider from './context/StudyProvider';
import ModalProvider from './context/ModalProvider';
import LibraryPage from './routes/LibraryPage';
import ChapterDashboard from './routes/ChapterDashboard';
import SocialPage from './routes/SocialPage';
import Group from './routes/Group';
import Profile from './routes/Profile';
import SocialLanding from './routes/SocialLanding';

interface TrackPathProps {
  setCurrentPath: (path: string) => void;
}

function App() {
  const special = ['home', 'invite', 'account', 'features', 'vision', 'scholars', 'community-guidelines', 'privacy-policy', 'terms-of-service', 'share'];
  const [currentPath, setCurrentPath] = useState('/')
  const [checkingAuthentication, setCheckingAuthentication] = useState(true);

  const TrackPath = ({ setCurrentPath }: TrackPathProps) => {
    const location = useLocation();

    useEffect(() => {
      setCurrentPath(location.pathname.replace('/', ''));
    }, [location]);

    return null;
  };

  return (
    <Router>
      <TrackPath setCurrentPath={setCurrentPath} />
      <HolosProvider setCheckingAuthentication={setCheckingAuthentication}>
        {checkingAuthentication ? (
          <div className='full-screen'>
            <FlockBlock
              girth={100}
              color={'#0ba3ff'}
            />
          </div>
        ) : (
          <DashboardProvider>
            <StudyProvider>
              <ModalProvider>
                <Routes>
                  <Route path="/" element={<Landing />}>
                    <Route index element={<Overview />} />

                    <Route path='/library/*' element={<LibraryPage />} />
                    <Route path="/study/:work/:book/:chapter" element={<ChapterDashboard />} />

                    <Route path="/social" element={<SocialPage />}>
                      <Route index element={<SocialLanding />} />
                      <Route path="group/:groupId" element={<Group />} />                  
                      <Route path="profile/:userId" element={<Profile />} />                  
                    </Route>
                    <Route path="/collections" element={<div>Notifications</div>} />
                    <Route path="/profile" element={<div>Notifications</div>} />
                  </Route>



                  <Route path="/home" element={<Home />} />
                  <Route path="/invite/*" element={<Invite />} />            
                  <Route path="/account" element={<Account />} />            

                  <Route path="/features" element={<Features />} />
                  <Route path="/vision" element={<Vision />} />
                  <Route path="/scholars" element={<Scholars />} />
                  <Route path="/signin" element={<Signin />} />

                  <Route path="/community-guidelines" element={<CommunityGuidlines />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/share" element={<Share />} />
                </Routes>
                {special.includes(currentPath) && <NavigationBar />}
                {special.includes(currentPath) && <Footer />}
              </ModalProvider>
            </StudyProvider>
          </DashboardProvider>
        )}
      </HolosProvider>
    </Router>
  )
}

export default App
