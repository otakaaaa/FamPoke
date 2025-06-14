import React from 'react'
import {
  BabyChangingStation,
  ChildCare,
  Home,
  LocalLaundryService,
  Wc,
  DirectionsCar
} from '@mui/icons-material'
import messages from '@/messages/ja.json'

export const amenities = [
  {
    key: 'hasNursingRoom' as const,
    label: messages.Amenities.hasNursingRoom.label,
    icon: <BabyChangingStation />,
    color: '#ff6b9d',
    description: messages.Amenities.hasNursingRoom.description
  },
  {
    key: 'hasDiaperSpace' as const,
    label: messages.Amenities.hasDiaperSpace.label,
    icon: <ChildCare />,
    color: '#4ecdc4',
    description: messages.Amenities.hasDiaperSpace.description
  },
  {
    key: 'hasKidsSpace' as const,
    label: messages.Amenities.hasKidsSpace.label,
    icon: <Home />,
    color: '#45b7d1',
    description: messages.Amenities.hasKidsSpace.description
  },
  {
    key: 'hasStrollerSpace' as const,
    label: messages.Amenities.hasStrollerSpace.label,
    icon: <DirectionsCar />,
    color: '#96ceb4',
    description: messages.Amenities.hasStrollerSpace.description
  },
  {
    key: 'hasSink' as const,
    label: messages.Amenities.hasSink.label,
    icon: <LocalLaundryService />,
    color: '#feca57',
    description: messages.Amenities.hasSink.description
  },
  {
    key: 'hasDiaperTrash' as const,
    label: messages.Amenities.hasDiaperTrash.label,
    icon: <Wc />,
    color: '#ff9ff3',
    description: messages.Amenities.hasDiaperTrash.description
  }
]