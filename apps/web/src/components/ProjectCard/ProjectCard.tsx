import type { CollectionEntry } from 'astro:content'

import type { Lang, WithKey } from '@/types'

import { Badge } from '../Badge'

type Props = WithKey<{
  lang: Lang
  project: CollectionEntry<'projects'>['data']
}>

export const ProjectCard = ({
  lang,
  project: { slug, title, translations, status, images, technologies, button, url },
}: Props) => {
  return (
    <div className="grid relative grid-cols-2 rounded-xl border border-base-300 bg-base-200 shadow overflow-hidden">
      <img src={images[0] ?? 'https://placehold.co/600x400'} alt={title} className="w-full h-full object-cover" />

      <span className="absolute top-2.5 left-2.5">
        <Badge text={status} />
      </span>

      <div className="flex flex-col justify-between gap-5 p-3">
        <h3 className="text-xl font-semibold text-base-content">{title}</h3>
        <p className="text-base text-base-content/60 leading-relaxed">{translations[lang].description}</p>

        <div className="flex gap-3">
          {button && (
            <a href={button.url} target="_blank" rel="noreferrer">
              <button className="btn btn-primary">{button.text}</button>
            </a>
          )}
          <a href={`/${lang}/projects/${slug}`}>
            <button className="btn btn-secondary">details</button>
          </a>
          {url && (
            <a href={url} target="_blank" rel="noreferrer">
              <button className="btn btn-ghost btn-sm gap-2">
                <img width={16} height={16} src="https://cdn.simpleicons.org/github/white" alt="Github" />
                <span>Github</span>
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
