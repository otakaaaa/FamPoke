'use client'

import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Card,
  CardContent,
  Avatar,
  Alert,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { Send, ThumbUp, ThumbUpOutlined } from '@mui/icons-material'
import { Spot, SpotReview } from '@/lib/mockData'
import { useMutation } from '@tanstack/react-query'

interface CommentSectionProps {
  spot: Spot
  reviews: SpotReview[]
}

export function CommentSection({ spot, reviews }: CommentSectionProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set())

  const submitComment = useMutation({
    mutationFn: async () => {
      if (!spot || !newComment.trim()) throw new Error()
      setLoading(true)
      setError('')
      await new Promise(resolve => setTimeout(resolve, 1000))
      setNewComment('')
      setError('')
      alert('コメントを投稿しました。管理者の承認後に表示されます。')
    },
    onError: () => setError('コメントの投稿に失敗しました'),
    onSettled: () => setLoading(false)
  })

  const handleSubmitComment = () => submitComment.mutate()

  const handleLikeComment = (reviewId: string) => {
    setLikedComments(prev => {
      const newSet = new Set(prev)
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId)
      } else {
        newSet.add(reviewId)
      }
      return newSet
    })
  }

  return (
    <Box>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 3, 
          fontWeight: 700,
          fontSize: { xs: '1.125rem', md: '1.25rem' },
          color: '#2D3748'
        }}
      >
        コメント ({reviews.length})
      </Typography>
      
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
      
      {/* Comment Input */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="コメントを入力してください（最大126文字）"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value.slice(0, 126))}
          inputProps={{ maxLength: 126 }}
          helperText={`${newComment.length}/126文字`}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: 3,
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
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.6,
              boxShadow: 'none !important',
            },
            '& .MuiFormHelperText-root': {
              fontSize: { xs: '0.75rem', md: '0.875rem' },
              color: '#667eea',
              fontWeight: 500,
            },
          }}
        />
        <Button
          variant="contained"
          startIcon={<Send />}
          onClick={handleSubmitComment}
          disabled={loading || !newComment.trim()}
          sx={{
            borderRadius: 3,
            px: { xs: 3, md: 4 },
            py: { xs: 1, md: 1.5 },
            fontSize: { xs: '0.875rem', md: '1rem' },
            fontWeight: 700,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              transform: !isMobile ? 'translateY(-2px)' : 'none',
              boxShadow: '0 12px 48px rgba(102, 126, 234, 0.4)',
            },
            '&:disabled': {
              background: 'rgba(102, 126, 234, 0.3)',
              color: 'rgba(255, 255, 255, 0.7)',
              boxShadow: 'none',
            },
          }}
        >
          {loading ? '投稿中...' : '投稿'}
        </Button>
      </Box>

      {/* Comments List */}
      {reviews.length > 0 ? (
        <Stack spacing={3}>
          {reviews.map((review) => (
            <Card 
              key={review.id} 
              variant="outlined" 
              className="glass-card"
              sx={{
                border: '1px solid rgba(102, 126, 234, 0.1)',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'rgba(102, 126, 234, 0.3)',
                  transform: !isMobile ? 'translateY(-2px)' : 'none',
                  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.15)',
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      width: { xs: 36, md: 40 }, 
                      height: { xs: 36, md: 40 }, 
                      mr: 2, 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      fontWeight: 700
                    }}
                  >
                    匿
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 1,
                        fontSize: { xs: '0.875rem', md: '1rem' },
                        lineHeight: 1.6,
                        color: '#2D3748'
                      }}
                    >
                      {review.comment}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      gap: { xs: 1, sm: 0 }
                    }}>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'text.secondary',
                          fontSize: { xs: '0.75rem', md: '0.875rem' }
                        }}
                      >
                        {new Date(review.created_at).toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Typography>
                      
                      {/* Like Button */}
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                          onClick={() => handleLikeComment(review.id)}
                          size="small"
                          sx={{
                            color: likedComments.has(review.id) ? '#ff6b9d' : 'text.secondary',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              color: '#ff6b9d',
                              transform: !isMobile ? 'scale(1.1)' : 'none',
                            },
                          }}
                        >
                          {likedComments.has(review.id) ? <ThumbUp /> : <ThumbUpOutlined />}
                        </IconButton>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            ml: 0.5,
                            color: likedComments.has(review.id) ? '#ff6b9d' : 'text.secondary',
                            fontWeight: 600,
                            fontSize: { xs: '0.75rem', md: '0.875rem' }
                          }}
                        >
                          {Math.floor(Math.random() * 20) + (likedComments.has(review.id) ? 1 : 0)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            py: { xs: 4, md: 6 },
            background: 'rgba(102, 126, 234, 0.05)',
            borderRadius: 3,
            border: '1px solid rgba(102, 126, 234, 0.1)',
          }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', md: '1rem' },
              fontWeight: 500
            }}
          >
            まだコメントがありません
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              fontSize: { xs: '0.75rem', md: '0.875rem' },
              mt: 1
            }}
          >
            最初のコメントを投稿してみませんか？
          </Typography>
        </Box>
      )}
    </Box>
  )
}