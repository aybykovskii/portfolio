import { Extended, Lang } from '@/types'

export type Route = `${Lang}` | `${Lang}/projects` | `${Lang}/projects/[name]`

type HasParams<T extends string> = T extends `[${string}]` ? true : false
type GetRouteParams<Path extends string = '', Result extends string = never> = Path extends
  `${string}[${infer Param}]${infer Rest}` ? GetRouteParams<Rest, Result | Param> : Result

type q = GetRouteParams<'en/projects'>

export const getRoute = <Path extends Route, Params extends GetRouteParams<Path>>(
  lang: Lang,
  path: Path,
  params: Params extends never ? Record<string, never> : Record<string, never>,
) => `/${lang}/${path}`

const r = getRoute('es', 'en/projects', {})
