'use client'

import React, { useState } from 'react'
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Switch,
  FormControlLabel,
  TextField,
  InputAdornment,
  TablePagination,
  Skeleton,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { Delete, Search, FilterList, LocationOn } from '@mui/icons-material'
import { Spot } from '@/lib/mockData'

interface SpotsManagementProps {
  spots: Spot[]
  loading: boolean
  onUpdateVisibility: (spotId: string, isVisible: boolean) => void
  onDelete: (spotId: string) => void
}

export function SpotsManagement({ spots, loading, onUpdateVisibility, onDelete }: SpotsManagementProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

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

  const filteredSpots = spots.filter(spot =>
    spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    spot.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const paginatedSpots = filteredSpots.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  if (loading) {
    return (
      <Box>
        <Skeleton variant="rectangular" width="100%" height={60} sx={{ mb: 3, borderRadius: 2 }} />
        <Paper className="glass-card" sx={{ borderRadius: 3 }}>
          <Box sx={{ p: 3 }}>
            {Array.from({ length: 5 }, (_, index) => (
              <Skeleton key={index} variant="rectangular" width="100%" height={60} sx={{ mb: 2, borderRadius: 1 }} />
            ))}
          </Box>
        </Paper>
      </Box>
    )
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOn sx={{ color: '#667eea', fontSize: 28 }} />
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700,
              color: '#2D3748',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            施設管理 ({filteredSpots.length}件)
          </Typography>
        </Box>
      </Box>

      {/* Search and Filters */}
      <Paper
        className="glass-card"
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          border: '1px solid rgba(102, 126, 234, 0.2)',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
          <TextField
            placeholder="施設名や住所で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flex: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#667eea' }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            sx={{
              borderColor: '#667eea',
              color: '#667eea',
              '&:hover': {
                background: 'rgba(102, 126, 234, 0.1)',
                borderColor: '#667eea',
              },
            }}
          >
            フィルター
          </Button>
        </Box>
      </Paper>

      {/* Table */}
      <Paper className="glass-card" sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)' }}>
                <TableCell sx={{ fontWeight: 700, color: '#2D3748' }}>施設名</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2D3748' }}>カテゴリ</TableCell>
                {!isMobile && <TableCell sx={{ fontWeight: 700, color: '#2D3748' }}>住所</TableCell>}
                <TableCell sx={{ fontWeight: 700, color: '#2D3748' }}>公開状態</TableCell>
                {!isMobile && <TableCell sx={{ fontWeight: 700, color: '#2D3748' }}>投稿日</TableCell>}
                <TableCell sx={{ fontWeight: 700, color: '#2D3748' }}>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedSpots.map((spot) => (
                <TableRow 
                  key={spot.id}
                  sx={{
                    '&:hover': {
                      background: 'rgba(102, 126, 234, 0.05)',
                    },
                  }}
                >
                  <TableCell>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#2D3748' }}>
                        {spot.name}
                      </Typography>
                      {isMobile && (
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                          {spot.address}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={getCategoryLabel(spot.category)} 
                      size="small"
                      sx={{
                        background: `linear-gradient(135deg, ${getCategoryColor(spot.category)} 0%, ${getCategoryColor(spot.category)}dd 100%)`,
                        color: 'white',
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  {!isMobile && (
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 200 }}>
                        {spot.address}
                      </Typography>
                    </TableCell>
                  )}
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={spot.is_visible}
                          onChange={(e) => onUpdateVisibility(spot.id, e.target.checked)}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#43e97b',
                              '& + .MuiSwitch-track': {
                                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                              },
                            },
                          }}
                        />
                      }
                      label={
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: spot.is_visible ? '#43e97b' : 'text.secondary',
                            fontWeight: 600 
                          }}
                        >
                          {spot.is_visible ? '公開' : '非公開'}
                        </Typography>
                      }
                    />
                  </TableCell>
                  {!isMobile && (
                    <TableCell>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {new Date(spot.created_at).toLocaleDateString('ja-JP')}
                      </Typography>
                    </TableCell>
                  )}
                  <TableCell>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => onDelete(spot.id)}
                      sx={{
                        borderRadius: 2,
                        '&:hover': {
                          background: 'rgba(245, 87, 108, 0.1)',
                        },
                      }}
                    >
                      削除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredSpots.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="表示件数:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}件`}
          sx={{
            borderTop: '1px solid rgba(102, 126, 234, 0.1)',
            '& .MuiTablePagination-toolbar': {
              px: 3,
            },
          }}
        />
      </Paper>
    </Box>
  )
}