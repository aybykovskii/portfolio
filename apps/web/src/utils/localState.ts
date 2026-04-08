import { LocalStateService } from '@/common/localState'
import type { Lang, Theme } from '@/types'

export type LocalState = {
  lang: Lang
  theme: Theme
}

export const localState = new LocalStateService<LocalState>()
