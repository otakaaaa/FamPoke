import { Suspense } from 'react'
import HomePage from '@/components/HomePage'
import { CircularProgress, Box } from '@mui/material'

export default function Page() {
  return (
    <Suspense fallback={
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    }>
      <HomePage />
    </Suspense>
  )
}