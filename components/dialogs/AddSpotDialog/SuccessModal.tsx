'use client'

import React from 'react'
import {
  Dialog,
  Box,
  Typography,
  Button,
  IconButton,
  Fade,
  Zoom,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { Close, Celebration } from '@mui/icons-material'
import { SuccessModalProps } from './types'

export function SuccessModal({ open, onClose, title, message }: SuccessModalProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className: 'glass',
        sx: {
          borderRadius: 4,
          textAlign: 'center',
          overflow: 'hidden',
        }
      }}
    >
      <Box sx={{ position: 'relative', p: { xs: 3, md: 4 } }}>
        {/* Success Animation Background */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
            animation: 'shimmer 2s infinite',
          }}
        />

        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'rgba(67, 233, 123, 0.1)',
            color: '#43e97b',
            '&:hover': {
              background: 'rgba(67, 233, 123, 0.2)',
            },
          }}
        >
          <Close />
        </IconButton>

        {/* Success Icon */}
        <Zoom in={open} timeout={500}>
          <Box
            sx={{
              width: { xs: 80, md: 100 },
              height: { xs: 80, md: 100 },
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              boxShadow: '0 16px 64px rgba(67, 233, 123, 0.4)',
              animation: 'pulse-glow 2s ease-in-out infinite',
            }}
          >
            <Celebration sx={{ 
              color: 'white', 
              fontSize: { xs: 40, md: 50 },
              animation: 'float 3s ease-in-out infinite'
            }} />
          </Box>
        </Zoom>

        {/* Title */}
        <Fade in={open} timeout={800}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 800,
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
        </Fade>

        {/* Message */}
        <Fade in={open} timeout={1000}>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.6,
              mb: 4,
              maxWidth: 400,
              mx: 'auto',
            }}
          >
            {message}
          </Typography>
        </Fade>

        {/* Action Button */}
        <Fade in={open} timeout={1200}>
          <Button
            onClick={onClose}
            variant="contained"
            size="large"
            sx={{
              borderRadius: 3,
              px: { xs: 4, md: 6 },
              py: { xs: 1.5, md: 2 },
              fontSize: { xs: '1rem', md: '1.125rem' },
              fontWeight: 700,
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              boxShadow: '0 8px 32px rgba(67, 233, 123, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #3dd46f 0%, #2ee6cb 100%)',
                transform: !isMobile ? 'translateY(-2px)' : 'none',
                boxShadow: '0 12px 48px rgba(67, 233, 123, 0.4)',
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
            }}
          >
            OK
          </Button>
        </Fade>
      </Box>
    </Dialog>
  )
}