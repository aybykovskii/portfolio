import type { BaseRecord } from '@/types'

export class LocalStateService<Values extends BaseRecord, Keys extends keyof Values & string = keyof Values & string> {
  constructor (
    private readonly logger?: (...messages: unknown[]) => void,
    private readonly isDev = false,
  ) {}

  get = <Key extends Keys>(key: Key, defaultValue?: Values[Key]): Values[Key] | undefined => {
    if (!localStorage) {
      return defaultValue ?? undefined
    }

    const serializedState = localStorage.getItem(key)

    if (serializedState === null) {
      this.isDev && this.logger?.(`Local state for ${key} not found. Returning default value: `, defaultValue)
      return defaultValue
    }

    try {
      const data = JSON.parse(serializedState) as Values[Key]

      this.isDev && this.logger?.(`Local state for ${key} found. Returning value: `, data)
      return data ?? defaultValue
    } catch (err) {
      this.isDev
        && this.logger?.(`Get local state for ${key} failed to parse. Returning default value: `, defaultValue, err)
      return defaultValue
    }
  }

  set = <Key extends keyof Values & string>(key: Key, data: Values[Key]) => {
    try {
      localStorage.setItem(key, JSON.stringify(data))
      this.isDev && this.logger?.(`Set local state for ${key} to`, data)
    } catch (err) {
      this.isDev && this.logger?.(`Failed to set local state for ${key} to`, data, err)
    }
  }

  remove = <Key extends keyof Values & string>(key: Key) => {
    localStorage.removeItem(key)
  }

  extend = <NewValues extends BaseRecord>() => new LocalStateService<Values & NewValues>()
}
