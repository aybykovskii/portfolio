import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles.module.scss'

interface HoverCardProps {
  children: React.ReactNode
  className?: string
}

export const HoverCard: React.FC<HoverCardProps> = ({ children, className }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!wrapperRef.current) return

      const rect = wrapperRef.current.getBoundingClientRect()
      setMouse({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    if (!wrapperRef.current) return

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const glowStyle = useMemo(
    () => ({
      '--x': mouse.x ? `${mouse.x}px` : '50%',
      '--y': mouse.y ? `${mouse.y}px` : '50%',
    } as React.CSSProperties),
    [mouse],
  )

  return (
    <div ref={wrapperRef} className={`${styles.wrapper} ${className || ''}`}>
      <div className={styles.glow} style={glowStyle} />
      <div ref={contentRef} className={styles.content}>
        {children}
      </div>
    </div>
  )
}
