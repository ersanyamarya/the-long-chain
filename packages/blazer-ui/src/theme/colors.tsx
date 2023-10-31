import { PaletteMode, SimplePaletteColorOptions, TypeBackground } from '@mui/material'

export const primary: SimplePaletteColorOptions = {
  main: '#FDA535',
}

export const secondary: SimplePaletteColorOptions = {
  main: '#FC5B3D',
}

export const success: SimplePaletteColorOptions = {
  main: '#0FF4C6',
}

export const error: SimplePaletteColorOptions = {
  main: '#FF5964',
}

export const warning: SimplePaletteColorOptions = {
  main: '#FFB140',
}

export const info: SimplePaletteColorOptions = {
  main: '#006BA6',
}

// background
export const background = (mode: PaletteMode): TypeBackground => {
  switch (mode) {
    case 'dark':
      return {
        default: '#121212',
        paper: '#1c1c1c',
      }
    case 'light':
    default:
      return {
        default: '#f1eff2',
        paper: '#fcfcfc',
      }
  }
}

export const primaryGradient = `linear-gradient(180deg, ${primary.main} -67.73%, ${secondary.main}  133.92%)`
