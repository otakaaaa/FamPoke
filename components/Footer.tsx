'use client'

import React from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Stack,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material'
import {
  AutoAwesome,
  LocationOn,
  Email,
  Twitter,
  Instagram,
  Favorite,
  Security,
  Info,
  Help,
  Policy,
  ChildCare,
  Home
} from '@mui/icons-material'
import { useTranslations } from 'next-intl'

interface FooterProps {
  onSearchClick?: () => void
  onAddSpotClick?: () => void
  onHelpClick?: (type: string) => void
}

export default function Footer({ onSearchClick, onAddSpotClick, onHelpClick }: FooterProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const t = useTranslations('Footer')

  const currentYear = new Date().getFullYear()

  const footerLinks = {
    service: [
      {
        label: t('search'),
        onClick: onSearchClick,
        icon: <LocationOn />
      },
      {
        label: t('post'),
        onClick: onAddSpotClick,
        icon: <ChildCare />
      },
    ],
    support: [
      { label: t('help'), onClick: () => onHelpClick?.('help'), icon: <Help /> },
      { label: t('contact'), onClick: () => onHelpClick?.('contact'), icon: <Email /> },
      { label: t('faq'), onClick: () => onHelpClick?.('faq'), icon: <Info /> },
    ],
    legal: [
      { label: t('privacy'), onClick: () => onHelpClick?.('privacy'), icon: <Policy /> },
      { label: t('terms'), onClick: () => onHelpClick?.('terms'), icon: <Security /> },
    ]
  }

  const socialLinks = [
    { icon: <Twitter />, href: '#', label: 'Twitter', color: '#1da1f2' },
    { icon: <Instagram />, href: '#', label: 'Instagram', color: '#e4405f' },
  ]

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        mt: 'auto',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
          `,
          zIndex: 1,
        },
      }}
    >
      {/* Wave Animation */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 25%, #4facfe 50%, #f093fb 75%, #fa709a 100%)',
          backgroundSize: '400% 100%',
          animation: 'shimmer 4s infinite',
          zIndex: 2,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Main Footer Content */}
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {/* Brand Section */}
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: { xs: 3, md: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: { xs: 40, md: 48 },
                      height: { xs: 40, md: 48 },
                      borderRadius: '16px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    <AutoAwesome sx={{ color: 'white', fontSize: { xs: 20, md: 24 } }} />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      color: 'white',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    }}
                  >
                  {t('brandName')}
                  </Typography>
                </Box>
                
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.7,
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    mb: 3,
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  }}
                >
                  {t('brandDescriptionLine1')}
                  {t('brandDescriptionLine2')}
                </Typography>

                {/* Contact Info */}
                <Stack spacing={1.5}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Email sx={{ fontSize: 18, mr: 1.5, color: 'rgba(255, 255, 255, 0.8)' }} />
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      info@childcare-spots.jp
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>

            {/* Service Links */}
            <Grid item xs={12} sm={6} md={2.5}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: { xs: 2, md: 3 },
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  color: 'white',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                }}
              >
                {t('sectionService')}
              </Typography>
              <Stack spacing={1.5}>
                {footerLinks.service.map((link, index) => (
                  <Box
                    key={index}
                    onClick={link.onClick}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: 'white',
                        transform: !isMobile ? 'translateX(4px)' : 'none',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                      },
                    }}
                  >
                    {React.cloneElement(link.icon, { 
                      sx: { fontSize: 16, mr: 1, opacity: 0.8 } 
                    })}
                    {link.label}
                  </Box>
                ))}
              </Stack>
            </Grid>

            {/* Support Links */}
            <Grid item xs={12} sm={6} md={2.5}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: { xs: 2, md: 3 },
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  color: 'white',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                }}
              >
                {t('sectionSupport')}
              </Typography>
              <Stack spacing={1.5}>
                {footerLinks.support.map((link, index) => (
                  <Box
                    key={index}
                    onClick={link.onClick}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: 'white',
                        transform: !isMobile ? 'translateX(4px)' : 'none',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                      },
                    }}
                  >
                    {React.cloneElement(link.icon, { 
                      sx: { fontSize: 16, mr: 1, opacity: 0.8 } 
                    })}
                    {link.label}
                  </Box>
                ))}
              </Stack>
            </Grid>

            {/* Legal Links */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: { xs: 2, md: 3 },
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  color: 'white',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                }}
              >
                {t('sectionLegal')}
              </Typography>
              <Stack spacing={1.5} sx={{ mb: { xs: 3, md: 4 } }}>
                {footerLinks.legal.map((link, index) => (
                  <Box
                    key={index}
                    onClick={link.onClick}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: 'white',
                        transform: !isMobile ? 'translateX(4px)' : 'none',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                      },
                    }}
                  >
                    {React.cloneElement(link.icon, { 
                      sx: { fontSize: 16, mr: 1, opacity: 0.8 } 
                    })}
                    {link.label}
                  </Box>
                ))}
              </Stack>

              {/* Social Media */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  color: 'white',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                }}
              >
                {t('sectionFollow')}
              </Typography>
              <Stack direction="row" spacing={1}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      width: { xs: 40, md: 44 },
                      height: { xs: 40, md: 44 },
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: social.color,
                        transform: !isMobile ? 'translateY(-2px) scale(1.1)' : 'scale(1.05)',
                        boxShadow: `0 8px 32px ${social.color}40`,
                      },
                    }}
                  >
                    {React.cloneElement(social.icon, { 
                      sx: { fontSize: { xs: 18, md: 20 } } 
                    })}
                  </IconButton>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Divider */}
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Bottom Section */}
        <Box
          sx={{
            py: { xs: 3, md: 4 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: { xs: 2, md: 0 },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: { xs: '0.875rem', md: '1rem' },
              textAlign: { xs: 'center', md: 'left' },
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            {t('copyright', { year: currentYear })}
            <Favorite sx={{ fontSize: 16, color: '#ff6b9d', ml: 0.5 }} />
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', md: 'flex-end' },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: { xs: '0.75rem', md: '0.875rem' },
              }}
            >
              {t('madeWith')}
            </Typography>
            <Favorite sx={{ fontSize: 14, color: '#ff6b9d' }} />
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: { xs: '0.75rem', md: '0.875rem' },
              }}
            >
              {t('forFamilies')}
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* Floating Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: { xs: 60, md: 80 },
          height: { xs: 60, md: 80 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite',
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '30%',
          left: '5%',
          width: { xs: 40, md: 60 },
          height: { xs: 40, md: 60 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
          animation: 'float 12s ease-in-out infinite reverse',
          zIndex: 1,
        }}
      />
    </Box>
  )
}