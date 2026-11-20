<script setup lang="ts">
// One player's acceleration over a minute, against the warning and death lines.
// Thresholds follow the game coordinator's lerp at MEDIUM sensitivity
// (services/game_coordinator/games/flag_snapshot.py, base.py):
//   warning = lerp(1.6, 1.9, i)   death = lerp(1.8, 2.8, i)   music = 1.0 + 0.3 * i
// step 0: the trace only · 1: + thresholds at slow music · 2: the tempo ramps up (lines rise)
// step 3: the agent slows the tempo (R5 accelerate) · 4: the same swing now kills
import { computed } from 'vue'

const props = withDefaults(defineProps<{ step?: number }>(), { step: 99 })

const W = 900, H = 380, L = 56, R = 16, T = 16, B = 40
const T_MAX = 60, G_MAX = 3.2
const x = (t: number) => L + (t / T_MAX) * (W - L - R)
const y = (g: number) => H - B - (g / G_MAX) * (H - T - B)
const lerp = (a: number, b: number, i: number) => a + (b - a) * i
const smooth = (p: number) => p <= 0 ? 0 : p >= 1 ? 1 : p * p * (3 - 2 * p)

// Tempo intensity over the game. Ramps up 18→26 s, the agent pulls it down 44→47 s.
function intensity(t: number, s: number) {
  if (s < 2) return 0
  const up = smooth((t - 18) / 8)
  if (s < 3) return up
  return up * (1 - smooth((t - 44) / 3))
}

// Deterministic "player": a calm base, wobble, and three big swings.
const spikes = [
  { t: 9, g: 0.3, w: 0.45 },
  { t: 36, g: 1.15, w: 0.5 }, // fast music: only a warning
  { t: 53, g: 1.15, w: 0.5 }, // slow music again: same swing, death
]
function accel(t: number) {
  let g = 1.0 + 0.12 * Math.sin(t * 2.1) + 0.08 * Math.sin(t * 5.3 + 1) + 0.06 * Math.sin(t * 11.7)
  for (const s of spikes) g += s.g * Math.exp(-((t - s.t) ** 2) / (2 * s.w ** 2))
  return g
}

const ticks = Array.from({ length: 601 }, (_, k) => k / 10)
const trace = computed(() => {
  const end = props.step >= 4 ? 60 : 50
  return ticks.filter(t => t <= end).map(t => `${x(t).toFixed(1)},${y(accel(t)).toFixed(1)}`).join(' ')
})
const line = (a: number, b: number) => computed(() =>
  ticks.map(t => `${x(t).toFixed(1)},${y(lerp(a, b, intensity(t, props.step))).toFixed(1)}`).join(' '))
const warn = line(1.6, 1.9)
const death = line(1.8, 2.8)
const tempoLabel = computed(() => props.step >= 2 && props.step < 3 ? '1.3×' : '1.0×')
</script>

<template>
  <svg :viewBox="`0 0 ${W} ${H}`" class="accel" role="img" aria-label="Acceleration of one player against warning and death thresholds">
    <!-- axes -->
    <g class="axis">
      <line :x1="L" :y1="y(0)" :x2="W - R" :y2="y(0)" />
      <line :x1="L" :y1="T" :x2="L" :y2="y(0)" />
      <g v-for="g in [0, 1, 2, 3]" :key="g">
        <line :x1="L" :x2="W - R" :y1="y(g)" :y2="y(g)" class="grid" />
        <text :x="L - 10" :y="y(g) + 5" text-anchor="end">{{ g }} g</text>
      </g>
      <text v-for="t in [0, 10, 20, 30, 40, 50, 60]" :key="t" :x="x(t)" :y="H - 14" text-anchor="middle">{{ t }} s</text>
    </g>

    <!-- tempo bands -->
    <g v-if="step >= 2" class="band">
      <rect :x="x(22)" :y="T" :width="x(45) - x(22)" :height="y(0) - T" />
      <text :x="x(33.5)" :y="T + 18" text-anchor="middle">music 1.3× · lines up</text>
    </g>
    <g v-if="step >= 3" class="band agent">
      <text :x="x(48)" :y="T + 18" text-anchor="start">🤖 agent: tempo 1.0</text>
    </g>

    <!-- thresholds -->
    <g v-if="step >= 1">
      <polyline :points="warn" class="warn" />
      <polyline :points="death" class="death" />
      <text :x="W - R - 4" :y="y(lerp(1.8, 2.8, intensity(60, step))) - 8" text-anchor="end" class="death-l">death</text>
      <text :x="W - R - 4" :y="y(lerp(1.6, 1.9, intensity(60, step))) + 18" text-anchor="end" class="warn-l">warning</text>
    </g>

    <!-- the player -->
    <polyline :points="trace" class="trace" />

    <g v-if="step >= 2">
      <circle :cx="x(36)" :cy="y(accel(36))" r="9" class="m-warn" />
      <text :x="x(36)" :y="y(accel(36)) - 16" text-anchor="middle" class="warn-l">⚠ rumble</text>
    </g>
    <g v-if="step >= 4">
      <circle :cx="x(53)" :cy="y(accel(53))" r="9" class="m-death" />
      <text :x="x(53)" :y="y(accel(53)) - 16" text-anchor="middle" class="death-l">💀 out</text>
    </g>

    <text v-if="step >= 1" :x="L + 10" :y="T + 18" class="tempo">tempo {{ tempoLabel }}</text>
  </svg>
</template>

<style scoped>
.accel { display: block; width: 52rem; max-width: 100%; height: auto; margin: 0 auto; font-family: var(--slidev-code-font-family, monospace); }
.axis line { stroke: var(--line); stroke-width: 1.5; }
.axis .grid { stroke-dasharray: 3 6; stroke-width: 1; }
.axis text { fill: currentColor; opacity: 0.55; font-size: 14px; }
.trace { fill: none; stroke: currentColor; stroke-width: 2.5; opacity: 0.85; }
.warn, .death { fill: none; stroke-width: 3; transition: all 0.6s; }
.warn { stroke: #eab308; stroke-dasharray: 10 6; }
.death { stroke: var(--warn); }
.warn-l { fill: #eab308; font-size: 15px; font-weight: 600; }
.death-l { fill: var(--warn); font-size: 15px; font-weight: 600; }
.band rect { fill: var(--accent); opacity: 0.08; }
.band text { fill: var(--accent); font-size: 15px; }
.m-warn { fill: none; stroke: #eab308; stroke-width: 3; }
.m-death { fill: none; stroke: var(--warn); stroke-width: 3; }
.tempo { fill: currentColor; opacity: 0.7; font-size: 15px; }
</style>
