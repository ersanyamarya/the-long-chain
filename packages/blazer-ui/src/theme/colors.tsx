import { PaletteMode, SimplePaletteColorOptions, TypeBackground } from '@mui/material'

export const primary: SimplePaletteColorOptions = {
  main: '#240B36',
}

export const secondary: SimplePaletteColorOptions = {
  main: '#607196',
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

export const primaryGradient = `linear-gradient(180deg, ${secondary.main} 0%, ${primary.main}  100%)`
