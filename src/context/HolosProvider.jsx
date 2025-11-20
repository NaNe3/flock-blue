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

function interpolateColor(color1, color2, factor) {
  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  };

  const rgbToHex = ([r, g, b]) =>
    `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const blendedRgb = rgb1.map((c, i) => Math.round(c + factor * (rgb2[i] - c)));
  return rgbToHex(blendedRgb);
}

export default function HolosProvider({ setCheckingAuthentication, children }) {
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [friends, setFriends] = useState([]);

  // ALL THE COLOR STUFF
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [nextColorIndex, setNextColorIndex] = useState(1);
  const [blendFactor, setBlendFactor] = useState(0);

  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setBlendFactor((prev) => {
        if (prev >= 1) {
          setCurrentColor(colors[nextColorIndex]);
          setNextColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
          return 0;
        }
        return prev + 0.005;
      });
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [nextColorIndex]);

  const blendedColor = interpolateColor(
    currentColor,
    colors[nextColorIndex],
    blendFactor
  );

  // THE AUTHENTICATION STUFF
  const checkAuthentication = async () => {
    const { data: auth, error } = await getAuthenticationStatus();

    if (error || !auth.session) {
      setCheckingAuthentication(false);
    } else {
      const { data, error: userError } = await getUserInformationFromUUID({
        uuid: auth.session.user.id,
      })

      if (!userError && data) {
        setUser(data);
      }
      setCheckingAuthentication(false);
      return { user_id: data.id }
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

  useEffect(() => {
    const init = async () => {
      const { user_id } = await checkAuthentication();

      await loadUserGroups({ user_id });
      await loadUserRelationships({ user_id });
    }
  
    init();
  }, []);

  return (
    <HolosContext.Provider value={{ color: blendedColor, user, setUser, groups, setGroups, friends }}>
      {children}
    </HolosContext.Provider>
  );
}