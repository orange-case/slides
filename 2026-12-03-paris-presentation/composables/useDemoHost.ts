// Is the game stack reachable from this browser? Decides between live Grafana / Jaeger panels
// and the screenshots in public/img/shots/.
//
// - Host: VITE_DEMO_HOST at build/dev time, default 192.168.8.2.
// - Live only works when the deck itself is served over http (npm run dev, a local static
//   server): an https page (GitHub Pages) may not frame or fetch http://192.168.8.2.
// - Press `v` to flip between live and screenshots by hand (e.g. the Pi is slow on stage).
import { computed, ref } from 'vue'

export const DEMO_HOST: string = import.meta.env.VITE_DEMO_HOST || '192.168.8.2'
export const demoBase = `http://${DEMO_HOST}`

const reachable = ref<boolean | null>(null)
const override = ref<boolean | null>(null)
let started = false

async function probe() {
  if (typeof window === 'undefined') return
  if (location.protocol === 'https:') { reachable.value = false; return }
  const ctl = new AbortController()
  const t = setTimeout(() => ctl.abort(), 2000)
  try {
    // no-cors: an opaque response is enough, we only care that something answered.
    await fetch(`${demoBase}/grafana/api/health`, { mode: 'no-cors', cache: 'no-store', signal: ctl.signal })
    reachable.value = true
  } catch {
    reachable.value = false
  } finally {
    clearTimeout(t)
  }
}

function start() {
  if (started || typeof window === 'undefined') return
  started = true
  probe()
  setInterval(probe, 15000) // the Pi may come up after the deck was opened
  window.addEventListener('keydown', (e) => {
    if (e.key !== 'v' || e.metaKey || e.ctrlKey || e.altKey) return
    const tag = (e.target as HTMLElement | null)?.tagName
    if (tag === 'INPUT' || tag === 'TEXTAREA') return
    override.value = !(override.value ?? reachable.value === true)
  })
}

export function useDemoHost() {
  start()
  const live = computed(() => override.value ?? reachable.value === true)
  return { live, reachable, override }
}
