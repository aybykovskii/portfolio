import { Doc } from '@/types'

import * as Icons from '@/components/icons'

import styles from './styles.module.scss'
import { Badge } from '../Badge'
import { getIconUrl, getProgressPercent } from '@/utils'
import { Bar } from '../Bar'

export type PanelProps = {
  bio: Doc<'bio'> | undefined
  socials?: Doc<'socials'>[]
  languages?: Doc<'languages'>[]
  skills?: Doc<'skills'>[]
}

export const Panel = ({ bio, socials, languages, skills }: PanelProps) => {
  return (
    <aside className={styles.panel}>
      <section className={styles.info}>
        <img src={bio?.avatar} alt={bio?.name} />
        <h3>{bio?.name}</h3>
        <span className={styles.position}>Senior Frontend Developer</span>
        <span className={styles.location}>
          <Icons.Location size={14} />
          {bio?.location}
        </span>
        <span className={styles.availability}>
          <Icons.Calendar size={14} />
          Available for opportunities
        </span>
      </section>

      <section className={styles.contacts}>
        <ul>
          <a href="mailto:aybykovski@gmail.com">
            <Icons.Letter size={16} />
            <span>aybykovski@gmail.com</span>
          </a>

          <a href="https://t.me/aybykovski">
            <img width={16} height={16} src="https://cdn.simpleicons.org/telegram/white" alt="telegram" />
            <span>aybykovski</span>
          </a>
        </ul>
      </section>

      <section className={styles.socials}>
        <ul>
          {socials?.map((social) => {
            const Icon = Icons[social.iconName as keyof typeof Icons]

            return (
              <a href={social.url} key={social.name}>
                {social.iconPath && (
                  <img width={24} height={24} src={getIconUrl(social.iconPath, social.color)} alt={social.name} />
                )}
                {social.iconName && <Icon size={24} />}
              </a>
            )
          })}
        </ul>
      </section>

      <section className={styles.languages}>
        <ul>
          {languages?.map((lang) => <Bar key={lang.name} title={lang.name} progress={getProgressPercent(lang.level)} />)}
        </ul>
      </section>

      <section className={styles.skills}>
        <ul>
          {skills?.filter((skill) => skill.isMain).map((skill) => <Badge key={skill.name} text={skill.name} />)}
        </ul>
      </section>
    </aside>
  )
}
