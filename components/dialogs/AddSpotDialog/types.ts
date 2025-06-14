export interface AddSpotFormData {
  name: string
  category: 'park' | 'cafe' | 'center' | 'mall' | 'library' | 'other'
  address: string
  googleMapUrl: string
  targetAgeRange: [number, number]
  indoor: boolean
  hasNursingRoom: boolean
  hasDiaperSpace: boolean
  hasStrollerSpace: boolean
  hasKidsSpace: boolean
  hasSink: boolean
  hasDiaperTrash: boolean
  openingHours: string
}

export interface AddSpotDialogProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export interface StepContentProps {
  activeStep: number
  formData: AddSpotFormData
  selectedFiles: File[]
  onInputChange: (field: string, value: any) => void
  onAgeRangeChange: (event: Event, newValue: number | number[]) => void
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveFile: (index: number) => void
}

export interface SuccessModalProps {
  open: boolean
  onClose: () => void
  title: string
  message: string
}