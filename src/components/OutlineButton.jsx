import { useState } from "react"

export default function OutlineButton({ 
  text, 
  textColor='#fff',
  onClick,
  disabled=false
}) {
  const [isPressed, setIsPressed] = useState(false);
  
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  }

  return (
    <div 
      style={{
        ...styles.button,  
        ...(isPressed && !disabled ? styles.pressed : {}),
        ...(disabled ? { cursor: 'not-allowed', opacity: 0.6, ...styles.pressed } : {}),
        color: textColor || '#fff',
      }}
      onMouseDown={() => setIsPressed(true)} // Set pressed state on mouse down
      onMouseUp={() => setIsPressed(false)} // Reset pressed state on mouse up
      onMouseLeave={() => setIsPressed(false)} // Reset if mouse leaves the button

      onClick={handleClick}
    >
      <p style={styles.buttonText}>{text}</p>
    </div>
  )
}

const styles = {
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px 12px',
    cursor: 'pointer',
    color: '#fff',
    fontSize: 20,

    borderRadius: 12,
    borderColor: '#333',
    border: '1px solid #555',
    borderBottomWidth: 3,
  },
  pressed: {
    marginTop: 2,
    borderBottomWidth: 1,
  },

  buttonText: {
    fontWeight: 800,
    fontSize: 12,
  }
}