---
theme: default
title: "Two Standards Walk Into an Agent"
info: |
  Runtime Agent Control with OpenTelemetry and OpenFeature. Cloud Native Denmark, Copenhagen, 20 Nov 2026, 30 minutes.
  One takeaway: the agent decides, we decide what it may decide, and that boundary has to be portable.
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
<div class="kicker">Stop mutating · start adapting</div>

<div class="statement">Two Standards Walk Into <span class="accent">an Agent</span></div>

<div class="text-2xl mt-4 opacity-80">
  Runtime Agent Control with OpenTelemetry and OpenFeature
</div>

<div class="mt-12 opacity-60">Simon Schrottner · Cloud Native Denmark · Copenhagen</div>

<!--
[Walk on. Let the title sit.]

[Timing, about 27 min + Q&A: §1 reframe 0:00 · about me 2:30 · §2 living systems 3:15 · §3 the game and the curve 6:00 · architecture 8:00 · LIVE DEMO 10:00 (5 beats, 6 min) · punchline, pipeline, control surface 16:00 · summary, pattern 18:30 · §4 reflex and cortex 19:45 · §5 portable boundary 23:30 · close 25:30 · Q&A from about 27:00. Slot 10:25–11:00.]
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

<div class="statement mt-10">
The problem is not the speed.<br>
<span v-click>It is the missing <span class="accent">selection</span>.</span>
</div>

<!--
AI mutates code faster than we can review it.

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

<div v-click class="kicker text-center mt-12">
The question is not whether something else can act. It is where its authority lives.
</div>

<!--
So we have the senses. We have the muscles. And in between, still, a person.

A human watches the dashboard. Decides what the signal means. Sets the flag.

[click] The question is not whether something else can act. It is where its authority lives.
-->

---
layout: two-cols
class: px-8
---

<div class="kicker">§3 · The experiment</div>

# A system I already trust 🎮

<div class="text-xl mt-8 space-y-3 opacity-80">
  <div v-click>A PS Move party game, used at KubeCon for high-density OpenTelemetry data</div>
  <div v-click>Refactored into microservices · gRPC · multiple languages</div>
  <div v-click>An agent on top. It does not play: it is the <span class="accent">game master</span></div>
  <div v-click class="opacity-60">Today: real controllers, real players. In rehearsal: simulated ones.</div>
</div>

::right::

<div class="mt-16">
<JoustGallery />
</div>

<div class="text-xs opacity-50 mt-6 text-right">Photos: Brent Knepper, Sara Bobo, Die Gute Fabrik · the original J.S. Joust</div>

<!--
§3 The experiment

I wanted to see what happens when something else takes that seat. So I tried it on a system I already trust.

[click] A party game. Players hold PS Move controllers. I have used it at KubeCon to produce dense OpenTelemetry data. [click] Since then it became microservices. gRPC, multiple languages, the shape of a real distributed system.

[click] On top of it sits an agent. The agent does not play. It is the game master.

[click] Today the players are real, holding real controllers. In my rehearsals they are simulated; I rarely have enough people around.
-->

---
layout: center
clicks: 4
---

<div class="kicker">How you lose · one player, one minute</div>

<AccelCurve :step="$clicks" />

<div class="text-lg text-center opacity-70 mt-2">
  <span v-if="$clicks < 2">Move too fast, and you are out.</span>
  <span v-else-if="$clicks < 4">Faster music → you may move more.</span>
  <span v-else>Same swing. Different tempo. <span class="warn">Out.</span></span>
</div>

<!--
The rules fit in one sentence. Hold the controller, keep it steady, knock the others. Move too fast and you are out.

What the game sees is this line. Acceleration, about ten times a second, per controller.

[click] Two lines matter. Warning: the controller rumbles. Death: you are out.

[click] And the lines are not fixed. When the music speeds up, both lines go up. You may move more. That is the part people love: the music tells you how brave you can be.

[click] Now watch the agent. Its goal is "accelerate", get to a result. So it does not speed the music up. It slows it down. The lines drop.

[click] Same swing as before. Before, a rumble. Now, out.

The agent never touched the player. It touched one number. The tempo.

