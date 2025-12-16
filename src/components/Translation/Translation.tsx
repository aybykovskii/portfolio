import { useT } from '@/hooks'

type Props = {
  key: string
}

export const Translation = ({ key }: Props) => {
  const t = useT()
  console.log({ key, t: t(key as string) })

  return <>{t(key as string)}</>
}
