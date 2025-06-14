'use client'

import React, { useState } from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Stack,
  Fade,
  Zoom,
  Tooltip,
  useTheme,
  useMediaQuery,
  Avatar
} from '@mui/material'
import LocationOn from '@mui/icons-material/LocationOn'
import BabyChangingStation from '@mui/icons-material/BabyChangingStation'
import ChildCare from '@mui/icons-material/ChildCare'
import Home from '@mui/icons-material/Home'
import LocalLaundryService from '@mui/icons-material/LocalLaundryService'
import OpenInNew from '@mui/icons-material/OpenInNew'
import AccessTime from '@mui/icons-material/AccessTime'
import Wc from '@mui/icons-material/Wc'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShareIcon from '@mui/icons-material/Share'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { Spot } from '@/lib/mockData'
import { categories, amenities as amenityList } from '@/constants/ui'
import { useTranslations } from 'next-intl'

interface SpotCardProps {
  spot: Spot
  imageUrl?: string
  onClick?: () => void
  compact?: boolean
}

export default function SpotCard({ spot, imageUrl, onClick, compact = false }: SpotCardProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const t = useTranslations('SpotCard')
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const getCategoryLabel = (category: string) => {
    const found = categories.find((c) => c.value === category)
    return found ? found.label : category
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

  const amenityIcons = [
    { condition: spot.has_nursing_room, icon: <BabyChangingStation />, label: amenityList.find(a => a.key === 'hasNursingRoom')!.label, color: '#ff6b9d' },
    { condition: spot.has_diaper_space, icon: <ChildCare />, label: amenityList.find(a => a.key === 'hasDiaperSpace')!.label, color: '#4ecdc4' },
    { condition: spot.has_kids_space, icon: <Home />, label: amenityList.find(a => a.key === 'hasKidsSpace')!.label, color: '#45b7d1' },
    { condition: spot.has_sink, icon: <LocalLaundryService />, label: amenityList.find(a => a.key === 'hasSink')!.label, color: '#96ceb4' },
    { condition: spot.has_diaper_trash, icon: <Wc />, label: amenityList.find(a => a.key === 'hasDiaperTrash')!.label, color: '#feca57' }
  ]

  const availableAmenities = amenityIcons.filter(amenity => amenity.condition)

  // YouTube Shorts style dimensions
  const cardHeight = isMobile ? 600 : 700
  const cardWidth = isMobile ? '100%' : 400

  return (
    <Zoom in={true} timeout={300}>
      <Card
        className="glass-card"
        sx={{
          width: cardWidth,
          height: cardHeight,
          position: 'relative',
          cursor: onClick ? 'pointer' : 'default',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: { xs: 3, md: 4 },
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
          transform: isHovered && !isMobile ? 'scale(1.02)' : 'scale(1)',
          boxShadow: isHovered && !isMobile
            ? '0 32px 128px rgba(0, 0, 0, 0.25)' 
            : '0 8px 32px rgba(0, 0, 0, 0.1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${getCategoryColor(spot.category)}, ${getCategoryColor(spot.category)}aa)`,
            zIndex: 2,
          },
        }}
        onClick={onClick}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        elevation={0}
      >
        {/* Full Background Image */}
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          {(imageUrl || spot.firstImageUrl) && (
            <CardMedia
              component="img"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease',
                transform: isHovered && !isMobile ? 'scale(1.05)' : 'scale(1)',
              }}
              image={imageUrl || spot.firstImageUrl}
              alt={spot.name}
            />
          )}
          
          {/* Gradient Overlays */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '40%',
              background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%)',
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '60%',
              background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
              zIndex: 1,
            }}
          />

          {/* Top Section - Category and Actions */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              p: { xs: 2, md: 3 },
              zIndex: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            {/* Category Badge */}
            <Chip
              label={getCategoryLabel(spot.category)}
              size="small"
              sx={{
                background: `${getCategoryColor(spot.category)}ee`,
                color: 'white',
                fontWeight: 700,
                fontSize: { xs: '0.75rem', md: '0.875rem' },
                height: { xs: 32, md: 36 },
                px: 1,
                border: '2px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            />

            {/* Action Buttons */}
            <Stack direction="column" spacing={1}>
              {/* Share Button */}
              <Tooltip title={t('share')} arrow>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation()
                    // Share functionality
                  }}
                  sx={{
                    width: { xs: 44, md: 48 },
                    height: { xs: 44, md: 48 },
                    color: 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#667eea',
                      transform: !isMobile ? 'scale(1.2)' : 'scale(1)',
                    },
                  }}
                >
                  <ShareIcon sx={{ fontSize: { xs: 24, md: 28 } }} />
                </IconButton>
              </Tooltip>

              {/* Bookmark Button */}
              <Tooltip title={isBookmarked ? t('bookmarkRemove') : t('bookmark')} arrow>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsBookmarked(!isBookmarked)
                  }}
                  sx={{
                    width: { xs: 44, md: 48 },
                    height: { xs: 44, md: 48 },
                    color: isBookmarked ? '#ffd93d' : 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#ffd93d',
                      transform: !isMobile ? 'scale(1.2)' : 'scale(1)',
                    },
                  }}
                >
                  {isBookmarked ? (
                    <BookmarkIcon sx={{ fontSize: { xs: 24, md: 28 } }} />
                  ) : (
                    <BookmarkBorderIcon sx={{ fontSize: { xs: 24, md: 28 } }} />
                  )}
                </IconButton>
              </Tooltip>

              {/* Google Map Button */}
              {spot.google_map_url && (
                <Tooltip title={t('openMap')} arrow>
                  <IconButton
                    href={spot.google_map_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                      width: { xs: 44, md: 48 },
                      height: { xs: 44, md: 48 },
                      color: 'white',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: '#4facfe',
                        transform: !isMobile ? 'scale(1.2)' : 'scale(1)',
                      },
                    }}
                  >
                    <OpenInNew sx={{ fontSize: { xs: 24, md: 28 } }} />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Box>

          {/* Bottom Content Section */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: { xs: 2, md: 3 },
              zIndex: 3,
              color: 'white',
            }}
          >
            {/* Title */}
            <Typography 
              variant="h5" 
              component="h3" 
              sx={{ 
                fontWeight: 800,
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                mb: 1,
                color: 'white',
                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                lineHeight: 1.2,
              }}
            >
              {spot.name}
            </Typography>

            {/* Location */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOn sx={{ fontSize: { xs: 18, md: 20 }, mr: 1, color: 'white' }} />
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: { xs: '0.875rem', md: '1rem' }, 
                  fontWeight: 500,
                  color: 'rgba(255, 255, 255, 0.9)',
                  textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                }}
              >
                {spot.address}
              </Typography>
            </Box>

            {/* Age Range and Hours */}
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ChildCare sx={{ fontSize: { xs: 16, md: 18 }, mr: 0.5, color: 'white' }} />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontSize: { xs: '0.75rem', md: '0.875rem' }, 
                    fontWeight: 500,
                    color: 'rgba(255, 255, 255, 0.9)',
                    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                  }}
                >
                {t('ageRange', { min: spot.target_age_min, max: spot.target_age_max })}
                </Typography>
              </Box>

              {spot.opening_hours && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTime sx={{ fontSize: { xs: 16, md: 18 }, mr: 0.5, color: 'white' }} />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontSize: { xs: '0.75rem', md: '0.875rem' }, 
                      fontWeight: 500,
                      color: 'rgba(255, 255, 255, 0.9)',
                      textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                    }}
                  >
                    {spot.opening_hours}
                  </Typography>
                </Box>
              )}
            </Stack>

            {/* Amenity Icons */}
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              {availableAmenities.slice(0, 4).map((amenity, index) => (
                <Tooltip key={index} title={amenity.label} arrow>
                  <Box
                    sx={{
                      width: { xs: 36, md: 40 },
                      height: { xs: 36, md: 40 },
                      borderRadius: '50%',
                      background: `${amenity.color}ee`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: !isMobile ? 'scale(1.1)' : 'scale(1)',
                        background: amenity.color,
                      },
                    }}
                  >
                    {React.cloneElement(amenity.icon, { 
                      sx: { color: 'white', fontSize: { xs: 16, md: 18 } } 
                    })}
                  </Box>
                </Tooltip>
              ))}
              {availableAmenities.length > 4 && (
                <Box
                  sx={{
                    width: { xs: 36, md: 40 },
                    height: { xs: 36, md: 40 },
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                >
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'white', 
                      fontWeight: 700,
                      fontSize: { xs: '0.7rem', md: '0.75rem' }
                    }}
                  >
                    +{availableAmenities.length - 4}
                  </Typography>
                </Box>
              )}
            </Stack>

            {/* Bottom Action Bar */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pt: 2,
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              {/* Like Button */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsFavorited(!isFavorited)
                  }}
                  sx={{
                    color: isFavorited ? '#ff6b9d' : 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: !isMobile ? 'scale(1.2)' : 'scale(1)',
                    },
                  }}
                >
                  {isFavorited ? (
                    <FavoriteIcon sx={{ fontSize: { xs: 24, md: 28 } }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ fontSize: { xs: 24, md: 28 } }} />
                  )}
                </IconButton>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'white', 
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', md: '1rem' }
                  }}
                >
                  {Math.floor(Math.random() * 100) + 10}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
    </Zoom>
  )
}