import { useMemo, useState } from "react";

export default function InteractiveLink({
  text,
  color="#0ba3ff",
  onClick,
  disabled=false,
  style={},
}) {
  const [hovering, setHovering] = useState(false)

  const handleMouseEnter = () => {
    if (disabled) return
    setHovering(true)
  }

  const handleMouseLeave = () => {
    setHovering(false)
  }

  const linkStyles = useMemo(() => {
    const addingColor = hovering ? { color } : {}
    const disabledStyles = disabled ? { opacity: 0.5, cursor: '' } : {}
    return {
      ...{
        ...styles.link,
        ...style,
      }, 
      ...addingColor,
      ...disabledStyles,
    }
  }, [hovering, color])

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <p 
      className="interactive-link"
      style={linkStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
      onClick={handleClick}
    >
      {text}
    </p>
  )
}

const styles = {
  link: {
    cursor: 'pointer',
  }
}