[Data: MEDIUM sensitivity, warning 1.6→1.9 g, death 1.8→2.8 g between music 1.0× and 1.3×. The trace is illustrative; the real panel is next.]
-->

---
layout: two-cols
class: px-8
---

<div class="kicker">The game's physics is a flag</div>

# Tempo is a lever

<div class="small-code">

```python
music   = 1.0 + 0.3 * i        # i ∈ [0, 1]
warning = lerp(SLOW_WARNING[s], FAST_WARNING[s], i)
death   = lerp(SLOW_MAX[s],     FAST_MAX[s],     i)
```

</div>

<div class="text-sm opacity-70 mt-4">

| sensitivity: medium | 1.0× | 1.3× |
|---|---|---|
| warning | 1.6 g | 1.9 g |
| death | 1.8 g | 2.8 g |

</div>

<div v-click class="text-lg mt-4">
Agent: <code>adjust_music_tempo</code> · <code>set_pacing_profile</code><br>
<span class="opacity-60">a game-scoped flag, ramped, never per frame</span>
</div>

::right::

<div class="mt-12">
<LoopVideo name="acceleration-spike" class="h-52 object-cover" />
<div class="text-xs opacity-55 text-center mt-1">an acceleration spike · from the KubeCon EU talk</div>
</div>
<div class="mt-3">
<Shot name="thresholds" caption="Grafana · effective thresholds follow the tempo" />
</div>

<!--
For the engineers. The thresholds are a linear interpolation between a slow and a fast table, per sensitivity level. Intensity i goes from 0 to 1, music goes from 1.0 to 1.3.

[click] That is why tempo is the most interesting lever the agent has. One flag value, and the whole game gets harder or easier, for everyone. It is written per game, ramped over a few seconds, and the coordinator reads it every frame.

On the right: the real thing, from Grafana. Every controller's acceleration, the thresholds moving with the music.
-->

---
layout: center
---

<div class="kicker">How it used to be</div>

<Arch />

<!--
This is how the game ran at KubeCon. Not a perfect service map, but the shape is right.

Top: the game. Controllers over Bluetooth, a Rust HID reader, the controller manager, the game coordinator that owns the rules, audio and the dashboard. gRPC between them, three languages.

Middle: the two standards. An OpenFeature stack serves flags to the services; back then the flags came from files. And everything sends OTLP to a Collector, into Jaeger and VictoriaMetrics, into Grafana.

And the loop? [point at the orange path] That is me. I look at the dashboards. Minutes later I decide. I change a file. Restart.

Senses: yes. Muscles: yes. In between: a person.
-->

---
layout: center
clicks: 4
---

<div class="kicker">Adding a seat · same senses, same muscles</div>

<Arch after :step="$clicks" />

<div class="text-sm text-center opacity-60 mt-2"><b>Jev</b>: a hosted judge model from TypeSafe. It scores options we describe in words; it does not write text. About 0.3 s per answer.</div>

<!--
Here is what I added. Same layout. One new seat: the agent. Go, with its own OTLP receiver.

And the OpenFeature stack grew up. It is no longer files. It knows every flag, its allowed values, its bounds, and who wrote what. Which pieces I use for that does not matter here, the services only ever talk OpenFeature.

[click] OTel in. The Collector fans out: one more exporter, no new instrumentation. The agent sees exactly what Grafana sees. Metrics in a hundred milliseconds to a second, spans later.

[click] It decides, through a backend: plain rules, Jev, or Claude. Jev is a hosted judge model from TypeSafe: we describe the options in words, it scores them. It does not write text, and it answers in about a third of a second. And the decision itself is telemetry: gen_ai spans, back to the same Collector.

[click] OpenFeature out. The agent writes a flag, labelled writer=agent, scoped to one game. The game picks it up through OpenFeature. No redeploy.

[click] And where did I go? I moved. I no longer close the loop. I set the boundary: the goal, the limits and the kill switch.

[In JoustMania the OpenFeature stack is flagd (evaluation), a flag service (registry, bounds, writer labels, game scopes, flagd sync) and Flagsmith (audit and human edits). Only name them if asked.]
-->

---
layout: center
---

<Loop sense="OpenTelemetry" sense-sub="game signals" middle="🤖 Agent" middle-sub="game master" act="Flag" act-sub="game behavior" hot />

