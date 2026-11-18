// Capture the Grafana / Jaeger screenshots the deck falls back to when the game stack is not reachable.
//
//   GAME_HOST=http://192.168.8.2 FROM=now-30m npm run shots
//   npm run shots -- talk-board jaeger-decide      # only some
//   FROM=1794423300000 TO=1794424800000 npm run shots -- accel-all   # a past game (epoch ms)
//
// The views are defined once, in shots.json (the live inlays in components/Shot.vue use the same file).
// Writes public/img/shots/*.png. Run it right after a rehearsal game so the panels have data.
import { chromium } from 'playwright-chromium'
import { mkdir, readFile } from 'node:fs/promises'

const HOST = process.env.GAME_HOST ?? 'http://192.168.8.2'
const FROM = process.env.FROM ?? 'now-30m'
const TO = process.env.TO ?? 'now'
const absolute = /^\d+$/.test(FROM) && /^\d+$/.test(TO)
const THEME = process.env.THEME ?? 'dark'
const OUT = 'public/img/shots'

const shots = JSON.parse(await readFile(new URL('../shots.json', import.meta.url), 'utf8'))
const url = (s) => {
  if (s.grafana === false) {
    // Jaeger search: an absolute window replaces the lookback (start/end in microseconds).
    if (!absolute) return `${HOST}${s.path}`
    const path = s.path.replace(/&?lookback=[^&]*/, '')
    return `${HOST}${path}&lookback=custom&start=${FROM}000&end=${TO}000`
  }
  const sep = s.path.includes('?') ? '&' : '?'
  return `${HOST}${s.path}${sep}from=${FROM}&to=${TO}&theme=${THEME}`
}

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch()
const only = process.argv.slice(2)
for (const [name, s] of Object.entries(shots)) {
  if (only.length ? !only.includes(name) : s.capture === false || !s.path) continue
  const page = await browser.newPage({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 1 })
  try {
    await page.goto(url(s), { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(s.settle ?? 2500) // let panels finish their queries and animations
    await page.screenshot({ path: `${OUT}/${name}.png` })
    console.log('ok  ', name)
  } catch (e) {
    console.log('FAIL', name, e.message.split('\n')[0])
  } finally {
    await page.close()
  }
}
await browser.close()
