<script setup lang="ts">
// The JoustMania stack, simplified. `after` adds the agent on the same layout, so the two
// slides read as "before" and "the same thing, plus a seat".
// The feature flagging part is one box, "OpenFeature stack": in JoustMania that is flagd,
// the flag service and Flagsmith, but the talk is about the standard, not the parts.
// step (after only): 0 the agent · 1 OTel in · 2 decide · 3 OpenFeature out · 4 the human moves
// Not a 1:1 service map: envoy, menu, pairing daemon, connect-proxy and friends are left out.
const props = withDefaults(defineProps<{ after?: boolean; step?: number }>(), { after: false, step: 99 })
const on = (s: number) => props.after && props.step >= s
</script>

<template>
  <svg viewBox="0 0 960 500" class="arch" role="img" aria-label="JoustMania architecture">
    <defs>
      <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" class="ahead" />
      </marker>
      <marker id="ahA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" class="ahead-a" />
      </marker>
      <marker id="ahW" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" class="ahead-w" />
      </marker>
    </defs>

    <!-- ── row 1: the game ─────────────────────────────── -->
    <g class="zone"><rect x="10" y="10" width="940" height="120" rx="14" /><text x="24" y="32">the game · gRPC · Python · Rust · Go</text></g>
    <g class="n"><rect x="30" y="48" width="160" height="66" rx="10" /><text x="110" y="76">🎮 PS Move</text><text x="110" y="98" class="s">Bluetooth · ~10 Hz accel</text></g>
    <g class="n"><rect x="250" y="48" width="190" height="66" rx="10" /><text x="345" y="76">controller-manager</text><text x="345" y="98" class="s">rust-hid · LEDs · rumble</text></g>
    <g class="n"><rect x="500" y="48" width="190" height="66" rx="10" /><text x="595" y="76">game-coordinator</text><text x="595" y="98" class="s">rules · thresholds · tempo</text></g>
    <g class="n"><rect x="750" y="48" width="180" height="66" rx="10" /><text x="840" y="76">audio · dashboard</text><text x="840" y="98" class="s">music speed · UI</text></g>
    <line x1="190" y1="81" x2="248" y2="81" class="e" marker-end="url(#ah)" />
    <line x1="440" y1="81" x2="498" y2="81" class="e" marker-end="url(#ah)" />
    <line x1="690" y1="81" x2="748" y2="81" class="e" marker-end="url(#ah)" />

    <!-- ── row 2: the two standards ─────────────────────── -->
    <g class="n of">
      <rect x="250" y="200" width="440" height="66" rx="10" />
      <text x="470" y="228">🎚️ OpenFeature stack</text>
      <text x="470" y="250" class="s">{{ after ? 'providers · bounds · who wrote what · audit' : 'providers · flags from files' }}</text>
    </g>
    <g class="n ot"><rect x="750" y="200" width="180" height="66" rx="10" /><text x="840" y="228">📡 OTel Collector</text><text x="840" y="250" class="s">traces · metrics · logs</text></g>

    <!-- OpenFeature → game (evaluate) -->
    <path d="M 345 200 L 345 116" class="e of-e" marker-end="url(#ah)" />
    <path d="M 595 200 L 595 116" class="e of-e" marker-end="url(#ah)" />
    <text x="470" y="166" class="lbl of-l" text-anchor="middle">evaluate · every frame · no redeploy</text>
    <!-- game → collector (OTLP) -->
    <path d="M 690 104 L 800 198" class="e ot-e" marker-end="url(#ah)" />
    <text x="760" y="160" class="lbl ot-l">OTLP</text>

    <!-- ── row 3: who looks, who decides ───────────────── -->
    <g class="n"><rect x="750" y="340" width="180" height="66" rx="10" /><text x="840" y="368">Jaeger · VictoriaMetrics</text><text x="840" y="390" class="s">Grafana</text></g>
    <line x1="840" y1="266" x2="840" y2="338" class="e ot-e" marker-end="url(#ah)" />

    <g class="n human"><rect x="30" y="340" width="160" height="66" rx="10" /><text x="110" y="368">🧍 operator</text><text x="110" y="390" class="s">{{ on(4) ? 'goal · limits · kill switch' : 'watches · decides · edits' }}</text></g>

    <!-- before (and after, until step 4): the human is the loop -->
    <template v-if="!on(4)">
      <path d="M 840 406 L 840 470 L 110 470 L 110 408" class="e hot" marker-end="url(#ahW)" />
      <text x="300" y="490" class="lbl hot-l" text-anchor="middle">looks at dashboards, minutes later</text>
      <path d="M 150 340 L 290 268" class="e hot" marker-end="url(#ahW)" />
      <text x="196" y="292" class="lbl hot-l">PR · restart</text>
    </template>
    <template v-else>
      <path d="M 150 340 L 290 268" class="e" marker-end="url(#ah)" />
      <text x="140" y="292" class="lbl">sets the boundary</text>
    </template>

    <!-- after: a seat between OTel and OpenFeature -->
    <template v-if="after">
      <g class="n new agent"><rect x="500" y="340" width="190" height="66" rx="10" /><text x="595" y="368">🤖 agent</text><text x="595" y="390" class="s">Go · OTLP receiver</text></g>
      <g class="n new"><rect x="500" y="428" width="190" height="56" rx="10" /><text x="595" y="452">rules · Jev · Claude</text><text x="595" y="472" class="s">one flag picks the backend</text></g>
      <line x1="595" y1="406" x2="595" y2="426" class="e a" />

      <g v-if="on(1)">
        <path d="M 800 266 L 690 352" class="e ot-e" marker-end="url(#ah)" />
        <text x="752" y="322" class="lbl ot-l">OTLP fan-out</text>
      </g>
      <g v-if="on(2)">
        <path d="M 690 395 L 748 395" class="e ot-e" marker-end="url(#ah)" />
        <text x="700" y="420" class="lbl ot-l">gen_ai spans</text>
      </g>
      <g v-if="on(3)">
        <path d="M 560 340 L 560 268" class="e a" marker-end="url(#ahA)" />
        <text x="470" y="310" class="lbl a-l" text-anchor="middle">write · writer=agent · one game</text>
      </g>
    </template>
  </svg>
