---
theme: default
title: "Two Standards Walk Into an Agent"
info: |
  Runtime Agent Control with OpenTelemetry and OpenFeature. Paris, 3 Dec 2026, 25 minutes.
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
<CaseLogo class="cover-case" />

<div class="kicker">Stop mutating · start adapting</div>

<div class="statement stencil cover-title">Two Standards Walk<br>Into <span class="accent">an Agent</span></div>

<div class="text-2xl mt-4 opacity-80">
  Runtime Agent Control with OpenTelemetry and OpenFeature
</div>

<div class="mt-12 opacity-60">Simon Schrottner · Paris</div>

<!--
[Walk on. Let the title sit.]

[Timing, 25-min slot, about 22 min + short Q&A: §1 reframe 0:00 · about me 2:00 · §2 living systems 2:45 · §3 the game and the curve 5:00 · architecture 6:30 · LIVE DEMO 8:00 (2 games, about 6 min; hard stop 14:30, time check in its notes) · authority, control surface 14:30 · fast decides, slow reflects + the newest summary 16:00 · pattern, AI SRE 17:15 · §4 reflex and cortex 18:00 · §5 portable boundary 20:00 · close 21:30 · Q&A until 25:00.]
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

<div class="flex items-center gap-5 mt-6">
  <img src="/img/contact-qr.svg" class="contact-qr" alt="QR code to get in touch with Simon" />
  <div class="text-left">
    <div class="text-lg font-semibold">Get in touch</div>
    <div class="text-sm opacity-60">scan me</div>
  </div>
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
clicks: 2
---

<div class="kicker">How you lose · one player, one minute</div>

<AccelCurve :step="[1, 2, 4][$clicks]" />

<div class="text-lg text-center opacity-70 mt-2">
  <span v-if="$clicks < 1">Move too fast, and you are out.</span>
  <span v-else-if="$clicks < 2">Faster music → you may move more.</span>
  <span v-else>Same swing. Different tempo. <span class="warn">Out.</span></span>
</div>

<!--
The rules fit in one sentence. Keep the controller steady; move too fast and you are out. Rumble at the warning line, out at the death line.

[click] The lines follow the music. Faster music, higher lines: you may move more.

[click] The agent wants a quick game. It slows the music, the lines drop, and the same swing is out. It never touched the player. It touched one number: the tempo.

[Data: MEDIUM sensitivity, warning 1.6→1.9 g, death 1.8→2.8 g between music 1.0× and 1.3×. The trace is illustrative; the real panel is next.]
-->

---
layout: center
clicks: 4
---

<div class="kicker">Adding a seat · same senses, same muscles</div>

<Arch after :step="$clicks" />

<div class="text-sm text-center opacity-60 mt-2"><b>Jev</b>: a hosted judge model from TypeSafe. It scores options we describe in words; it does not write text. About 0.3 s per answer.</div>

<!--
Before, the loop was me: I looked at the dashboards, decided minutes later, changed a file, restarted. Here is what I added. One new seat: the agent. Go, with its own OTLP receiver.

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
  Goal flag <code>objectives</code>: <code>endurance</code> · <code>balanced</code> · <code>accelerate</code> · <code>chaos</code>
  <div class="text-lg opacity-60 mt-2">A weighted mix. I set it. The agent works toward it.</div>
</div>

<!--
The game senses through OpenTelemetry. The agent decides. It acts through a flag.

[click] The goal is a flag too. Four goals: endurance, a long game. Balanced, a close one. Accelerate, a quick one. Chaos, lots of movement and change. I set the mix. The agent works toward it.

[Detail, if asked: each variant weights the four, one at 0.7 and the rest at 0.1 (`endurance_focused`, `balanced_focused`, `accelerate_focused`, `chaos_focused`), or `mixed`, all at 0.25, which names no single goal. The strongest weight becomes what the agent measures: endurance = a long game with steady activity and few eliminations; balanced = a close contest of at least two minutes; accelerate = a short game with fast eliminations; chaos = high activity and frequent change. Today it runs `balanced_focused`.]
-->

---
layout: full
---

<Shot name="talk-live" from="now-3m" caption="Live · acceleration per player · red: out · green: the agent acts" />

<!--
[TIME CHECK, first thing on this slide. Plan: the demo starts at 8:00 on the timer and takes about 6 minutes. HARD STOP at 14:30: the rest needs about 7 minutes plus questions.]

**Timer now → what you play:**

- **up to 9:30**: both games. Game 1 about two minutes, game 2 about three, the kill switch at the end of game 2.
- **9:30 to 11:30**: game 2 only, the kill switch at its end.
- **after 11:30**: no live game. Open the newest summary (`/?latest=summary`), read its first line, move on.

