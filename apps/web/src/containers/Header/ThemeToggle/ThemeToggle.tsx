import { useEffect, useState } from 'react'
import { MoonStar, Sun } from 'lucide-react'

import { type Theme,themes } from '@/types'
import { localState } from '@/utils'

const resolveTheme = (stored: Theme | undefined): Theme => themes.options.includes(stored) ? stored : 'dracula'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dracula')

  useEffect(() => {
    const resolved = resolveTheme(localState.get('theme'))
    setTheme(resolved)
    document.documentElement.dataset.theme = resolved
  }, [])

  useEffect(() => {
    localState.set('theme', theme)
    document.documentElement.dataset.theme = theme
  }, [theme])

  const isDark = theme === 'dracula'

  return (
    <button
      onClick={() => setTheme((t) => (t === 'dracula' ? 'lofi' : 'dracula'))}
      className="btn btn-ghost btn-circle btn-sm"
    >
      {isDark ? <Sun size={16} /> : <MoonStar size={16} />}
    </button>
  )
}
