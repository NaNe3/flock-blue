import { constants } from './colors';

export const light = {
  primaryBackground: '#ffffff', 
  secondaryBackground: '#eeeeee',
  tertiaryBackground: '#eeeeee',

  contrast: '#e2e2e2',
  contrastSecondary: '#D3D3D3',

  primaryText: '#000000',
  secondaryText: '#999999',
  tertiaryText: '#B3B3B3',
  actionText: '#616161',
  oppositeText: '#ffffff',

  primaryBorder: '#D3D3D3',
  shadowColor: '#000000',

  navigationSelected: '#444444',
  navigationUnselected: '#BBBBBB',

  mediaSeen: '#D3D3D3',
  mediaUnseen: '#999999',
  modalPrimary: '#ffffff',
  modalContrast: '#eeeeee',
}

export const dark = {
  primaryBackground: '#2A2A2A',
  secondaryBackground: '#1a1a1a',
  tertiaryBackground: '#616161',

  contrast: '#444444',
  contrastSecondary: '#111111',

  primaryText: '#ffffff',
  secondaryText: '#D3D3D3',
  tertiaryText: '#999999',
  actionText: '#ffffff',
  oppositeText: '#ffffff',

  primaryBorder: '#555555',
  shadowColor: '#000000',

  navigationSelected: '#ffffff',
  navigationUnselected: '#999999',

  mediaSeen: '#555555',
  mediaUnseen: '#D3D3D3',
  modalPrimary: '#2A2A2A',
  modalContrast: "#1a1a1a",
}

export const cobalt = {
  primaryBackground: '#0f2448', 
  secondaryBackground: '#001026',
  tertiaryBackground: '#002e6d',

  contrast: '#002e6d',
  contrastSecondary: '#00060e',

  primaryText: '#ffffff',
  secondaryText: '#BFD1E5',
  tertiaryText: '#c9d7e1',
  actionText: '#ffffff',
  oppositeText: '#ffffff',

  primaryBorder: '#557C99',
  shadowColor: '#001026',

  navigationSelected: '#BFD1E5',
  navigationUnselected: '#557C99',

  mediaSeen: '#555555',
  mediaUnseen: '#D3D3D3',
  modalPrimary: '#0f2448',
  modalContrast: '#001026',
}

export const sepia = {
  primaryBackground: '#f5e2cb',
  secondaryBackground: '#eecba1', 
  tertiaryBackground: '#e5b171',

  contrast: '#eecba1',
  contrastSecondary: '#ca9553',

  primaryText: '#372309',
  secondaryText: '#603d11',
  tertiaryText: '#b27120',
  actionText: '#7b4e17',
  oppositeText: '#7b4e17',

  primaryBorder: '#7b4e17',
  shadowColor: '#000000',

  navigationSelected: '#7b4e17',
  navigationUnselected: '#cf8325',

  mediaSeen: '#555555',
  mediaUnseen: '#D3D3D3',
  modalPrimary: '#f5e2cb',
  modalContrast: '#eecba1',
}

export const onyx = {
  primaryBackground: '#000000', 
  secondaryBackground: '#1e1e1e',
  tertiaryBackground: '#292929',

  contrast: '#333333',
  contrastSecondary: '#111111',

  primaryText: '#ffffff',
  secondaryText: '#D3D3D3',
  tertiaryText: '#999999',
  actionText: '#ffffff',
  oppositeText: '#ffffff',

  primaryBorder: '#555555',
  shadowColor: '#000000',

  navigationSelected: '#ffffff',
  navigationUnselected: '#999999',

  mediaSeen: '#555555',
  mediaUnseen: '#D3D3D3',
  modalPrimary: '#272727',
  modalContrast: '#000000',
}

export const themes = {
  'light': {...light, ...constants},
  'dark': {...dark, ...constants},
  'cobalt': {...cobalt, ...constants},
  'onyx': {...onyx, ...constants},
  'sepia': {...sepia, ...constants},
}