import { useEffect, useMemo, useRef, useState } from 'react'

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
      setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    if (!wrapperRef.current) return

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const glowStyle = useMemo(
    () =>
      ({
        '--x': mouse.x ? `${mouse.x}px` : '50%',
        '--y': mouse.y ? `${mouse.y}px` : '50%',
        background: 'radial-gradient(200px circle at var(--x, 50%) var(--y, 50%), var(--color-accent), transparent)',
      }) as React.CSSProperties,
    [mouse],
  )

  return (
    <div ref={wrapperRef} className={`relative inline-block rounded-3xl w-fit ${className ?? ''}`}>
      <div className="absolute inset-[-1px] pointer-events-none rounded-[inherit] z-[1]" style={glowStyle} />
      <div ref={contentRef} className="relative z-[2] rounded-[inherit] w-fit">
        {children}
      </div>
    </div>
  )
}
