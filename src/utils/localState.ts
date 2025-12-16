import { LocalStateService } from '@/common/localState'
import { Lang, Theme } from '@/types'

export type LocalState = {
  lang: Lang
  theme: Theme
}

export const localState = new LocalStateService<LocalState>()
