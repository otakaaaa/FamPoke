'use client'

import React from 'react'
import {
  Drawer,
  Box,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { Clear, Close, Tune } from '@mui/icons-material'
import { useAtom } from 'jotai'
import { filtersAtom, isFilterDrawerOpenAtom } from '@/lib/atoms'
import { FilterSections } from './FilterSections'

export default function FilterDrawer() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [isOpen, setIsOpen] = useAtom(isFilterDrawerOpenAtom)
  const [filters, setFilters] = useAtom(filtersAtom)

  const handleClose = () => {
    setIsOpen(false)
  }

  const clearFilters = () => {
    setFilters({
      category: [],
      hasNursingRoom: null,
      hasDiaperSpace: null,
      hasKidsSpace: null,
      hasStrollerSpace: null,
      hasSink: null,
      hasDiaperTrash: null,
      indoor: null,
      ageRange: [0, 18]
    })
  }

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        className: 'glass',
        sx: {
          width: { xs: '100%', sm: 420 },
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }
      }}
    >
      <Box sx={{ p: { xs: 3, md: 4 }, height: '100%', overflow: 'auto' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 3, md: 4 } }}>
          <Box
            sx={{
              width: { xs: 40, md: 48 },
              height: { xs: 40, md: 48 },
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
            }}
          >
            <Tune sx={{ color: 'white', fontSize: { xs: 20, md: 24 } }} />
          </Box>
          <Typography 
            variant="h5" 
            sx={{ 
              flex: 1, 
              fontWeight: 700,
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            絞り込み検索
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              background: 'rgba(102, 126, 234, 0.1)',
              width: { xs: 36, md: 40 },
              height: { xs: 36, md: 40 },
              '&:hover': {
                background: 'rgba(102, 126, 234, 0.2)',
              },
            }}
          >
            <Close sx={{ fontSize: { xs: 18, md: 20 } }} />
          </IconButton>
        </Box>

        {/* Clear Button */}
        <Button
          startIcon={<Clear />}
          onClick={clearFilters}
          variant="outlined"
          fullWidth
          sx={{
            mb: { xs: 3, md: 4 },
            borderRadius: 3,
            py: { xs: 1, md: 1.5 },
            fontSize: { xs: '0.875rem', md: '1rem' },
            fontWeight: 600,
            borderWidth: 2,
            borderColor: '#667eea',
            color: '#667eea',
            background: 'rgba(255, 255, 255, 0.9)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderColor: '#667eea',
              color: 'white',
              transform: !isMobile ? 'translateY(-2px)' : 'none',
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
              '& .MuiButton-startIcon': {
                color: 'white',
              },
            },
            '&:active': {
              transform: 'scale(0.98)',
            },
          }}
        >
          すべてクリア
        </Button>

        {/* Filter Sections */}
        <FilterSections filters={filters} setFilters={setFilters} />
      </Box>
    </Drawer>
  )
}