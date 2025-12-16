import styles from './styles.module.scss'

type Props = {
  title: string
  progress: number
}

export const Bar = ({ title, progress }: Props) => (
  <div className={styles.bar} style={{ '--progress': `${progress}%` } as React.CSSProperties}>
    <h3>{title}</h3>
    <div className={styles.progress} />
  </div>
)
