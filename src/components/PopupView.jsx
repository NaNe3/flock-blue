import { useEffect, useMemo } from "react";
import { useTheme } from "../context/ThemeProvider";

export default function PopupView({ 
  children, 
  visible, 
  setVisible,
  style  
}) {
  const { theme } = useTheme();
  const styles = useMemo(() => handleStyle(theme), [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.popup-view') && !event.target.closest('.circle-button')) {
        setVisible(false);
      }
    };

    if (visible) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [visible]);

  if (!visible) return null;  

  return (
    <div 
      className="popup-view"
      style={{ ...styles.container, ...style }}
    >
      {children && children}
    </div>
  )
}

const handleStyle = (theme) => ({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 2,

    backgroundColor: theme.secondaryBackground,
    borderRadius: 10,
    boxShadow: '0px 0px 4px rgba(255, 255, 255, 0.1)',

    overflow: 'hidden',
  }
})
