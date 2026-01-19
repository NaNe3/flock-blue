import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import PopupView from "../PopupView";
import TermsPolicy from "../TermsPolicy";

import { removeUserSession } from "../../utility/authenticate";

import { useHolos } from "../../context/HolosProvider";
import { useTheme } from "../../context/ThemeProvider";
import { useFont } from "../../context/FontProvider";

export default function NavigationAccountPopupView({ visible, setVisible }) {
  const { theme } = useTheme();
  const { font } = useFont();
  const styles = useMemo(() => style(theme, font), [theme, font]);

  const navigate = useNavigate();  

  const { setUser } = useHolos();

  const handleNavigate = (path) => {
    navigate(path);
    setVisible(false);
  }

  const handleSignOut = async () => {
    await removeUserSession()
    setUser(null);
  }

  return (
    <PopupView
      visible={visible}
      setVisible={setVisible}
      style={styles.popup}
    >
      <div 
        className="hover-background"
        style={styles.popupRow}
        onClick={() => handleNavigate('/profile') }
      >
        <p style={styles.popupText}>Profile</p>
      </div>
      <div 
        className="hover-background"
        style={styles.popupRow}
        onClick={() => handleNavigate('/account-settings') }
      >
        <p style={styles.popupText}>Account Settings</p>
      </div>
      <div 
        className="hover-background"
        style={styles.popupRow}
        onClick={() => handleNavigate('contact-us') }
      >
        <p style={styles.popupText}>Contact</p>
      </div>
      <div 
        className="hover-background"
        style={{ ... styles.popupRow, borderBottom: '1px solid #333' }}
        onClick={handleSignOut}
      >
        <p style={styles.popupText}>Sign out</p>
      </div>

      <TermsPolicy />
    </PopupView>
  )
}

const style = (theme, font) => ({
  popup: {
    width: 320,    

    bottom: 90,
    left: 20,
  },

  popupRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: '12px 20px',
    cursor: 'pointer',
  },

  popupText: {
    fontSize: 16,
    color: theme.secondaryText,
    ...font.bold
  }
})