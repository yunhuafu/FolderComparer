import { SxProps, Theme } from '@mui/material'

export type CustomComponentProps = {
  sx?: SxProps<Theme>
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}
