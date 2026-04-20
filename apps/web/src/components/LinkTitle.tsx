import { clsx } from 'clsx'
import { SquareArrowOutUpRightIcon as Icon } from 'lucide-react'

type Props = {
  href?: string | null | undefined
  title: string
  className?: string
  as?: React.HTMLElementType
}

export const LinkTitle = ({ href, title, className, as: Component = 'span' }: Props) =>
  href
    ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          'flex items-center gap-3 text-primary hover:text-secondary transition-colors duration-200',
          className,
        )}
      >
        {title}
        <Icon size={14} />
      </a>
    )
    : <Component className={clsx('text-base-content', className)}>{title}</Component>
