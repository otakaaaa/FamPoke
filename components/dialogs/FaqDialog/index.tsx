'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material'
import {
  Close,
  ExpandMore,
  QuestionAnswer,
  Search,
  TrendingUp,
  Help,
  Security,
  Settings
} from '@mui/icons-material'

interface FaqDialogProps {
  open: boolean
  onClose: () => void
}

export default function FaqDialog({ open, onClose }: FaqDialogProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'すべて', color: '#667eea' },
    { id: 'basic', label: '基本操作', color: '#43e97b' },
    { id: 'posting', label: '投稿について', color: '#f093fb' },
    { id: 'technical', label: '技術的な問題', color: '#4facfe' },
    { id: 'account', label: 'アカウント', color: '#ffd93d' }
  ]

  const faqData = [
    {
      category: 'basic',
      question: '施設を検索するにはどうすればいいですか？',
      answer: 'トップページの検索バーに施設名や住所を入力するか、ヘッダーの検索アイコンをクリックしてフィルター機能を使用してください。カテゴリ、設備、対象年齢などで絞り込み検索が可能です。',
      popular: true
    },
    {
      category: 'basic',
      question: '施設の詳細情報はどこで確認できますか？',
      answer: '施設カードをクリックすると詳細ページが開きます。そこで住所、営業時間、設備情報、写真、他のユーザーのレビューなどを確認できます。',
      popular: true
    },
    {
      category: 'posting',
      question: '新しい施設を投稿するにはどうすればいいですか？',
      answer: 'ヘッダーの「+」ボタンまたはフッターの「施設を投稿」をクリックしてください。5つのステップで施設情報を入力できます：基本情報、場所・時間、対象年齢、設備・サービス、画像アップロード。',
      popular: true
    },
    {
      category: 'posting',
      question: '投稿した施設はすぐに表示されますか？',
      answer: '投稿された施設は管理者の承認後に公開されます。通常24時間以内に確認し、適切な内容であれば公開いたします。承認状況についてはお問い合わせください。',
      popular: false
    },
    {
      category: 'posting',
      question: 'どのような写真をアップロードできますか？',
      answer: 'JPG、PNG形式の画像ファイル（最大10MB）を5枚まで投稿できます。施設の外観、内部、設備の写真をアップロードしてください。個人が特定できる写真は避けてください。',
      popular: false
    },
    {
      category: 'basic',
      question: 'レビューを投稿するにはどうすればいいですか？',
      answer: '施設詳細ページのコメント欄に感想や体験談を入力してください。最大126文字まで投稿可能で、すべて匿名で投稿されます。',
      popular: true
    },
    {
      category: 'account',
      question: 'アカウント登録は必要ですか？',
      answer: '基本的な機能（検索、閲覧）は登録不要で利用できます。施設の投稿やレビューも匿名で行えるため、アカウント登録は必須ではありません。',
      popular: true
    },
    {
      category: 'technical',
      question: '検索結果が表示されません',
      answer: 'ブラウザを更新するか、検索条件を変更してみてください。問題が続く場合は、ブラウザのキャッシュをクリアするか、お問い合わせフォームからご連絡ください。',
      popular: false
    },
    {
      category: 'technical',
      question: '画像がアップロードできません',
      answer: 'ファイルサイズが10MB以下で、JPGまたはPNG形式であることを確認してください。ネットワーク接続も確認し、問題が続く場合は別のブラウザでお試しください。',
      popular: false
    },
    {
      category: 'account',
      question: 'お気に入り機能はありますか？',
      answer: '現在開発中の機能です。将来的にお気に入り施設の保存機能を追加予定です。リリース時期については公式アナウンスをお待ちください。',
      popular: false
    },
    {
      category: 'basic',
      question: '不適切なコンテンツを見つけた場合はどうすればいいですか？',
      answer: 'お問い合わせフォームから詳細をご報告ください。管理者が確認し、必要に応じて適切な対応を行います。コミュニティの安全性を保つためご協力をお願いします。',
      popular: false
    },
    {
      category: 'technical',
      question: 'モバイルでも利用できますか？',
      answer: 'はい、スマートフォンやタブレットでも快適にご利用いただけるよう最適化されています。すべての機能がモバイル端末でも利用可能です。',
      popular: true
    }
  ]

  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const popularFaqs = faqData.filter(faq => faq.popular)

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
              background: 'linear-gradient(135deg, #ffd93d 0%, #ff9f43 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
              boxShadow: '0 8px 32px rgba(255, 217, 61, 0.3)',
            }}
          >
            <QuestionAnswer sx={{ color: 'white', fontSize: { xs: 20, md: 24 } }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
              よくある質問
            </Typography>
            <Typography variant="body2" color="text.secondary">
              お困りの際はこちらをご確認ください
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: { xs: 2, md: 3 }, py: 2 }}>
        {/* Search Bar */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="質問を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#ffd93d' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                border: '2px solid rgba(255, 217, 61, 0.2)',
                '&:hover': {
                  borderColor: 'rgba(255, 217, 61, 0.4)',
                },
                '&.Mui-focused': {
                  borderColor: '#ffd93d',
                },
                '& fieldset': {
                  border: 'none',
                },
              },
            }}
          />
        </Box>

        {/* Category Filter */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#2D3748' }}>
            カテゴリ
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {categories.map((category) => (
              <Chip
                key={category.id}
                label={category.label}
                clickable
                onClick={() => setSelectedCategory(category.id)}
                sx={{
                  borderRadius: 3,
                  fontWeight: 600,
                  ...(selectedCategory === category.id ? {
                    background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)`,
                    color: 'white',
                    transform: 'scale(1.05)',
                  } : {
                    background: `${category.color}20`,
                    color: category.color,
                    border: `1px solid ${category.color}40`,
                    '&:hover': {
                      background: `${category.color}30`,
                    },
                  }),
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Popular Questions */}
        {searchQuery === '' && selectedCategory === 'all' && (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingUp sx={{ color: '#ff6b9d', mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#2D3748' }}>
                人気の質問
              </Typography>
            </Box>
            {popularFaqs.slice(0, 3).map((faq, index) => (
              <Accordion 
                key={`popular-${index}`}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  border: '1px solid rgba(255, 107, 157, 0.2)',
                  '&:before': { display: 'none' },
                  boxShadow: 'none',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: '#ff6b9d' }} />}
                  sx={{
                    background: 'rgba(255, 107, 157, 0.1)',
                    borderRadius: 2,
                    '&:hover': {
                      background: 'rgba(255, 107, 157, 0.2)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <TrendingUp sx={{ color: '#ff6b9d', mr: 1, fontSize: 18 }} />
                    <Typography sx={{ fontWeight: 600, color: '#2D3748', flex: 1 }}>
                      {faq.question}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 2 }}>
                  <Typography sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}

        {/* All Questions */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#2D3748' }}>
            {searchQuery ? `検索結果 (${filteredFaqs.length}件)` : 'すべての質問'}
          </Typography>
          
          {filteredFaqs.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Search sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1, color: 'text.secondary' }}>
                該当する質問が見つかりませんでした
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                検索条件を変更するか、お問い合わせフォームからご質問ください
              </Typography>
            </Box>
          ) : (
            filteredFaqs.map((faq, index) => {
              const categoryInfo = categories.find(cat => cat.id === faq.category)
              return (
                <Accordion 
                  key={index}
                  sx={{
                    mb: 1,
                    borderRadius: 2,
                    border: `1px solid ${categoryInfo?.color}20`,
                    '&:before': { display: 'none' },
                    boxShadow: 'none',
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore sx={{ color: categoryInfo?.color }} />}
                    sx={{
                      background: `${categoryInfo?.color}10`,
                      borderRadius: 2,
                      '&:hover': {
                        background: `${categoryInfo?.color}20`,
                      },
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, color: '#2D3748' }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 2 }}>
                    <Typography sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              )
            })
          )}
        </Box>

        {/* Help Section */}
        <Box sx={{ mt: 4, p: 3, borderRadius: 3, background: 'rgba(102, 126, 234, 0.1)', border: '1px solid rgba(102, 126, 234, 0.2)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Help sx={{ color: '#667eea', mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#667eea' }}>
              解決しませんでしたか？
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
            上記で解決しない場合は、お問い合わせフォームからお気軽にご連絡ください。
            サポートチームが迅速に対応いたします。
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}