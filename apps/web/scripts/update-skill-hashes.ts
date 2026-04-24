import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const skillsDir = resolve(import.meta.dirname, '../public/.well-known/agent-skills')
const indexPath = join(skillsDir, 'index.json')

const index = JSON.parse(readFileSync(indexPath, 'utf-8'))

let updated = 0

for (const skill of index.skills) {
  const skillFile = join(skillsDir, skill.name, 'SKILL.md')

  try {
    const content = readFileSync(skillFile)
    const hash = createHash('sha256').update(content).digest('hex')

    if (skill.sha256 !== hash) {
      console.log(`${skill.name}: ${skill.sha256} → ${hash}`)
      skill.sha256 = hash
      updated++
    }
  } catch {
    console.warn(`SKILL.md not found for skill "${skill.name}", skipping`)
  }
}

if (updated > 0) {
  writeFileSync(indexPath, JSON.stringify(index, null, 2) + '\n')
  console.log(`\nUpdated ${updated} hash(es) in index.json`)
} else {
  console.log('All hashes are up to date')
}
