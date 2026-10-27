---
theme: default
title: "Stop Mutating, Start Adapting"
info: |
  Giving Systems Reflexes with Open Standards. One takeaway: the agent decides, we decide what it may decide,
  and that boundary has to be portable.
author: Simon Schrottner
colorSchema: auto
transition: fade
mdc: true
fonts:
  sans: Inter
  mono: JetBrains Mono
layout: center
class: text-center
---

<div class="statement">Stop Mutating, <span class="accent">Start Adapting</span></div>

<div class="text-2xl mt-4 opacity-80">
  Giving Systems Reflexes with Open Standards
</div>

<div class="text-lg mt-3 opacity-50">OpenTelemetry · OpenFeature</div>

<div class="mt-12 opacity-60">Simon Schrottner</div>

<!--
[Walk on. Let the title sit.]
-->

---
layout: center
---

<div class="statement">
Every pull request is a <span class="accent">mutation</span>.
</div>

<div v-click class="statement mt-8">
Every incident is <span class="warn">selection pressure</span>.
</div>

<!--
§1 The reframe

Hey. Every pull request is a mutation.

[PAUSE] [click]

Every incident is selection pressure.

We have been running evolution without knowing it. With humans as the slowest part of the loop.
-->

---
layout: center
class: text-center
---

<div class="statement">🙋</div>

<div class="statement mt-6">Reviewed agent-written code this week?</div>

<div v-click class="statement mt-6 dim">…read every line?</div>

<!--
[RAISE HANDS] Who here reviewed code this week that an agent wrote?

[PAUSE] [click]

Keep your hand up if you read every line.

[PAUSE, let the hands drop]
-->

---
layout: center
---

<div class="text-3xl opacity-60">
AI mutates code faster than we can review it.
</div>

<div v-click class="statement mt-10">
Mutation <span class="warn">without selection</span>.
</div>

<!--
AI mutates code faster than we can review it.

[click] Mutation without selection pressure.
-->

---
layout: center
---

<div class="statement">
The problem is not the speed.<br>
<span v-click>It is the missing <span class="accent">selection</span>.</span>
</div>

<!--
The problem is not the speed. [click] It is the missing selection.
-->

---
layout: center
---

<div class="statement">We are playing god.</div>

<div v-click="1" class="statement mt-8"><span class="warn">Slow</span> gods.</div>

<div v-click="2" class="statement mt-8">A small say in its own <span class="accent">fate</span>.</div>

<!--
We are playing god. Our infrastructure and our software are our world. We decide what lives, what dies, and how it evolves.

[click] But we are slow gods. We keep adding. We rarely remove. We rarely go back and adjust.

[PAUSE]

[click] Maybe it is time to stop only driving evolution. Time to give our software senses, and a few reflexes. A small say in its own fate.
-->

---
layout: image-right
image: /img/simon.jpg
backgroundSize: cover
class: flex flex-col justify-center
---

<div class="kicker">Who am I?</div>

# Simon Schrottner

<div class="grid grid-cols-2 gap-3 mt-6 text-center text-sm">
  <div class="bio-card">
    <img src="/img/openfeature-horizontal-black.svg" class="h-8 object-contain dark:invert" />
    <div>OpenFeature Maintainer &amp; TSC Member</div>
  </div>
  <div class="bio-card">
    <img src="/img/cncf-ambassador-color.svg" class="h-12 object-contain" />
    <div>CNCF Ambassador</div>
  </div>
  <div class="bio-card">
    <img src="/img/aaif_ambassador.png" class="h-12 object-contain" />
    <div>AAIF Ambassador</div>
  </div>
  <div class="bio-card">
    <img src="/img/flagsmith.svg" class="h-8 object-contain dark:invert" />
    <div>Fractional Developer Advocate</div>
  </div>
</div>

<div class="text-xs opacity-60 mt-8 space-y-1">
  <div>simon@schrottner.at · schrottner.at</div>
  <div>github.com/aepfli · in/aepfli · @aepfli.bsky.social</div>
</div>

