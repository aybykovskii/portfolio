// Расширение стандартного интерфейса Object,
// т.к. методы keys и entries имеют неверную типизацию
interface ObjectConstructor {
  keys<
    KeysType extends PropertyKey,
    ValuesType = unknown
  >(obj: { [T in KeysType]?: ValuesType }): KeysType[]

  entries<
    KeysType extends PropertyKey,
    ValuesType = unknown
  >(obj: { [T in KeysType]?: ValuesType }): [KeysType, ValuesType][]
}

interface ReadonlyArray<T> {
  includes(
    searchElement: T | (TSReset.WidenLiteral<T> & {}),
    fromIndex?: number
  ): searchElement is T
}

interface Array<T> {
  includes(
    searchElement: T | (TSReset.WidenLiteral<T> & {}),
    fromIndex?: number
  ): searchElement is T
}

