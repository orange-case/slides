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

## Structure (30 min, show first, name it after)

| Time | Section | Slides |
|---|---|---|
| 0:00 | §1 The reframe | mutation and selection, slow gods |
| 2:30 | About me | |
| 3:15 | §2 Living systems | mutation vs adaptation, OTel = senses, OpenFeature = muscles |
| 6:00 | §3 The game | the acceleration curve, tempo as a lever |
| 8:00 | §3 Architecture | before / after, Jev in one sentence, the goal flag |
| 10:00 | §3 Live demo | 5 beats: observe (span in Jaeger), ambient → standard, threshold, kill switch, degrade |
| 16:00 | §3 Naming it | "its authority did", one decision, the control surface |
| 18:30 | §3 After the game | the post-game summary, the pattern |
| 19:45 | §4 Reflex and cortex | |
| 23:30 | §5 The boundary must be portable | callback to the control surface vocabulary |
| 25:30 | Close | Q&A from about 27:00 |

After "Thank you" come backup slides for questions: the permission flip as a magic move (fallback for demo
beat 2), the decide span, the live views, the audit view, and where this goes next (flags steering the telemetry).

## Live panels and screenshots

Slides that show Grafana or Jaeger (`<Shot name="…" />`) embed the **live** panel when the game stack answers at
`192.168.8.2` (override with `VITE_DEMO_HOST`), with a red `● live` badge. Otherwise they show the screenshot from
`public/img/shots/`, or a labelled placeholder. Press `v` to flip between live and screenshots by hand. The views
are defined once in `shots.json`, for both the live panels and the screenshot script.

Live panels only work when the deck itself is served over http: present from `npm run dev` (or a local build)
on the venue network. The GitHub Pages copy is https, and browsers block an http iframe there, so it always shows
the screenshots.

Capture screenshots from the running stack, either now or for a past game window (epoch ms):

```bash
npx playwright install chromium   # once
GAME_HOST=http://192.168.8.2 FROM=now-30m npm run shots
FROM=1794423300000 TO=1794424800000 npm run shots -- accel-all thresholds tempo
```

The committed screenshots are from real games: 11 Nov 2026 19:55–20:20 (three real games: acceleration,
thresholds, tempo), 12 Nov 2026 20:00–21:10 (agent decisions, interventions, flags) and 18 Nov 2026 14:50–15:30
(Jaeger, which keeps only about a day of traces). `flag-audit.png` (Flagsmith) is taken by hand.

## CI and GitHub Pages

The repo-level workflow (`.github/workflows/deploy-slides.yml`) builds every deck on a push to `main` and publishes
this one at <https://orange-case.github.io/slides/2026-12-03-paris-presentation/>.

## Credits

J.S. Joust photos by Brent Knepper, Sara Bobo and Die Gute Fabrik, and the acceleration-spike clip, come from the
KubeCon EU deck, [`2026-03-26-kubecon-cloudnativecon-europe-presentation`](../2026-03-26-kubecon-cloudnativecon-europe-presentation/).
