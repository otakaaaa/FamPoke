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
  Security,
  Gavel,
  Warning,
  CheckCircle
} from '@mui/icons-material'

interface TermsDialogProps {
  open: boolean
  onClose: () => void
}

export default function TermsDialog({ open, onClose }: TermsDialogProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const sections = [
    {
      title: 'サービスの利用について',
      icon: <CheckCircle />,
      color: '#43e97b',
      content: [
        '当サービスは子育て支援を目的とした施設検索サービスです',
        '利用は無料で、アカウント登録なしでもご利用いただけます',
        '投稿された情報は管理者の承認後に公開されます',
        '虚偽の情報や不適切な内容の投稿は禁止されています',
        'サービスの安定運営のため、予告なく機能変更や停止を行う場合があります'
      ]
    },
    {
      title: '投稿に関するルール',
      icon: <Gavel />,
      color: '#667eea',
      content: [
        '正確で有用な施設情報の投稿をお願いします',
        '個人を特定できる情報（個人名、連絡先等）の投稿は禁止です',
        '著作権を侵害する画像や内容の投稿は禁止です',
        '商業的な宣伝や営業目的の投稿は禁止です',
        '他のユーザーや施設を誹謗中傷する内容は禁止です'
      ]
    },
    {
      title: '禁止事項',
      icon: <Warning />,
      color: '#ff6b9d',
      content: [
        'サービスの運営を妨害する行為',
        '他のユーザーに迷惑をかける行為',
        '法令に違反する行為や内容の投稿',
        'システムへの不正アクセスや攻撃',
        '当サービスの信用を損なう行為'
      ]
    },
    {
      title: '免責事項',
      icon: <Security />,
      color: '#4facfe',
      content: [
        '投稿された施設情報の正確性について保証いたしません',
        '施設の営業状況や設備の変更について責任を負いません',
        'サービス利用により生じた損害について責任を負いません',
        '第三者との間で生じたトラブルについて責任を負いません',
        'システム障害やメンテナンスによる利用停止について責任を負いません'
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
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
              boxShadow: '0 8px 32px rgba(67, 233, 123, 0.3)',
            }}
          >
            <Security sx={{ color: 'white', fontSize: { xs: 20, md: 24 } }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
              利用規約
            </Typography>
            <Typography variant="body2" color="text.secondary">
              サービス利用時の規約とルール
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
            子育てスポット検索（以下「当サービス」）をご利用いただき、ありがとうございます。
            本利用規約は、当サービスの利用に関する条件を定めたものです。
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
            当サービスをご利用いただく際は、本規約にご同意いただいたものとみなします。
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
                      <Typography variant="body2\" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
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
            規約の変更
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
            当サービスは、必要に応じて本利用規約を変更する場合があります。
            重要な変更がある場合は、サービス内で適切にお知らせいたします。
            変更後も継続してサービスをご利用いただく場合、変更後の規約にご同意いただいたものとみなします。
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#2D3748' }}>
            お問い合わせ
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 2 }}>
            利用規約に関するご質問やご不明な点がございましたら、
            お問い合わせフォームからお気軽にご連絡ください。
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
            メールアドレス: support@childcare-spots.jp
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