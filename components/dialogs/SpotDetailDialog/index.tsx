'use client'

import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { Spot, SpotReview, mockReviews } from '@/lib/mockData'
import { SpotInfo } from './SpotInfo'
import { ImageGallery } from './ImageGallery'
import { CommentSection } from './CommentSection'

interface SpotDetailDialogProps {
  open: boolean
  onClose: () => void
  spot: Spot | null
}

export default function SpotDetailDialog({ open, onClose, spot }: SpotDetailDialogProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [reviews, setReviews] = useState<SpotReview[]>([])

  useEffect(() => {
    if (spot && open) {
      // Filter reviews for this spot
      const spotReviews = mockReviews.filter(review => 
        review.spot_id === spot.id && review.is_visible
      )
      setReviews(spotReviews)
    }
  }, [spot, open])

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      park: '公園',
      cafe: 'カフェ',
      center: '児童館',
      mall: 'ショッピングモール',
      library: '図書館',
      other: 'その他'
    }
    return labels[category] || category
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      park: '#43e97b',
      cafe: '#fa709a',
      center: '#667eea',
      mall: '#f093fb',
      library: '#4facfe',
      other: '#a8edea'
    }
    return colors[category] || colors.other
  }

  if (!spot) return null

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        className: 'glass',
        sx: {
          borderRadius: isMobile ? 0 : 4,
          maxHeight: isMobile ? '100vh' : '90vh',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        pb: 1,
        borderBottom: '1px solid rgba(102, 126, 234, 0.1)',
      }}>
        <Typography variant="h6" component="span" sx={{ fontWeight: 700 }}>
          {spot.name}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ px: { xs: 2, md: 3 }, py: 2 }}>
        <Box sx={{ mb: 3 }}>
          {/* Category and Type Tags */}
          <Box sx={{ 
            mt: { xs: 3, md: 4 },
            mb: { xs: 3, md: 4 } 
          }}>
            <Stack 
              direction={{ xs: 'row', sm: 'row' }} 
              spacing={{ xs: 1, md: 1.5 }}
              sx={{ 
                alignItems: 'center',
                justifyContent: { xs: 'flex-start', sm: 'flex-start' },
                flexWrap: 'wrap',
                gap: { xs: 1, md: 1.5 }
              }}
            >
              <Chip 
                label={getCategoryLabel(spot.category)} 
                sx={{
                  background: `linear-gradient(135deg, ${getCategoryColor(spot.category)} 0%, ${getCategoryColor(spot.category)}dd 100%)`,
                  color: 'white',
                  fontWeight: 700,
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  height: { xs: 36, md: 40 },
                  px: { xs: 1, md: 1.5 },
                  boxShadow: `0 4px 16px ${getCategoryColor(spot.category)}40`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: !isMobile ? 'translateY(-2px)' : 'none',
                    boxShadow: `0 8px 32px ${getCategoryColor(spot.category)}50`,
                  },
                }}
              />
              <Chip 
                label={spot.indoor ? '屋内' : '屋外'} 
                variant="outlined"
                sx={{
                  borderColor: spot.indoor ? '#4facfe' : '#43e97b',
                  color: spot.indoor ? '#4facfe' : '#43e97b',
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  height: { xs: 36, md: 40 },
                  px: { xs: 1, md: 1.5 },
                  borderWidth: 2,
                  background: 'rgba(255, 255, 255, 0.9)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: spot.indoor 
                      ? 'rgba(79, 172, 254, 0.1)' 
                      : 'rgba(67, 233, 123, 0.1)',
                    transform: !isMobile ? 'translateY(-2px)' : 'none',
                    boxShadow: spot.indoor 
                      ? '0 8px 32px rgba(79, 172, 254, 0.3)'
                      : '0 8px 32px rgba(67, 233, 123, 0.3)',
                  },
                }}
              />
            </Stack>
          </Box>

          <ImageGallery spot={spot} />
          <SpotInfo spot={spot} />
          <CommentSection spot={spot} reviews={reviews} />
        </Box>
      </DialogContent>
    </Dialog>
  )
}