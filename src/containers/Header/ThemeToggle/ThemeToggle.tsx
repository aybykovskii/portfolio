import { useEffect, useState } from 'react'
import { MoonStar, Sun } from 'lucide-react'

import { Theme } from '@/types'
import { localState } from '@/utils'

import styles from './styles.module.scss'

export function ThemeToggle () {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const lsStored = localState.get('theme')
    if (lsStored) {
      setTheme(lsStored)
      document.documentElement.dataset.theme = lsStored
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('theme', theme)
    document.documentElement.dataset.theme = theme
  }, [theme])

  const Icon = theme === 'light' ? Sun : MoonStar

  return (
    <button onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))} className={styles.themeToggle}>
      <Icon size={16} width={16} height={16} color="var(--text-primary)" />
    </button>
  )
}
