import clsx from 'clsx'

import { WithKey } from '@/types'

import styles from './styles.module.scss'

type Props = WithKey<{
  text: string
  iconName?: string
  size?: 'small' | 'large'
}>

export const Badge = ({ text, iconName, size = 'small' }: Props) => (
  <span className={clsx(styles.badge, styles[size])}>
    {iconName && <img width={16} height={16} src={`https://cdn.simpleicons.org/${iconName}/default`} alt={iconName} />}
    {text}
  </span>
)
