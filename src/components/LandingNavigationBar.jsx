import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home01Icon, LibraryIcon, Notification01Icon, UserMultiple02Icon } from "@hugeicons-pro/core-solid-rounded"
import { HugeiconsIcon } from "@hugeicons/react"

import { useHolos } from "../context/HolosProvider";

import Avatar from "./Avatar";
import FlockBlock from "./FlockBlock";
import NavigationAccountPopupView from "./Landing/NavigationAccountPopupView";
import { constants } from "../utility/colors";

export default function LandingNavigationBar() {
  const navigate = useNavigate();
  const { user, groups } = useHolos();

  const [showPopup, setShowPopup] = useState(false);
  
  const handleNavigate = (path) => {
    navigate(path);
  }

  return (
    <div style={styles.container}>
      <div style={styles.itemContainer}>
        <div 
          style={{ marginBottom: 10 }}
          onClick={() => handleNavigate('/')}
        >
          <FlockBlock
            girth={36}
            color={constants.blue}
          />
        </div>
        <div 
          className="circle-button"
          onClick={() => handleNavigate('/')}
        >
          <HugeiconsIcon
            icon={Home01Icon}
            size={26}
            color="#ccc"
          />
        </div>
        <div 
          className="circle-button"
          onClick={() => handleNavigate('/social')}
        >
          <HugeiconsIcon
            icon={UserMultiple02Icon}
            size={26}
            color="#ccc"
          />
        </div>
        <div 
          className="circle-button"
          onClick={() => handleNavigate('/library')}
        >
          <HugeiconsIcon
            icon={LibraryIcon}
            size={26}
            color="#ccc"
          />
        </div>
      </div>
      <div 
        className="circle-button"
        onClick={() => {
          setShowPopup(!showPopup);
        }}
      >
        <Avatar
          imagePath={user ? user.avatar_path : null}
          style={styles.avatar}
        />
      </div>

      <NavigationAccountPopupView 
        visible={showPopup} 
        setVisible={setShowPopup} 
      />
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: '30px 0px',
  },
  itemContainer: {
    width: 50,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',

    alignItems: 'center',
    gap: '10px',

    padding: '10px 0',
  },

  accountContainer: {
    backgroundColor: '#F22',
  },
  avatar: {
    width: 32,
    height: 32,

    cursor: 'pointer',
  },
}
