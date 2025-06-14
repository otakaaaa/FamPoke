import React from 'react'
import { z } from 'zod'
import {
  Info,
  LocationOn,
  ChildCare,
  Settings,
  Image
} from '@mui/icons-material'
import { categories } from '@/constants/ui/categories'
import { amenities } from '@/constants/ui/amenities'

export const spotSchema = z.object({
  name: z.string().min(1, '施設名は必須です'),
  category: z.enum(['park', 'cafe', 'center', 'mall', 'library', 'other']),
  address: z.string().min(1, '住所は必須です'),
  googleMapUrl: z.string().optional(),
  targetAgeMin: z.number().min(0).max(17),
  targetAgeMax: z.number().min(1).max(18),
  indoor: z.boolean(),
  hasNursingRoom: z.boolean(),
  hasDiaperSpace: z.boolean(),
  hasStrollerSpace: z.boolean(),
  hasKidsSpace: z.boolean(),
  hasSink: z.boolean(),
  hasDiaperTrash: z.boolean(),
  openingHours: z.string().optional()
})

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

export { categories, amenities }