<div v-click class="text-center mt-10 text-2xl">
  Goal flag <code>objectives</code>: <code>endurance</code> · <code>accelerate</code> · <code>chaos</code>
  <div class="text-lg opacity-60 mt-2">I set it. The agent works toward it.</div>
</div>

<!--
The game senses through OpenTelemetry. The agent decides. It acts through a flag.

[click] The goal is a flag too. Endurance, accelerate, or chaos. I set it. The agent works toward it.
-->

---
layout: two-cols
class: px-8
---

<div class="kicker">Live · 192.168.8.2</div>

# Let's play. 🎮

<div class="demo-beats demo-5 mt-6">
  <div>👀 <b>observe</b> a decision · open its span</div>
  <div>🎚️ <b>ambient → standard</b> · it may shield</div>
  <div>📏 <b>threshold</b> · act → held</div>
  <div>🛑 <b>kill switch</b></div>
  <div>📉 <b>degrade</b>, never stall</div>
</div>

::right::

<div class="mt-16">
<Shot name="talk-board" caption="Grafana · Talk: Two Standards" />
</div>

<!--
[LIVE DEMO, about 6 minutes, five beats. Operator script: JoustMania docs/talk/two-standards-runbook.md.]

[Before: talk-stage.sh reset, then `backend.sh jev` and `setflag agent interventions_allowed ambient`, a real game running. The board on the right is live while the Pi answers; press v for the screenshot.]

1. Observe (runbook beat 2): a green act or grey noop row on the dashboard. Click its trace link, open agent.decide in Jaeger: rationale, confidence, threshold, the two chat jev-latest children. This replaces the span slide.

2. Ambient to standard: on ambient the agent may only use sound and LEDs. When it wants to protect the weakest player, `setflag agent interventions_allowed standard`. It shields (white LED, Shield badge). A few seconds later back to `ambient`. If it does not show: the backup magic-move slide.

3. Threshold (beat 3a): `backend.sh jev-threshold strict`, the near-threshold rows turn amber held. Back with `backend.sh jev-threshold gate`.

4. Kill switch (beat 5): `agent-killswitch.sh off`, the feed goes silent, the game keeps playing. `on` again.

5. Degrade (beat 7, option B): `setflag agent decision.jev.base_url blackhole`, rows become jev to rules with fallback_reason=timeout, the game never waits. Then `default`.

[After every flip: `backend.sh status`, so the audience sees the flag move, not only its effect.]
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
No code change. No review. No redeploy.
</div>

<!--
[Right after the demo. Point back at beat 2.]

You saw it. When I raised the permission, the agent shielded. When I lowered it, it stopped.

Its judgment did not change.

[click] Its authority did.

[click] No code change. No review. No redeploy.
-->

---
layout: center
---

<div class="kicker">What you just saw · every step is behind a flag</div>

<div class="pipe">
  <div class="st"><b>📡 signals</b><span>OTLP metrics · 0.1–1 s</span></div>
  <div class="st" v-click="1"><b>🚦 gates</b><span>may it ask?</span><code>enabled</code><code>interventions_allowed</code><code>llm.max_requests_per_minute</code></div>
  <div class="st" v-click="2"><b>🔀 backend</b><span>who answers?</span><code>decision.backend</code></div>
  <div class="st hot" v-click="3"><b>🤖 Jev · stage 1</b><span>"needs an intervention?" → p_yes</span><code>p_yes &lt; 0.5 → noop</code></div>
  <div class="st hot" v-click="4"><b>🎯 stage 2</b><span>what · whom · how strong</span><code>decision.jev.act_confidence_threshold</code></div>
  <div class="st" v-click="5"><b>✅ act · ⏸ held</b><span>game-scoped flag write</span><code>writer=agent</code></div>
</div>

<div v-click="6" class="floor">
  any timeout · error · invalid answer · empty budget → <b>rules, in the same cycle</b>
  <span class="opacity-60">· <code>decide.fallback_reason</code> · the game never waits</span>
</div>

<div v-click="7" class="text-center mt-5 opacity-70">
  Jev: noop ≈ 0.3 s · act ≈ 0.5 s &nbsp;·&nbsp; Claude: ≈ 3 s &nbsp;·&nbsp; rules: no network
