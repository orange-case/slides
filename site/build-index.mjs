// Fill site/index.html with one entry per built deck and write it to <out>/index.html.
//   node site/build-index.mjs gh-pages
// A deck is a <YYYY-MM-DD>-<event>-presentation directory; its title comes from the
// `title:` line of its slides.md headmatter.
import { readdirSync, readFileSync, writeFileSync, existsSync, cpSync } from 'node:fs'
import { join } from 'node:path'

const out = process.argv[2] ?? 'gh-pages'

// Nicer names for event slugs; anything else is title-cased from the directory name.
const EVENTS = {
  'cloud-native-linz': 'Cloud Native Linz',
  'kubecon-cloudnativecon-europe': 'KubeCon + CloudNativeCon Europe',
  'cloud-native-denmark': 'Cloud Native Denmark',
}

const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const fmtDate = iso => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' })

const decks = readdirSync('.', { withFileTypes: true })
  .filter(d => d.isDirectory() && /^\d{4}-\d{2}-\d{2}-/.test(d.name) && existsSync(join(out, d.name)))
  .map(d => {
    const [, date, slug] = d.name.match(/^(\d{4}-\d{2}-\d{2})-(.+?)(?:-presentation)?$/)
    const md = existsSync(join(d.name, 'slides.md')) ? readFileSync(join(d.name, 'slides.md'), 'utf8') : ''
    const title = (md.match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1] ?? slug).replace(/\s+-\s+/, ': ')
    const event = EVENTS[slug] ?? slug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
    return { dir: d.name, date, title, event }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

const items = decks.map(d => `      <li><a href="${d.dir}/">
        <span class="date stencil">${esc(fmtDate(d.date))}</span>
        <span class="title">${esc(d.title)}</span>
        <span class="event">${esc(d.event)}</span>
      </a></li>`).join('\n')

const html = readFileSync('site/index.html', 'utf8').replace('<!-- DECKS -->', items)
cpSync('site/assets', join(out, 'assets'), { recursive: true })
writeFileSync(join(out, 'index.html'), html)
console.log(`index: ${decks.length} decks`)
