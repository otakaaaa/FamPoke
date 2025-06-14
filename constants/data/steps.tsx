import React from 'react'
import {
  Info,
  LocationOn,
  ChildCare,
  Settings,
  Image
} from '@mui/icons-material'

export const steps = [
  {
    label: '基本情報',
    icon: <Info />,
    description: '施設の名前とカテゴリを入力'
  },
  {
    label: '場所・時間',
    icon: <LocationOn />,
    description: '住所と営業時間を設定'
  },
  {
    label: '対象年齢',
    icon: <ChildCare />,
    description: '利用できる年齢層を指定'
  },
  {
    label: '設備・サービス',
    icon: <Settings />,
    description: '利用可能な設備を選択'
  },
  {
    label: '画像・完了',
    icon: <Image />,
    description: '写真をアップロードして完了'
  }
]