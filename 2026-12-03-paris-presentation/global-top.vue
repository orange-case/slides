<script setup lang="ts">
// Above every slide (global-top: global-bottom is drawn behind the opaque
// slide background). The case, small, bottom right of every slide but the cover (which shows it large).
import { useNav } from '@slidev/client'
import logo from './assets/brand/logo.webp'

const { currentPage } = useNav()
</script>

<template>
  <img v-if="currentPage !== 1" :src="logo" class="corner-case" alt="" aria-hidden="true" />
</template>

<style>
.corner-case {
  position: absolute;
  right: 1.1rem;
  bottom: 0.9rem;
  width: 2.4rem;
  height: auto;
  opacity: 0.9;
  pointer-events: none;
}
</style>