<!--
I am Simon. I help maintain OpenFeature and sit on its Technical Steering Committee. I am also a CNCF and AAIF ambassador.

And I did not start here.

A few months ago, I was AI tool fatigued. New frameworks every week. Hard to keep up. But I wanted to play with agents too. Not to write my code. In production. And for a long time, I could not find a problem there worth solving.
-->

---
layout: center
---

<div class="kicker text-center">A fleet of clusters · hundreds of services</div>

<Loop middle="🧍" middle-sub="a person" />

<!--
So I looked at the systems I used to run. A fleet of clusters. Hundreds of services. More moving pieces than one person can hold in their head. Many of you run one today.

And I noticed something.

We already have systems that sense. We already have systems that act. But between them sits a person.

That is where this talk started.
-->

---
layout: two-cols
class: px-8
---

<div class="kicker">§2 · Living systems</div>

# Mutation

<div class="text-2xl mt-6 space-y-2 opacity-80">
  <div>Rare</div>
  <div>Structural</div>
  <div class="warn">The last resort</div>
</div>

::right::

<div v-click>

<div class="kicker">&nbsp;</div>

# Adaptation

<div class="text-2xl mt-6 space-y-2 opacity-80">
  <div>Everything else</div>
  <div>Continuous</div>
  <div class="accent">At runtime</div>
</div>

</div>

<!--
§2 Mutation and adaptation

Living systems solved this a long time ago. They separated mutation from adaptation.

Mutation is rare. Structural. The last resort.

[click] Everything else is adaptation. Continuous. At runtime.
-->

---
layout: center
class: text-center
---

<div class="statement">🤏 Pinch yourself.</div>

<div v-click class="text-2xl mt-10 opacity-70">You did not rewrite anything. You sensed, and you acted.</div>

<!--
Small experiment. Pinch yourself in the arm.

[PAUSE] [click]

You did not rewrite anything just now. You sensed something, and you acted.
-->

---
layout: center
---

<div class="space-y-8 text-3xl">
  <div v-click="1"><b>OpenTelemetry</b> <span class="opacity-40">→</span> <span class="accent">afferent system</span> <span class="text-lg opacity-50 ml-2">not a dashboard</span></div>
  <div v-click="2"><b>OpenFeature</b> <span class="opacity-40">→</span> <span class="accent">motor control</span> <span class="text-lg opacity-50 ml-2">not a release safety net</span></div>
  <div v-click="3"><b>Code change</b> <span class="opacity-40">→</span> <span class="warn">mutation</span> <span class="text-lg opacity-50 ml-2">the last resort</span></div>
</div>

<!--
Our systems already have the same pieces.

[click] OpenTelemetry is not a dashboard. It is an afferent system. Signals flowing toward something that can decide.

[click] OpenFeature is not a release safety net. It is motor control. Behavior change without surgery.

[click] And code changes are mutation. The last resort, not the default.
-->

---
layout: center
---

<Loop sense="OpenTelemetry" sense-sub="senses" middle="🧍" middle-sub="watches · decides · sets the flag" act="OpenFeature" act-sub="muscles" />

<!--
So we have the senses. We have the muscles. And in between, still, a person.

A human watches the dashboard. Decides what the signal means. Sets the flag.
-->

---
layout: center
---

<div class="kicker">§3 · The experiment</div>

# A party game 🎮

<div class="text-2xl mt-8 space-y-3 opacity-80">
  <div v-click>Players hold PS Move controllers</div>
  <div v-click>An agent on top — it does not play, it is the <span class="accent">game master</span></div>
  <div v-click class="opacity-60">Players are simulated (not enough real people around)</div>
</div>

<!--
§3 The experiment

I wanted to see what happens when something else takes that seat. So I tried it on something small.

[click] I built a party game. Players hold PS Move controllers. [click] On top of it sits an agent. The agent does not play. It is the game master.

[click] In my tests, the players are simulated. I rarely have enough real people around.
-->

---
layout: center
---

