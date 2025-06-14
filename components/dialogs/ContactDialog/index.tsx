'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material'
import {
  Close,
  Send,
  ContactSupport,
  CheckCircle
} from '@mui/icons-material'
import { useMutation } from '@tanstack/react-query'

interface ContactDialogProps {
  open: boolean
  onClose: () => void
}

export default function ContactDialog({ open, onClose }: ContactDialogProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  const [formData, setFormData] = useState({
    category: 'general',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const categories = [
    { value: 'general', label: '一般的な質問' },
    { value: 'technical', label: '技術的な問題' },
    { value: 'content', label: '施設情報について' },
    { value: 'report', label: '不適切なコンテンツの報告' },
    { value: 'suggestion', label: '機能改善の提案' }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const sendMessage = useMutation({
    mutationFn: async () => {
      if (!formData.email || !formData.subject || !formData.message) {
        throw new Error('すべての必須項目を入力してください')
      }
      if (!formData.email.includes('@')) {
        throw new Error('有効なメールアドレスを入力してください')
      }

      setLoading(true)
      setError('')
      await new Promise(resolve => setTimeout(resolve, 2000))

      setSuccess(true)
      setTimeout(() => {
        setFormData({
          category: 'general',
          email: '',
          subject: '',
          message: ''
        })
        setSuccess(false)
        onClose()
      }, 2000)
    },
    onError: (err: any) => {
      console.error('Error sending message:', err)
      setError(err.message || '送信に失敗しました。しばらく後でもう一度お試しください。')
    },
    onSettled: () => setLoading(false)
  })

  const handleSubmit = () => {
    sendMessage.mutate()
  }

  if (success) {
    return (
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          className: 'glass',
          sx: {
            borderRadius: 4,
            textAlign: 'center',
          }
        }}
      >
        <Box sx={{ p: 4 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              boxShadow: '0 16px 64px rgba(67, 233, 123, 0.4)',
            }}
          >
            <CheckCircle sx={{ color: 'white', fontSize: 40 }} />
          </Box>
          
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: '#43e97b' }}>
            送信完了！
          </Typography>
          
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
            お問い合わせありがとうございます。
            24時間以内にご返信いたします。
          </Typography>
          
          <Button
            onClick={onClose}
            variant="contained"
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.5,
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            }}
          >
            閉じる
          </Button>
        </Box>
      </Dialog>
    )
  }

  return (
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
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
              boxShadow: '0 8px 32px rgba(79, 172, 254, 0.3)',
            }}
          >
            <ContactSupport sx={{ color: 'white', fontSize: { xs: 20, md: 24 } }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
              お問い合わせ
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ご質問やご要望をお聞かせください
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: { xs: 2, md: 3 }, py: 3 }}>
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

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Category Selection */}
          <FormControl component="fieldset">
            <FormLabel 
              component="legend" 
              sx={{ 
                mb: 2, 
                fontWeight: 700,
                color: '#2D3748',
                fontSize: { xs: '1rem', md: '1.1rem' }
              }}
            >
              お問い合わせの種類
            </FormLabel>
            <RadioGroup
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              sx={{ gap: 1 }}
            >
              {categories.map((category) => (
                <FormControlLabel
                  key={category.value}
                  value={category.value}
                  control={
                    <Radio 
                      sx={{
                        '&.Mui-checked': {
                          color: '#4facfe',
                        },
                      }}
                    />
                  }
                  label={category.label}
                  sx={{
                    background: formData.category === category.value 
                      ? 'rgba(79, 172, 254, 0.1)' 
                      : 'transparent',
                    borderRadius: 2,
                    px: 1,
                    py: 0.5,
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {/* Email */}
          <TextField
            label="メールアドレス"
            type="email"
            required
            fullWidth
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your-email@example.com"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                '&.Mui-focused fieldset': {
                  borderColor: '#4facfe',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#4facfe',
              },
              '& .MuiInputBase-input': {
                boxShadow: 'none !important',
              },
            }}
          />

          {/* Subject */}
          <TextField
            label="件名"
            required
            fullWidth
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            placeholder="お問い合わせの件名を入力してください"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                '&.Mui-focused fieldset': {
                  borderColor: '#4facfe',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#4facfe',
              },
              '& .MuiInputBase-input': {
                boxShadow: 'none !important',
              },
            }}
          />

          {/* Message */}
          <TextField
            label="メッセージ"
            required
            fullWidth
            multiline
            rows={6}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            placeholder="詳細な内容をお書きください..."
            inputProps={{ maxLength: 1000 }}
            helperText={`${formData.message.length}/1000文字`}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                '&.Mui-focused fieldset': {
                  borderColor: '#4facfe',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#4facfe',
              },
              '& .MuiFormHelperText-root': {
                color: '#4facfe',
                fontWeight: 500,
              },
              '& .MuiInputBase-input': {
                boxShadow: 'none !important',
              },
            }}
          />

          {/* Info Box */}
          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              background: 'rgba(79, 172, 254, 0.1)',
              border: '1px solid rgba(79, 172, 254, 0.2)',
            }}
          >
            <Typography variant="body2" sx={{ color: '#4facfe', fontWeight: 600, mb: 1 }}>
              📧 返信について
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
              通常24時間以内にご返信いたします。お急ぎの場合は、件名に「緊急」とご記載ください。
              技術的な問題の場合は、ご利用環境（ブラウザ、デバイス等）もお教えください。
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ 
        px: { xs: 2, md: 3 }, 
        py: 2, 
        borderTop: '1px solid rgba(79, 172, 254, 0.1)',
        gap: 2
      }}>
        <Button
          onClick={onClose}
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          キャンセル
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
          disabled={loading || !formData.email || !formData.subject || !formData.message}
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            background: loading 
              ? 'rgba(79, 172, 254, 0.5)' 
              : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            '&:hover': {
              background: loading 
                ? 'rgba(79, 172, 254, 0.5)' 
                : 'linear-gradient(135deg, #2d9cfe 0%, #00d4e6 100%)',
            },
          }}
        >
          {loading ? '送信中...' : '送信する'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}