# Slides

Talk decks from the orange-case project, one [Slidev](https://sli.dev) deck per directory, named
`<YYYY-MM-DD>-<event>-presentation` after the day of the talk.

| Date | Event | Talk | Deck |
|---|---|---|---|
| 2026-12-03 | Paris | Two Standards Walk Into an Agent (25 min) | [slides](https://orange-case.github.io/slides/2026-12-03-paris-presentation/) · [source](2026-12-03-paris-presentation/) |
| 2026-11-20 | Cloud Native Denmark, Copenhagen | Two Standards Walk Into an Agent: Runtime Agent Control with OpenTelemetry and OpenFeature | [slides](https://orange-case.github.io/slides/2026-11-20-cloud-native-denmark-presentation/) · [source](2026-11-20-cloud-native-denmark-presentation/) |
| 2026-03-26 | KubeCon + CloudNativeCon Europe, Amsterdam | 18 Bluetooth Controllers Walk Into a Bar: Observability & Runtime Configuration with CNCF Tools | [slides](https://orange-case.github.io/slides/2026-03-26-kubecon-cloudnativecon-europe-presentation/) · [source](2026-03-26-kubecon-cloudnativecon-europe-presentation/) |
| 2026-02-24 | Cloud Native Linz | 18 Bluetooth Controllers Walk Into a Bar | [slides](https://orange-case.github.io/slides/2026-02-24-cloud-native-linz-presentation/) · [source](2026-02-24-cloud-native-linz-presentation/) |

## Publishing

`.github/workflows/deploy-slides.yml` builds every dated directory that has a `package.json` and publishes it to
GitHub Pages at `https://orange-case.github.io/slides/<directory>/`, with an index at
<https://orange-case.github.io/slides/>. A new deck needs no workflow change: add the directory and push.

## License

Apache 2.0, see [LICENSE](LICENSE).
