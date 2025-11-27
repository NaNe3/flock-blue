import { createContext, useContext, useState } from 'react';
import { updateUserOnboardComplete } from '../utility/db-user';
import { useHolos } from './HolosProvider';
import { useNavigate } from 'react-router-dom';

const OnboardContext = createContext();

export const useOnboard = () => {
  return useContext(OnboardContext);
};

export const OnboardProvider = ({ children }) => {
  const { user, setUser } = useHolos();
  const navigate = useNavigate();

  const [onboardData, setOnboardData] = useState({
    fname: '',
    lname: '',
    handle: '',
    profilePicture: null,
    profilePictureUrl: '',
  });

  const updateOnboardData = (data) => {
    setOnboardData(prev => ({ ...prev, ...data }));
  };

  const handleCompleteOnboarding = async () => {
    await updateUserOnboardComplete(user.id);
    setUser(prev => ({ 
      ...prev, 
      onboard_complete: true,
      fname: onboardData.fname,
      lname: onboardData.lname,
      full_name: `${onboardData.fname} ${onboardData.lname}`,
      handle: onboardData.handle,
      avatar_path: onboardData.profilePictureUrl ? onboardData.profilePictureUrl : prev.avatar_path,
    }));
    navigate('/');
  }

  return (
    <OnboardContext.Provider value={{ onboardData, updateOnboardData, handleCompleteOnboarding }}>
      {children}
    </OnboardContext.Provider>
  );
};