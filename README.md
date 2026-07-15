# anybrowser-newtab

A personal new-tab page you can make your own in about 5 minutes: a GitHub
activity feed rendered like a changelog, and a row of shortcuts to the places
you open every day. Static HTML/CSS/JS — no framework, no build step, no
dependencies to install.

Point any browser's new-tab page at your deployed URL and you're done.

> **Using a coding agent (Claude Code, Codex, Cursor, etc.)?** Hand it this
> repo and tell it to read [`AGENTS.md`](AGENTS.md) — it'll interview you for
> your name, GitHub username, and shortcuts, then set up and optionally
> deploy your personal copy for you. That's the fastest path through
> everything below.

## Features

- **Shipped** — your GitHub contribution heatmap, a stat row (pushes, PRs
  opened, merged, new repos — zero-value cards hide themselves), and a list of
  your most recent public activity with relative timestamps.
- **Shortcuts** — a configurable grid of links with official brand icons
  (GitHub, Gmail, Google Calendar, Notion, LinkedIn, X, or any URL via a
  generic globe icon), muted by default and tinted with the real brand color
  on hover.
- **Greeting** — time-of-day message plus a small SVG moon-phase indicator,
  because why not.
- **Light/dark** — follows the OS/browser color scheme automatically, no
  toggle needed.
- **Responsive** — one column on mobile and tablet, a two-column layout
  (activity + shortcuts) from 1024px up.
- **No server required** — works as a fully static site. An optional
  serverless function upgrades GitHub data quality if you set it up (see
  below); everything else works without it.

## Quick start

```bash
git clone https://github.com/alunadev/anybrowser-newtab.git
cd anybrowser-newtab
cp config.example.js config.js
```

Open `config.js` and fill in your name, GitHub username, and shortcuts. Then
preview it locally:

```bash
python3 -m http.server 4173
# open http://localhost:4173
```

(Any static file server works — or just open `index.html` directly in a
browser.)

## Configuration

Everything you'll ever want to change lives in `config.js` (copied from
`config.example.js`, and gitignored so your personal data never ends up in
git history — even in your own fork):

| Field        | Description                                                        |
| ------------ | -------------------------------------------------------------------- |
| `name`       | Used in the greeting: "Good morning, `<name>`".                      |
| `githubUser` | Your GitHub username. Powers the entire "Shipped" section.           |
| `maxDays`    | How many days of activity to summarize (default `7`).                |
| `shortcuts`  | Array of `{ label, url, icon }`. Order in the array = display order. |

Available `icon` values: `github`, `notion`, `gmail`, `gcal`, `linkedin`, `x`,
or `globe` (a generic fallback for any other link). Icons are official brand
SVG marks — see `ICONS` in `app.js` if you want to add another one.

## Deploy

### Option A — CLI deploy (recommended)

Deploys straight from your local folder, so your personal `config.js` goes
along even though it's gitignored (see `.vercelignore`, which is what makes
that safe — it tells Vercel CLI not to fall back to `.gitignore` when
deciding what to upload):

```bash
npm i -g vercel      # once
vercel login         # once
vercel --prod
```

### Option B — Git-connected deploy

If you'd rather have Vercel auto-deploy on every push, fork this repo
**privately**, commit your own `config.js` to your fork (it's your data, your
repo, your call), and connect that fork to a new Vercel project. Don't do
this on a public fork — your `config.js` would be visible to anyone.

### Point your browser's new tab at it

- **Chrome / Edge / Brave**: install a "New Tab Redirect" extension and set
  your deployed URL.
- **Firefox**: install "New Tab Override" and set the URL.
- **Safari**: Settings → General → set Homepage to the URL, and set
  "New tabs open with: Homepage".
- **Arc**: doesn't support custom new-tab URLs; pin the tab or use the home
  button instead.

## Optional: authenticated GitHub data

By default, GitHub activity comes from the public, unauthenticated Events
API — no setup needed, and it's plenty for personal use.

If you want private-repo activity to show up too (or just higher rate
limits), `api/github-stats.js` is a Vercel serverless function that proxies
GitHub's Search API with a token that never reaches the browser. Set these
on your Vercel project (Settings → Environment Variables):

- `GITHUB_TOKEN` — a [fine-grained personal access
  token](https://github.com/settings/tokens?type=beta), read-only. Grant:
  - **Repository permissions → Contents: Read-only** (lets the token read
    commits).
  - **Repository permissions → Pull requests: Read-only** (lets the token
    read PR data).
  - **Repository access**: the specific private repos you want counted, or
    "All repositories".
- `GITHUB_USERNAME` — required, must match the account the token belongs to.

**Why this works with fine-grained tokens (and the old approach didn't):**
an earlier version of this app used GitHub's Events feed
(`GET /users/{username}/events`), which has no fine-grained permission that
can unlock private activity at all — its own docs mention an "Events" user
permission that doesn't actually exist in the fine-grained system (it's only
an *organization*-level permission for an unrelated endpoint). Switching to
the Search API (commits, PRs, repos) sidesteps that entirely: Search respects
normal per-repo permissions, so a properly-scoped **read-only** fine-grained
token just works — no need for a broader classic token.

**Never** put a token in `config.js` or anything that ships to the browser —
only in Vercel's environment variables, which the serverless function reads
server-side. Without it configured, the page still works: it automatically
falls back to the public Events API (public activity only).

## Notes and limitations

- The public (unauthenticated) fallback path counts push events, not
  individual commits — GitHub's Events API no longer returns a commit count
  on push events (a 2024 privacy change). The authenticated Search API path
  doesn't have this limitation; it counts real commits.
- GitHub's Search API has its own rate limit (30 requests/min authenticated,
  10/min unauthenticated) — plenty for a new-tab page, but worth knowing if
  you're debugging.
- The contribution heatmap is rendered via the free
  [ghchart.rshah.org](https://github.com/2016rshah/githubchart-api) image
  service — a third-party dependency with no auth required. Swap it for
  GitHub's own contributions SVG if you'd rather avoid that.
- The page sets `<meta name="robots" content="noindex, nofollow">` since it's
  meant to be a personal, unlisted URL rather than a discoverable page.

## Contributing

Issues and PRs welcome — this is meant to be a small, hackable template, not
a product. If you build a new icon, module, or layout variant that others
might want, a PR is very welcome.

## License

MIT — see [LICENSE](LICENSE).
