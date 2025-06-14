'use client'

import React, { useState } from 'react'
import {
  Typography,
  Box,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
  Button,
  TextField,
  Divider,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material'
import {
  Settings,
  Notifications,
  Security,
  Backup,
  Email,
  Save,
  RestartAlt
} from '@mui/icons-material'
import { useMutation } from '@tanstack/react-query'

export function AdminSettings() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  const [settings, setSettings] = useState({
    autoApproval: false,
    emailNotifications: true,
    maintenanceMode: false,
    backupEnabled: true,
    maxFileSize: '10',
    adminEmail: 'admin@childcare-spots.jp',
  })
  
  const [saved, setSaved] = useState(false)

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const saveSettings = useMutation({
    mutationFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
    },
    onSuccess: () => {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  })

  const handleSave = () => {
    saveSettings.mutate()
  }

  const settingSections = [
    {
      title: 'コンテンツ管理',
      icon: <Settings />,
      color: '#667eea',
      settings: [
        {
          key: 'autoApproval',
          label: '自動承認',
          description: '新しい投稿を自動的に承認する',
          type: 'switch' as const,
        },
        {
          key: 'maxFileSize',
          label: '最大ファイルサイズ (MB)',
          description: 'アップロード可能な最大ファイルサイズ',
          type: 'text' as const,
        },
      ],
    },
    {
      title: '通知設定',
      icon: <Notifications />,
      color: '#f093fb',
      settings: [
        {
          key: 'emailNotifications',
          label: 'メール通知',
          description: '新しい投稿やレビューの通知を受け取る',
          type: 'switch' as const,
        },
        {
          key: 'adminEmail',
          label: '管理者メールアドレス',
          description: '通知を受け取るメールアドレス',
          type: 'text' as const,
        },
      ],
    },
    {
      title: 'システム設定',
      icon: <Security />,
      color: '#43e97b',
      settings: [
        {
          key: 'maintenanceMode',
          label: 'メンテナンスモード',
          description: 'サイトをメンテナンスモードにする',
          type: 'switch' as const,
        },
        {
          key: 'backupEnabled',
          label: '自動バックアップ',
          description: 'データの自動バックアップを有効にする',
          type: 'switch' as const,
        },
      ],
    },
  ]

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Settings sx={{ color: '#667eea', fontSize: 28 }} />
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700,
              color: '#2D3748',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            システム設定
          </Typography>
        </Box>
        
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleSave}
          sx={{
            borderRadius: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            },
          }}
        >
          設定を保存
        </Button>
      </Box>

      {saved && (
        <Alert 
          severity="success" 
          className="glass"
          sx={{ 
            mb: 3,
            borderRadius: 3,
            border: '1px solid rgba(67, 233, 123, 0.2)',
          }}
        >
          設定が保存されました
        </Alert>
      )}

      {/* Settings Sections */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {settingSections.map((section, sectionIndex) => (
          <Grid item xs={12} lg={6} key={sectionIndex}>
            <Paper
              className="glass-card"
              sx={{
                p: 3,
                borderRadius: 3,
                border: `1px solid ${section.color}20`,
                height: 'fit-content',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    background: `linear-gradient(135deg, ${section.color} 0%, ${section.color}dd 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  {React.cloneElement(section.icon, { 
                    sx: { color: 'white', fontSize: 20 } 
                  })}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: '#2D3748',
                  }}
                >
                  {section.title}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {section.settings.map((setting, settingIndex) => (
                  <Box key={setting.key}>
                    {setting.type === 'switch' ? (
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings[setting.key] as boolean}
                            onChange={(e) => handleSettingChange(setting.key, e.target.checked)}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: section.color,
                                '& + .MuiSwitch-track': {
                                  background: `linear-gradient(135deg, ${section.color} 0%, ${section.color}dd 100%)`,
                                },
                              },
                            }}
                          />
                        }
                        label={
                          <Box>
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: 600,
                                color: '#2D3748',
                              }}
                            >
                              {setting.label}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'text.secondary',
                                fontSize: '0.875rem',
                              }}
                            >
                              {setting.description}
                            </Typography>
                          </Box>
                        }
                        sx={{ alignItems: 'flex-start', m: 0 }}
                      />
                    ) : (
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: '#2D3748',
                            mb: 0.5,
                          }}
                        >
                          {setting.label}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            fontSize: '0.875rem',
                            mb: 1,
                          }}
                        >
                          {setting.description}
                        </Typography>
                        <TextField
                          value={settings[setting.key] as string}
                          onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                          size="small"
                          fullWidth
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&.Mui-focused fieldset': {
                                borderColor: section.color,
                              },
                            },
                          }}
                        />
                      </Box>
                    )}
                    {settingIndex < section.settings.length - 1 && (
                      <Divider sx={{ mt: 2, borderColor: `${section.color}20` }} />
                    )}
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}

        {/* System Actions */}
        <Grid item xs={12}>
          <Paper
            className="glass-card"
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid rgba(255, 107, 157, 0.2)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #ff6b9d 0%, #f5576c 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                }}
              >
                <RestartAlt sx={{ color: 'white', fontSize: 20 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#2D3748',
                }}
              >
                システム操作
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="outlined"
                  startIcon={<Backup />}
                  fullWidth
                  sx={{
                    borderColor: '#4facfe',
                    color: '#4facfe',
                    py: 1.5,
                    '&:hover': {
                      background: 'rgba(79, 172, 254, 0.1)',
                      borderColor: '#4facfe',
                    },
                  }}
                >
                  バックアップ作成
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="outlined"
                  startIcon={<Email />}
                  fullWidth
                  sx={{
                    borderColor: '#ffd93d',
                    color: '#ffd93d',
                    py: 1.5,
                    '&:hover': {
                      background: 'rgba(255, 217, 61, 0.1)',
                      borderColor: '#ffd93d',
                    },
                  }}
                >
                  テストメール送信
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="outlined"
                  startIcon={<RestartAlt />}
                  fullWidth
                  sx={{
                    borderColor: '#43e97b',
                    color: '#43e97b',
                    py: 1.5,
                    '&:hover': {
                      background: 'rgba(67, 233, 123, 0.1)',
                      borderColor: '#43e97b',
                    },
                  }}
                >
                  キャッシュクリア
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Security />}
                  fullWidth
                  sx={{
                    py: 1.5,
                    '&:hover': {
                      background: 'rgba(245, 87, 108, 0.1)',
                    },
                  }}
                >
                  システム再起動
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}