</div>

<!--
Let me name what you just saw. One decision, and every box has a flag on it. [Keep this quick: the audience saw each step live.]

Signals come in.

[click] Gates first. Is the agent enabled at all: that is the kill switch. Is there anything it may do: if interventions_allowed is none, it does not even ask the model. And is there budget left this minute.

[click] Then: who answers. One flag picks the backend. Rules, Jev, Claude, or any OpenAI-compatible vendor.

[click] Jev is a two-stage model. Stage one is a yes/no gate: does this game need an intervention right now? Its answer is a probability. Below one half: noop, one call, done.

[click] Above it, stage two picks what, whom, how strong. And then the probability is compared with a threshold. A flag. 0.6 by default, 0.95 if I want it strict.

[click] Above the bar: act, and the action is a flag write for this one game. Below the bar: held. The agent wanted to, and was not allowed.

[click] And underneath everything: a floor. Any failure, the rules decide, in the same cycle. The game never waits for a model.

[click] Numbers from rehearsal. Jev: a third of a second to say "nothing", half a second to act. Claude: around three seconds.

[Calibrated gate values on jev-1.13.0: calm ≈ 0.16, dragging ≈ 0.35, collapsing ≈ 0.68, near the threshold ≈ 0.72. Do not promise exact numbers.]
-->

---
layout: center
---

<div class="kicker">The control surface · who may write what</div>

<div class="surface">

| Flag | Writer | What it controls |
|---|---|---|
| `objectives` | 🧍 | the goal: `endurance` · `accelerate` · `chaos` |
| `enabled` | 🧍 | kill switch · in-flight answers are discarded |
| `decision.backend` | 🧍 | `rules` · `jev` · `claude` · `openai` |
| `decision.jev.act_confidence_threshold` | 🧍 | how sure before acting · `gate` 0.6 · `strict` 0.95 |
| `interventions_allowed` | 🧍 | `ambient` · `standard` · `full` · shrinks the question |
| `llm.max_requests_per_minute` | 🧍 + env cap | budget · env can only lower it |
| game-scoped interventions | 🤖 | shield · tempo · cue · die with the game |

</div>

<div v-click class="text-2xl text-center mt-6">The agent <span class="warn">never</span> writes its own limits.</div>

<div v-click class="text-lg text-center mt-2 opacity-75">On a conflict, the human wins. The kill switch included.</div>

<div v-click class="mt-4">

```python
# in the game loop: the agent never touches this code
level = client.get_string_value("interventions_allowed", "")
```

</div>

<!--
So this is the whole control surface. Six flags that I own, and one kind of flag the agent owns.

The agent writes interventions, for one game. They die with that game. Everything that limits the agent, I write.

[click] The agent never writes its own limits. The OpenFeature stack enforces it: every write carries a writer label, every value is checked against declared bounds. An unknown variant is a 422, not a surprise.

[click] And on a conflict, the human side wins. I can change any of these in the flag UI, and that value holds, the kill switch too.

[click] And in the game, this line never changes. The behavior does.

[Q&A, "but the agent promotes new defaults": promotion writes only the game flag set (game rules like sensitivity or spawn protection), as a `real` overlay, behind an env gate AND the kill switch, between games, and one DELETE reverts it. It never writes the agent set, where every limit above lives. For this talk it is off (`experiments_enabled` stays off).]
-->

---
layout: two-cols
class: px-8
---

<div class="kicker">After the game</div>

# Fast decides. <span class="accent">Slow reflects.</span>

<div class="text-xl mt-6 space-y-3 opacity-90">
  <div>🤖 <b>Jev</b> · in the game · 0.3 s</div>
  <div>🧠 <b>Claude</b> · after the game · <code>agent.llm.retro</code></div>
</div>

<div v-click class="text-lg mt-6 space-y-1 opacity-75">
  <div><code>session_assessment</code> · how did it go?</div>
  <div><code>session_focus</code> · what to watch next time</div>
  <div><code>retro.suggestion</code> · type · emphasis · reason</div>
</div>

<div v-click class="text-lg mt-6 accent">Same telemetry. Same flags. Advice, not action.</div>

::right::

