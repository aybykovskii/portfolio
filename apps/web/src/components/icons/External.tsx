import { IconProps } from './types'

export const External = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 15 15" fill="none" color="currentColor" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V8.5a.5.5 0 0 0-1 0V12H3V3h3.5a.5.5 0 0 0 0-1zm9.854.146a.5.5 0 0 1 .146.351V5.5a.5.5 0 0 1-1 0V3.707L6.854 8.854a.5.5 0 1 1-.708-.708L11.293 3H9.5a.5.5 0 0 1 0-1h3a.5.5 0 0 1 .354.146"
      fill="currentColor"
    />
  </svg>
)