[LIVE DEMO, 3 to 4 players per game (with two players a game ends in 7 to 14 s, before Claude acts). This one slide is the stage: the Grafana board Talk: Live, full screen. One line per player, the dashed warning and death lines, a red marker when someone is out, a green one when the agent acts (hover it: the intervention). If the embed misbehaves: "open ↗" under it.]

[Before the talk (T-1 h): `talk-stage.sh reset`, then in Flagsmith (filter `demo`; pick an option at 100 % or type the name): `decision.backend` = `jev`, `interventions_allowed` = `standard`, `decision.claude.model` = `sonnet`, `decision.act_confidence_threshold` = `gate`, `objectives` = `balanced_focused`. Note the serial of the controller you will protect. Plug the speaker in before power-on. Then `talk-preflight.sh`.]

GAME 1 · Jev decides, we watch.
I change nothing. Every line is a player. When a line crosses the red dashed line, that player is out: the red marker.
[Point at a green marker.] That is the agent. Jev, a third of a second per decision. Hover: which move, for whom.
[After the game, only if time: the newest summary, `http://192.168.8.2/?latest=summary`. One trace is the whole game; the summary span sits at its end.]

GAME 2 · Claude, and one sentence.
Now I change who decides, and I tell it what I want. Three flags in Flagsmith.
[1. `decision.backend` = `claude`.]
[2. `decision.magnitude_bounds` = `unkillable`.] I widen the limit. Only I can.
[3. `decision.operator_brief` = `unkillable` (or `protect_weakest`).] One sentence. No code.
[Expect: the first decision is a noop; Claude takes about 3 s, so the first green marker lands 6 to 9 s in: a shield, then sensitivity 0.2 on the protected player. Their line crosses the dashed death line and they stay in.]
Watch whom it helps now.
[Near the end: `enabled` = `off`.] The kill switch. No more green markers. The game keeps playing: it never waited for the agent. [Then `enabled` = `on`.]
[After the talk: `talk-stage.sh reset` with the Flagsmith link online.]
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
[Right after the demo. Point back at game 2.]

You saw it. I gave it one sentence and a wider limit, and it went as far as I allowed for one player. I flipped one flag, and it stopped. I never touched its code.

Its judgment did not change.

[click] Its authority did.

[click] No code change. No review. No redeploy.
-->

---
layout: center
---

<div class="kicker">The control surface · who may write what</div>

<div class="surface">

| Flag | Writer | What it controls |
|---|---|---|
| `objectives` | 🧍 | `endurance` · `balanced` · `accelerate` · `chaos` |
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

<LatestLinks />

::right::

<div class="retro-card mt-14">
  <div class="kicker">agent.llm.retro · claude-opus-5-5 · 10.5 s · real game, 18 Nov</div>
  <div class="assess">"A close two-player duel ended at about 80s, short of the 120s target, after the erratic player spiked out late in a slow-tempo stretch."</div>
  <div class="focus"><code>session_focus</code> endurance</div>
  <div class="sugg"><code>adjust_player_sensitivity</code> ↑ <span>"sensitivity help came only 3s before elimination, too late to keep the duel going"</span></div>
  <div class="sugg" v-click><code>play_audio_cue</code> ↑ <span>"The 4.75s shield granted … was never used (0 activations in hold mode)"</span></div>
</div>

