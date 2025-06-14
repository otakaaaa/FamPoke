'use client'

import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material'
import {
  Close,
  Policy,
  Security,
  Info,
  Shield
} from '@mui/icons-material'

interface PrivacyDialogProps {
  open: boolean
  onClose: () => void
}

export default function PrivacyDialog({ open, onClose }: PrivacyDialogProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const sections = [
    {
      title: '収集する情報',
      icon: <Info />,
      color: '#667eea',
      content: [
        '施設投稿時に入力される施設情報（名称、住所、設備情報等）',
        'レビュー投稿時のコメント内容',
        'アップロードされる画像ファイル',
        'サービス利用時のアクセスログ（IPアドレス、ブラウザ情報等）',
        'お問い合わせ時のメールアドレスと内容'
      ]
    },
    {
      title: '情報の利用目的',
      icon: <Security />,
      color: '#43e97b',
      content: [
        'サービスの提供・運営・改善',
        '施設情報の表示とレビューの公開',
        'お問い合わせへの対応',
        'サービスの安全性確保と不正利用の防止',
        '統計データの作成（個人を特定しない形式）'
      ]
    },
    {
      title: '情報の管理と保護',
      icon: <Shield />,
      color: '#4facfe',
      content: [
        '適切なセキュリティ対策により情報を保護',
        '不正アクセス、紛失、破損、改ざんの防止',
        '必要最小限の期間のみ情報を保持',
        '定期的なセキュリティ監査の実施',
        'スタッフへの適切な教育と管理'
      ]
    },
    {
      title: '第三者への提供',
      icon: <Policy />,
      color: '#f093fb',
      content: [
        '原則として第三者への提供は行いません',
        '法令に基づく開示要求がある場合',
        'サービス運営に必要な業務委託先への提供（適切な管理下）',
        'ユーザーの同意がある場合',
        '統計データ（個人を特定できない形式）の提供'
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
            <Policy sx={{ color: 'white', fontSize: { xs: 20, md: 24 } }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
              プライバシーポリシー
            </Typography>
            <Typography variant="body2" color="text.secondary">
              個人情報の取り扱いについて
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: { xs: 2, md: 3 }, py: 2 }}>
        {/* Introduction */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}>
            子育てスポット検索（以下「当サービス」）では、ユーザーの皆様に安心してサービスをご利用いただくため、
            個人情報の適切な取り扱いに努めております。
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
            本プライバシーポリシーでは、当サービスにおける個人情報の収集、利用、管理について説明いたします。
          </Typography>
        </Box>

        {/* Sections */}
        {sections.map((section, index) => (
          <Box key={index} sx={{ mb: 4 }}>
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

            <List sx={{ pl: 2 }}>
              {section.content.map((item, itemIndex) => (
                <ListItem key={itemIndex} sx={{ py: 0.5, pl: 0 }}>
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                        • {item}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ))}

        <Divider sx={{ my: 3 }} />

        {/* Additional Information */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#2D3748' }}>
            お問い合わせ
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 2 }}>
            プライバシーポリシーに関するご質問やご意見がございましたら、
            お問い合わせフォームからお気軽にご連絡ください。
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
            メールアドレス: privacy@childcare-spots.jp
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#2D3748' }}>
            改定について
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
            本プライバシーポリシーは、法令の変更やサービスの改善に伴い、
            予告なく変更する場合があります。重要な変更がある場合は、
            サービス内で適切にお知らせいたします。
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            最終更新日: 2024年1月1日
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}