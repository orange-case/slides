<script setup lang="ts">
// A muted, looping clip from public/video/, resolved against the deploy base (GitHub Pages subpath).
const props = defineProps<{ name: string }>()
const src = `${import.meta.env.BASE_URL}video/${props.name}.mp4`
</script>

<template>
  <video :src="src" autoplay loop muted playsinline class="w-full rounded-lg" />
</template>
