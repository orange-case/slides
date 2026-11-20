<script setup lang="ts">
// Links to the newest game's agent spans in Jaeger. The Pi's dashboard resolves
// /?latest=summary|retro to /jaeger/trace/<trace>?uiFind=<span> (JoustMania #2717):
// the deck cannot search the Pi's Jaeger itself, it runs on another origin.
import { demoBase } from '../composables/useDemoHost'
</script>

<template>
  <div class="latest">
    <span class="opacity-60">newest game, live:</span>
    <a :href="`${demoBase}/?latest=summary`" target="_blank" rel="noopener">summary ↗</a>
    <a :href="`${demoBase}/?latest=retro`" target="_blank" rel="noopener">retro ↗</a>
  </div>
</template>

<style scoped>
.latest { display: flex; gap: 1rem; align-items: baseline; font-size: 1rem; margin-top: 0.75rem; }
.latest a { color: var(--accent); font-weight: 600; text-decoration: none; }
.latest a:hover { text-decoration: underline; }
</style>
