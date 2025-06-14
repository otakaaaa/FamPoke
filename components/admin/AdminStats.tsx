'use client'

import React from 'react'
import {
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
  Skeleton,
  useTheme,
  useMediaQuery
} from '@mui/material'
import {
  LocationOn,
  RateReview,
  Visibility,
  TrendingUp,
  People,
  Schedule,
  CheckCircle,
  PendingActions
} from '@mui/icons-material'
import { Spot, SpotReview } from '@/lib/mockData'

interface AdminStatsProps {
  spots: Spot[]
  reviews: SpotReview[]
  loading: boolean
}

export function AdminStats({ spots, reviews, loading }: AdminStatsProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const stats = [
    {
      title: '総施設数',
      value: spots.length,
      icon: <LocationOn />,
      color: '#667eea',
      change: '+12%',
      subtitle: '今月の増加率'
    },
    {
      title: '公開中施設',
      value: spots.filter(s => s.is_visible).length,
      icon: <Visibility />,
      color: '#43e97b',
      change: `${Math.round((spots.filter(s => s.is_visible).length / spots.length) * 100)}%`,
      subtitle: '公開率'
    },
    {
      title: '総レビュー数',
      value: reviews.length,
      icon: <RateReview />,
      color: '#f093fb',
      change: '+8%',
      subtitle: '今月の増加率'
    },
    {
      title: '承認待ち',
      value: spots.filter(s => !s.is_visible).length + reviews.filter(r => !r.is_visible).length,
      icon: <PendingActions />,
      color: '#ffd93d',
      change: '-5%',
      subtitle: '前月比'
    },
    {
      title: '月間利用者',
      value: '2,847',
      icon: <People />,
      color: '#4facfe',
      change: '+23%',
      subtitle: '今月のアクティブユーザー'
    },
    {
      title: '平均評価',
      value: '4.8',
      icon: <CheckCircle />,
      color: '#ff6b9d',
      change: '+0.2',
      subtitle: '前月比'
    }
  ]

  const categoryStats = [
    { name: '公園', count: spots.filter(s => s.category === 'park').length, color: '#43e97b' },
    { name: 'カフェ', count: spots.filter(s => s.category === 'cafe').length, color: '#fa709a' },
    { name: '児童館', count: spots.filter(s => s.category === 'center').length, color: '#667eea' },
    { name: 'モール', count: spots.filter(s => s.category === 'mall').length, color: '#f093fb' },
    { name: '図書館', count: spots.filter(s => s.category === 'library').length, color: '#4facfe' },
    { name: 'その他', count: spots.filter(s => s.category === 'other').length, color: '#a8edea' }
  ]

  if (loading) {
    return (
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {Array.from({ length: 6 }, (_, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <Paper className="glass-card" sx={{ p: 3, borderRadius: 3 }}>
              <Skeleton variant="rectangular" width="100%" height={120} sx={{ borderRadius: 2 }} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <Box>
      {/* Main Stats Grid */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <Paper
              className="glass-card"
              sx={{
                p: 3,
                borderRadius: 3,
                border: `1px solid ${stat.color}20`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: !isMobile ? 'translateY(-4px)' : 'none',
                  boxShadow: `0 16px 64px ${stat.color}20`,
                  borderColor: `${stat.color}40`,
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 8px 32px ${stat.color}30`,
                  }}
                >
                  {React.cloneElement(stat.icon, { 
                    sx: { color: 'white', fontSize: 24 } 
                  })}
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: stat.color,
                      fontSize: { xs: '1.75rem', md: '2rem' },
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: stat.change.startsWith('+') ? '#43e97b' : stat.change.startsWith('-') ? '#ff6b9d' : stat.color,
                      fontWeight: 600,
                      fontSize: '0.875rem',
                    }}
                  >
                    {stat.change}
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#2D3748',
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  mb: 0.5,
                }}
              >
                {stat.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                }}
              >
                {stat.subtitle}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Category Distribution */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} lg={8}>
          <Paper
            className="glass-card"
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid rgba(102, 126, 234, 0.2)',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: '#2D3748',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <TrendingUp sx={{ color: '#667eea' }} />
              カテゴリ別施設分布
            </Typography>
            
            <Grid container spacing={2}>
              {categoryStats.map((category, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      background: `linear-gradient(135deg, ${category.color}15 0%, ${category.color}25 100%)`,
                      border: `1px solid ${category.color}30`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: !isMobile ? 'translateY(-2px)' : 'none',
                        boxShadow: `0 8px 32px ${category.color}20`,
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          color: category.color,
                        }}
                      >
                        {category.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: category.color,
                        }}
                      >
                        {category.count}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(category.count / spots.length) * 100}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        background: `${category.color}20`,
                        '& .MuiLinearProgress-bar': {
                          background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)`,
                          borderRadius: 3,
                        },
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper
            className="glass-card"
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid rgba(102, 126, 234, 0.2)',
              height: 'fit-content',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: '#2D3748',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Schedule sx={{ color: '#667eea' }} />
              最近のアクティビティ
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { action: '新しい施設が投稿されました', time: '2分前', color: '#43e97b' },
                { action: 'レビューが承認されました', time: '15分前', color: '#4facfe' },
                { action: '施設情報が更新されました', time: '1時間前', color: '#f093fb' },
                { action: '新しいレビューが投稿されました', time: '2時間前', color: '#ffd93d' },
              ].map((activity, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    borderRadius: 2,
                    background: `${activity.color}10`,
                    border: `1px solid ${activity.color}20`,
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: activity.color,
                      mr: 2,
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: '#2D3748',
                        fontSize: '0.875rem',
                      }}
                    >
                      {activity.action}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.75rem',
                      }}
                    >
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}