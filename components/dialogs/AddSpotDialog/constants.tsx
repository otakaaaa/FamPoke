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
import messages from '@/messages/ja.json'

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
    label: messages.AddSpotDialog.steps.basic,
    icon: <Info />,
    description: messages.AddSpotDialog.stepDesc.basic
  },
  {
    label: messages.AddSpotDialog.steps.location,
    icon: <LocationOn />,
    description: messages.AddSpotDialog.stepDesc.location
  },
  {
    label: messages.AddSpotDialog.steps.age,
    icon: <ChildCare />,
    description: messages.AddSpotDialog.stepDesc.age
  },
  {
    label: messages.AddSpotDialog.steps.amenities,
    icon: <Settings />,
    description: messages.AddSpotDialog.stepDesc.amenities
  },
  {
    label: messages.AddSpotDialog.steps.images,
    icon: <Image />,
    description: messages.AddSpotDialog.stepDesc.images
  }
]

export { categories, amenities }