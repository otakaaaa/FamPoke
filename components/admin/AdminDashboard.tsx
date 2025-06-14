'use client'

import React, { useState, useEffect } from 'react'
import {
  Container,
  Box,
  Alert,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Fade
} from '@mui/material'
import { Dashboard, LocationOn, RateReview, Settings } from '@mui/icons-material'
import { Spot, SpotReview, mockSpots, mockReviews } from '@/lib/mockData'
import { AdminHeader } from './AdminHeader'
import { AdminStats } from './AdminStats'
import { SpotsManagement } from './SpotsManagement'
import { ReviewsManagement } from './ReviewsManagement'
import { AdminSettings } from './AdminSettings'
import { useTranslations } from 'next-intl'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

export default function AdminDashboard() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const t = useTranslations('AdminDashboard')
  
  const [spots, setSpots] = useState<Spot[]>([])
  const [reviews, setReviews] = useState<SpotReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      setSpots([...mockSpots])
      setReviews([...mockReviews])
    } catch (err: any) {
      console.error('Error fetching data:', err)
      setError(t('errorFetch'))
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const updateSpotVisibility = async (spotId: string, isVisible: boolean) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200))
      setSpots(prev => prev.map(spot =>
        spot.id === spotId ? { ...spot, is_visible: isVisible } : spot
      ))
    } catch (err: any) {
      console.error('Error updating spot visibility:', err)
      setError(t('updateSpotVisibilityError'))
    }
  }

  const updateReviewVisibility = async (reviewId: string, isVisible: boolean) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200))
      setReviews(prev => prev.map(review =>
        review.id === reviewId ? { ...review, is_visible: isVisible } : review
      ))
    } catch (err: any) {
      console.error('Error updating review visibility:', err)
      setError(t('updateReviewVisibilityError'))
    }
  }

  const deleteSpot = async (spotId: string) => {
    if (!confirm(t('confirmDeleteSpot'))) {
      return
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      setSpots(prev => prev.filter(spot => spot.id !== spotId))
    } catch (err: any) {
      console.error('Error deleting spot:', err)
      setError(t('deleteSpotError'))
    }
  }

  const deleteReview = async (reviewId: string) => {
    if (!confirm(t('confirmDeleteReview'))) {
      return
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      setReviews(prev => prev.filter(review => review.id !== reviewId))
    } catch (err: any) {
      console.error('Error deleting review:', err)
      setError(t('deleteReviewError'))
    }
  }

  const tabs = [
    { label: t('tabs.dashboard'), icon: <Dashboard />, value: 0 },
    { label: t('tabs.spots'), icon: <LocationOn />, value: 1 },
    { label: t('tabs.reviews'), icon: <RateReview />, value: 2 },
    { label: t('tabs.settings'), icon: <Settings />, value: 3 },
  ]

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
      {/* Header */}
      <AdminHeader />

      {error && (
        <Fade in={!!error}>
          <Alert 
            severity="error" 
            className="glass"
            sx={{ 
              mb: 3,
              borderRadius: 3,
              border: '1px solid rgba(245, 87, 108, 0.2)',
            }}
          >
            {error}
          </Alert>
        </Fade>
      )}

      {/* Navigation Tabs */}
      <Fade in={true} timeout={800}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant={isMobile ? 'scrollable' : 'standard'}
            scrollButtons={isMobile ? 'auto' : false}
            sx={{
              '& .MuiTab-root': {
                minHeight: { xs: 56, md: 64 },
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '12px 12px 0 0',
                mx: 0.5,
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(102, 126, 234, 0.1)',
                },
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                  color: '#667eea',
                },
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              },
            }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {React.cloneElement(tab.icon, { 
                      sx: { fontSize: { xs: 18, md: 20 } } 
                    })}
                    <span>{tab.label}</span>
                  </Box>
                }
                value={tab.value}
              />
            ))}
          </Tabs>
        </Box>
      </Fade>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        <AdminStats spots={spots} reviews={reviews} loading={loading} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <SpotsManagement
          spots={spots}
          loading={loading}
          onUpdateVisibility={updateSpotVisibility}
          onDelete={deleteSpot}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <ReviewsManagement
          reviews={reviews}
          loading={loading}
          onUpdateVisibility={updateReviewVisibility}
          onDelete={deleteReview}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <AdminSettings />
      </TabPanel>
    </Container>
  )
}