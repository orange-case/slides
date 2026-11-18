# Two Standards Walk Into an Agent

**Runtime Agent Control with OpenTelemetry and OpenFeature** · Cloud Native Denmark, Copenhagen · 20 Nov 2026, 10:25 · 30 minutes.

One takeaway: the agent decides, we decide what it may decide, and that boundary has to be portable.

Slide deck built with [Slidev](https://sli.dev). The live demo is [JoustMania](https://github.com/orange-case/JoustMania);
its operator script is `docs/talk/two-standards-runbook.md` there.

## Run locally

Requires Node 22 (see `.nvmrc`).

```bash
npm install
npm run dev
```

`npm run build` writes the static site to `dist/`. Press `p` for presenter mode (speaker notes and timing cues).

## Structure (30 min)

| Time | Section | Slides |
|---|---|---|
| 0:00 | §1 The reframe | mutation and selection, slow gods |
| 3:00 | About me | |
| 4:00 | §2 Living systems | mutation vs adaptation, OTel = senses, OpenFeature = muscles |
| 7:00 | §3 The experiment | the game, the acceleration curve, tempo as a lever |
| 8:30 | §3 Under the hood | architecture before / after, one decision, the control surface, the span |
| 13:30 | §3 Live demo | `192.168.8.2`, beats 1–8 of the runbook, then the post-game summary and the audit view |
| 21:00 | §4 Reflex and cortex | |
| 25:00 | §5 The boundary must be portable | and where this goes: flags steering the telemetry itself |
| 27:30 | Close, Q&A | |

## Screenshots

Slides that would otherwise embed Grafana or Jaeger show screenshots from `public/img/shots/`. Until a file
exists, the slide shows a labelled placeholder. Capture them from the running stack right after a rehearsal game,
so the panels have data:

```bash
npx playwright install chromium   # once
GAME_HOST=http://192.168.8.2 FROM=now-30m npm run shots
npm run shots -- talk-board jaeger-decide   # only some
```

Two shots are taken by hand (they need a login or a specific trace): `flag-audit.png` (Flagsmith, the agent's
writes next to the operator's) and `retro.png` (Jaeger, an `agent.llm.retro` span). Save them into
`public/img/shots/` under those names.

## CI and GitHub Pages

The repo-level workflow (`.github/workflows/deploy-slides.yml`) builds every deck on a push to `main` and publishes
this one at <https://orange-case.github.io/slides/2026-11-20-cloud-native-denmark-presentation/>.

## Credits

J.S. Joust photos by Brent Knepper, Sara Bobo and Die Gute Fabrik, and the acceleration-spike clip, come from the
KubeCon EU deck, [`2026-03-26-kubecon-cloudnativecon-europe-presentation`](../2026-03-26-kubecon-cloudnativecon-europe-presentation/).
