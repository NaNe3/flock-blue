import { useMemo, useState } from "react"
import { darkenColor } from "../utility/colors";

export default function BasicButton({ 
  text, 
  color="#0ba3ff",
  onClick,
  style,
  disabled=false
}) {
  const [isPressed, setIsPressed] = useState(false);
  
  const colors = useMemo(() => {
    return {
      backgroundColor: color,
      borderColor: darkenColor(color, -40),
    }
  })

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  }

  return (
    <div 
      style={{
        ...styles.button,  
        backgroundColor: colors.backgroundColor,
        borderBottomColor: colors.borderColor,
        ...(isPressed && !disabled ? styles.pressed : {}),
        ...(disabled ? { cursor: 'not-allowed', opacity: 0.6 } : {}),
        ...(style || {}),
      }}
      onMouseDown={() => setIsPressed(true)} // Set pressed state on mouse down
      onMouseUp={() => setIsPressed(false)} // Reset pressed state on mouse up
      onMouseLeave={() => setIsPressed(false)} // Reset if mouse leaves the button

      onClick={handleClick}
    >
      <p>{text}</p>
    </div>
  )
}

const styles = {
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '14px 30px',
    borderRadius: 15,
    cursor: 'pointer',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    userSelect: 'none',

    borderBottomWidth: 4,
    borderBottomStyle: 'solid',
  },
  pressed: {
    marginTop: 3,
    borderBottomWidth: 1,
  }
}