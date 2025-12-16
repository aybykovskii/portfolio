import { RichProject } from '@convex/projects'

import { Doc, Lang, WithKey } from '@/types'

import { Badge } from '../Badge'
import { Button } from '../Button'
import { TechnologiesList } from '../TechnologiesList'

import styles from './styles.module.scss'

type Props = WithKey<{
  lang: Lang
  project: RichProject
}>

export const ProjectCard = ({
  lang,
  project: {
    name,
    title,
    description,
    status,
    images,
    technologies,
    button,
    url,
  },
}: Props) => {
  return (
    <div className={styles.projectCard}>
      <img src="https://placehold.co/600x400" alt={title} />
      <span className={styles.status}>
        <Badge text={status} />
      </span>
      <div className={styles.info}>
        <h3>{title}</h3>
        <p>{description}</p>

        <TechnologiesList technologies={technologies} />

        <div className={styles.buttons}>
          {button && (
            <a href={button.url} target="_blank" rel="noreferrer">
              <Button variant="primary">{button.text}</Button>
            </a>
          )}
          <a href={`/${lang}/projects/${name}`}>
            <Button variant="secondary">Подробнее</Button>
          </a>
          {url && (
            <a href={url} target="_blank" rel="noreferrer">
              <Button variant="github">
                <img width={16} height={16} src="https://cdn.simpleicons.org/github/white" alt="Github" />
                <span>Github</span>
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
