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
    <aside className="flex flex-col gap-3 w-full">
      <section className="flex flex-col items-center gap-2 p-6 bg-base-200 shadow rounded-xl border border-base-300">
        <img
          src="/images/avatar.png"
          alt={translatedBio.name}
          className="w-4/5 aspect-square object-cover rounded-full"
        />
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

      <section className="flex flex-col items-center gap-2 p-4 bg-base-200 shadow rounded-xl border border-base-300">
        <ul className="flex justify-evenly w-full gap-4">
          {Object.entries(bio.contacts).map(([key, { class: className, value }]) => (
            <a href={value} key={key} className="hover:text-primary transition-colors duration-300">
              <i className={className} />
            </a>
          ))}
        </ul>
      </section>

      <section className="flex flex-col items-center gap-2 p-6 bg-base-200 shadow rounded-xl border border-base-300">
        <ul className="flex flex-col w-full gap-2">
          {languages?.map(({ data: language }) => (
            <Bar
              key={language.id}
              title={language.translations[lang].name}
              progress={getProgressPercent(language.level)}
            />
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
