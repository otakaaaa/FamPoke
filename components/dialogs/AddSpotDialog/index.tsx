'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  LinearProgress,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { 
  Close, 
  NavigateNext, 
  NavigateBefore,
  CheckCircle
} from '@mui/icons-material'
import { z } from 'zod'
import { AddSpotFormData, AddSpotDialogProps } from './types'
import { spotSchema, steps } from './constants'
import { StepContent } from './StepContent'
import { SuccessModal } from './SuccessModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function AddSpotDialog({ open, onClose, onSuccess }: AddSpotDialogProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const queryClient = useQueryClient()
  
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState<AddSpotFormData>({
    name: '',
    category: 'park' as const,
    address: '',
    googleMapUrl: '',
    targetAgeRange: [0, 6] as [number, number],
    indoor: false,
    hasNursingRoom: false,
    hasDiaperSpace: false,
    hasStrollerSpace: false,
    hasKidsSpace: false,
    hasSink: false,
    hasDiaperTrash: false,
    openingHours: ''
  })

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successModalOpen, setSuccessModalOpen] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAgeRangeChange = (event: Event, newValue: number | number[]) => {
    setFormData(prev => ({ ...prev, targetAgeRange: newValue as [number, number] }))
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/')
      const isPdf = file.type === 'application/pdf'
      const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB
      return (isImage || isPdf) && isValidSize
    })

    if (selectedFiles.length + validFiles.length > 5) {
      setError('画像・PDFは最大5つまでアップロードできます')
      return
    }

    setSelectedFiles(prev => [...prev, ...validFiles])
    setError('')
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const addSpot = useMutation({
    mutationFn: async () => {
      setLoading(true)
      setError('')

      // Validate form data
      const validatedData = spotSchema.parse({
        name: formData.name,
        category: formData.category,
        address: formData.address,
        googleMapUrl: formData.googleMapUrl || undefined,
        targetAgeMin: formData.targetAgeRange[0],
        targetAgeMax: formData.targetAgeRange[1],
        indoor: formData.indoor,
        hasNursingRoom: formData.hasNursingRoom,
        hasDiaperSpace: formData.hasDiaperSpace,
        hasStrollerSpace: formData.hasStrollerSpace,
        hasKidsSpace: formData.hasKidsSpace,
        hasSink: formData.hasSink,
        hasDiaperTrash: formData.hasDiaperTrash,
        openingHours: formData.openingHours || undefined
      })

      await new Promise(resolve => setTimeout(resolve, 2000))

      onSuccess()
      onClose()
      
      // Reset form
      setFormData({
        name: '',
        category: 'park',
        address: '',
        googleMapUrl: '',
        targetAgeRange: [0, 6],
        indoor: false,
        hasNursingRoom: false,
        hasDiaperSpace: false,
        hasStrollerSpace: false,
        hasKidsSpace: false,
        hasSink: false,
        hasDiaperTrash: false,
        openingHours: ''
      })
      setSelectedFiles([])
      setActiveStep(0)

      // Show success modal instead of alert
      setSuccessModalOpen(true)

      queryClient.invalidateQueries({ queryKey: ['spots'] })
    },
    onError: (err: any) => {
      console.error('Error adding spot:', err)
      if (err.errors) {
        setError(err.errors[0].message)
      } else {
        setError(err.message || '施設の追加に失敗しました')
      }
    },
    onSettled: () => setLoading(false)
  })

  const handleSubmit = () => {
    addSpot.mutate()
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return formData.name.trim() !== ''
      case 1:
        return formData.address.trim() !== ''
      case 2:
        return true // Age range always valid
      case 3:
        return true // Amenities optional
      case 4:
        return true // Files optional
      default:
        return false
    }
  }

  return (
    <>
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
        {/* Header */}
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          pb: 1,
          borderBottom: '1px solid rgba(102, 126, 234, 0.1)',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: { xs: 40, md: 48 },
                height: { xs: 40, md: 48 },
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
              }}
            >
              {steps[activeStep].icon && React.cloneElement(steps[activeStep].icon, { 
                sx: { color: 'white', fontSize: { xs: 20, md: 24 } } 
              })}
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                新しい施設を追加
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {steps[activeStep].description}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
            <Close />
          </IconButton>
        </DialogTitle>

        {/* Progress Bar */}
        <Box sx={{ px: 3, pt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={(activeStep / (steps.length - 1)) * 100}
            sx={{
              height: 8,
              borderRadius: 4,
              background: 'rgba(102, 126, 234, 0.1)',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: 4,
              },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            {steps.map((step, index) => (
              <Typography
                key={index}
                variant="caption"
                sx={{
                  fontWeight: index <= activeStep ? 700 : 400,
                  color: index <= activeStep ? '#667eea' : 'text.secondary',
                  fontSize: { xs: '0.7rem', md: '0.75rem' },
                }}
              >
                {step.label}
              </Typography>
            ))}
          </Box>
        </Box>

        <DialogContent sx={{ px: { xs: 2, md: 3 }, py: 2 }}>
          {error && (
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
          )}
          
          <StepContent
            activeStep={activeStep}
            formData={formData}
            selectedFiles={selectedFiles}
            onInputChange={handleInputChange}
            onAgeRangeChange={handleAgeRangeChange}
            onFileSelect={handleFileSelect}
            onRemoveFile={removeFile}
          />
        </DialogContent>

        <DialogActions sx={{ 
          px: { xs: 2, md: 3 }, 
          py: 2, 
          borderTop: '1px solid rgba(102, 126, 234, 0.1)',
          gap: 2
        }}>
          <Button
            onClick={activeStep === 0 ? onClose : handleBack}
            startIcon={activeStep === 0 ? <Close /> : <NavigateBefore />}
            sx={{
              borderRadius: 3,
              px: { xs: 2, md: 3 },
              py: { xs: 1, md: 1.5 },
              fontSize: { xs: '0.875rem', md: '1rem' },
              fontWeight: 600,
            }}
          >
            {activeStep === 0 ? 'キャンセル' : '戻る'}
          </Button>

          <Box sx={{ flex: 1 }} />

          {activeStep < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              variant="contained"
              endIcon={<NavigateNext />}
              disabled={!isStepValid(activeStep)}
              sx={{
                borderRadius: 3,
                px: { xs: 3, md: 4 },
                py: { xs: 1, md: 1.5 },
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 600,
              }}
            >
              次へ
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              variant="contained"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CheckCircle />}
              disabled={loading}
              sx={{
                borderRadius: 3,
                px: { xs: 3, md: 4 },
                py: { xs: 1, md: 1.5 },
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 600,
                background: loading 
                  ? 'rgba(102, 126, 234, 0.5)' 
                  : 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                '&:hover': {
                  background: loading 
                    ? 'rgba(102, 126, 234, 0.5)' 
                    : 'linear-gradient(135deg, #3dd46f 0%, #2ee6cb 100%)',
                },
              }}
            >
              {loading ? '投稿中...' : '投稿完了'}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Success Modal */}
      <SuccessModal
        open={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        title="投稿完了！"
        message="施設を投稿しました。管理者の承認後に表示されます。ご協力ありがとうございました！"
      />
    </>
  )
}