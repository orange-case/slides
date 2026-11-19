<script setup lang="ts">
// A Grafana / Jaeger view. Live from the game stack when it is reachable (see useDemoHost),
// otherwise the screenshot from public/img/shots/<name>.png captured by
// scripts/capture-screenshots.mjs, otherwise a labelled placeholder.
// The iframe only exists while its slide is on screen, so the Pi is not asked for 20 panels at once.
// Every view with a live path also gets an "open ↗" link under it: the same view in its own tab,
// for when the embed errors, renders badly, or the screenshot is showing and you need the tool.
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useDarkMode, useIsSlideActive } from '@slidev/client'
import shots from '../shots.json'
import { demoBase, useDemoHost } from '../composables/useDemoHost'

type ShotDef = { path?: string; w: number; h: number; grafana?: boolean }
const props = withDefaults(defineProps<{ name: string; caption?: string; from?: string; height?: string }>(), { from: 'now-15m' })

const def = (shots as Record<string, ShotDef>)[props.name]
const { live } = useDemoHost()
const { isDark } = useDarkMode()
const active = useIsSlideActive()
const missing = ref(false)

const src = `${import.meta.env.BASE_URL}img/shots/${props.name}.png`
const ratio = def ? `${def.w} / ${def.h}` : '16 / 6'
// A fixed height (e.g. on a 2×2 grid slide) wins over the aspect ratio; images crop from the top.
const box = computed(() => props.height ? { height: props.height } : { aspectRatio: ratio })
const liveUrl = computed(() => {
  if (!def?.path) return null
  if (def.grafana === false) return `${demoBase}${def.path}`
  const sep = def.path.includes('?') ? '&' : '?'
  return `${demoBase}${def.path}${sep}from=${props.from}&to=now&refresh=5s&theme=${isDark.value ? 'dark' : 'light'}`
})
const showLive = computed(() => live.value && !!liveUrl.value)
// The tool itself in a new tab, usable rather than embedded: no kiosk mode, and a single panel
// (d-solo) becomes its dashboard focused on that panel (d/...?viewPanel=N).
const openUrl = computed(() => liveUrl.value
  ?.replace(/([?&])kiosk(&|$)/, (_m, a, b) => (b ? a : ''))
  .replace('/grafana/d-solo/', '/grafana/d/')
  .replace(/([?&])panelId=/, '$1viewPanel='))

// The iframe is laid out at the view's native size (e.g. 1600×600) and scaled down to the slot,
// so Grafana renders its desktop layout instead of squeezing into a 400 px mobile view.
const frameEl = ref<HTMLElement | null>(null)
const scale = ref(0.25)
let ro: ResizeObserver | undefined
watch(frameEl, (el) => {
  ro?.disconnect()
  if (!el || !def) return
  ro = new ResizeObserver(() => { scale.value = el.clientWidth / def.w })
  ro.observe(el)
})
onBeforeUnmount(() => ro?.disconnect())
const frameStyle = computed(() => ({
  width: `${def?.w ?? 1600}px`,
  height: `${def?.h ?? 600}px`,
  transform: `scale(${scale.value})`,
}))
</script>

<template>
  <figure class="shot">
    <div v-if="showLive" ref="frameEl" class="frame" :style="box">
      <iframe v-if="active" :src="liveUrl!" :title="caption ?? name" :style="frameStyle" />
      <span class="badge">● live</span>
    </div>
    <img v-else-if="!missing" :src="src" :alt="caption ?? name" :style="height ? { height, objectFit: 'cover', objectPosition: 'top' } : undefined" @error="missing = true" />
    <div v-else class="ph" :style="box">
      <div class="ph-t">📸 {{ name }}.png</div>
      <code>npm run shots -- {{ name }}</code>
    </div>
    <figcaption v-if="caption || openUrl">
      <span v-if="caption">{{ caption }}</span>
      <a v-if="openUrl" :href="openUrl" target="_blank" rel="noopener" class="open" :title="`Open ${caption ?? name} in a new tab`">open ↗</a>
    </figcaption>
  </figure>
</template>

<style scoped>
.shot { margin: 0; }
.shot img { width: 100%; border-radius: 10px; border: 1px solid var(--line); }
.frame { position: relative; width: 100%; border-radius: 10px; overflow: hidden; border: 1px solid var(--accent); }
.frame iframe { position: absolute; top: 0; left: 0; border: 0; transform-origin: 0 0; }
.badge {
  position: absolute; top: 6px; right: 8px; padding: 1px 8px; border-radius: 999px;
  font-size: 0.65rem; font-weight: 600; color: #fff; background: rgba(220, 38, 38, 0.85); pointer-events: none;
}
.ph {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem;
  border: 2px dashed var(--line); border-radius: 10px; opacity: 0.7;
}
.ph-t { font-size: 1.2rem; font-weight: 600; }
figcaption { font-size: 0.8rem; margin-top: 0.4rem; text-align: center; display: flex; justify-content: center; gap: 0.6rem; }
figcaption span { opacity: 0.55; }
.open { color: var(--accent); opacity: 0.8; text-decoration: none; font-weight: 600; }
.open:hover { opacity: 1; text-decoration: underline; }
</style>
