import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import HolosProvider from './context/HolosProvider';
import FlockBlock from './components/FlockBlock';

import CommunityGuidlines from './routes/legal/CommunityGuidlines';
import TermsOfService from './routes/legal/TermsOfService';
import PrivacyPolicy from './routes/legal/PrivacyPolicy';
import Scholars from './routes/Scholars';
import Features from './routes/Features';
import Account from './routes/Account';
import Landing from './routes/Landing';
import Onboard from './routes/Onboard';
import Vision from './routes/Vision';
import Invite from './routes/Invite';
import Signin from './routes/Signin';
import Share from './routes/Share';
import Home from './routes/Home';
import Overview from './routes/Overview';
import LibraryPage from './routes/LibraryPage';
import ChapterDashboard from './routes/ChapterDashboard';
import SocialPage from './routes/SocialPage';
import Profile from './routes/Profile';
import SocialLanding from './routes/SocialLanding';

import OnboardFullName from './routes/onboard/OnboardfullName';
import OnboardHandle from './routes/onboard/OnboardHandle';
import OnboardProfilePicture from './routes/onboard/OnboardProfilePicture';

import CollectionProvider from './context/CollectionProvider';
import DashboardProvider from './context/DashboardProvider';
import MedicProvider from './context/MedicProvider';
import StudyProvider from './context/StudyProvider';
import ModalProvider from './context/ModalProvider';
import ThemeProvider from './context/ThemeProvider';
import FontProvider from './context/FontProvider';
import CollectionPage from './routes/CollectionPage';
import HomeLanding from './routes/HomeLanding';
import GroupLanding from './routes/GroupLanding';
import GroupPage from './routes/GroupPage';
import CacheProvider from './context/CacheProvider';
import GroupMember from './routes/group/GroupMember';
import GroupLandingOverview from './routes/group/GroupLandingOverview';
import GroupLandingQueue from './routes/group/GroupLandingQueue';

// interface TrackPathProps {
//   setCurrentPath: (path: string) => void;
// }

function App() {
  // const [currentPath, setCurrentPath] = useState('/')
  const [checkingAuthentication, setCheckingAuthentication] = useState(true);

  // const TrackPath = ({ setCurrentPath }: TrackPathProps) => {
  //   const location = useLocation();

  //   useEffect(() => {
  //     setCurrentPath(location.pathname.replace('/', ''));
  //   }, [location]);

  //   return null;
  // };

  return (
    <Router>
      {/* <TrackPath setCurrentPath={setCurrentPath} /> */}
      <MedicProvider>
        <ThemeProvider>
          <FontProvider>
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
                  <CollectionProvider>
                    <StudyProvider>
                      <ModalProvider>
                        <CacheProvider>
                          <Routes>
                            <Route path="/" element={<Landing />}>
                              <Route index element={<Overview />} />

                              <Route path='/library/*' element={<LibraryPage />} />
                              <Route path="/study/:work/:book/:chapter" element={<ChapterDashboard />} />

                              <Route path="/social" element={<SocialPage />}>
                                <Route index element={<SocialLanding />} />
                                <Route path="user/:userId" element={<Profile />} />                  
                              </Route>

                              <Route path='/group' element={<GroupPage />}>
                                <Route path="/group/:groupId" element={<GroupLanding />}>
                                  <Route index element={<GroupLandingOverview />} />
                                  <Route path="queue" element={<GroupLandingQueue />} />
                                </Route>
                                <Route path="/group/:groupId/member/:memberId" element={<GroupMember />} />
                              </Route>

                              <Route path="/profile" element={<div>Notifications</div>} />
                              <Route path="/collection/:collectionId" element={<CollectionPage />} />
                            </Route>

                            <Route path="/invite/*" element={<Invite />} />            
                            <Route path="/account" element={<Account />} />            

                            <Route path="/signin" element={<Signin />} />
                            <Route path='/onboard' element={<Onboard />}>
                              {/* get full name + handle */}
                              <Route index element={<OnboardFullName />} />
                              <Route path="handle" element={<OnboardHandle />} />
                              <Route path="picture" element={<OnboardProfilePicture />} />
                            </Route>

                            <Route path="/home" element={<HomeLanding />}>
                              <Route index element={<Home />} />                            

                              <Route path="features" element={<Features />} />
                              <Route path="vision" element={<Vision />} />
                              <Route path="scholars" element={<Scholars />} />
                            </Route>

                            <Route path="/community-guidelines" element={<CommunityGuidlines />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                            <Route path="/terms-of-service" element={<TermsOfService />} />
                            <Route path="/share" element={<Share />} />
                          </Routes>
                        </CacheProvider>
                      </ModalProvider>
                    </StudyProvider>
                  </CollectionProvider>
                </DashboardProvider>
              )}
            </HolosProvider>
          </FontProvider>
        </ThemeProvider>
      </MedicProvider>
    </Router>
  )
}

export default App
