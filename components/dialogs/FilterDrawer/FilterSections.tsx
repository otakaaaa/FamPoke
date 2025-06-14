'use client'

import React from 'react'
import {
  FormControl,
  FormLabel,
  FormGroup,
  Box,
  Chip,
  Stack,
  Divider,
  Slider,
  Switch,
  Typography,
  Paper,
  Fade,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { SpotFilters } from '@/lib/atoms'
import { categories, amenities } from './constants'

interface FilterSectionsProps {
  filters: SpotFilters
  setFilters: (filters: SpotFilters) => void
}

export function FilterSections({ filters, setFilters }: FilterSectionsProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category]
    
    setFilters({ ...filters, category: newCategories })
  }

  const handleAmenityChange = (amenity: keyof SpotFilters, value: boolean | null) => {
    setFilters({ ...filters, [amenity]: value })
  }

  const handleAgeRangeChange = (event: Event, newValue: number | number[]) => {
    setFilters({ ...filters, ageRange: newValue as [number, number] })
  }

  return (
    <>
      {/* Categories */}
      <FormControl component="fieldset" sx={{ mb: { xs: 3, md: 4 }, width: '100%' }}>
        <FormLabel 
          component="legend" 
          sx={{ 
            mb: { xs: 2, md: 3 }, 
            fontWeight: 700,
            fontSize: { xs: '1rem', md: '1.1rem' },
            color: '#1a202c',
          }}
        >
          施設カテゴリ
        </FormLabel>
        
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' },
            gap: { xs: 1, md: 1.5 },
            alignItems: 'start',
          }}
        >
          {categories.map((category, index) => (
            <Fade in={true} timeout={300 + index * 100} key={category.value}>
              <Chip
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <span>{category.emoji}</span>
                    <span style={{ 
                      fontSize: isMobile ? '0.75rem' : '0.875rem',
                      fontWeight: 600,
                      color: filters.category.includes(category.value) ? 'white' : '#2d3748'
                    }}>
                      {category.label}
                    </span>
                  </Box>
                }
                clickable
                variant={filters.category.includes(category.value) ? 'filled' : 'outlined'}
                onClick={() => handleCategoryChange(category.value)}
                sx={{
                  borderRadius: 3,
                  py: { xs: 1.5, md: 2 },
                  px: { xs: 0.5, md: 1 },
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  width: '100%',
                  justifyContent: 'flex-start',
                  ...(filters.category.includes(category.value) ? {
                    background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)`,
                    color: 'white',
                    border: 'none',
                    transform: !isMobile ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: `0 4px 16px ${category.color}40`,
                  } : {
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderColor: `${category.color}60`,
                    color: '#2d3748',
                    '&:hover': {
                      background: `${category.color}20`,
                      transform: !isMobile ? 'scale(1.05)' : 'scale(1)',
                      color: '#1a202c',
                    },
                  }),
                }}
              />
            </Fade>
          ))}
        </Box>
      </FormControl>

      <Divider sx={{ my: { xs: 3, md: 4 }, background: 'rgba(102, 126, 234, 0.1)' }} />

      {/* Amenities */}
      <FormControl component="fieldset" sx={{ mb: { xs: 3, md: 4 }, width: '100%' }}>
        <FormLabel 
          component="legend" 
          sx={{ 
            mb: { xs: 2, md: 3 }, 
            fontWeight: 700,
            fontSize: { xs: '1rem', md: '1.1rem' },
            color: '#1a202c',
          }}
        >
          設備・サービス
        </FormLabel>
        <FormGroup>
          {amenities.map((amenity, index) => (
            <Fade in={true} timeout={600 + index * 100} key={amenity.key}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 2,
                  p: { xs: 2, md: 2.5 },
                  borderRadius: 4,
                  background: filters[amenity.key] === true 
                    ? `linear-gradient(135deg, ${amenity.color}15 0%, ${amenity.color}25 100%)`
                    : 'rgba(255, 255, 255, 0.95)',
                  border: '2px solid',
                  borderColor: filters[amenity.key] === true 
                    ? `${amenity.color}80`
                    : 'rgba(102, 126, 234, 0.15)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: !isMobile ? 'translateY(-2px)' : 'none',
                    boxShadow: filters[amenity.key] === true 
                      ? `0 8px 32px ${amenity.color}30`
                      : '0 8px 32px rgba(102, 126, 234, 0.15)',
                    borderColor: filters[amenity.key] === true 
                      ? amenity.color
                      : 'rgba(102, 126, 234, 0.3)',
                  },
                }}
                onClick={() => handleAmenityChange(amenity.key, filters[amenity.key] === true ? null : true)}
              >
                <Box 
                  sx={{ 
                    width: { xs: 40, md: 48 },
                    height: { xs: 40, md: 48 },
                    borderRadius: '50%',
                    background: filters[amenity.key] === true 
                      ? `linear-gradient(135deg, ${amenity.color} 0%, ${amenity.color}dd 100%)`
                      : 'rgba(102, 126, 234, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: { xs: 2, md: 2.5 },
                    transition: 'all 0.3s ease',
                    boxShadow: filters[amenity.key] === true 
                      ? `0 4px 16px ${amenity.color}40`
                      : '0 2px 8px rgba(102, 126, 234, 0.1)',
                  }}
                >
                  {React.cloneElement(amenity.icon, { 
                    sx: { 
                      color: filters[amenity.key] === true ? 'white' : amenity.color,
                      fontSize: { xs: 20, md: 24 },
                      filter: filters[amenity.key] === true ? 'brightness(1.2)' : 'none',
                      transform: filters[amenity.key] === true ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.3s ease'
                    } 
                  })}
                </Box>
                
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ 
                    fontSize: { xs: '0.95rem', md: '1.1rem' }, 
                    fontWeight: filters[amenity.key] === true ? 700 : 600,
                    color: filters[amenity.key] === true ? amenity.color : '#2d3748',
                    transition: 'all 0.3s ease',
                    letterSpacing: '0.02em',
                    mb: 0.5,
                  }}>
                    {amenity.label}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                      lineHeight: 1.4,
                    }}
                  >
                    {amenity.description}
                  </Typography>
                </Box>
                
                <Switch
                  checked={filters[amenity.key] === true}
                  onChange={(e) => handleAmenityChange(amenity.key, e.target.checked ? true : null)}
                  size={isMobile ? 'medium' : 'medium'}
                  sx={{
                    '& .MuiSwitch-switchBase': {
                      color: 'rgba(0, 0, 0, 0.38)',
                      '&.Mui-checked': {
                        color: 'white',
                        '& + .MuiSwitch-track': {
                          background: `linear-gradient(135deg, ${amenity.color} 0%, ${amenity.color}dd 100%)`,
                          opacity: 1,
                          border: 'none',
                        },
                      },
                    },
                    '& .MuiSwitch-track': {
                      borderRadius: 26 / 2,
                      border: '2px solid rgba(102, 126, 234, 0.2)',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      opacity: 1,
                      transition: 'all 0.3s ease',
                    },
                    '& .MuiSwitch-thumb': {
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                      width: { xs: 20, md: 22 },
                      height: { xs: 20, md: 22 },
                      transition: 'all 0.3s ease',
                    },
                    '&:hover .MuiSwitch-thumb': {
                      boxShadow: `0 4px 16px ${filters[amenity.key] === true ? amenity.color : 'rgba(102, 126, 234, 0.3)'}40`,
                    },
                  }}
                />
              </Box>
            </Fade>
          ))}
        </FormGroup>
      </FormControl>

      <Divider sx={{ my: { xs: 3, md: 4 }, background: 'rgba(102, 126, 234, 0.1)' }} />

      {/* Indoor/Outdoor */}
      <FormControl component="fieldset" sx={{ mb: { xs: 3, md: 4 }, width: '100%' }}>
        <FormLabel 
          component="legend" 
          sx={{ 
            mb: { xs: 2, md: 3 }, 
            fontWeight: 700,
            fontSize: { xs: '1rem', md: '1.1rem' },
            color: '#1a202c',
          }}
        >
          屋内・屋外
        </FormLabel>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
          <Box
            onClick={() => handleAmenityChange('indoor', filters.indoor === true ? null : true)}
            sx={{
              flex: 1,
              p: { xs: 2, md: 2.5 },
              borderRadius: 4,
              background: filters.indoor === true 
                ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                : 'rgba(255, 255, 255, 0.95)',
              border: '2px solid',
              borderColor: filters.indoor === true 
                ? '#4facfe'
                : 'rgba(79, 172, 254, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              '&:hover': {
                transform: !isMobile ? 'translateY(-2px)' : 'none',
                boxShadow: filters.indoor === true 
                  ? '0 8px 32px rgba(79, 172, 254, 0.4)'
                  : '0 8px 32px rgba(79, 172, 254, 0.2)',
                borderColor: '#4facfe',
                background: filters.indoor === true 
                  ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                  : 'rgba(79, 172, 254, 0.1)',
              },
            }}
          >
            <Box
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                filter: filters.indoor === true ? 'brightness(1.2)' : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              🏠
            </Box>
            <Typography
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 700,
                color: filters.indoor === true ? 'white' : '#2d3748',
                textShadow: filters.indoor === true ? '0 1px 2px rgba(0,0,0,0.2)' : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              屋内施設
            </Typography>
          </Box>

          <Box
            onClick={() => handleAmenityChange('indoor', filters.indoor === false ? null : false)}
            sx={{
              flex: 1,
              p: { xs: 2, md: 2.5 },
              borderRadius: 4,
              background: filters.indoor === false 
                ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                : 'rgba(255, 255, 255, 0.95)',
              border: '2px solid',
              borderColor: filters.indoor === false 
                ? '#43e97b'
                : 'rgba(67, 233, 123, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              '&:hover': {
                transform: !isMobile ? 'translateY(-2px)' : 'none',
                boxShadow: filters.indoor === false 
                  ? '0 8px 32px rgba(67, 233, 123, 0.4)'
                  : '0 8px 32px rgba(67, 233, 123, 0.2)',
                borderColor: '#43e97b',
                background: filters.indoor === false 
                  ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                  : 'rgba(67, 233, 123, 0.1)',
              },
            }}
          >
            <Box
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                filter: filters.indoor === false ? 'brightness(1.2)' : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              🌳
            </Box>
            <Typography
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 700,
                color: filters.indoor === false ? 'white' : '#2d3748',
                textShadow: filters.indoor === false ? '0 1px 2px rgba(0,0,0,0.2)' : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              屋外施設
            </Typography>
          </Box>
        </Stack>
      </FormControl>

      <Divider sx={{ my: { xs: 3, md: 4 }, background: 'rgba(102, 126, 234, 0.1)' }} />

      {/* Age Range */}
      <FormControl component="fieldset" sx={{ mb: { xs: 3, md: 4 }, width: '100%' }}>
        <FormLabel 
          component="legend" 
          sx={{ 
            mb: { xs: 2, md: 3 }, 
            fontWeight: 700,
            fontSize: { xs: '1rem', md: '1.1rem' },
            color: '#1a202c',
          }}
        >
          対象年齢: {filters.ageRange[0]}歳 〜 {filters.ageRange[1]}歳
        </FormLabel>
        <Box sx={{ px: { xs: 1, md: 2 } }}>
          <Slider
            value={filters.ageRange}
            onChange={handleAgeRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={18}
            step={1}
            marks={[
              { value: 0, label: '0歳' },
              { value: 6, label: '6歳' },
              { value: 12, label: '12歳' },
              { value: 18, label: '18歳' }
            ]}
            sx={{
              mt: { xs: 2, md: 3 },
              '& .MuiSlider-thumb': {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
                width: { xs: 20, md: 24 },
                height: { xs: 20, md: 24 },
                '&:hover': {
                  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
                },
              },
              '& .MuiSlider-track': {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                height: { xs: 4, md: 6 },
                border: 'none',
              },
              '& .MuiSlider-rail': {
                background: 'rgba(102, 126, 234, 0.2)',
                height: { xs: 4, md: 6 },
              },
              '& .MuiSlider-mark': {
                background: 'rgba(102, 126, 234, 0.4)',
                width: 3,
                height: 3,
              },
              '& .MuiSlider-markLabel': {
                fontSize: { xs: '0.7rem', md: '0.75rem' },
                fontWeight: 500,
                color: '#667eea',
              },
            }}
          />
        </Box>
      </FormControl>
    </>
  )
}