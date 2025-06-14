'use client'

import React from 'react'
import {
  Box,
  Typography,
  Fade,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { Dashboard } from '@mui/icons-material'
import { useTranslations } from 'next-intl'

interface AdminHeaderProps {
  title?: string
  subtitle?: string
}

export function AdminHeader({
  title,
  subtitle
}: AdminHeaderProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const t = useTranslations('AdminHeader')
  const headerTitle = title ?? t('title')
  const headerSubtitle = subtitle ?? t('subtitle')

  return (
    <Fade in={true} timeout={600}>
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              width: { xs: 48, md: 56 },
              height: { xs: 48, md: 56 },
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
            }}
          >
            <Dashboard sx={{ color: 'white', fontSize: { xs: 24, md: 28 } }} />
          </Box>
          <Box>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 800,
                fontSize: { xs: '1.75rem', md: '2.125rem' },
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                mb: 0.5,
              }}
            >
              {headerTitle}
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.secondary',
                fontSize: { xs: '0.875rem', md: '1rem' }
              }}
            >
              {headerSubtitle}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Fade>
  )
}