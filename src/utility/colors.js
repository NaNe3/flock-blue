import tinycolor from "tinycolor2";

export const colors = [
  "#0ba3ff",
  "#ff5964",
  "#1dd1a1",
  "#b95cf4",
  "#ff9f1c",
  "#9DC183",
  "#f368e0",
  "#6693F5",
  "#71A6D2",
  "#ff7f50",
]

export const getColoVariety = (color) => {

}

// export const lightenColor = (col, amt) => {
//   let usePound = false;

//   if (col[0] === "#") {
//     col = col.slice(1);
//     usePound = true;
//   }

//   let num = parseInt(col, 16);

//   let r = (num >> 16) + amt;
//   if (r > 255) r = 255;
//   else if (r < 0) r = 0;

//   let g = ((num >> 8) & 0x00ff) + amt;
//   if (g > 255) g = 255;
//   else if (g < 0) g = 0;

//   let b = (num & 0x0000ff) + amt;
//   if (b > 255) b = 255;
//   else if (b < 0) b = 0;

//   return (
//     (usePound ? "#" : "") +
//     ( r.toString(16).padStart(2, "0") +
//       g.toString(16).padStart(2, "0") +
//       b.toString(16).padStart(2, "0"))
//   );
// }

export function lightenColor(color) {
  const baseColor = tinycolor(color);
  const hsl = baseColor.toHsl();
  const luminance = baseColor.getLuminance();

  let newLightness;

  if (luminance < 0.2) {
    // Very dark colors → make very light
    newLightness = 90;
  } else if (luminance < 0.4) {
    // Dark colors → strong lightening
    newLightness = 90;
  } else if (luminance < 0.6) {
    // Medium colors → noticeable lightening
    newLightness = 90;
  } else if (luminance < 0.8) {
    // Light colors → gentle darkening
    newLightness = 45;
  } else {
    // Very light colors → slightly darker, but still soft
    newLightness = 35;
  }

  return tinycolor({ h: hsl.h, s: hsl.s, l: newLightness }).toHexString();
}

export const darkenColor = (col, amt) => {
  let usePound = false;

  if (col[0] === "#") {
  col = col.slice(1);
  usePound = true;
  }

  let num = parseInt(col, 16);

  let r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let g = ((num >> 8) & 0x00ff) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  let b = (num & 0x0000ff) + amt;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  return (
  (usePound ? "#" : "") +
  (r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0"))
  );
}

export const constants = {
  blue: '#0ba3ff',
  lightBlue: '#c9ebff',
  red: '#ff5964',
  lightishRed: '#F88379',
  lightRed: '#ffdcde',
  orange: '#FFBF00',
  darkOrange: '#ff9f1c',
  purple: '#b95cf4',
  green: '#1dd1a1',


  black: '#000000',
  heckaGray: '#333333',
  heckaGray2: '#444444',
  darkGray: '#616161',
  darkishGray: '#999999',
  gray: '#AAAAAA',
  grayStep: '#BBBBBB',
  gray2: '#CCCCCC',
  lightGray: '#D3D3D3',
  lightestGray: '#eeeeee',

  navy: '#002E5D',
  maroon: '#831515',

  primaryColor: '#0ba3ff',
  primaryColorLight: '#c9ebff',
  primaryColorShadow: '#0b4eff',
  primaryColorShadowDisabled: '#70878f',
  primaryColorDisabled: '#c9ebff',
  secondaryColor: '#FFBF00',
  cobalt: '#001839',
}

export const workColors = {
  'Old Testament': { background: constants.black, text: constants.orange },
  'New Testament': { background: constants.black, text: constants.orange },
  'Book Of Mormon': { background: constants.navy, text: constants.orange },
  'Doctrine And Covenants': { background: constants.heckaGray, text: constants.orange },
  'Pearl Of Great Price': { background: constants.maroon, text: constants.orange },
}

export const roleColors = {
  'administrator': '#aaa',
  'acolyte': '#aaa',
  'proctor': '#FF5964',
}