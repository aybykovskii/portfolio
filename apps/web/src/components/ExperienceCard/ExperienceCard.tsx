import type { CollectionEntry } from 'astro:content'
import { ChevronRight } from 'lucide-react'

import * as Icons from '@/components/icons'
import type { Lang, WithKey } from '@/types'

import { TechnologiesList } from '../TechnologiesList'

type Props = WithKey<{
  lang: Lang
  experience: CollectionEntry<'experiences'>['data']
}>

export const ExperienceCard = ({
  lang,
  experience: { position, company, companyUrl, start, end, technologies, location, translations },
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
            className="flex items-center gap-3 text-accent font-semibold leading-snug"
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
        <details className="group">
          <summary className="flex items-start gap-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <ChevronRight
              size={32}
              color="var(--color-primary)"
              className="transition-transform duration-200 group-open:rotate-90"
            />
            {translations[lang].achievements}
          </summary>
          <ul className="flex flex-col gap-3 mt-3">
            {achievementsList.map((achievement) => (
              <li
                key={achievement}
                className="text-base-content text-base before:content-['•'] before:mr-3 before:text-accent"
              >
                {achievement}
              </li>
            ))}
          </ul>
        </details>
      )}

      {/* <TechnologiesList technologies={technologies} /> */}
    </div>
  )
}
