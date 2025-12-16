import { Button as AriaButton } from '@ariakit/react'
import clsx from 'clsx'

import styles from './styles.module.scss'

type Props = {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'github'
}

export const Button = ({ children, onClick, className, variant = 'primary' }: Props) => {
  return (
    <AriaButton onClick={onClick} className={clsx(styles.button, styles[variant], className)}>{children}</AriaButton>
  )
}
