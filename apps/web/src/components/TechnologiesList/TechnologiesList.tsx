import type { CollectionEntry } from 'astro:content'

import { Badge } from '../Badge'

type Props = {
  technologies: CollectionEntry<'technologies'>[]
}

export const TechnologiesList = ({ technologies }: Props) => (
  <ul className="flex flex-wrap gap-2">
    {technologies.map(({ data: { icon, name } }) => (
      <li key={name}>
        <Badge text={name} iconName={icon} />
      </li>
    ))}
  </ul>
)
