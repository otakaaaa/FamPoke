'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Fab,
  Zoom
} from '@mui/material'
import { Add, Search, Menu, AutoAwesome } from '@mui/icons-material'
import { useAtom } from 'jotai'
import { isFilterDrawerOpenAtom, searchQueryAtom } from '@/lib/atoms'
import Footer from '@/components/Footer'
import HelpDialog from '@/components/dialogs/HelpDialog'
import ContactDialog from '@/components/dialogs/ContactDialog'
import FaqDialog from '@/components/dialogs/FaqDialog'
import PrivacyDialog from '@/components/dialogs/PrivacyDialog'
import TermsDialog from '@/components/dialogs/TermsDialog'

interface LayoutProps {
  children: React.ReactNode
  title?: string
  showAddButton?: boolean
  showFilterButton?: boolean
  onAddClick?: () => void
}

export default function Layout({
  children,
  title = 'Childcare Finder',
  showAddButton = false,
  showFilterButton = false,
  onAddClick
}: LayoutProps) {
  const t = useTranslations('Layout')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [, setIsFilterDrawerOpen] = useAtom(isFilterDrawerOpenAtom)
  const [, setSearchQuery] = useAtom(searchQueryAtom)
  const [isMounted, setIsMounted] = useState(false)
  
  // Dialog states
  const [helpDialogOpen, setHelpDialogOpen] = useState(false)
  const [contactDialogOpen, setContactDialogOpen] = useState(false)
  const [faqDialogOpen, setFaqDialogOpen] = useState(false)
  const [privacyDialogOpen, setPrivacyDialogOpen] = useState(false)
  const [termsDialogOpen, setTermsDialogOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSearchClick = () => {
    // Focus on search input by scrolling to it and clearing any existing query
    setSearchQuery('')
    const searchInput = document.querySelector('input[placeholder*="施設名や住所で検索"]') as HTMLInputElement
    if (searchInput) {
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => {
        searchInput.focus()
      }, 500)
    }
  }

  const handleHelpClick = (type: string) => {
    switch (type) {
      case 'help':
        setHelpDialogOpen(true)
        break
      case 'contact':
        setContactDialogOpen(true)
        break
      case 'faq':
        setFaqDialogOpen(true)
        break
      case 'privacy':
        setPrivacyDialogOpen(true)
        break
      case 'terms':
        setTermsDialogOpen(true)
        break
      default:
        console.log(`Help type: ${type}`)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Animated Background */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -2,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}
      />
      
      {/* Floating Orbs Background */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: { xs: '200px', md: '300px' },
            height: { xs: '200px', md: '300px' },
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 20s ease-in-out infinite',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            width: { xs: '250px', md: '400px' },
            height: { xs: '250px', md: '400px' },
            background: 'radial-gradient(circle, rgba(240, 147, 251, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 25s ease-in-out infinite reverse',
          },
        }}
      />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <AppBar 
          position="sticky" 
          elevation={0}
          className="glass"
          sx={{
            border: 'none',
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Toolbar sx={{ py: { xs: 0.5, md: 1 }, px: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Box
                sx={{
                  width: { xs: 32, md: 40 },
                  height: { xs: 32, md: 40 },
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: { xs: 1.5, md: 2 },
                  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                  animation: 'pulse-glow 2s ease-in-out infinite',
                }}
              >
                <AutoAwesome sx={{ color: 'white', fontSize: { xs: 16, md: 20 } }} />
              </Box>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 700,
                  fontSize: { xs: '1.1rem', md: '1.5rem' },
                  letterSpacing: '-0.02em',
                }}
              >
                {isMobile ? t('shortTitle') : title}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: { xs: 0.5, md: 1 } }}>
              {showFilterButton && (
                <IconButton
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="glass"
                  sx={{
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                    borderRadius: '12px',
                    width: { xs: 36, md: 40 },
                    height: { xs: 36, md: 40 },
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(102, 126, 234, 0.2)',
                      transform: !isMobile ? 'scale(1.05)' : 'scale(1)',
                    },
                  }}
                >
                  <Search sx={{ color: '#667eea', fontSize: { xs: 18, md: 20 } }} />
                </IconButton>
              )}

              {showAddButton && !isMobile && (
                <IconButton
                  onClick={onAddClick}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    borderRadius: '12px',
                    width: { xs: 36, md: 40 },
                    height: { xs: 36, md: 40 },
                    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                      transform: 'scale(1.05)',
                      boxShadow: '0 12px 48px rgba(102, 126, 234, 0.4)',
                    },
                  }}
                >
                  <Add sx={{ fontSize: { xs: 18, md: 20 } }} />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 }, position: 'relative', flex: 1 }}>
            {children}
          </Container>

          <Footer 
            onSearchClick={handleSearchClick}
            onAddSpotClick={onAddClick}
            onHelpClick={handleHelpClick}
          />
        </Box>

        {/* Floating Action Button for Mobile */}
        {showAddButton && isMounted && isMobile && (
          <Zoom in={true}>
            <Fab
              onClick={onAddClick}
              sx={{
                position: 'fixed',
                bottom: { xs: 20, md: 24 },
                right: { xs: 20, md: 24 },
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                width: { xs: 56, md: 64 },
                height: { xs: 56, md: 64 },
                boxShadow: '0 16px 64px rgba(102, 126, 234, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                  transform: 'scale(1.1)',
                },
              }}
            >
              <Add sx={{ fontSize: { xs: 24, md: 28 } }} />
            </Fab>
          </Zoom>
        )}
      </Box>

      {/* Help Dialogs */}
      <HelpDialog
        open={helpDialogOpen}
        onClose={() => setHelpDialogOpen(false)}
      />
      
      <ContactDialog
        open={contactDialogOpen}
        onClose={() => setContactDialogOpen(false)}
      />
      
      <FaqDialog
        open={faqDialogOpen}
        onClose={() => setFaqDialogOpen(false)}
      />
      
      <PrivacyDialog
        open={privacyDialogOpen}
        onClose={() => setPrivacyDialogOpen(false)}
      />
      
      <TermsDialog
        open={termsDialogOpen}
        onClose={() => setTermsDialogOpen(false)}
      />

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(120deg); }
          66% { transform: translateY(-15px) rotate(240deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
          }
          50% { 
            box-shadow: 0 8px 32px rgba(102, 126, 234, 0.6);
          }
        }
      `}</style>
    </Box>
  )
}