<div class="mt-20">
<Shot name="retro" caption="Jaeger · agent.llm.retro · the post-game summary" />
</div>

<!--
When the game ends, a different model takes over. Jev made the decisions in the game, a third of a second each. Claude reads the whole game afterwards and writes a summary.

[click] How did it go. What to focus on next time. And concrete suggestions: which intervention, how much, and why.

[click] Same telemetry in, same flag system around it. But this one only advises. It does not act. A human reads it.

[This is reflex and cortex in miniature, set it up for §4.]
-->

---
layout: center
---

<div class="kicker">The game is small. The pattern is not.</div>

<div class="text-3xl space-y-4 mt-8">
  <div v-click>Incident response</div>
  <div v-click>Progressive delivery</div>
  <div v-click>Capacity and cost</div>
  <div v-click>Policy enforcement</div>
</div>

<div v-click class="text-2xl mt-10 accent">Which decisions can safely become reflexes?</div>

<!--
The game is small. The pattern is not.

[click] Incident response. [click] Progressive delivery. [click] Capacity and cost. [click] Policy enforcement.

[click] The question is always the same. Which decisions can safely become reflexes, and which must stay deliberate?
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
  <div class="opacity-50">practice →</div>
  <div class="px-6 py-4 rounded-xl border-2" style="border-color: var(--accent)">Reflex<div class="text-base opacity-60">automatic</div></div>
</div>

<div v-click class="text-2xl text-center mt-12 opacity-80">
  Every level I unlock gives the agent a little more.
</div>

<div v-click class="text-2xl text-center mt-4 warn">
  Every reflex needs an explicit boundary.
</div>

<!--
Reflexes are not fixed. When you learn to drive, every move is deliberate. A year later, you do not think about it. Practice moves decisions from the cortex to the reflex.

[click] Our systems will do the same. Ambient, standard, full. Every level I unlock gives the agent a little more.

[click] So every reflex needs an explicit boundary. The shield was easy. The next one needs better limits.

[If asked "isn't the agent itself split into fast rules and a slower LLM?": yes. But the whole agent is the reflex, because it acts inside limits a human set.]
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
  <div v-click>🛑 The kill switch</div>
</div>

<div v-click class="text-2xl mt-10 warn">The decision to mutate stays with us.</div>

<!--
The cortex decides what the organism is for. In my game, that is the objectives flag. [click] [click] Which levers exist. [click] How far each one can move. [click] What healthy means.

[click] And the kill switch. One flag, and the agent stops. Immediately.

[click] Mutation is still the last resort. But that does not mean we write every line. You can hand it to a dark factory, if you are brave enough.

[PAUSE]

That is a decision too. A human one. Made on purpose.

[If asked "but the agent promotes new defaults from shadow experiments": it may change things only between games, never during one. The kill switch always wins. It never overwrites a value someone else set.]
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

<div class="kicker">§5 · The boundary must be portable</div>

<div class="grid grid-cols-2 gap-16 text-2xl">
<div>

<div class="kicker">The wires · increasingly shared</div>

MCP · A2A · Open Responses

</div>
<div v-click="1">

<div class="kicker">The rules · still trapped</div>

<span class="warn">Permissions · Guardrails · Audit</span>

</div>
</div>

<div v-click="2" class="text-xl mt-10 opacity-80">
<code>ambient</code> · <code>standard</code> · <code>full</code> is <span class="warn">my</span> vocabulary. Nobody else's agent speaks it.
</div>

<div v-click="3" class="text-2xl mt-8">
OpenTelemetry and OpenFeature happened <span class="accent">at the same table</span>.<br>
<span class="opacity-70">This one can too.</span>
</div>

<div class="footnote">
Checked 18 Nov 2026. MCP, A2A and Open Responses are AAIF projects (Open Responses since 22 Oct 2026, with acceptance tests). OTel GenAI semantic conventions: still Development, no tagged release.
</div>

<!--
§5 The boundary must be portable

That boundary has to live somewhere. The wires are getting standardized. MCP, A2A, even the model call.

[click] The rules are not. What an agent may decide, with what evidence, and how to undo it, lives inside one vendor's control plane. If that joint is proprietary, you cannot move your boundaries when you replace the agent.

