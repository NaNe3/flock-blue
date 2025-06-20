import { useMemo } from "react";

import FlockAlpha from '../assets/icons/icon-alpha.png';

export default function FlockBlock({
  onClick = () => {},
  color,
  girth
}) {
  const iconContainerStyles = useMemo(() => {
    return {
      width: girth, // Shrink width when scrolled
      height: girth, // Shrink height when scrolled
      borderRadius: Math.floor(girth / 4.5),
      overflow: 'hidden',
      cursor: 'pointer',
    };
  }, []);  

  return (
    <div
      className="flock-block"
      onClick={onClick}
      style={{ ...iconContainerStyles, backgroundColor: color }}
    >
      <img src={FlockAlpha} style={styles.icon} />
    </div>
  );
}

const styles = {
  icon: {
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
}