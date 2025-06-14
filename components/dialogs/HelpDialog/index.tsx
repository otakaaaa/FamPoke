'use client'

import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material'
import {
  Close,
  ExpandMore,
  Help,
  Search,
  Add,
  LocationOn,
  Star,
  Settings,
  Security,
  CheckCircle
} from '@mui/icons-material'

interface HelpDialogProps {
  open: boolean
  onClose: () => void
}

export default function HelpDialog({ open, onClose }: HelpDialogProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const helpSections = [
    {
      title: '基本的な使い方',
      icon: <Help />,
      color: '#667eea',
      items: [
        {
          question: '施設を検索するには？',
          answer: 'トップページの検索バーに施設名や住所を入力するか、フィルター機能を使って条件を絞り込んで検索できます。'
        },
        {
          question: '施設の詳細情報を見るには？',
          answer: '施設カードをクリックすると、詳細情報、設備、写真、レビューなどを確認できます。'
        },
        {
          question: 'フィルター機能の使い方は？',
          answer: 'ヘッダーの検索アイコンをクリックして、カテゴリ、設備、対象年齢などで絞り込み検索ができます。'
        }
      ]
    },
    {
      title: '施設の投稿について',
      icon: <Add />,
      color: '#43e97b',
      items: [
        {
          question: '新しい施設を投稿するには？',
          answer: 'ヘッダーの「+」ボタンまたはフッターの「施設を投稿」をクリックして、必要な情報を入力してください。'
        },
        {
          question: '投稿した施設はすぐに表示される？',
          answer: '投稿された施設は管理者の承認後に公開されます。通常24時間以内に確認いたします。'
        },
        {
          question: 'どんな写真をアップロードできる？',
          answer: 'JPG、PNG形式の画像ファイル（最大10MB）を5枚まで投稿できます。施設の外観や内部の写真をお願いします。'
        }
      ]
    },
    {
      title: 'レビューとコメント',
      icon: <Star />,
      color: '#f093fb',
      items: [
        {
          question: 'レビューを投稿するには？',
          answer: '施設詳細ページのコメント欄に感想や体験談を入力して投稿してください（最大126文字）。'
        },
        {
          question: '匿名でレビューできる？',
          answer: 'はい、すべてのレビューは匿名で投稿されます。個人情報は一切表示されません。'
        },
        {
          question: '不適切なレビューを見つけたら？',
          answer: 'お問い合わせフォームから報告してください。管理者が確認して適切に対応いたします。'
        }
      ]
    },
    {
      title: 'アカウントと設定',
      icon: <Settings />,
      color: '#4facfe',
      items: [
        {
          question: 'アカウント登録は必要？',
          answer: '基本的な機能（検索、閲覧）は登録不要で利用できます。投稿機能も匿名で利用可能です。'
        },
        {
          question: 'お気に入り機能はある？',
          answer: '現在開発中の機能です。将来的にお気に入り施設の保存機能を追加予定です。'
        },
        {
          question: 'データの安全性は？',
          answer: '投稿されたデータは適切に管理され、プライバシーポリシーに従って取り扱われます。'
        }
      ]
    }
  ]

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
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
            }}
          >
            <Help sx={{ color: 'white', fontSize: { xs: 20, md: 24 } }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
              ヘルプガイド
            </Typography>
            <Typography variant="body2" color="text.secondary">
              よくある質問と使い方ガイド
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: { xs: 2, md: 3 }, py: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
            子育てスポット検索の使い方や機能について、よくある質問をまとめました。
            お探しの情報が見つからない場合は、お問い合わせフォームからご連絡ください。
          </Typography>
        </Box>

        {helpSections.map((section, sectionIndex) => (
          <Box key={sectionIndex} sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  background: `linear-gradient(135deg, ${section.color} 0%, ${section.color}dd 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                }}
              >
                {React.cloneElement(section.icon, { 
                  sx: { color: 'white', fontSize: 18 } 
                })}
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: section.color,
                  fontSize: { xs: '1rem', md: '1.125rem' }
                }}
              >
                {section.title}
              </Typography>
            </Box>

            {section.items.map((item, itemIndex) => (
              <Accordion 
                key={itemIndex}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  border: `1px solid ${section.color}20`,
                  '&:before': { display: 'none' },
                  boxShadow: 'none',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: section.color }} />}
                  sx={{
                    background: `${section.color}10`,
                    borderRadius: 2,
                    '&:hover': {
                      background: `${section.color}20`,
                    },
                  }}
                >
                  <Typography sx={{ fontWeight: 600, color: '#2D3748' }}>
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 2 }}>
                  <Typography sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        ))}

        <Divider sx={{ my: 3 }} />

        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#2D3748' }}>
            さらにサポートが必要ですか？
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            上記で解決しない場合は、お気軽にお問い合わせください。
            サポートチームが迅速に対応いたします。
          </Typography>
          <Button
            variant="contained"
            startIcon={<CheckCircle />}
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #3dd46f 0%, #2ee6cb 100%)',
              },
            }}
          >
            お問い合わせする
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}