[click] Remember the six flags? ambient, standard, full. That is my vocabulary. Nobody else's agent understands it. That is the gap.

[click] We have been here before. OpenTelemetry and OpenFeature happened because people from many companies sat at the same table. This one can too.

[Do NOT call the OTel GenAI conventions stable: still Development, now in their own repo with no tagged release. Open Responses joined the AAIF on 22 Oct 2026.]
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

<div class="mt-8 text-lg opacity-60">Next: OpenFeature as a control plane for OpenTelemetry. Flags steering the senses.</div>

<div class="mt-2 text-sm opacity-50">orange-case.github.io/slides</div>

<div class="mt-8 opacity-50">Simon Schrottner · OpenFeature · CNCF · AAIF</div>

<!--
Thank you.

[If time allows, one sentence: the same two standards work the other way round too, flags steering the telemetry itself. That was my KubeCon talk. The backup slides have it.]

[END]
-->

---
layout: center
class: text-center
---

<div class="kicker">Backup</div>

<div class="statement opacity-60">For questions</div>

<!--
[Backup slides: the permission flip as a magic move (fallback for demo beat 2), the decide span, the live views, the audit view, and where this goes next.]
-->

---
layout: center
class: big-code
---

<div class="kicker">Weakest player · field shrinking · agent wants to shield</div>

````md magic-move {lines: true}
```json
{
  "interventions_allowed": {
    "state": "ENABLED",
    "variants": {
      "ambient": "ambient",
      "standard": "standard",
      "full": "full"
    },
    "defaultVariant": "ambient"
  }
}
```
```json
{
  "interventions_allowed": {
    "state": "ENABLED",
    "variants": {
      "ambient": "ambient",
      "standard": "standard",
      "full": "full"
    },
    "defaultVariant": "standard"
  }
}
```
```json
{
  "interventions_allowed": {
    "state": "ENABLED",
    "variants": {
      "ambient": "ambient",
      "standard": "standard",
      "full": "full"
    },
    "defaultVariant": "ambient"
  }
}
```
````

<div class="ladder">
  <div><b>ambient</b><span>sound · LED</span></div>
  <div><b>standard</b><span>+ grant shield</span></div>
  <div><b>full</b><span>+ eliminate · revive · end game</span></div>
</div>

<!--
[BACKUP: fallback for demo beat 2 if the shield does not show live.]

My agent saw the weakest player. The field was shrinking. It wanted to shield that player.

It was not allowed to.

[PAUSE]

By default, the agent may only use sound and lights. Granting a shield is one level up. That permission is a flag. [click] I raised it to standard. The agent shielded the player. [click] A few seconds later, I switched it back.
-->

---
layout: center
class: mid-code
---

<div class="kicker">What a decision leaves behind · one span</div>

```yaml
agent.decide                                   # service: agent
  gen_ai.agent.name:           game-master
  gen_ai.conversation.id:      <game id>
  gen_ai.request.model:        jev-latest
  decide.backend:              jev
  decide.outcome:              act      # act·held·noop·fallback·discarded
  decide.confidence:           0.72
  decide.act_confidence_threshold: 0.60       # source: jev
  decide.rationale:            "two players near the death line"
  └─ event gen_ai.evaluation.result: "0.720 >= 0.600"
  └─ chat jev-latest    jev.stage=intervention   jev.gate.p_yes=0.72
  └─ chat jev-latest    jev.stage=details
```

<div class="footnote">
Attribute values illustrative. OTel GenAI semantic conventions are still in Development status.
</div>

<!--
And every decision is a span. Not a log line. A span, with the why.

Which model, which backend. The outcome. The confidence, the threshold it was compared with, and where that threshold came from. The rationale, in words. And the model calls underneath as child spans, following the GenAI semantic conventions.

So when someone asks "why did the agent shield that player": open the trace. That is the audit.

[Do NOT call the OTel GenAI conventions stable: still Development.]
-->

---
layout: default
---

<div class="kicker">The same views, without leaving the deck · live when the Pi answers</div>

