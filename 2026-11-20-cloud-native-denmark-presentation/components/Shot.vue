<script setup lang="ts">
// A screenshot from public/img/shots/, captured by scripts/capture-screenshots.mjs.
// Until the file exists, show a labelled placeholder instead of a broken image.
import { ref } from 'vue'
const props = defineProps<{ name: string; caption?: string }>()
const missing = ref(false)
const src = `${import.meta.env.BASE_URL}img/shots/${props.name}.png`
</script>

<template>
  <figure class="shot">
    <img v-if="!missing" :src="src" :alt="caption ?? name" @error="missing = true" />
    <div v-else class="ph">
      <div class="ph-t">📸 {{ name }}.png</div>
      <code>npm run shots -- {{ name }}</code>
    </div>
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>

<style scoped>
.shot { margin: 0; }
.shot img { width: 100%; border-radius: 10px; border: 1px solid var(--line); }
.ph {
  aspect-ratio: 16 / 6;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem;
  border: 2px dashed var(--line); border-radius: 10px; opacity: 0.7;
}
.ph-t { font-size: 1.2rem; font-weight: 600; }
figcaption { font-size: 0.8rem; opacity: 0.55; margin-top: 0.4rem; text-align: center; }
</style>
