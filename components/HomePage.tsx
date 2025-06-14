'use client'

import React, { useState, useEffect } from 'react'
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  Fade,
  Zoom,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { Search, TrendingUp, LocationOn, Star } from '@mui/icons-material'
import { useTranslations } from 'next-intl'
import { useAtom } from 'jotai'
import Layout from '@/components/Layout'
import SpotCard from '@/components/SpotCard'
import SpotCardSkeleton from '@/components/SpotCardSkeleton'
import FilterDrawer from '@/components/dialogs/FilterDrawer'
import AddSpotDialog from '@/components/dialogs/AddSpotDialog'
import SpotDetailDialog from '@/components/dialogs/SpotDetailDialog'
import { filtersAtom, searchQueryAtom } from '@/lib/atoms'
import { Spot, mockSpots } from '@/lib/mockData'

export default function HomePage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'))
  const t = useTranslations('HomePage')
  
  const [spots, setSpots] = useState<Spot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null)
  
  const [filters] = useAtom(filtersAtom)
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)

  useEffect(() => {
    fetchSpots()
  }, [filters])

  const fetchSpots = async () => {
    try {
      setLoading(true)
      setError('')

      // Simulate API call with realistic loading time
      await new Promise(resolve => setTimeout(resolve, 1200))

      let filteredSpots = mockSpots.filter(spot => spot.is_visible)

      // Apply filters
      if (filters.category.length > 0) {
        filteredSpots = filteredSpots.filter(spot => 
          filters.category.includes(spot.category)
        )
      }

      if (filters.hasNursingRoom === true) {
        filteredSpots = filteredSpots.filter(spot => spot.has_nursing_room)
      }

      if (filters.hasDiaperSpace === true) {
        filteredSpots = filteredSpots.filter(spot => spot.has_diaper_space)
      }

      if (filters.hasKidsSpace === true) {
        filteredSpots = filteredSpots.filter(spot => spot.has_kids_space)
      }

      if (filters.hasStrollerSpace === true) {
        filteredSpots = filteredSpots.filter(spot => spot.has_stroller_space)
      }

      if (filters.hasSink === true) {
        filteredSpots = filteredSpots.filter(spot => spot.has_sink)
      }

      if (filters.hasDiaperTrash === true) {
        filteredSpots = filteredSpots.filter(spot => spot.has_diaper_trash)
      }

      if (filters.indoor !== null) {
        filteredSpots = filteredSpots.filter(spot => spot.indoor === filters.indoor)
      }

      // Age range filter
      filteredSpots = filteredSpots.filter(spot => 
        spot.target_age_min <= filters.ageRange[1] && 
        spot.target_age_max >= filters.ageRange[0]
      )

      setSpots(filteredSpots)
    } catch (err: any) {
      console.error('Error fetching spots:', err)
      setError(t('fetchError'))
    } finally {
      setLoading(false)
    }
  }

  const handleSpotClick = (spot: Spot) => {
    setSelectedSpot(spot)
    setDetailDialogOpen(true)
  }

  const handleAddSuccess = () => {
    fetchSpots()
  }

  // Filter spots by search query
  const filteredSpots = spots.filter(spot =>
    searchQuery === '' ||
    spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    spot.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Create skeleton items for loading state
  const skeletonItems = Array.from({ length: isMobile ? 2 : 3 }, (_, index) => index)

  return (
    <Layout
      title={t('title')}
      showAddButton
      showFilterButton
      onAddClick={() => setAddDialogOpen(true)}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Hero Section */}
        <Fade in={true} timeout={800}>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                mb: { xs: 1.5, md: 2 },
                lineHeight: { xs: 1.3, md: 1.2 },
                px: { xs: 1, sm: 0 },
              }}
            >
              {t('heroTitleLine1')}
              <br />
              {t('heroTitleLine2')}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                fontWeight: 400,
                maxWidth: { xs: '100%', md: 600 },
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                px: { xs: 2, sm: 0 },
              }}
            >
              {t('heroSubtitle')}
            </Typography>
          </Box>
        </Fade>

        {/* Stats Cards */}
        <Fade in={true} timeout={1000}>
          <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
            <Grid item xs={12} sm={4}>
              <Paper
                className="glass-card"
                sx={{
                  p: { xs: 2, md: 3 },
                  textAlign: 'center',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  borderRadius: { xs: 2, md: 3 },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: { xs: 'none', md: 'translateY(-4px)' },
                    boxShadow: '0 16px 64px rgba(102, 126, 234, 0.2)',
                  },
                }}
              >
                <LocationOn sx={{ fontSize: { xs: 32, md: 40 }, color: '#667eea', mb: 1 }} />
                <Typography variant="h4" sx={{ 
                  fontWeight: 700, 
                  color: '#667eea',
                  fontSize: { xs: '1.75rem', md: '2.125rem' }
                }}>
                  {mockSpots.length}+
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                  {t('statsRegistered')}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper
                className="glass-card"
                sx={{
                  p: { xs: 2, md: 3 },
                  textAlign: 'center',
                  border: '1px solid rgba(240, 147, 251, 0.2)',
                  borderRadius: { xs: 2, md: 3 },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: { xs: 'none', md: 'translateY(-4px)' },
                    boxShadow: '0 16px 64px rgba(240, 147, 251, 0.2)',
                  },
                }}
              >
                <Star sx={{ fontSize: { xs: 32, md: 40 }, color: '#f093fb', mb: 1 }} />
                <Typography variant="h4" sx={{ 
                  fontWeight: 700, 
                  color: '#f093fb',
                  fontSize: { xs: '1.75rem', md: '2.125rem' }
                }}>
                  4.8
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                  {t('statsRating')}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper
                className="glass-card"
                sx={{
                  p: { xs: 2, md: 3 },
                  textAlign: 'center',
                  border: '1px solid rgba(79, 172, 254, 0.2)',
                  borderRadius: { xs: 2, md: 3 },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: { xs: 'none', md: 'translateY(-4px)' },
                    boxShadow: '0 16px 64px rgba(79, 172, 254, 0.2)',
                  },
                }}
              >
                <TrendingUp sx={{ fontSize: { xs: 32, md: 40 }, color: '#4facfe', mb: 1 }} />
                <Typography variant="h4" sx={{ 
                  fontWeight: 700, 
                  color: '#4facfe',
                  fontSize: { xs: '1.75rem', md: '2.125rem' }
                }}>
                  1000+
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                  {t('statsUsers')}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Fade>

        {/* Search Bar */}
        <Zoom in={true} timeout={1200}>
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <TextField
              fullWidth
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#667eea', fontSize: { xs: 20, md: 24 } }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: { xs: 3, md: 4 },
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  border: '2px solid rgba(102, 126, 234, 0.2)',
                  transition: 'all 0.3s ease',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover': {
                    borderColor: 'rgba(102, 126, 234, 0.4)',
                    transform: { xs: 'none', md: 'translateY(-2px)' },
                  },
                  '&.Mui-focused': {
                    borderColor: '#667eea',
                    transform: { xs: 'none', md: 'translateY(-2px)' },
                    boxShadow: 'none',
                  },
                },
                '& .MuiInputBase-input': {
                  py: { xs: 1.5, md: 2 },
                  px: { xs: 1, md: 1.5 },
                  boxShadow: 'none !important',
                },
                '& .MuiInputAdornment-root': {
                  ml: 1,
                },
              }}
            />
          </Box>
        </Zoom>

        {/* Error State */}
        {error && (
          <Fade in={!!error}>
            <Alert 
              severity="error" 
              className="glass"
              sx={{ 
                mb: 3,
                borderRadius: { xs: 2, md: 3 },
                border: '1px solid rgba(245, 87, 108, 0.2)',
                fontSize: { xs: '0.875rem', md: '1rem' },
              }}
            >
              {error}
            </Alert>
          </Fade>
        )}

        {/* Loading State with Beautiful Skeletons */}
        {loading && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 3, md: 4 },
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            {skeletonItems.map((index) => (
              <Box key={`skeleton-${index}`} sx={{ flex: { xs: 'none', md: '0 0 400px' } }}>
                <SpotCardSkeleton index={index} />
              </Box>
            ))}
          </Box>
        )}

        {/* Empty State */}
        {!loading && filteredSpots.length === 0 && (
          <Fade in={true}>
            <Box sx={{ textAlign: 'center', py: { xs: 6, md: 8 } }}>
              <Box
                sx={{
                  width: { xs: 80, md: 120 },
                  height: { xs: 80, md: 120 },
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: { xs: 2, md: 3 },
                  animation: 'float 6s ease-in-out infinite',
                }}
              >
                <Search sx={{ fontSize: { xs: 32, md: 48 }, color: '#667eea', opacity: 0.7 }} />
              </Box>
              <Typography variant="h5" sx={{ 
                mb: 2, 
                fontWeight: 600, 
                color: '#2D3748',
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                px: { xs: 2, md: 0 }
              }}>
              {t('noResultsTitle')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ 
                maxWidth: 400, 
                mx: 'auto',
                fontSize: { xs: '0.875rem', md: '1rem' },
                px: { xs: 2, md: 0 }
              }}>
                {t('noResultsDescription')}
              </Typography>
            </Box>
          </Fade>
        )}

        {/* YouTube Shorts Style Grid */}
        {!loading && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 3, md: 4 },
              justifyContent: 'center',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            {filteredSpots.map((spot, index) => (
              <Box 
                key={spot.id} 
                sx={{ 
                  flex: { xs: 'none', md: '0 0 400px' },
                  maxWidth: { xs: '100%', md: '400px' },
                  width: '100%',
                }}
              >
                <Zoom in={true} timeout={300 + index * 100}>
                  <div>
                    <SpotCard
                      spot={spot}
                      imageUrl={spot.firstImageUrl}
                      onClick={() => handleSpotClick(spot)}
                    />
                  </div>
                </Zoom>
              </Box>
            ))}
          </Box>
        )}

        <FilterDrawer />
        
        <AddSpotDialog
          open={addDialogOpen}
          onClose={() => setAddDialogOpen(false)}
          onSuccess={handleAddSuccess}
        />

        <SpotDetailDialog
          open={detailDialogOpen}
          onClose={() => setDetailDialogOpen(false)}
          spot={selectedSpot}
        />
      </Container>
    </Layout>
  )
}