import { IconProps } from './types'

export const Letter = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" color="currentColor" {...props}>
    <path d="M0 0h48v48H0z" fill="none" />
    <path
      d="M8 40h32c2.2 0 4-1.8 4-4V12c0-2.2-1.8-4-4-4H8c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4m31.172-28L24 27.172 8.828 12zM8 16.828l16 16 16-16V36H8z"
      fill="currentColor"
    />
  </svg>
)
