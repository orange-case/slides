<script setup lang="ts">
// Sense → (who decides?) → Act
defineProps<{
  sense?: string
  senseSub?: string
  middle?: string
  middleSub?: string
  act?: string
  actSub?: string
  hot?: boolean
}>()
</script>

<template>
  <div class="loop">
    <div class="node">
      <div class="label">{{ sense ?? 'Sense' }}</div>
      <div v-if="senseSub" class="sub">{{ senseSub }}</div>
    </div>
    <div class="arrow">→</div>
    <div class="node middle" :class="{ hot }">
      <div class="label">{{ middle ?? '?' }}</div>
      <div v-if="middleSub" class="sub">{{ middleSub }}</div>
    </div>
    <div class="arrow">→</div>
    <div class="node">
      <div class="label">{{ act ?? 'Act' }}</div>
      <div v-if="actSub" class="sub">{{ actSub }}</div>
    </div>
  </div>
</template>

<style scoped>
.loop {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  margin-top: 2rem;
}
.node {
  min-width: 11rem;
  padding: 1.25rem 1.5rem;
  border: 2px solid var(--line);
  border-radius: 14px;
  text-align: center;
}
.label {
  font-size: 1.6rem;
  font-weight: 600;
}
.sub {
  font-size: 0.95rem;
  opacity: 0.65;
  margin-top: 0.25rem;
}
.middle {
  border-style: dashed;
}
.middle.hot {
  border-color: var(--accent);
  border-style: solid;
  box-shadow: 0 0 32px -8px var(--accent);
}
.arrow {
  font-size: 2rem;
  opacity: 0.5;
}
</style>
