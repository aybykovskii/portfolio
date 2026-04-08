import type { CollectionEntry } from 'astro:content'

import type { Bio } from '@/collections/types'
import * as Icons from '@/components/icons'
import type { Lang } from '@/types'
import { getProgressPercent, getTranslated } from '@/utils'

import { Badge } from '../Badge'
import { Bar } from '../Bar'

export type PanelProps = {
  lang: Lang
  bio: Bio
  languages?: CollectionEntry<'languages'>[]
  skills?: CollectionEntry<'technologies'>[]
}

export const Panel = ({ bio, languages, skills, lang }: PanelProps) => {
  const translatedBio = getTranslated(bio, lang)

  return (
    <aside className="flex sticky top-[155px] shrink-0 flex-col self-start w-[300px] gap-3">
      <section className="flex flex-col items-center gap-2 p-6 bg-base-200 shadow rounded-xl border border-base-300">
        <img src="/images/avatar.png" alt={translatedBio.name} className="w-4/5 aspect-square object-cover rounded-full" />
        <h3 className="text-base-content font-semibold text-lg">{translatedBio.name}</h3>
        <span className="text-base-content text-sm leading-snug">{translatedBio.position}</span>
        <span className="flex items-center gap-1 text-base-content/60 text-sm leading-snug">
          <Icons.Location size={14} />
          {translatedBio.location}
        </span>
        <span className="flex items-center gap-1 text-base-content/60 text-sm leading-snug">
          <Icons.Calendar size={14} />
          Available for opportunities
        </span>
      </section>

      <section className="flex flex-col items-center gap-2 p-6 bg-base-200 shadow rounded-xl border border-base-300">
        <ul className="flex flex-col gap-4 w-full">
          <a
            href="mailto:aybykovski@gmail.com"
            className="flex items-center gap-2 hover:scale-[1.01] hover:underline transition-all duration-300"
          >
            <Icons.Letter size={16} />
            <span>aybykovski@gmail.com</span>
          </a>
          <a
            href="https://t.me/aybykovski"
            className="flex items-center gap-2 hover:scale-[1.01] hover:underline transition-all duration-300"
          >
            <img width={16} height={16} src="https://cdn.simpleicons.org/telegram/white" alt="telegram" />
            <span>aybykovski</span>
          </a>
        </ul>
      </section>

      <section className="flex flex-col items-center gap-2 p-4 bg-base-200 shadow rounded-xl border border-base-300">
        <ul className="flex justify-evenly w-full gap-4">
          {Object.entries(bio.contacts).map(([key, value]) => {
            const Icon = Icons[key as keyof typeof Icons]
            return Icon && (
              <a href={value} key={key} className="hover:text-primary transition-colors duration-300">
                <Icon size={24} />
              </a>
            )
          })}
        </ul>
      </section>

      <section className="flex flex-col items-center gap-2 p-6 bg-base-200 shadow rounded-xl border border-base-300">
        <ul className="flex flex-col w-full gap-2">
          {languages?.map(({ data: language }) => (
            <Bar key={language.id} title={language.translations[lang].name} progress={getProgressPercent(language.level)} />
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-2">
        <ul className="flex flex-wrap justify-evenly gap-2">
          {skills?.filter(({ data: skill }) => skill.level === 5).map((skill) => (
            <Badge key={skill.id} text={skill.data.name} />
          ))}
        </ul>
      </section>
    </aside>
  )
}