<!--
[Live: "retro ↗" (bottom left) opens the newest game's agent.llm.retro span in Jaeger, "summary ↗" its agent.game.summary; the dashboard on the Pi finds the newest one. No network: stay on this card, a rehearsal game.]

When a game ends, a different model takes over. In game one Jev made the decisions, a third of a second each. Claude reads the whole game afterwards and writes a summary.

[click] How did it go. What to focus on next time. And concrete suggestions: which intervention, how much, and why.

[click] Same telemetry in, same flag system around it. But this one only advises. It does not act. A human reads it. Whether anything else may act on it is a decision I come back to.

[click] And my favourite line from a real game this week. The agent did act: it gave a player a shield. The summary noticed the shield was never used, and suggested a sound cue telling the player to hold it. The slow model holding the fast one to account.

[The card quotes the real agent.llm.retro span of an 18 Nov game, 80 s, two players (game_3ee47288861b, trace 5b66f569…). Live: needs inference.backend=claude (the stage reset sets it; the file baseline is stub) and a working ANTHROPIC_API_KEY. If the live summary is empty (inference.used=none) or 401, stay on this card.]

[This is reflex and cortex in miniature, set it up for §4.]
-->

---
layout: center
---

<div class="kicker">The game is small. The pattern is not.</div>

<div class="text-3xl space-y-4 mt-8">
  <div v-click>Incident response · <span class="accent">AI SRE</span></div>
  <div v-click>Progressive delivery</div>
  <div v-click>Capacity and cost</div>
  <div v-click>Policy enforcement</div>
</div>

<div v-click class="text-2xl mt-10 accent">Which decisions can safely become reflexes?</div>

<!--
The game is small. The pattern is not.

[click] Incident response. Operations has a name for this now: AI SRE. Agents that triage, act and write the postmortem. Most of them stop at recommending, and a human flips the flag. Here the agent flips it, but only flags, only inside limits I set, and every write sits next to mine. [Sources and numbers: slides/research/ai-sre.md; check before quoting a figure.] [click] Progressive delivery: my game already does a small version of it. A suggestion is tried in paired shadow games before anything is promoted. That is canary analysis. [click] Capacity and cost. [click] Policy enforcement.

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

[click] That is the seat the agent took. Practice moves decisions from the cortex to the reflex; every level I unlock gives the agent a little more, so every reflex needs an explicit boundary.

Here is the uncomfortable part.
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

[click] Mutation is still the last resort. Remember the summary after the game: it suggests changes. Who acts on them? A human who reads it. Or the loop itself: suggestion, shadow experiment, promotion. A dark factory.

[PAUSE]

In my game that is one flag, experiments_enabled. Today it is off. That is a decision too. A human one. Made on purpose.

[Say it, do not show it: with experiments_enabled off, no proposer or agent.experiment spans exist on stage. What the audience can see is the retro.suggestion events on the agent.llm.retro span.]

[If asked "but the agent promotes new defaults from shadow experiments": only with experiments on, only between games, only the game rules, behind an env gate and the kill switch, and one DELETE reverts it. It never writes its own limits.]
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

<div class="flex justify-center gap-14 mt-6">
  <div class="flex flex-col items-center gap-2">
    <img src="/img/slides-qr.svg" class="contact-qr" alt="QR code for these slides" />
    <div class="text-sm opacity-70">these slides</div>
  </div>
  <div class="flex flex-col items-center gap-2">
    <img src="/img/contact-qr.svg" class="contact-qr" alt="QR code to get in touch with Simon" />
    <div class="text-sm opacity-70">get in touch</div>
  </div>
</div>

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
[Backup slides: the permission flip as a magic move (fallback if the agent never shields in game 1 or 2), the decide span, the live views, the audit view, the experiment loop, and where this goes next.]
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
[BACKUP: for "how does one decision work?"] One decision, and every box has a flag on it.

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
[BACKUP: fallback if no shield shows live in game 1 or 2.]

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
  <Shot name="talk-live" height="11.5rem" from="now-3m" caption="Grafana · Talk: Live" />
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

<div class="kicker">Does it improve itself? · only behind gates</div>

<div class="pipe pipe-4">
  <div class="st"><b>💡 suggestion</b><span>after the game</span><code>retro.suggestion</code></div>
  <div class="st hot" v-click="1"><b>🧪 shadow games</b><span>baseline vs change · same pattern, same seed</span><code>paired</code></div>
  <div class="st" v-click="2"><b>⚖️ verdict</b><span>per pair, scored by the objective</span><code>objectives</code></div>
  <div class="st" v-click="3"><b>🚀 promotion</b><span>game rules only · next game</span><code>real overlay</code></div>
</div>

<div v-click="4" class="floor">
  gated by <code>experiments_enabled</code> · the kill switch · an env gate &nbsp;·&nbsp; <b>one DELETE reverts it</b>
  <span class="opacity-60">&nbsp;· never writes the agent's own limits</span>
</div>

<div v-click="5" class="text-2xl text-center mt-8">Today: <code>experiments_enabled</code> = <span class="warn">off</span>. That is a decision too.</div>

<!--
[BACKUP: for "so does it improve itself?"]

The summary after the game suggests a change. It can also become an experiment.

[click] The agent runs shadow games: mock players, no audience, no sound. Each pair is the same movement pattern with the same seed, once with today's value and once with the change, one after the other. So luck and skill cancel out. About twelve games for one experiment.

[click] The verdict is per pair, scored by the objective: endurance, balanced or accelerate.

[click] And if the change wins, it is promoted: an overlay on the game rules, from the next game on. Only the game set. Sensitivity, spawn protection, that kind of thing.

[click] All of it behind gates. The experiments flag, the kill switch, an env gate on the machine. One DELETE reverts a promotion. And it never writes the agent's own limits: those are mine.

[click] For this talk the flag is off. That is the dark factory, and switching it on is a decision too.

[Q&A, "so the agent changes the game by itself?": only the game set, only after a paired verdict, only with every gate open, revertible with one DELETE. The agent set, where its permissions and ranges live, is never written by it.]
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
