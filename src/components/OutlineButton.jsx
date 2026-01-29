import { useMemo, useState } from "react"
import { useTheme } from "../context/ThemeProvider";
import { useFont } from "../context/FontProvider";

export default function OutlineButton({ 
  text, 
  textColor='#fff',
  onClick,
  disabled=false
}) {
  const { theme } = useTheme();
  const { font } = useFont();
  const styles = useMemo(() => style(theme, font), [theme, font]);

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
        color: textColor || theme.actionText,
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

const style = (theme, font) => ({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px 12px',
    cursor: 'pointer',
    color: theme.actionText,
    fontSize: 20,
    ...font.bold,

    borderRadius: 10,
    borderColor: theme.primaryBorder,
    borderStyle: 'solid',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 3,
  },
  pressed: {
    marginTop: 2,
    borderBottomWidth: 1,
  },

  buttonText: {
    fontSize: 12,
    color: theme.actionText,
    ...font.bold,
  }
})