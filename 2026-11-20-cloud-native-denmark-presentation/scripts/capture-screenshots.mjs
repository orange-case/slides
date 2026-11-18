// Capture the Grafana / Jaeger screenshots the deck shows, from a running JoustMania stack.
//
//   GAME_HOST=http://192.168.8.2 FROM=now-30m node scripts/capture-screenshots.mjs
//
// Writes public/img/shots/*.png. Run it right after a rehearsal game so the panels have data.
import { chromium } from 'playwright-chromium'
import { mkdir } from 'node:fs/promises'

const HOST = process.env.GAME_HOST ?? 'http://192.168.8.2'
const FROM = process.env.FROM ?? 'now-30m'
const THEME = process.env.THEME ?? 'dark'
const OUT = 'public/img/shots'

// Single Grafana panels (d-solo) and whole dashboards (kiosk).
const panel = (uid, id, extra = '') =>
  `${HOST}/grafana/d-solo/${uid}?panelId=${id}&from=${FROM}&to=now&theme=${THEME}${extra}`
const board = (uid) => `${HOST}/grafana/d/${uid}?kiosk&from=${FROM}&to=now&theme=${THEME}`

const shots = [
  // the game
  { name: 'accel-all', url: panel('game-players', 37), w: 1600, h: 600 },
  { name: 'thresholds', url: panel('game-players', 9), w: 1600, h: 600 },
  { name: 'tempo', url: panel('game-players', 10), w: 1600, h: 600 },
  // the talk overview
  { name: 'talk-board', url: board('talk'), w: 1920, h: 1080 },
  // the agent
  { name: 'decide-outcome', url: panel('agent-operations', 6), w: 1600, h: 600 },
  { name: 'decide-latency', url: panel('agent-operations', 7), w: 1600, h: 600 },
  { name: 'genai-tokens', url: panel('agent-operations', 15), w: 1600, h: 600 },
  // OpenFeature
  { name: 'flag-evals', url: panel('feature-flags', 2), w: 1600, h: 600 },
  { name: 'flag-writes', url: panel('feature-flags', 13), w: 1600, h: 600 },
  { name: 'flagsmith-pushes', url: panel('feature-flags', 36), w: 1600, h: 600 },
  // Jaeger: newest decisions
  {
    name: 'jaeger-decide',
    url: `${HOST}/jaeger/search?service=agent&operation=agent.decide&lookback=1h&limit=20`,
    w: 1920, h: 1080, settle: 4000,
  },
]

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch()
const only = process.argv.slice(2)
for (const s of shots) {
  if (only.length && !only.includes(s.name)) continue
  const page = await browser.newPage({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 1 })
  try {
    await page.goto(s.url, { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(s.settle ?? 2500) // let panels finish their queries and animations
    await page.screenshot({ path: `${OUT}/${s.name}.png` })
    console.log('ok  ', s.name)
  } catch (e) {
    console.log('FAIL', s.name, e.message.split('\n')[0])
  } finally {
    await page.close()
  }
}
await browser.close()
