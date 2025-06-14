'use client'

import React, { useState, useEffect } from 'react'
import {
  Card,
  Box,
  Skeleton,
  Fade,
  Zoom,
  useTheme,
  useMediaQuery
} from '@mui/material'

interface SpotCardSkeletonProps {
  index?: number
}

export default function SpotCardSkeleton({ index = 0 }: SpotCardSkeletonProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // YouTube Shorts style dimensions
  const cardHeight = isMobile ? 600 : 700
  const cardWidth = isMobile ? '100%' : 400

  if (!isMounted) {
    return (
      <Card
        className="glass-card"
        sx={{
          width: cardWidth,
          height: cardHeight,
          position: 'relative',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: { xs: 3, md: 4 },
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
        elevation={0}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{
            background: 'rgba(102, 126, 234, 0.1)',
          }}
        />
      </Card>
    )
  }

  return (
    <Zoom in={true} timeout={300 + index * 100}>
      <Card
        className="glass-card"
        sx={{
          width: cardWidth,
          height: cardHeight,
          position: 'relative',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: { xs: 3, md: 4 },
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.3), transparent)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite',
            zIndex: 2,
          }
        }}
        elevation={0}
      >
        {/* Full Background Skeleton */}
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 50%, rgba(79, 172, 254, 0.1) 100%)',
              backgroundSize: '400% 400%',
              animation: 'shimmer 3s infinite',
            }}
          />
          
          {/* Top Section Skeletons */}
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
            {/* Category Badge Skeleton */}
            <Skeleton
              variant="rounded"
              width={80}
              height={32}
              sx={{
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.3)',
              }}
            />

            {/* Action Buttons Skeleton */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Skeleton
                variant="circular"
                width={isMobile ? 44 : 48}
                height={isMobile ? 44 : 48}
                sx={{ background: 'rgba(255, 255, 255, 0.3)' }}
              />
              <Skeleton
                variant="circular"
                width={isMobile ? 44 : 48}
                height={isMobile ? 44 : 48}
                sx={{ background: 'rgba(255, 255, 255, 0.3)' }}
              />
            </Box>
          </Box>

          {/* Center Play Button Skeleton */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
            }}
          >
            <Skeleton
              variant="circular"
              width={isMobile ? 64 : 80}
              height={isMobile ? 64 : 80}
              sx={{
                background: 'rgba(255, 255, 255, 0.4)',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }}
            />
          </Box>

          {/* Bottom Content Skeleton */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: { xs: 2, md: 3 },
              zIndex: 3,
            }}
          >
            {/* Title Skeleton */}
            <Skeleton
              variant="text"
              width="85%"
              height={isMobile ? 36 : 42}
              sx={{
                mb: 1,
                background: 'rgba(255, 255, 255, 0.4)',
                borderRadius: 2,
              }}
            />

            {/* Location Skeleton */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Skeleton
                variant="circular"
                width={isMobile ? 18 : 20}
                height={isMobile ? 18 : 20}
                sx={{ mr: 1, background: 'rgba(255, 255, 255, 0.3)' }}
              />
              <Skeleton
                variant="text"
                width="70%"
                height={24}
                sx={{
                  background: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: 1,
                }}
              />
            </Box>

            {/* Age Range and Hours Skeleton */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Skeleton
                variant="text"
                width="40%"
                height={20}
                sx={{
                  background: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: 1,
                }}
              />
              <Skeleton
                variant="text"
                width="35%"
                height={20}
                sx={{
                  background: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: 1,
                }}
              />
            </Box>

            {/* Amenity Icons Skeleton */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              {Array.from({ length: 4 }, (_, i) => (
                <Skeleton
                  key={i}
                  variant="circular"
                  width={isMobile ? 36 : 40}
                  height={isMobile ? 36 : 40}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.3)',
                    animation: `shimmer ${2 + i * 0.2}s infinite`,
                  }}
                />
              ))}
            </Box>

            {/* Bottom Action Bar Skeleton */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pt: 2,
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              {/* Like Button Skeleton */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Skeleton
                  variant="circular"
                  width={isMobile ? 40 : 44}
                  height={isMobile ? 40 : 44}
                  sx={{ background: 'rgba(255, 255, 255, 0.3)' }}
                />
                <Skeleton
                  variant="text"
                  width={30}
                  height={20}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: 1,
                  }}
                />
              </Box>

              {/* Map Button Skeleton */}
              <Skeleton
                variant="circular"
                width={isMobile ? 44 : 48}
                height={isMobile ? 44 : 48}
                sx={{ background: 'rgba(255, 255, 255, 0.3)' }}
              />
            </Box>
          </Box>
        </Box>
      </Card>
    </Zoom>
  )
}