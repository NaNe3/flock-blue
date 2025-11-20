import { useEffect } from "react";

export default function PopupView({ 
  children, 
  visible, 
  setVisible,
  style  
}) {
  if (!visible) return null;  

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

  return (
    <div 
      className="popup-view"
      style={{ ...styles.container, ...style }}
    >
      {children && children}
    </div>
  )
}

const styles = {
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 2,

    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    boxShadow: '0px 0px 4px rgba(255, 255, 255, 0.1)',

    overflow: 'hidden',
  }
}