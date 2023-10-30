import { CircularProgress, Stack } from '@mui/material'

interface LoaderProps {
  size?: number
  containerSize?: string
  className?: string
}

export function BlazerLoader({ size = 32, containerSize, className }: LoaderProps) {
  if (!containerSize) containerSize = '100vh'
  return (
    <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ height: containerSize }}>
      <CircularProgress size={size} className={className} />
    </Stack>
  )
}
