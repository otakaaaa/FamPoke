'use client'

import React from 'react'
import {
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material'
import {
  LocationOn,
  BabyChangingStation,
  ChildCare,
  Home,
  LocalLaundryService,
  Wc,
  AccessTime,
  OpenInNew,
  DirectionsCar
} from '@mui/icons-material'
import { Spot } from '@/lib/mockData'

interface SpotInfoProps {
  spot: Spot
}

export function SpotInfo({ spot }: SpotInfoProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const amenityIcons = [
    { condition: spot.has_nursing_room, icon: <BabyChangingStation />, label: '授乳室', color: '#ff6b9d' },
    { condition: spot.has_diaper_space, icon: <ChildCare />, label: 'おむつ替え', color: '#4ecdc4' },
    { condition: spot.has_kids_space, icon: <Home />, label: 'キッズスペース', color: '#45b7d1' },
    { condition: spot.has_stroller_space, icon: <DirectionsCar />, label: 'ベビーカー置き場', color: '#96ceb4' },
    { condition: spot.has_sink, icon: <LocalLaundryService />, label: '洗面台', color: '#feca57' },
    { condition: spot.has_diaper_trash, icon: <Wc />, label: 'おむつ用ゴミ箱', color: '#ff9ff3' }
  ]

  const availableAmenities = amenityIcons.filter(amenity => amenity.condition)

  return (
    <Box sx={{ mb: 3 }}>
      {/* Grid Layout */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
        {/* Basic Information */}
        <Grid item xs={12} md={6}>
          <Paper 
            className="glass-card" 
            sx={{ 
              p: { xs: 2, md: 3 }, 
              height: '100%',
              border: '1px solid rgba(102, 126, 234, 0.1)',
              borderRadius: 3,
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2, 
                fontWeight: 700,
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                color: '#2D3748',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LocationOn sx={{ color: 'white', fontSize: 18 }} />
              </Box>
              基本情報
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 2.5 } }}>
              {/* Address */}
              <Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 600,
                    color: '#667eea',
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    mb: 0.5
                  }}
                >
                  住所
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    color: '#2D3748',
                    lineHeight: 1.6,
                  }}
                >
                  {spot.address}
                </Typography>
              </Box>

              {/* Age Range */}
              <Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 600,
                    color: '#f093fb',
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    mb: 0.5
                  }}
                >
                  対象年齢
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    color: '#2D3748',
                    fontWeight: 600
                  }}
                >
                  {spot.target_age_min}歳〜{spot.target_age_max}歳
                </Typography>
              </Box>

              {/* Opening Hours */}
              {spot.opening_hours && (
                <Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 600,
                      color: '#4facfe',
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      mb: 0.5
                    }}
                  >
                    営業時間
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      color: '#2D3748'
                    }}
                  >
                    {spot.opening_hours}
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Amenities */}
        <Grid item xs={12} md={6}>
          <Paper 
            className="glass-card" 
            sx={{ 
              p: { xs: 2, md: 3 }, 
              height: '100%',
              border: '1px solid rgba(102, 126, 234, 0.1)',
              borderRadius: 3,
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2, 
                fontWeight: 700,
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                color: '#2D3748',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Home sx={{ color: 'white', fontSize: 18 }} />
              </Box>
              設備・サービス
            </Typography>

            {availableAmenities.length > 0 ? (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                  gap: { xs: 1.5, md: 2 },
                }}
              >
                {availableAmenities.map((amenity, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: { xs: 1.5, md: 2 },
                      borderRadius: 3,
                      background: `linear-gradient(135deg, ${amenity.color}15 0%, ${amenity.color}25 100%)`,
                      border: `1px solid ${amenity.color}30`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: !isMobile ? 'translateY(-2px)' : 'none',
                        boxShadow: `0 8px 32px ${amenity.color}30`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 32, md: 36 },
                        height: { xs: 32, md: 36 },
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${amenity.color} 0%, ${amenity.color}dd 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: { xs: 1.5, md: 2 },
                        boxShadow: `0 4px 16px ${amenity.color}40`,
                      }}
                    >
                      {React.cloneElement(amenity.icon, { 
                        sx: { 
                          color: 'white',
                          fontSize: { xs: 16, md: 18 }
                        } 
                      })}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: amenity.color,
                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                      }}
                    >
                      {amenity.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box
                sx={{
                  textAlign: 'center',
                  py: { xs: 3, md: 4 },
                  color: 'text.secondary',
                }}
              >
                <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                  設備情報はありません
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Google Map Button */}
      {spot.google_map_url && (
        <Button
          variant="contained"
          startIcon={<OpenInNew />}
          href={spot.google_map_url}
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
          sx={{
            borderRadius: 3,
            py: { xs: 1.5, md: 2 },
            fontSize: { xs: '1rem', md: '1.125rem' },
            fontWeight: 700,
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            boxShadow: '0 8px 32px rgba(79, 172, 254, 0.3)',
            transition: 'all 0.3s ease',
            mb: { xs: 3, md: 4 },
            '&:hover': {
              background: 'linear-gradient(135deg, #2d9cfe 0%, #00d4e6 100%)',
              transform: !isMobile ? 'translateY(-2px)' : 'none',
              boxShadow: '0 12px 48px rgba(79, 172, 254, 0.4)',
            },
          }}
        >
          Google Mapで開く
        </Button>
      )}

      <Divider sx={{ my: { xs: 3, md: 4 }, background: 'rgba(102, 126, 234, 0.1)' }} />
    </Box>
  )
}