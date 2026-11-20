<script setup lang="ts">
// Crossfading photos of the original J.S. Joust (from the KubeCon EU 2026 deck in this repo).
// Photos by Brent Knepper, Sara Bobo and Die Gute Fabrik.
import { ref, onMounted, onUnmounted } from 'vue'

const files = [
  'jsjoust-brent01.jpg', 'jsjoust-sara1.jpg', 'jsjoust-brent02.jpg', 'jsjoust-photo1.jpg',
  'jsjoust-brent03.jpg', 'jsjoust-sara2.jpg', 'jsjoust-brent04.jpg', 'jsjoust-photo2.png',
  'jsjoust-brent05.jpg', 'jsjoust-brent06.jpg', 'jsjoust-brent09.jpg', 'jsjoust-brent10.jpg',
]
const images = files.map(f => `${import.meta.env.BASE_URL}img/joust/${f}`)
const current = ref(0)
let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => { timer = setInterval(() => { current.value = (current.value + 1) % images.length }, 2500) })
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="gallery">
    <img v-for="(src, i) in images" :key="src" :src="src" alt="J.S. Joust players" :style="{ opacity: i === current ? 1 : 0 }" />
  </div>
</template>

<style scoped>
.gallery {
  position: relative; width: 100%; aspect-ratio: 16 / 9;
  border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45); transform: rotate(1deg);
}
.gallery img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity 1s ease-in-out; }
</style>
