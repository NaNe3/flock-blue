import { useNavigate } from 'react-router-dom';
import { getAuthenticationStatus, getUserInformationFromUUID, removeUserSession } from '../utility/authenticate';
import { colors } from '../utility/colors';
import { createContext, useContext, useState, useEffect } from 'react';
import { getUserGroupsByUserId } from '../utility/db-groups';
import { getUserRelationships } from '../utility/db-relationship';

const HolosContext = createContext();

export const useHolos = () => {
  return useContext(HolosContext);
}

export default function HolosProvider({ setCheckingAuthentication, children }) {
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [friends, setFriends] = useState([]);

  // THE AUTHENTICATION STUFF
  const checkAuthentication = async () => {
    const { data: auth, error } = await getAuthenticationStatus();

    if (error || !auth.session) {
      setCheckingAuthentication(false);
      return null
    } else {
      const { data, error: userError } = await getUserInformationFromUUID({
        uuid: auth.session.user.id,
      })

      if (!userError && data) {
        setUser(data);
      }
      setCheckingAuthentication(false);
      return data.id
    }
  }

  const loadUserGroups = async ({ user_id }) => {
    const { data, error} = await getUserGroupsByUserId({ user_id });

    if (!error && data) {
      setGroups(data);
    }
  }

  const loadUserRelationships = async ({ user_id }) => {
    const { data, error} = await getUserRelationships({ user_id });

    if (!error && data) {
      setFriends(data);
    }
  }

  const getInitialUserInformation = async ({ user_id }) => {
    await loadUserGroups({ user_id });
    await loadUserRelationships({ user_id });
  }

  useEffect(() => {
    const init = async () => {
      const user_id = await checkAuthentication();
      if (user_id) {
        await getInitialUserInformation({ user_id });
      }
    }
  
    init();
  }, []);

  return (
    <HolosContext.Provider value={{ color: user?.color_id?.color_hex ?? '#0ba3ff', user, setUser, groups, setGroups, friends, getInitialUserInformation }}>
      {children}
    </HolosContext.Provider>
  );
}