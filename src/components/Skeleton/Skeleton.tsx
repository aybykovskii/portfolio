import ContentLoader from "react-content-loader"

type Dimension = {
  width: number
  height: number
}

type Props = Dimension & {
  items?: Dimension[]
}

export const Skeleton = ({ width = 400, height = 160, items = [] }: Props) => (
  <ContentLoader
  speed={2}
  width={width}
  height={height}
  viewBox="0 0 400 160"
  backgroundColor="#f3f3f3"
  foregroundColor="#ecebeb"
>
  {items.map((item, i) => (
    <rect x="0" y={i < 1 ? 0 : items[i - 1]!.height + 10} rx="3" ry="3" width={item.width} height={item.height} />
  ))}
</ContentLoader>
)