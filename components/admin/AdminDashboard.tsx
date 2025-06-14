'use client'

import React, { useState } from 'react'
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
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

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
  
  const queryClient = useQueryClient()
  const { data, isLoading: loading, error } = useQuery({
    queryKey: ['admin-data'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 800))
      return { spots: [...mockSpots], reviews: [...mockReviews] }
    }
  })
  const spots = data?.spots ?? []
  const reviews = data?.reviews ?? []
  const [tabValue, setTabValue] = useState(0)
  const [mutationError, setMutationError] = useState('')

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const updateSpotVisibility = useMutation({
    mutationFn: async ({ spotId, isVisible }: { spotId: string; isVisible: boolean }) => {
      await new Promise(resolve => setTimeout(resolve, 200))
      return { spotId, isVisible }
    },
    onSuccess: ({ spotId, isVisible }) => {
      queryClient.setQueryData(['admin-data'], (old: any) => {
        if (!old) return old
        return {
          ...old,
          spots: old.spots.map((s: Spot) =>
            s.id === spotId ? { ...s, is_visible: isVisible } : s
          )
        }
      })
    },
    onError: () => setMutationError('施設の公開状態の更新に失敗しました')
  }).mutate

  const updateReviewVisibility = useMutation({
    mutationFn: async ({ reviewId, isVisible }: { reviewId: string; isVisible: boolean }) => {
      await new Promise(resolve => setTimeout(resolve, 200))
      return { reviewId, isVisible }
    },
    onSuccess: ({ reviewId, isVisible }) => {
      queryClient.setQueryData(['admin-data'], (old: any) => {
        if (!old) return old
        return {
          ...old,
          reviews: old.reviews.map((r: SpotReview) =>
            r.id === reviewId ? { ...r, is_visible: isVisible } : r
          )
        }
      })
    },
    onError: () => setMutationError('レビューの公開状態の更新に失敗しました')
  }).mutate

  const deleteSpot = useMutation({
    mutationFn: async (spotId: string) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return spotId
    },
    onSuccess: (spotId) => {
      queryClient.setQueryData(['admin-data'], (old: any) => {
        if (!old) return old
        return {
          ...old,
          spots: old.spots.filter((s: Spot) => s.id !== spotId)
        }
      })
    },
    onError: () => setMutationError('施設の削除に失敗しました')
  }).mutate

  const deleteReview = useMutation({
    mutationFn: async (reviewId: string) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return reviewId
    },
    onSuccess: (reviewId) => {
      queryClient.setQueryData(['admin-data'], (old: any) => {
        if (!old) return old
        return {
          ...old,
          reviews: old.reviews.filter((r: SpotReview) => r.id !== reviewId)
        }
      })
    },
    onError: () => setMutationError('レビューの削除に失敗しました')
  }).mutate

  const tabs = [
    { label: 'ダッシュボード', icon: <Dashboard />, value: 0 },
    { label: '施設管理', icon: <LocationOn />, value: 1 },
    { label: 'レビュー管理', icon: <RateReview />, value: 2 },
    { label: '設定', icon: <Settings />, value: 3 },
  ]

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
      {/* Header */}
      <AdminHeader />

      {(error || mutationError) && (
        <Fade in={!!(error || mutationError)}>
          <Alert
            severity="error"
            className="glass"
            sx={{
              mb: 3,
              borderRadius: 3,
              border: '1px solid rgba(245, 87, 108, 0.2)',
            }}
          >
            {error ? 'データの取得に失敗しました' : mutationError}
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