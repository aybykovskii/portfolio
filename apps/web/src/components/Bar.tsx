type Props = {
  title: string
  progress: number
}

export const Bar = ({ title, progress }: Props) => (
  <div className="w-full flex flex-col gap-2">
    <h3 className="text-sm font-medium text-base-content">{title}</h3>
    <progress className="progress progress-primary w-full" value={progress} max={100} />
  </div>
)
