import clsx from 'clsx'

import type { WithKey } from '@/types'

type Props = WithKey<{
  text: string
  iconName?: string
  size?: 'small' | 'large'
}>

export const Badge = ({ text, iconName, size = 'small' }: Props) => (
  <span className={clsx('badge badge-primary badge-soft gap-2', size === 'large' ? 'badge-lg' : 'badge-md')}>
    {iconName && <img width={16} height={16} src={`https://cdn.simpleicons.org/${iconName}/default`} alt={iconName} />}
    {text}
  </span>
)
