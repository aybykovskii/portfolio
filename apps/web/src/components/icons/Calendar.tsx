import { IconProps } from './types'

export const Calendar = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" color="currentColor" {...props}>
    <rect
      x="2"
      y="4"
      width="20"
      height="18"
      rx="4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M8 2v4m8-4v4M2 10h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
