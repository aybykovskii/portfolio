import { Doc } from '@convex/_generated/dataModel'

import { Badge } from '../Badge'

import styles from './styles.module.scss'

type Props = {
  technologies: Doc<'skills'>[]
}

export const TechnologiesList = ({ technologies }: Props) => (
  <ul className={styles.technologiesList}>
    {technologies.map(({ icon, name }) => (
      <li key={name}>
        <Badge key={name} text={name} />
      </li>
    ))}
  </ul>
)
