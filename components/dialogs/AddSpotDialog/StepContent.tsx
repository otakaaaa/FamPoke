'use client'

import React from 'react'
import {
  Box,
  TextField,
  FormLabel,
  Paper,
  Typography,
  Slider,
  Stack,
  Button,
  IconButton,
  Chip,
  Fade,
  useTheme,
  useMediaQuery
} from '@mui/material'
import {
  LocationOn,
  Schedule,
  ChildCare,
  CloudUpload,
  Delete,
  Image,
  CheckCircle
} from '@mui/icons-material'
import { StepContentProps } from './types'
import { categories, amenities } from './constants'

export function StepContent({
  activeStep,
  formData,
  selectedFiles,
  onInputChange,
  onAgeRangeChange,
  onFileSelect,
  onRemoveFile
}: StepContentProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Fade in={true} timeout={500}>
            <Box sx={{ py: 2 }}>
              <TextField
                label="施設名"
                required
                fullWidth
                value={formData.name}
                onChange={(e) => onInputChange('name', e.target.value)}
                placeholder="例: 中央公園、ママカフェひなた"
                sx={{ 
                  mb: 4,
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: 3,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    border: '2px solid rgba(102, 126, 234, 0.2)',
                    transition: 'all 0.3s ease',
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover': {
                      borderColor: 'rgba(102, 126, 234, 0.4)',
                    },
                    '&.Mui-focused': {
                      borderColor: '#667eea',
                      boxShadow: 'none',
                    },
                  },
                  '& .MuiInputBase-input': {
                    py: { xs: 1.5, md: 2 },
                    boxShadow: 'none !important',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#667eea',
                    fontWeight: 600,
                    '&.Mui-focused': {
                      color: '#667eea',
                    },
                  },
                }}
              />

              <FormLabel sx={{ 
                mb: 3, 
                display: 'block', 
                fontWeight: 700,
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: '#2D3748'
              }}>
                施設カテゴリを選択
              </FormLabel>
              
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                  gap: 2,
                }}
              >
                {categories.map((cat) => (
                  <Paper
                    key={cat.value}
                    onClick={() => onInputChange('category', cat.value)}
                    className="glass-card"
                    sx={{
                      p: { xs: 2, md: 3 },
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      border: '2px solid',
                      borderColor: formData.category === cat.value 
                        ? cat.color 
                        : 'rgba(102, 126, 234, 0.1)',
                      background: formData.category === cat.value 
                        ? `linear-gradient(135deg, ${cat.color}15 0%, ${cat.color}25 100%)`
                        : 'rgba(255, 255, 255, 0.95)',
                      transform: formData.category === cat.value ? 'scale(1.05)' : 'scale(1)',
                      boxShadow: formData.category === cat.value 
                        ? `0 8px 32px ${cat.color}30`
                        : '0 4px 16px rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: `0 8px 32px ${cat.color}30`,
                      },
                    }}
                  >
                    <Box sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 1 }}>
                      {cat.emoji}
                    </Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700, 
                        color: formData.category === cat.value ? cat.color : '#2D3748',
                        fontSize: { xs: '0.9rem', md: '1.1rem' },
                        mb: 0.5
                      }}
                    >
                      {cat.label}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'text.secondary',
                        fontSize: { xs: '0.75rem', md: '0.875rem' }
                      }}
                    >
                      {cat.description}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          </Fade>
        )

      case 1:
        return (
          <Fade in={true} timeout={500}>
            <Box sx={{ py: 2 }}>
              <TextField
                label="住所"
                required
                fullWidth
                value={formData.address}
                onChange={(e) => onInputChange('address', e.target.value)}
                placeholder="例: 東京都渋谷区神南1-1-1"
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: 3,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    border: '2px solid rgba(102, 126, 234, 0.2)',
                    transition: 'all 0.3s ease',
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover': {
                      borderColor: 'rgba(102, 126, 234, 0.4)',
                    },
                    '&.Mui-focused': {
                      borderColor: '#667eea',
                      boxShadow: 'none',
                    },
                  },
                  '& .MuiInputBase-input': {
                    py: { xs: 1.5, md: 2 },
                    pl: 6,
                    boxShadow: 'none !important',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#667eea',
                    fontWeight: 600,
                    '&.Mui-focused': {
                      color: '#667eea',
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ 
                      position: 'absolute', 
                      left: 12, 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      zIndex: 1
                    }}>
                      <LocationOn sx={{ color: '#667eea', fontSize: { xs: 20, md: 22 } }} />
                    </Box>
                  ),
                }}
              />

              <TextField
                label="Google Map URL（任意）"
                fullWidth
                value={formData.googleMapUrl}
                onChange={(e) => onInputChange('googleMapUrl', e.target.value)}
                placeholder="https://maps.google.com/..."
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: 3,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    border: '2px solid rgba(102, 126, 234, 0.2)',
                    transition: 'all 0.3s ease',
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover': {
                      borderColor: 'rgba(102, 126, 234, 0.4)',
                    },
                    '&.Mui-focused': {
                      borderColor: '#667eea',
                      boxShadow: 'none',
                    },
                  },
                  '& .MuiInputBase-input': {
                    py: { xs: 1.5, md: 2 },
                    boxShadow: 'none !important',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#667eea',
                    fontWeight: 600,
                    '&.Mui-focused': {
                      color: '#667eea',
                    },
                  },
                }}
              />

              <TextField
                label="営業時間（任意）"
                fullWidth
                value={formData.openingHours}
                onChange={(e) => onInputChange('openingHours', e.target.value)}
                placeholder="例: 9:00-17:00、24時間、平日のみ"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: 3,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    border: '2px solid rgba(102, 126, 234, 0.2)',
                    transition: 'all 0.3s ease',
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover': {
                      borderColor: 'rgba(102, 126, 234, 0.4)',
                    },
                    '&.Mui-focused': {
                      borderColor: '#667eea',
                      boxShadow: 'none',
                    },
                  },
                  '& .MuiInputBase-input': {
                    py: { xs: 1.5, md: 2 },
                    pl: 6,
                    boxShadow: 'none !important',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#667eea',
                    fontWeight: 600,
                    '&.Mui-focused': {
                      color: '#667eea',
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ 
                      position: 'absolute', 
                      left: 12, 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      zIndex: 1
                    }}>
                      <Schedule sx={{ color: '#667eea', fontSize: { xs: 20, md: 22 } }} />
                    </Box>
                  ),
                }}
              />
            </Box>
          </Fade>
        )

      case 2:
        return (
          <Fade in={true} timeout={500}>
            <Box sx={{ py: 2 }}>
              <FormLabel sx={{ 
                mb: 4, 
                display: 'block', 
                fontWeight: 700,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                color: '#2D3748',
                textAlign: 'center'
              }}>
                対象年齢: {formData.targetAgeRange[0]}歳 〜 {formData.targetAgeRange[1]}歳
              </FormLabel>
              
              <Paper className="glass-card" sx={{ p: { xs: 3, md: 4 }, mb: 3 }}>
                <Slider
                  value={formData.targetAgeRange}
                  onChange={onAgeRangeChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={18}
                  step={1}
                  marks={[
                    { value: 0, label: '0歳' },
                    { value: 3, label: '3歳' },
                    { value: 6, label: '6歳' },
                    { value: 12, label: '12歳' },
                    { value: 18, label: '18歳' }
                  ]}
                  sx={{
                    mt: 3,
                    '& .MuiSlider-thumb': {
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
                      width: { xs: 24, md: 28 },
                      height: { xs: 24, md: 28 },
                      '&:hover': {
                        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
                      },
                    },
                    '& .MuiSlider-track': {
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      height: { xs: 6, md: 8 },
                      border: 'none',
                    },
                    '& .MuiSlider-rail': {
                      background: 'rgba(102, 126, 234, 0.2)',
                      height: { xs: 6, md: 8 },
                    },
                    '& .MuiSlider-mark': {
                      background: 'rgba(102, 126, 234, 0.4)',
                      width: 4,
                      height: 4,
                    },
                    '& .MuiSlider-markLabel': {
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                      fontWeight: 600,
                      color: '#667eea',
                    },
                  }}
                />
              </Paper>

              {/* Indoor/Outdoor Selection */}
              <FormLabel sx={{ 
                mb: 3, 
                display: 'block', 
                fontWeight: 700,
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: '#2D3748'
              }}>
                施設タイプ
              </FormLabel>
              
              <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
                <Paper
                  onClick={() => onInputChange('indoor', true)}
                  className="glass-card"
                  sx={{
                    flex: 1,
                    p: { xs: 2, md: 3 },
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    border: '2px solid',
                    borderColor: formData.indoor === true 
                      ? '#4facfe' 
                      : 'rgba(79, 172, 254, 0.2)',
                    background: formData.indoor === true 
                      ? 'linear-gradient(135deg, #4facfe15 0%, #00f2fe25 100%)'
                      : 'rgba(255, 255, 255, 0.95)',
                    transform: formData.indoor === true ? 'scale(1.05)' : 'scale(1)',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 8px 32px rgba(79, 172, 254, 0.3)',
                    },
                  }}
                >
                  <Box sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 1 }}>🏠</Box>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 700, 
                    color: formData.indoor === true ? '#4facfe' : '#2D3748',
                    fontSize: { xs: '1rem', md: '1.1rem' }
                  }}>
                    屋内施設
                  </Typography>
                </Paper>

                <Paper
                  onClick={() => onInputChange('indoor', false)}
                  className="glass-card"
                  sx={{
                    flex: 1,
                    p: { xs: 2, md: 3 },
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    border: '2px solid',
                    borderColor: formData.indoor === false 
                      ? '#43e97b' 
                      : 'rgba(67, 233, 123, 0.2)',
                    background: formData.indoor === false 
                      ? 'linear-gradient(135deg, #43e97b15 0%, #38f9d725 100%)'
                      : 'rgba(255, 255, 255, 0.95)',
                    transform: formData.indoor === false ? 'scale(1.05)' : 'scale(1)',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 8px 32px rgba(67, 233, 123, 0.3)',
                    },
                  }}
                >
                  <Box sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 1 }}>🌳</Box>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 700, 
                    color: formData.indoor === false ? '#43e97b' : '#2D3748',
                    fontSize: { xs: '1rem', md: '1.1rem' }
                  }}>
                    屋外施設
                  </Typography>
                </Paper>
              </Stack>
            </Box>
          </Fade>
        )

      case 3:
        return (
          <Fade in={true} timeout={500}>
            <Box sx={{ py: 2 }}>
              <FormLabel sx={{ 
                mb: 3, 
                display: 'block', 
                fontWeight: 700,
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: '#2D3748'
              }}>
                利用可能な設備・サービス
              </FormLabel>
              
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                  gap: 2,
                }}
              >
                {amenities.map((amenity) => (
                  <Paper
                    key={amenity.key}
                    onClick={() => onInputChange(amenity.key, !formData[amenity.key])}
                    className="glass-card"
                    sx={{
                      p: { xs: 2, md: 3 },
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: '2px solid',
                      borderColor: formData[amenity.key] 
                        ? amenity.color 
                        : 'rgba(102, 126, 234, 0.1)',
                      background: formData[amenity.key] 
                        ? `linear-gradient(135deg, ${amenity.color}15 0%, ${amenity.color}25 100%)`
                        : 'rgba(255, 255, 255, 0.95)',
                      transform: formData[amenity.key] ? 'scale(1.02)' : 'scale(1)',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: `0 8px 32px ${amenity.color}30`,
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box
                        sx={{
                          width: { xs: 40, md: 48 },
                          height: { xs: 40, md: 48 },
                          borderRadius: '50%',
                          background: formData[amenity.key] 
                            ? `linear-gradient(135deg, ${amenity.color} 0%, ${amenity.color}dd 100%)`
                            : 'rgba(102, 126, 234, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {React.cloneElement(amenity.icon, { 
                          sx: { 
                            color: formData[amenity.key] ? 'white' : amenity.color,
                            fontSize: { xs: 20, md: 24 }
                          } 
                        })}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 700, 
                            color: formData[amenity.key] ? amenity.color : '#2D3748',
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            mb: 0.5
                          }}
                        >
                          {amenity.label}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.secondary',
                            fontSize: { xs: '0.75rem', md: '0.875rem' }
                          }}
                        >
                          {amenity.description}
                        </Typography>
                      </Box>
                    </Box>
                    {formData[amenity.key] && (
                      <Chip
                        icon={<CheckCircle />}
                        label="選択済み"
                        size="small"
                        sx={{
                          background: `linear-gradient(135deg, ${amenity.color} 0%, ${amenity.color}dd 100%)`,
                          color: 'white',
                          fontWeight: 600,
                          '& .MuiChip-icon': {
                            color: 'white',
                          },
                        }}
                      />
                    )}
                  </Paper>
                ))}
              </Box>
            </Box>
          </Fade>
        )

      case 4:
        return (
          <Fade in={true} timeout={500}>
            <Box sx={{ py: 2 }}>
              <FormLabel sx={{ 
                mb: 3, 
                display: 'block', 
                fontWeight: 700,
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: '#2D3748'
              }}>
                画像・PDF（最大5つまで、任意）
              </FormLabel>
              
              <Paper
                className="glass-card"
                sx={{
                  p: { xs: 3, md: 4 },
                  textAlign: 'center',
                  border: '2px dashed rgba(102, 126, 234, 0.3)',
                  mb: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#667eea',
                    background: 'rgba(102, 126, 234, 0.05)',
                  },
                }}
              >
                <CloudUpload sx={{ fontSize: { xs: 48, md: 64 }, color: '#667eea', mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  ファイルをアップロード
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  画像（JPG, PNG）またはPDFファイルを選択してください
                </Typography>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUpload />}
                  disabled={selectedFiles.length >= 5}
                  sx={{
                    borderRadius: 3,
                    py: { xs: 1, md: 1.5 },
                    px: { xs: 3, md: 4 },
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    fontWeight: 600,
                  }}
                >
                  ファイルを選択
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*,application/pdf"
                    onChange={onFileSelect}
                  />
                </Button>
              </Paper>

              {selectedFiles.length > 0 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    選択されたファイル ({selectedFiles.length}/5)
                  </Typography>
                  <Stack spacing={2}>
                    {selectedFiles.map((file, index) => (
                      <Paper
                        key={index}
                        className="glass-card"
                        sx={{
                          p: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: 2,
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 2,
                            }}
                          >
                            <Image sx={{ color: 'white', fontSize: 20 }} />
                          </Box>
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {file.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </Typography>
                          </Box>
                        </Box>
                        <IconButton
                          onClick={() => onRemoveFile(index)}
                          sx={{
                            color: '#ff6b9d',
                            '&:hover': {
                              background: 'rgba(255, 107, 157, 0.1)',
                            },
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
              )}
            </Box>
          </Fade>
        )

      default:
        return null
    }
  }

  return getStepContent(activeStep)
}