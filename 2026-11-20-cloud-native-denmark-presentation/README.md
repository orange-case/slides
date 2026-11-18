# The agent decides. We decide what it may decide.

Slide deck built with [Slidev](https://sli.dev).

## Run locally

Requires Node 22 (see `.nvmrc`).

```bash
npm install
npm run dev
```

`npm run build` writes the static site to `dist/`.

## CI and GitHub Pages

`.github/workflows/build.yml` builds the deck on every push to `main` (and on manual dispatch), uploads `dist/` as a build artifact, and deploys it to GitHub Pages. To enable the deployment, go to the repo's **Settings → Pages** and set **Source: GitHub Actions**.
