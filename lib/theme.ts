import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#8fa4f3',
      dark: '#4c63d2',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#f093fb',
      light: '#f5b3fc',
      dark: '#e066f8',
      contrastText: '#FFFFFF',
    },
    background: {
      default: 'transparent',
      paper: 'rgba(255, 255, 255, 0.95)',
    },
    text: {
      primary: '#2D3748',
      secondary: '#4A5568',
    },
    success: {
      main: '#43e97b',
      light: '#6bed92',
      dark: '#2ee065',
    },
    warning: {
      main: '#ffd93d',
      light: '#ffe066',
      dark: '#e6c235',
    },
    error: {
      main: '#f5576c',
      light: '#f7798a',
      dark: '#f03449',
    },
    info: {
      main: '#4facfe',
      light: '#72bdfe',
      dark: '#2d9cfe',
    },
  },
  typography: {
    fontFamily: '"Inter", "Noto Sans JP", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.75rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.4,
      color: '#2D3748',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      color: '#2D3748',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
      color: '#2D3748',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      color: '#4A5568',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: '#4A5568',
      fontWeight: 400,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 20,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0,0,0,0.05)',
    '0 4px 8px rgba(0,0,0,0.08)',
    '0 8px 16px rgba(0,0,0,0.1)',
    '0 12px 24px rgba(0,0,0,0.12)',
    '0 16px 32px rgba(0,0,0,0.15)',
    '0 20px 40px rgba(0,0,0,0.18)',
    '0 24px 48px rgba(0,0,0,0.2)',
    '0 28px 56px rgba(0,0,0,0.22)',
    '0 32px 64px rgba(0,0,0,0.25)',
    '0 36px 72px rgba(0,0,0,0.28)',
    '0 40px 80px rgba(0,0,0,0.3)',
    '0 44px 88px rgba(0,0,0,0.32)',
    '0 48px 96px rgba(0,0,0,0.35)',
    '0 52px 104px rgba(0,0,0,0.38)',
    '0 56px 112px rgba(0,0,0,0.4)',
    '0 60px 120px rgba(0,0,0,0.42)',
    '0 64px 128px rgba(0,0,0,0.45)',
    '0 68px 136px rgba(0,0,0,0.48)',
    '0 72px 144px rgba(0,0,0,0.5)',
    '0 76px 152px rgba(0,0,0,0.52)',
    '0 80px 160px rgba(0,0,0,0.55)',
    '0 84px 168px rgba(0,0,0,0.58)',
    '0 88px 176px rgba(0,0,0,0.6)',
    '0 92px 184px rgba(0,0,0,0.62)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          minHeight: '100vh',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            background: `
              radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
            `,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 24,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 24px 96px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          padding: '12px 32px',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
            transition: 'left 0.6s',
          },
          '&:hover::before': {
            left: '100%',
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            boxShadow: '0 16px 64px rgba(102, 126, 234, 0.4)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderWidth: 2,
          borderColor: 'transparent',
          background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #667eea, #764ba2) border-box',
          '&:hover': {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 500,
          fontSize: '0.875rem',
          height: 32,
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          },
        },
        filled: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          '&:hover': {
            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
            background: 'rgba(255, 255, 255, 0.9)',
            transition: 'all 0.3s ease',
            '& fieldset': {
              borderColor: 'rgba(102, 126, 234, 0.2)',
              borderWidth: 2,
            },
            '&:hover fieldset': {
              borderColor: 'rgba(102, 126, 234, 0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#667eea',
              boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.95)',
          border: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 24,
          boxShadow: '0 24px 96px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.95)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.1)',
            background: 'rgba(102, 126, 234, 0.1)',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#667eea',
            '& + .MuiSwitch-track': {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            },
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '& .MuiSlider-thumb': {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
            '&:hover': {
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
            },
          },
          '& .MuiSlider-track': {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          },
        },
      },
    },
  },
})