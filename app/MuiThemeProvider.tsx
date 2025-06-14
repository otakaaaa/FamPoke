'use client'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from '@/lib/theme'

interface MuiThemeProviderProps {
  children: React.ReactNode
}

export default function MuiThemeProvider({ children }: MuiThemeProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}