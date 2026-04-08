export type BaseRecord = Record<string, unknown>

export type Extended<T> = T | (string & {})

export type WithKey<T> = T & {
  key?: string | number
}
export type WithCommonText<T> = T & {
  commonText: any[]
}