<div class="grid grid-cols-2 gap-4">
  <Shot name="talk-board" height="11.5rem" caption="Grafana · Talk: Two Standards" />
  <Shot name="jaeger-decide" height="11.5rem" caption="Jaeger · agent.decide" />
  <Shot name="decide-outcome" height="11.5rem" caption="decide outcome split (span metrics)" />
  <Shot name="decide-latency" height="11.5rem" caption="decide latency p95 by backend" />
</div>

<!--
[Live panels when 192.168.8.2 answers (badge "● live"), screenshots otherwise. Press v to flip by hand.]

Same views as live: the stage dashboard, the decisions in Jaeger, the outcome split per backend, and the latency per backend.
-->

---
layout: two-cols
class: px-8
---

<div class="kicker">Humans see every write</div>

# One place to see every change

<div class="text-lg mt-6 space-y-3 opacity-90">
  <div><b>every write</b> · agent, operator, scripts · with who and when</div>
  <div><b>human edits</b> · change a flag in the UI → an ordinary, validated write</div>
  <div v-click><b>conflict</b> · the human wins · <span class="warn">kill switch included</span></div>
  <div v-click><b>offline</b> · never on the game path · the Pi plays without it</div>
</div>

<div v-click class="text-lg mt-6 opacity-70">Evaluation stays local and boring. The management UI is a writer and a window.</div>

::right::

<div class="mt-16">
<Shot name="flag-audit" caption="the agent's writes next to mine · Flagsmith here" />
</div>
<div class="mt-4">
<Shot name="flag-writes" caption="Grafana · flag writes / min, by writer and result" />
</div>

<!--
One more piece. Where do I, the human, look?

Every accepted write is mirrored to a flag management UI. The agent's interventions, my threshold flips, the scripts. So there is one place that shows what changed, who changed it, when. I use Flagsmith for that.

And it works the other way. I change a flag there, and it comes back as an ordinary, validated write.

[click] On a conflict, the human side wins. Also for the kill switch. If I hit it there, it holds.

[click] And it is never on the path of a game. It is SaaS; a booth has bad WiFi. The game plays without it.

[click] Evaluation stays local and boring. The UI is a writer, and a window.

[Show it live if time allows: the agent's game-scoped writes appearing as identity overrides in Flagsmith.]
-->

---
layout: center
---

<div class="kicker">Where this goes · the loop, turned inward</div>

<div class="statement">Today, flags steer <span class="accent">the agent</span>.</div>

<div v-click class="statement mt-8">Next, flags steer <span class="accent">the senses</span>.</div>

<!--
One last idea, and it is where I want to take this.

Today the loop goes out. Telemetry in, flags out, the game changes.

[click] But the senses themselves can be a flag. Most telemetry config is static. We decide up front which spans, which attributes, how much. And then we live with it.
-->

---
layout: two-cols
class: px-8
---

<div class="kicker">Telemetry that adapts</div>

# Healthy

<div class="text-2xl mt-6 space-y-2 opacity-80">
  <div>Lean traces</div>
  <div>Few attributes</div>
  <div class="accent">Low cost, low noise</div>
</div>

::right::

<div v-click>

<div class="kicker">&nbsp;</div>

# Unsure

<div class="text-2xl mt-6 space-y-2 opacity-80">
  <div><code>held</code> · low confidence · incident</div>
  <div>Deep spans, extra attributes</div>
  <div class="warn">Exactly when you need them</div>
</div>

</div>

<div v-click class="footnote">
Already a runtime flag in this game: <code>log_level</code>. Next: span detail, attributes, sampling.
</div>

<!--
When everything is healthy, detailed telemetry is cost and noise.

[click] When the agent is unsure, when it holds a decision, when there is an incident, it is exactly the telemetry we did not collect. So let the same loop raise the detail, and lower it again.

[click] In this game, log_level already is a runtime flag. Span detail and sampling are next.
-->

---
layout: center
class: text-center
---

<div class="statement">Semantic conventions as the <span class="accent">control surface</span>.</div>

<div v-click class="text-xl mt-10 opacity-60">OpenFeature as a control plane for OpenTelemetry</div>

<!--
And if the knobs are named after semantic conventions, that control surface is vendor-neutral too. Same as the boundary. Same table.

[click] That was my KubeCon talk: OpenFeature as a control plane for OpenTelemetry. Same two standards, pointed the other way.
-->
