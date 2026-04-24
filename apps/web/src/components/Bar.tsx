type Props = {
  title: string
  progress: number
}

export const Bar = ({ title, progress }: Props) => (
  <div className="w-full flex flex-col gap-2">
    <p className="text-sm font-medium text-base-content">{title}</p>
    <progress className="progress progress-primary w-full" value={progress} max={100} />
  </div>
)
