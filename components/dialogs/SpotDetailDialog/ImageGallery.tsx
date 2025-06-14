'use client'

import React, { useState } from 'react'
import {
  Box,
  ImageList,
  ImageListItem,
  Dialog,
  IconButton,
  Typography,
  Fade,
  useTheme,
  useMediaQuery,
  Button
} from '@mui/material'
import {
  Close,
  NavigateBefore,
  NavigateNext,
  ZoomIn
} from '@mui/icons-material'
import { Spot } from '@/lib/mockData'

interface ImageGalleryProps {
  spot: Spot
}

export function ImageGallery({ spot }: ImageGalleryProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Mock image URLs for display
  const imageUrls = [
    spot.firstImageUrl,
    'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg?auto=compress&cs=tinysrgb&w=400'
  ].filter(Boolean)

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
    setGalleryOpen(true)
  }

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1))
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      handlePrevious()
    } else if (event.key === 'ArrowRight') {
      handleNext()
    } else if (event.key === 'Escape') {
      setGalleryOpen(false)
    }
  }

  if (imageUrls.length === 0) return null

  return (
    <>
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        {isMobile ? (
          // Mobile: 2-column grid with main image emphasis
          <Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: imageUrls.length === 1 ? '1fr' : 'repeat(2, 1fr)',
                gridTemplateRows: imageUrls.length > 1 ? 'auto auto' : 'auto',
                gap: 1,
                height: 300,
              }}
            >
              {/* Main image (spans 2 columns if more than 1 image) */}
              <Box
                sx={{
                  gridColumn: imageUrls.length > 1 ? 'span 2' : 'span 1',
                  gridRow: imageUrls.length > 1 ? 'span 1' : 'span 2',
                  position: 'relative',
                  cursor: 'pointer',
                  borderRadius: 3,
                  overflow: 'hidden',
                  height: imageUrls.length > 1 ? 200 : 300,
                  '&:hover .zoom-icon': {
                    opacity: 1,
                  },
                }}
                onClick={() => handleImageClick(0)}
              >
                <img
                  src={imageUrls[0]}
                  alt="施設画像"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                  }}
                />
                <Box
                  className="zoom-icon"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    background: 'rgba(0, 0, 0, 0.6)',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <ZoomIn sx={{ color: 'white', fontSize: 20 }} />
                </Box>
              </Box>

              {/* Additional images - only show first 2 additional images on mobile */}
              {imageUrls.slice(1, 3).map((url, index) => (
                <Box
                  key={index + 1}
                  sx={{
                    position: 'relative',
                    cursor: 'pointer',
                    borderRadius: 2,
                    overflow: 'hidden',
                    height: 100,
                    '&:hover .zoom-icon': {
                      opacity: 1,
                    },
                  }}
                  onClick={() => handleImageClick(index + 1)}
                >
                  <img
                    src={url}
                    alt="施設画像"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                  <Box
                    className="zoom-icon"
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      background: 'rgba(0, 0, 0, 0.6)',
                      borderRadius: '50%',
                      width: 28,
                      height: 28,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    <ZoomIn sx={{ color: 'white', fontSize: 16 }} />
                  </Box>
                </Box>
              ))}
            </Box>

            {/* View all images button for mobile if more than 3 images */}
            {imageUrls.length > 3 && (
              <Button
                onClick={() => setGalleryOpen(true)}
                variant="outlined"
                fullWidth
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  py: 1,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  borderColor: '#667eea',
                  color: '#667eea',
                  '&:hover': {
                    background: 'rgba(102, 126, 234, 0.1)',
                    borderColor: '#667eea',
                  },
                }}
              >
                すべての画像を見る ({imageUrls.length}枚)
              </Button>
            )}
          </Box>
        ) : (
          // Desktop: Standard ImageList
          <ImageList
            sx={{ 
              width: '100%', 
              height: { xs: 250, md: 300 },
              borderRadius: 3,
              overflow: 'hidden',
            }}
            cols={imageUrls.length === 1 ? 1 : Math.min(imageUrls.length, 3)}
            rowHeight={300}
          >
            {imageUrls.slice(0, 3).map((url, index) => (
              <ImageListItem 
                key={index}
                sx={{
                  cursor: 'pointer',
                  position: 'relative',
                  '&:hover': {
                    '& img': {
                      transform: 'scale(1.05)',
                    },
                    '& .zoom-overlay': {
                      opacity: 1,
                    },
                  },
                }}
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={url}
                  alt="施設画像"
                  loading="lazy"
                  style={{ 
                    objectFit: 'cover', 
                    width: '100%', 
                    height: '100%',
                    transition: 'transform 0.3s ease',
                  }}
                />
                <Box
                  className="zoom-overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <ZoomIn sx={{ color: 'white', fontSize: 32 }} />
                </Box>
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>

      {/* Full Screen Gallery Modal */}
      <Dialog
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        maxWidth={false}
        fullScreen
        PaperProps={{
          sx: {
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(10px)',
          }
        }}
        onKeyDown={handleKeyPress}
        tabIndex={-1}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={() => setGalleryOpen(false)}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: 'white',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              zIndex: 2,
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <Close />
          </IconButton>

          {/* Image Counter */}
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              color: 'white',
              background: 'rgba(0, 0, 0, 0.6)',
              px: 2,
              py: 1,
              borderRadius: 2,
              zIndex: 2,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {currentImageIndex + 1} / {imageUrls.length}
            </Typography>
          </Box>

          {/* Previous Button */}
          {imageUrls.length > 1 && (
            <IconButton
              onClick={handlePrevious}
              sx={{
                position: 'absolute',
                left: 16,
                color: 'white',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                zIndex: 2,
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              <NavigateBefore />
            </IconButton>
          )}

          {/* Next Button */}
          {imageUrls.length > 1 && (
            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                right: 16,
                color: 'white',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                zIndex: 2,
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              <NavigateNext />
            </IconButton>
          )}

          {/* Main Image */}
          <Fade in={true} timeout={300} key={currentImageIndex}>
            <Box
              sx={{
                maxWidth: '90%',
                maxHeight: '90%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={imageUrls[currentImageIndex]}
                alt="施設画像"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  borderRadius: 8,
                }}
              />
            </Box>
          </Fade>

          {/* Thumbnail Navigation */}
          {imageUrls.length > 1 && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 1,
                background: 'rgba(0, 0, 0, 0.6)',
                p: 1,
                borderRadius: 2,
                maxWidth: '90%',
                overflowX: 'auto',
              }}
            >
              {imageUrls.map((url, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  sx={{
                    width: 60,
                    height: 40,
                    borderRadius: 1,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '2px solid',
                    borderColor: index === currentImageIndex ? 'white' : 'transparent',
                    transition: 'border-color 0.3s ease',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={url}
                    alt="サムネイル"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Dialog>
    </>
  )
}