<Loop sense="OpenTelemetry" sense-sub="game signals" middle="🤖 Agent" middle-sub="game master" act="Flag" act-sub="game behavior" hot />

<div v-click class="text-center mt-10 text-2xl">
  Goal flag: <code>long-lasting</code> <span class="opacity-40">or</span> <code>action</code>
  <div class="text-lg opacity-60 mt-2">I set it. The agent works toward it.</div>
</div>

<!--
The game senses through OpenTelemetry. The agent decides. It acts through a flag.

[click] The goal is a flag too. Long-lasting games, or fun, action-based ones. I set it. The agent works toward it.
-->

---
layout: center
---

<div class="kicker">Under the hood · one loop</div>

<div class="tloop">
  <div class="tnode">🎮 <b>Application</b><span>the game</span></div>
  <div class="tarrow" v-click="1">OTLP →</div>
  <div class="tnode" v-click="1">📡 <b>OTel Collector</b><span>traces · metrics · events</span></div>
  <div class="tarrow" v-click="4">↑ evaluate · no redeploy</div>
  <div></div>
  <div class="tarrow" v-click="2">↓ query</div>
  <div class="tnode" v-click="4">🎚️ <b>OpenFeature</b><span>flagd · provider</span></div>
  <div class="tarrow" v-click="3">← set flag</div>
  <div class="tnode hot" v-click="2">🤖 <b>Agent</b><span>game master</span></div>
</div>

<div v-click="5" class="mt-6">

```ts
// in the game loop — the agent never touches this code
const shield = await client.getBooleanValue('agent-may-grant-shield', false)
```

</div>

<!--
[Keep it quick — this is for the engineers in the room.]

[click] The game emits telemetry over OTLP to a Collector. [click] The agent reads from there. [click] When it decides, it does not touch code. It sets a flag. [click] The game evaluates that flag through OpenFeature on the next tick.

[click] This line never changes. The behavior does.
-->

---
layout: center
class: big-code
---

<div class="kicker">Weakest player · field shrinking · agent wants to shield</div>

````md magic-move {lines: true}
```json
{
  "agent-may-grant-shield": {
    "state": "ENABLED",
    "variants": { "on": true, "off": false },
    "defaultVariant": "off"
  }
}
```
```json
{
  "agent-may-grant-shield": {
    "state": "ENABLED",
    "variants": { "on": true, "off": false },
    "defaultVariant": "on"
  }
}
```
```json
{
  "agent-may-grant-shield": {
    "state": "ENABLED",
    "variants": { "on": true, "off": false },
    "defaultVariant": "off"
  }
}
```
````

<!--
My agent saw the weakest player. The field was shrinking. It wanted to shield that player.

It was not allowed to.

[PAUSE]

By default, the agent cannot grant shields. That permission is a flag. [click] I flipped it. The agent shielded the player. [click] A few seconds later, it reverted.
-->

---
layout: center
---

<div class="statement">
Its judgment did not change.
</div>

<div v-click class="statement mt-6">
Its <span class="accent">authority</span> did.
</div>

<div v-click class="text-2xl mt-12 opacity-60">
No mutation. No pull request. No redeploy.
</div>

<!--
Its judgment did not change.

[click] Its authority did.

[click] No mutation. No pull request. No redeploy.
-->

---
layout: center
---

<div class="kicker">§4 · Reflex and cortex</div>

<div class="statement">🔥✋ Reflex</div>

<div class="text-2xl mt-8 opacity-80">Fast. Local. Inside limits the body already set.</div>

<div v-click class="text-2xl mt-8 accent">That is the seat the agent took.</div>

<!--
§4 Reflex and cortex

In biology, that has a name. A reflex. Touch a hot stove, and your hand moves before you know why. Fast, local, inside limits the body already set.

[click] That is the seat the agent took.

Here is the uncomfortable part.
-->

---
layout: center
---

<div class="flex items-center justify-center gap-8 text-3xl">
  <div class="px-6 py-4 rounded-xl border-2" style="border-color: var(--line)">Cortex<div class="text-base opacity-60">deliberate</div></div>
  <div class="opacity-50">— practice →</div>
  <div class="px-6 py-4 rounded-xl border-2" style="border-color: var(--accent)">Reflex<div class="text-base opacity-60">automatic</div></div>
