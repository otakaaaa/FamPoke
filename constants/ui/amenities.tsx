import React from 'react'
import {
  BabyChangingStation,
  ChildCare,
  Home,
  LocalLaundryService,
  Wc,
  DirectionsCar
} from '@mui/icons-material'

export const amenities = [
  { 
    key: 'hasNursingRoom' as const, 
    label: '授乳室', 
    icon: <BabyChangingStation />, 
    color: '#ff6b9d',
    description: 'プライベートな授乳スペース'
  },
  { 
    key: 'hasDiaperSpace' as const, 
    label: 'おむつ替えスペース', 
    icon: <ChildCare />, 
    color: '#4ecdc4',
    description: 'おむつ交換用の設備'
  },
  { 
    key: 'hasKidsSpace' as const, 
    label: 'キッズスペース', 
    icon: <Home />, 
    color: '#45b7d1',
    description: '子供が遊べる専用エリア'
  },
  { 
    key: 'hasStrollerSpace' as const, 
    label: 'ベビーカー置き場', 
    icon: <DirectionsCar />, 
    color: '#96ceb4',
    description: 'ベビーカーを安全に置ける場所'
  },
  { 
    key: 'hasSink' as const, 
    label: '洗面台', 
    icon: <LocalLaundryService />, 
    color: '#feca57',
    description: '手洗いや清潔維持のための設備'
  },
  { 
    key: 'hasDiaperTrash' as const, 
    label: 'おむつ用ゴミ箱', 
    icon: <Wc />, 
    color: '#ff9ff3',
    description: 'おむつ専用の廃棄場所'
  }
]