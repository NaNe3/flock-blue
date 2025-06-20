import { useMemo, useState } from "react"
import { darkenColor } from "../utility/colors";

export default function BasicButton({ 
  text, 
  color="#0ba3ff",
  onClick 
}) {
  const [isPressed, setIsPressed] = useState(false);
  
  const colors = useMemo(() => {
    return {
      backgroundColor: color,
      borderColor: darkenColor(color, -40),
    }
  })

  return (
    <div 
      style={{
        ...styles.button,  
        backgroundColor: colors.backgroundColor,
        borderBottomColor: colors.borderColor,
        ...(isPressed ? styles.pressed : {}),
      }}
      onMouseDown={() => setIsPressed(true)} // Set pressed state on mouse down
      onMouseUp={() => setIsPressed(false)} // Reset pressed state on mouse up
      onMouseLeave={() => setIsPressed(false)} // Reset if mouse leaves the button

      onClick={onClick}
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
    backgroundColor: 'red',
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