</div>

<div v-click class="text-2xl text-center mt-12 opacity-80">
  Every flag I flip gives the agent a little more.
</div>

<div v-click class="text-2xl text-center mt-4 warn">
  The shield was easy. The next one will not be.
</div>

<!--
Reflexes are not fixed. When you learn to drive, every move is deliberate. A year later, you do not think about it. Practice moves decisions from the cortex to the reflex.

[click] Our systems will do the same. Every flag I flip gives the agent a little more.

[click] The shield was easy. The next one will not be.
-->

---
layout: center
---

<div class="statement">
I am the slowest part<br>of my own system.
</div>

<!--
And the agent spots patterns faster than I can. At fleet scale, it is not even close.

I am the slowest part of my own system.
-->

---
layout: center
class: text-center
---

<div class="statement">
If everything becomes a reflex,<br>
<span class="accent">what is the cortex for?</span>
</div>

<!--
So where does it stop? If everything becomes a reflex, what is the cortex for?

[PAUSE]
-->

---
layout: center
---

<div class="kicker">The cortex decides what the organism is for</div>

<div class="text-3xl space-y-4">
  <div v-click>🎯 The goal</div>
  <div v-click>🎚️ Which levers exist</div>
  <div v-click>📏 How far each one can move</div>
  <div v-click>💚 What healthy means</div>
</div>

<div v-click class="text-2xl mt-10 warn">Mutation stays with us. On purpose.</div>

<!--
The cortex decides what the organism is for. In my game, that is the goal flag. [click] [click] Which levers exist. [click] How far each one can move. [click] What healthy means.

[click] Mutation stays with us. On purpose.
-->

---
layout: center
class: text-center
---

<div class="statement">The agent decides.</div>
<div v-click class="statement mt-4 accent">We decide what it may decide.</div>

<!--
The agent decides. [click] We decide what it may decide.

[This is the takeaway. Let it land.]
-->

---
layout: center
---

<div class="kicker">§5 · Where the boundary lives</div>

<div class="grid grid-cols-2 gap-16 text-2xl">
<div>

<div class="kicker">The wires · shared</div>

MCP · A2A · Open Responses

</div>
<div v-click="1">

<div class="kicker">The rules · per vendor</div>

<span class="warn">Permissions · Guardrails</span>

</div>
</div>

<div v-click="2" class="text-2xl mt-14">
OpenTelemetry and OpenFeature happened <span class="accent">at the same table</span>.<br>
<span class="opacity-70">This one can too.</span>
</div>

<div class="footnote">
Checked 14 Oct 2026. MCP and A2A are AAIF projects; Open Responses ships spec + acceptance tests. OTel GenAI semantic conventions are still in Development status.
</div>

<!--
§5 Where the boundary lives

That boundary has to live somewhere. The wires are getting standardized. MCP, A2A, even the model call.

[click] The rules are not. What an agent is allowed to do lives inside one vendor's control plane. If that joint is proprietary, you cannot move your boundaries when you replace the agent.

[click] We have been here before. OpenTelemetry and OpenFeature happened because people from many companies sat at the same table. This one can too.

[Do NOT call the OTel GenAI conventions stable — still Development status.]
-->

---
layout: center
---

<div class="statement">
What part does the <span class="accent">human</span> play in your system?
</div>

<div v-click class="statement mt-8">
Which <span class="warn">bottleneck</span> do you want to see moved?
</div>

<!--
So, what part does the human play in your system? [click] And which bottleneck do you want to see moved?

[PAUSE]
-->

---
layout: center
class: text-center
---

# Thank you

<div class="mt-8 opacity-70 text-xl">
  <div>The agent decides. We decide what it may decide.</div>
</div>

<div class="mt-10 opacity-50">Simon Schrottner · OpenFeature · CNCF · AAIF</div>

<!--
Thank you.

[END]
-->
