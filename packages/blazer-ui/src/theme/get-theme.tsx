import { createTheme, PaletteMode, responsiveFontSizes, Theme } from '@mui/material'
import type {} from '@mui/x-data-grid/themeAugmentation'
import DosisBold from '../assets/fonts/DosisBold.ttf'
import DosisLight from '../assets/fonts/DosisLight.ttf'
import DosisMedium from '../assets/fonts/DosisMedium.ttf'
import DosisRegular from '../assets/fonts/DosisRegular.ttf'
import { background, error, info, primary, primaryGradient, secondary, success, warning } from './colors'
const fontFamily = [
  'Dosis',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(',')
const getTheme = (mode: PaletteMode): Theme => {
  let theme = responsiveFontSizes(
    createTheme({
      palette: {
        mode,
        primary,
        secondary,
        background: background(mode),
        success,
        error,
        warning,
        info,
      },
      typography: {
        fontSize: 14,
        fontFamily,
      },
    })
  )
  theme = createTheme(theme, {
    shadows: {
      ...theme.shadows,
      2: '0px 8px 20px 0px rgba(0, 0, 0, 0.15)',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: `
    @font-face {
      font-family: 'Dosis';
      font-weight: 100 300;
      font-display: swap;
      font-style: normal;
      font-named-instance: 'Light';
      src: url(${DosisLight}) format("truetype");
      unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
    }

    @font-face {
      font-family: 'Dosis';
      font-weight: 400;
      font-display: swap;
      font-style: normal;
      font-named-instance: 'Regular';
      src: url(${DosisRegular}) format("truetype");
      unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
    }

    @font-face {
      font-family: 'Dosis';
      font-weight: 500;
      font-display: swap;
      font-style: normal;
      font-named-instance: 'Medium';
      src: url(${DosisMedium}) format("truetype");
      unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
    }

      @font-face {
      font-family: 'Dosis';
      font-weight: 600 700;
      font-display: swap;
      font-style: normal;
      font-named-instance: 'Bold';
      src: url(${DosisBold}) format("truetype");
      unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
    }

    a{
      text-decoration: none;
      color: inherit;
      color: ${theme.palette.secondary.dark};
    }
`,
        },
      },
      MuiButton: {
        styleOverrides: {
          // for different sizes
          root: {
            padding: '0.4rem 2rem',
            borderRadius: '0.4rem',
            textTransform: 'none',
            width: 'fit-content',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            padding: '0.4rem',
            borderRadius: '0.4rem',
            width: 'fit-content',
          },
        },
      },
      MuiFab: {
        defaultProps: {
          color: 'primary',
        },
        styleOverrides: {
          root: {
            padding: '0.4rem 1.8rem 0.4rem 1rem',
            borderRadius: '0.4rem',
            fontWeight: 500,
          },
        },
      },
      MuiAppBar: {
        defaultProps: {
          color: 'transparent',
          position: 'static',
        },
        styleOverrides: {
          root: {
            background: primaryGradient,
            height: '64px',
            lineHeight: '64px',
          },
        },
      },
      MuiToolbar: {
        defaultProps: {
          variant: 'regular',
        },
        styleOverrides: {
          root: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: '1rem',
            alignItems: 'center',
            height: '64px',
            lineHeight: '64px',
            padding: '0.95rem',
          },
        },
      },
      MuiDrawer: {
        defaultProps: {
          variant: 'persistent',
          anchor: 'left',
          color: 'primary',
        },
        styleOverrides: {
          root: {
            width: '100%',
            height: '100%',
            flexShrink: 0,
            alignItems: 'center',
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
          },
          paper: {
            // padding: '1rem 0',
            width: 'inherit',
            height: 'inherit',
            background: primaryGradient,
            color: '#fff',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            // fontSize: '1.2rem',
            fontWeight: 600,
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            // fontSize: '1.2rem',
            '& .MuiInputBase-input': {
              display: 'flex',
              alignItems: 'center',
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
          InputLabelProps: {
            shrink: true,
          },
        },
        styleOverrides: {
          root: {
            marginTop: '1rem',
          },
        },
      },
      MuiTabs: {
        defaultProps: {
          variant: 'fullWidth',
          textColor: 'primary',
          indicatorColor: 'primary',
        },
        styleOverrides: {
          root: {
            minWidth: 'unset',
            minHeight: 'unset',
            borderTop: `1px solid ${theme.palette.grey[200]}`,
            borderBottom: `1px solid ${theme.palette.grey[200]}}`,
          },
          indicator: {
            display: 'none',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            minWidth: 'unset',
            minHeight: 'unset',
            '&:not(:last-child):after': {
              content: '" "',
              position: 'absolute',
              right: 0,
              top: '12%',
              height: '76%',
              borderRight: `1px solid ${theme.palette.grey[200]}}`,
            },
            '&.Mui-selected': {
              color: theme.palette.secondary.main,
              fontWeight: 600,
            },
          },
        },
      },
      MuiDataGrid: {
        defaultProps: {
          autoHeight: true,
          initialState: {
            pagination: {
              paginationModel: {
                pageSize: 10,
                page: 0,
              },
            },
          },
          pageSizeOptions: [10, 15, 20, 25, 30, 35, 40, 45, 50],
          checkboxSelection: true,
          disableRowSelectionOnClick: true,
          // density: 'compact',
          disableColumnMenu: true,
          disableColumnSelector: true,
          showCellVerticalBorder: true,
          showColumnVerticalBorder: true,
        },
        styleOverrides: {
          root: {},
          columnHeader: {
            backgroundColor: theme.palette.secondary.light.replace('rgb', 'rgba').replace(')', ', 0.2)'),
            textTransform: 'uppercase',
          },
        },
      },
    },
  })
  return theme
}

export { fontFamily, getTheme, primaryGradient }
