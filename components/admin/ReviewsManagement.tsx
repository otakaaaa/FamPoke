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
  Switch,
  FormControlLabel,
  TextField,
  InputAdornment,
  TablePagination,
  Skeleton,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { Delete, Search, RateReview } from '@mui/icons-material'
import { SpotReview } from '@/lib/mockData'

interface ReviewsManagementProps {
  reviews: SpotReview[]
  loading: boolean
  onUpdateVisibility: (reviewId: string, isVisible: boolean) => void
  onDelete: (reviewId: string) => void
}

export function ReviewsManagement({ reviews, loading, onUpdateVisibility, onDelete }: ReviewsManagementProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const filteredReviews = reviews.filter(review =>
    review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (review.spots?.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  const paginatedReviews = filteredReviews.slice(
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
          <RateReview sx={{ color: '#f093fb', fontSize: 28 }} />
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700,
              color: '#2D3748',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            レビュー管理 ({filteredReviews.length}件)
          </Typography>
        </Box>
      </Box>

      {/* Search */}
      <Paper
        className="glass-card"
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          border: '1px solid rgba(240, 147, 251, 0.2)',
        }}
      >
        <TextField
          placeholder="レビュー内容や施設名で検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#f093fb' }} />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Table */}
      <Paper className="glass-card" sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.1) 0%, rgba(245, 87, 108, 0.1) 100%)' }}>
                <TableCell sx={{ fontWeight: 700, color: '#2D3748' }}>施設名</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2D3748' }}>コメント</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#2D3748' }}>公開状態</TableCell>
                {!isMobile && <TableCell sx={{ fontWeight: 700, color: '#2D3748' }}>投稿日</TableCell>}
                <TableCell sx={{ fontWeight: 700, color: '#2D3748' }}>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedReviews.map((review) => (
                <TableRow 
                  key={review.id}
                  sx={{
                    '&:hover': {
                      background: 'rgba(240, 147, 251, 0.05)',
                    },
                  }}
                >
                  <TableCell>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#2D3748' }}>
                      {review.spots?.name || '不明'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        maxWidth: { xs: 200, md: 300 },
                        color: '#2D3748',
                        lineHeight: 1.5,
                      }}
                    >
                      {review.comment}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={review.is_visible}
                          onChange={(e) => onUpdateVisibility(review.id, e.target.checked)}
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
                            color: review.is_visible ? '#43e97b' : 'text.secondary',
                            fontWeight: 600 
                          }}
                        >
                          {review.is_visible ? '公開' : '非公開'}
                        </Typography>
                      }
                    />
                  </TableCell>
                  {!isMobile && (
                    <TableCell>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {new Date(review.created_at).toLocaleDateString('ja-JP')}
                      </Typography>
                    </TableCell>
                  )}
                  <TableCell>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => onDelete(review.id)}
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
          count={filteredReviews.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="表示件数:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}件`}
          sx={{
            borderTop: '1px solid rgba(240, 147, 251, 0.1)',
            '& .MuiTablePagination-toolbar': {
              px: 3,
            },
          }}
        />
      </Paper>
    </Box>
  )
}