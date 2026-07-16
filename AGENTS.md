# Agent instructions

You are helping someone set up their own copy of this new-tab page. This file
is your setup script — follow it top to bottom. The whole thing should take
about 5 minutes of back-and-forth with the user.

## What this project is

A static (no build step) personal new-tab page: a search bar, a greeting, a
GitHub "Shipped" activity feed (real contribution heatmap + stats + recent
items), and a row of shortcut links — the first 9 of which get a real
keyboard hotkey (`Option+1..9` on Mac, `Ctrl+1..9` elsewhere; `Option+K` /
`Ctrl+K` focuses the search bar). The search bar and hotkeys need no
configuration — they just work. Everything the user will ever want to
change lives in one file, `config.js` (copied from `config.example.js`).

## Step 1 — Interview the user

Ask for the following. Don't guess or invent values — if they're unsure about
a shortcut URL, ask them to paste it, or skip that shortcut entirely.

1. **Name** — for the greeting ("Good morning, `<name>`").
2. **GitHub username** — powers the whole "Shipped" section (heatmap, stats,
   recent activity). This is required.
3. **Shortcuts** — ask which of these they want, and the real URL for each:
   - GitHub profile
   - Gmail / email inbox
   - Calendar
   - Notion (or another docs/task tool)
   - Portfolio / personal site
   - LinkedIn
   - X / Twitter
   - Anything else they open daily (use the generic `globe` icon for
     anything that isn't in `ICONS` inside `app.js`)

   Order matters — it's the display order. Ask if they have a preference;
   otherwise keep the order they gave you.
4. **Deploy target** — ask whether they want to:
   - preview locally only, for now, or
   - deploy to Vercel today (see Step 4).

Do not ask about the optional GitHub token proxy (Step 5) unless the user
brings it up themselves, or hits GitHub's unauthenticated rate limit. It's an
advanced option, not part of the base 5-minute setup.

## Step 2 — Create their config

```bash
cp config.example.js config.js
```

Edit `config.js` with the answers from Step 1. Keep the file's existing
shape — it's a single `CONFIG` object with `name`, `githubUser`, `maxDays`
(default `7` is fine unless asked), and a `shortcuts` array of
`{ label, url, icon }`.

`config.js` is gitignored on purpose — do not remove it from `.gitignore`
unless the user explicitly asks to commit their personal data (e.g. because
they're setting up a **private** fork — see Step 4, Option B).

## Step 3 — Preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173` (or use your own preview/browser tooling) and
confirm with the user: does the greeting show their name, do the shortcuts
look right (and their hotkey numbers match the order they wanted), does the
GitHub activity load, does the search bar work? Fix anything before moving
on.

## Step 4 — Deploy (if the user wants it live today)

Ask the user which they prefer:

- **Option A — CLI deploy (recommended, keeps `config.js` out of git
  entirely).**
  ```bash
  npm i -g vercel   # if not already installed
  vercel login      # interactive; the user does this themselves
  vercel --prod
  ```
  `.vercelignore` is already set up so the CLI uploads `config.js` even
  though it's gitignored. This is the default recommendation — simplest, and
  never puts personal data in any git history.

- **Option B — Git-connected deploy (auto-deploys on every push).**
  This requires committing `config.js`, so it must go to a **private**
  fork/repo, never a public one. If the user wants this:
  1. Confirm the fork/repo is private before doing anything else.
  2. Remove the `config.js` line from `.gitignore`.
  3. `git add config.js && git commit -m "Add personal config"`.
  4. Push, then connect that repo to a new Vercel project.

Do not push `config.js` to a public repository under any circumstance. If
you're not sure whether the user's fork is public or private, ask before
committing it.

## Step 5 — Optional: authenticated GitHub data (skip unless asked)

Only do this if the user explicitly wants higher API rate limits or to
surface private-repo activity. It requires them to create a GitHub personal
access token themselves — you cannot do this step for them, and you should
never ask them to paste a token into chat.

1. Tell them to create a **fine-grained personal access token** at
   github.com/settings/tokens?type=beta with, under Repository permissions:
   - **Contents: Read-only** (lets the token read commits)
   - **Pull requests: Read-only** (lets the token read PR data)
   - **Repository access**: the private repos they want counted, or "All
     repositories"

   This works because `api/github-stats.js` calls GitHub's Search API
   (commits, PRs, repos), not the Events feed — Search respects normal
   per-repo fine-grained permissions, unlike `GET /users/{username}/events`
   (which has no fine-grained permission that unlocks private activity at
   all — don't try fixing that endpoint's private-activity gap with a
   fine-grained token, it structurally can't work; this is why the app uses
   Search instead). A plain **read-only** fine-grained token is genuinely
   enough — no need for a broader classic token.
2. They add it as environment variables on their Vercel project:
   `GITHUB_TOKEN` (the token) and `GITHUB_USERNAME` (their GitHub username,
   required — must match the token's account).
3. That's it — `api/github-stats.js` picks it up automatically, and the
   front end already tries it first with a fallback to the public Events API
   if it's not configured. No code changes needed.

## Step 6 — Point their browser at it

Tell them how, based on their browser:

- Chrome / Edge / Brave: a "New Tab Redirect" extension, pointed at the
  deployed URL.
- Firefox: "New Tab Override" extension.
- Safari: Settings → General → Homepage, and "New tabs open with: Homepage".
- Arc: doesn't support custom new-tab URLs — pin the tab instead.

## Guardrails

- Never invent a shortcut URL — always ask, or leave it out.
- Never commit `config.js` to a public repository.
- Never ask the user to paste a GitHub token, password, or any credential
  into chat. Environment variables on their own Vercel project are the only
  place a token belongs.
- If something in `README.md` and this file conflict, this file describes
  the interactive setup flow; `README.md` is the reference doc — prefer this
  file for the live walkthrough, and point the user to `README.md` for
  anything you're unsure about.
