import { colors } from '../utility/colors';
import { createContext, useContext, useState, useEffect } from 'react';

const HolosContext = createContext();

export const useHolos = () => {
  const context = useContext(HolosContext);
  if (!context) {
    throw new Error('useHolos must be used within a HolosProvider');
  }
  return context;
}

function interpolateColor(color1, color2, factor) {
  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  };

  const rgbToHex = ([r, g, b]) =>
    `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const blendedRgb = rgb1.map((c, i) => Math.round(c + factor * (rgb2[i] - c)));
  return rgbToHex(blendedRgb);
}

export default function HolosProvider({ children }) {
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [nextColorIndex, setNextColorIndex] = useState(1);
  const [blendFactor, setBlendFactor] = useState(0);

  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setBlendFactor((prev) => {
        if (prev >= 1) {
          setCurrentColor(colors[nextColorIndex]);
          setNextColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
          return 0;
        }
        return prev + 0.005;
      });
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [nextColorIndex]);

  const blendedColor = interpolateColor(
    currentColor,
    colors[nextColorIndex],
    blendFactor
  );

  return (
    <HolosContext.Provider value={{ color: blendedColor }}>
      {children}
    </HolosContext.Provider>
  );
}