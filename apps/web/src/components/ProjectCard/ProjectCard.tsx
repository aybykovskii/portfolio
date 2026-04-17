import type { CollectionEntry } from 'astro:content'

import type { CommonTranslations } from '@/collections/types'
import * as Icons from '@/components/icons'
import type { Lang, WithKey } from '@/types'
import { getIconUrl } from '@/utils'

import { Badge } from '../Badge'

type Props = WithKey<{
  lang: Lang
  project: CollectionEntry<'projects'>['data']
  commonTranslations: CommonTranslations
}>

export const ProjectCard = ({
  lang,
  project: { slug, title, translations, status, images, technologies, button, url },
  commonTranslations,
}: Props) => {
  return (
    <div className="grid relative grid-cols-2 rounded-xl border border-base-300 bg-base-200 shadow overflow-hidden">
      <img src={images[0] ?? 'https://placehold.co/600x400'} alt={title} className="w-full h-full object-cover" />

      <span className="absolute top-2.5 left-2.5">
        <Badge text={status} />
      </span>

      <div className="flex flex-col justify-between gap-5 p-3">
        {url
          ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-secondary hover:text-primary transition-colors duration-200 font-semibold leading-snug"
            >
              {title}
              <Icons.External size={14} />
            </a>
          )
          : <h3 className="text-xl font-semibold text-base-content">{title}</h3>}
        <p className="text-base text-base-content/60 leading-relaxed">{translations[lang].description}</p>
        <div className="flex gap-3">
          <a href={`/${lang}/projects/${slug}`}>
            <button className="btn btn-primary">{commonTranslations['actions.details']}</button>
          </a>

          {button && (
            <a href={button.url} target="_blank" rel="noreferrer">
              <button className="btn btn-secondary gap-2">
                <img width={16} height={16} src={getIconUrl(button.icon)} alt={button.icon} />
                <span>{button.text}</span>
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
