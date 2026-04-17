import type { CollectionEntry } from 'astro:content'
import { ChevronRight } from 'lucide-react'

import type { CommonTranslations } from '@/collections/types'
import * as Icons from '@/components/icons'
import type { Lang, WithKey } from '@/types'

import { TechnologiesList } from '../TechnologiesList'

type Props = WithKey<{
  lang: Lang
  commonTranslations: CommonTranslations
  experience: CollectionEntry<'experiences'>['data']
  technologies: CollectionEntry<'technologies'>[]
}>

export const ExperienceCard = ({
  lang,
  commonTranslations,
  experience: { position, company, companyUrl, start, end, location, translations },
  technologies,
}: Props) => {
  const achievementsList = translations[lang].achievements

  return (
    <div className="flex flex-col gap-4 p-6 bg-base-200 shadow rounded-xl border border-base-300">
      <h3 className="text-base-content font-semibold text-xl leading-snug">{position}</h3>

      {companyUrl
        ? (
          <a
            href={companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-secondary hover:text-primary transition-colors duration-200 font-semibold leading-snug"
          >
            {company}
            <Icons.External size={14} />
          </a>
        )
        : <span className="text-base-content font-semibold leading-snug">{company}</span>}

      <div className="flex gap-3">
        <span className="flex items-center gap-2 text-base-content/60 text-sm">
          <Icons.Calendar size={14} />
          {start} - {end}
        </span>
        <span className="flex items-center gap-2 text-base-content/60 text-sm">
          <Icons.Location size={14} />
          {location}
        </span>
      </div>

      <p className="text-base leading-relaxed">{translations[lang].description}</p>

      {!!achievementsList.length && (
        <details className="group collapse">
          <summary className="flex items-center gap-3 cursor-pointer [&::-webkit-details-marker]:hidden collapse-title p-0">
            <ChevronRight
              size={24}
              color="var(--color-primary)"
              className="transition-transform duration-200 group-open:rotate-90"
            />
            <span className="text-base-content font-semibold leading-snug">{commonTranslations['experience.achievements']}</span>
          </summary>
          <ul className="flex flex-col gap-3 collapse-content">
            {achievementsList.map((achievement) => (
              <li
                key={achievement}
                className="text-base-content text-base before:mr-3 before:text-primary before:content-['-']"
              >
                {achievement}
              </li>
            ))}
          </ul>
        </details>
      )}

      {!!technologies.length && <TechnologiesList technologies={technologies} />}
    </div>
  )
}
