import { RichExperience } from '@convex/experiences'

import * as Icons from '@/components/icons'
import { Doc, WithKey } from '@/types'

import { TechnologiesList } from '../TechnologiesList'

import styles from './styles.module.scss'

type Props = WithKey<{
  experience: RichExperience
}>

export const ExperienceCard =
  ({ experience: { position, company, companyUrl, start, end, description, achievements, technologies, location } }:
    Props) => (
    <div className={styles.experienceCard}>
      <h3>{position}</h3>

      {companyUrl
        ? (
          <a href={companyUrl} target="_blank" rel="noopener noreferrer">
            {company}
            <Icons.External size={14} />
          </a>
        )
        : <span>{company}</span>}

      <div className={styles.periodAndLocation}>
        <span className={styles.element}>
          <Icons.Calendar size={14} />
          {start} - {end}
        </span>
        <span className={styles.element}>
          <Icons.Location size={14} />
          {location}
        </span>
      </div>

      <p>{description}</p>

      {!!achievements.length && (
        <ul className={styles.achievements}>
          {achievements.split('\n').map((achievement) => <li key={achievement}>{achievement}</li>)}
        </ul>
      )}

      <TechnologiesList technologies={technologies} />
    </div>
  )