</template>

<style scoped>
.arch { display: block; width: 50rem; max-width: 100%; height: auto; margin: 0 auto; font-family: 'Inter', system-ui, sans-serif; }
.zone rect { fill: none; stroke: var(--line); stroke-dasharray: 4 6; }
.zone text { fill: currentColor; opacity: 0.45; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; }
.n rect { fill: var(--slidev-theme-background, transparent); stroke: var(--line); stroke-width: 2; }
.n text { fill: currentColor; font-size: 16px; font-weight: 600; text-anchor: middle; }
.n text.s { font-size: 12px; font-weight: 400; opacity: 0.6; }
.n.new rect { stroke: var(--accent); }
.n.agent rect { stroke-width: 3; filter: drop-shadow(0 0 10px var(--accent)); }
.n.human rect { stroke: var(--warn); stroke-dasharray: 6 4; }
.n.of rect { stroke: #8b5cf6; stroke-width: 2.5; }
.n.ot rect { stroke: #f59e0b; stroke-width: 2.5; }
.e { fill: none; stroke: currentColor; stroke-opacity: 0.45; stroke-width: 2; }
.e.a { stroke: var(--accent); stroke-opacity: 1; stroke-width: 2.5; }
.e.hot { stroke: var(--warn); stroke-opacity: 1; stroke-width: 2.5; stroke-dasharray: 8 5; }
.e.of-e { stroke: #8b5cf6; stroke-opacity: 0.9; }
.e.ot-e { stroke: #f59e0b; stroke-opacity: 0.9; }
.ahead { fill: currentColor; opacity: 0.6; }
.ahead-a { fill: var(--accent); }
.ahead-w { fill: var(--warn); }
.lbl { fill: currentColor; opacity: 0.65; font-size: 12px; font-family: var(--slidev-code-font-family, monospace); }
.a-l { fill: var(--accent); opacity: 1; }
.of-l { fill: #8b5cf6; opacity: 1; }
.ot-l { fill: #f59e0b; opacity: 1; }
.hot-l { fill: var(--warn); opacity: 1; }
</style>
