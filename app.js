// newtab — greeting, shortcuts, GitHub activity rendered as log.md entries.

// Official brand glyph paths (24x24), monochrome. Generic icons only for non-brands.
const ICONS = {
  github:
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  notion:
    "M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.373.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.933.653.933 1.213v16.378c0 1.026-.373 1.634-1.68 1.727l-15.458.933c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.448-1.632z",
  gmail:
    "M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z",
  gcal: "M18.316 5.684H24v12.632h-5.684V5.684zM5.684 24h12.632v-5.684H5.684V24zM18.316 5.684V0H1.895A1.894 1.894 0 0 0 0 1.895v16.421h5.684V5.684h12.632zm-7.207 6.25v-.065c.272-.144.5-.349.687-.617s.279-.595.279-.982c0-.379-.099-.72-.3-1.025a2.05 2.05 0 0 0-.832-.714 2.703 2.703 0 0 0-1.197-.257c-.6 0-1.094.156-1.481.467-.386.311-.65.671-.793 1.078l1.085.452c.086-.249.224-.461.413-.633.189-.172.445-.257.767-.257.33 0 .602.088.816.264a.86.86 0 0 1 .322.703c0 .33-.12.589-.36.778-.24.19-.535.284-.886.284h-.567v1.085h.633c.407 0 .748.109 1.02.327.272.218.407.499.407.843 0 .336-.129.614-.387.832s-.565.327-.924.327c-.351 0-.651-.103-.897-.311-.248-.208-.422-.502-.521-.881l-1.096.452c.178.616.505 1.082.977 1.401.472.319.984.478 1.538.477a2.84 2.84 0 0 0 1.293-.291c.382-.193.684-.458.902-.794.218-.336.327-.72.327-1.149 0-.429-.115-.797-.344-1.105a2.067 2.067 0 0 0-.881-.689zm2.093-1.931l.602.913L15 10.045v5.744h1.187V8.446h-.827l-2.158 1.557zM22.105 0h-3.289v5.184H24V1.895A1.894 1.894 0 0 0 22.105 0zm-3.289 23.5l4.684-4.684h-4.684V23.5zM0 22.105C0 23.152.848 24 1.895 24h3.289v-5.184H0v3.289z",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  x: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  globe:
    "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm9.949 11h-3.98c-.11-2.868-.775-5.4-1.795-7.26A10.02 10.02 0 0 1 21.949 11zM12 2.05c.9 0 2.734 2.775 2.966 8.95H9.034C9.266 4.825 11.1 2.05 12 2.05zM7.826 3.74C6.806 5.6 6.14 8.132 6.031 11h-3.98a10.02 10.02 0 0 1 5.775-7.26zM2.05 13h3.98c.11 2.868.776 5.4 1.796 7.26A10.02 10.02 0 0 1 2.051 13zM12 21.95c-.9 0-2.734-2.775-2.966-8.95h5.932c-.232 6.175-2.066 8.95-2.966 8.95zm4.174-1.69c1.02-1.86 1.686-4.392 1.795-7.26h3.98a10.02 10.02 0 0 1-5.775 7.26z",
};

// Real phase (0..1, 0 = new moon, 0.5 = full), used for the tooltip name and
// waxing/waning direction — kept accurate even though the rendered
// illumination below is clamped for legibility.
function moonPhaseFraction(date) {
  const synodic = 29.53058867; // days
  const epoch = Date.UTC(2000, 0, 6, 18, 14); // a known new moon
  const days = (date.getTime() - epoch) / 86400000;
  return (((days % synodic) + synodic) % synodic) / synodic;
}

const MOON_PHASE_NAMES = [
  [0.02, "New moon"],
  [0.24, "Waxing crescent"],
  [0.26, "First quarter"],
  [0.49, "Waxing gibbous"],
  [0.51, "Full moon"],
  [0.74, "Waning gibbous"],
  [0.76, "Last quarter"],
  [0.98, "Waning crescent"],
  [1, "New moon"],
];

function moonPhaseName(phase) {
  return MOON_PHASE_NAMES.find(([upTo]) => phase <= upTo)[1];
}

// Renders the phase as a real SVG lune rather than relying on Unicode moon
// emoji — those depend on font/emoji support and rendered as a plain filled
// dot in testing, unrecognizable as a moon. Illumination is clamped to
// 15–85% so the icon always shows a crescent/gibbous silhouette: it should
// read as "a moon", never as a solid dot or an empty ring.
function moonIcon(phase) {
  const size = 18;
  const r = size / 2 - 1.5;
  const cx = size / 2;
  const cy = size / 2;

  const waxing = phase < 0.5;
  const rawIllumination = (1 - Math.cos(phase * 2 * Math.PI)) / 2;
  const k = Math.min(0.85, Math.max(0.15, rawIllumination));
  const rx = Math.abs(1 - 2 * k) * r;
  const outerSweep = waxing ? 1 : 0;
  const termSweep = k <= 0.5 ? (waxing ? 0 : 1) : waxing ? 1 : 0;
  const d = `M ${cx} ${cy - r} A ${r} ${r} 0 0 ${outerSweep} ${cx} ${cy + r} A ${rx} ${r} 0 0 ${termSweep} ${cx} ${cy - r} Z`;

  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("class", "moon-icon");
  svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
  svg.setAttribute("aria-hidden", "true");

  const ring = document.createElementNS(ns, "circle");
  ring.setAttribute("class", "moon-ring");
  ring.setAttribute("cx", cx);
  ring.setAttribute("cy", cy);
  ring.setAttribute("r", r);

  const lit = document.createElementNS(ns, "path");
  lit.setAttribute("class", "moon-lit");
  lit.setAttribute("d", d);

  svg.append(ring, lit);
  return svg;
}

function renderGreeting() {
  const now = new Date();
  const hour = now.getHours();
  const word = hour < 6 ? "Good night" : hour < 12 ? "Good morning" : hour < 20 ? "Good afternoon" : "Good evening";

  document.getElementById("date").textContent = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const title = document.getElementById("greeting");
  title.textContent = `${word}, ${CONFIG.name}`;

  const phase = moonPhaseFraction(now);
  const moon = document.createElement("span");
  moon.className = "moon";
  moon.title = `${moonPhaseName(phase)} (today)`;
  moon.appendChild(moonIcon(phase));
  title.appendChild(moon);
}

function renderShortcuts() {
  const row = document.getElementById("shortcuts");
  for (const s of CONFIG.shortcuts) {
    const a = document.createElement("a");
    a.className = "shortcut";
    a.href = s.url;
    a.dataset.brand = s.icon;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", ICONS[s.icon] || ICONS.globe);
    svg.appendChild(path);
    a.appendChild(svg);
    a.appendChild(document.createTextNode(s.label));
    row.appendChild(a);
  }
}

function renderHeatmap() {
  const img = document.getElementById("heatmap");
  img.src = `https://ghchart.rshah.org/4a6fa5/${CONFIG.githubUser}`;
  img.alt = `${CONFIG.githubUser}'s GitHub contribution graph`;
}

// ---- GitHub activity ----
//
// Two data sources, tried in order:
//
// 1. /api/github-stats — the serverless proxy (see api/github-stats.js). If
//    GITHUB_TOKEN is configured there, this uses GitHub's Search API
//    (commits, PRs, repos), which respects normal per-repo token
//    permissions — a safe, read-only fine-grained token works fine here,
//    private activity included.
// 2. The public, unauthenticated Events API — used automatically if the
//    proxy isn't there (local static preview, or no token configured yet).
//    Zero setup, public activity only.

const CACHE_KEY = "newtab-gh-data";
const CACHE_TTL = 10 * 60 * 1000;

async function fetchViaProxy() {
  const res = await fetch(`/api/github-stats?days=${CONFIG.maxDays}`);
  if (!res.ok) throw new Error(`proxy ${res.status}`);
  const data = await res.json();
  return { mode: "search", data };
}

async function fetchPublicEvents() {
  const res = await fetch(
    `https://api.github.com/users/${CONFIG.githubUser}/events/public?per_page=100`,
    { headers: { Accept: "application/vnd.github+json" } }
  );
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const events = await res.json();
  return { mode: "events", data: events };
}

async function fetchShipped() {
  const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
  if (cached && Date.now() - cached.at < CACHE_TTL) return cached.result;

  try {
    const result = await fetchViaProxy().catch(() => fetchPublicEvents());
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), result }));
    return result;
  } catch (err) {
    if (cached) return cached.result; // stale beats nothing
    throw err;
  }
}

// ---- Stats row (Open/Drafts/Merged/Closed-style cards) ----

function statCell(label, value) {
  const cell = document.createElement("div");
  cell.className = "stat";
  const l = document.createElement("p");
  l.className = "stat-label";
  l.textContent = label;
  const v = document.createElement("p");
  v.className = "stat-value";
  v.textContent = String(value);
  cell.append(l, v);
  return cell;
}

function renderStatCells(cells) {
  const container = document.getElementById("stats");
  container.textContent = "";
  const visible = cells.filter(([, value]) => value > 0);
  // Nothing worth showing — a row of all-zero cards has no signal, hide it.
  container.hidden = visible.length === 0;
  for (const [label, value] of visible) container.appendChild(statCell(label, value));
}

function statsFromSearch({ commits, prs, repos }) {
  let open = 0;
  let draft = 0;
  let merged = 0;
  let closed = 0;
  for (const pr of prs.items) {
    if (pr.pull_request?.merged_at) merged++;
    else if (pr.state === "closed") closed++;
    else if (pr.draft) draft++;
    else open++;
  }
  return [
    ["Commits", commits.total],
    ["Open PRs", open],
    ["Drafts", draft],
    ["Merged", merged],
    ["Closed", closed],
    ["New repos", repos.total],
  ];
}

// Note: GitHub's public events API no longer includes a commit count on
// PushEvent (payload.size/distinct_size come back null), so the fallback
// counts pushes themselves rather than commits.
function statsFromEvents(events, cutoff) {
  const recent = events.filter((e) => e.created_at.slice(0, 10) >= cutoff);
  const pushes = recent.filter((e) => e.type === "PushEvent").length;
  const prsOpened = recent.filter((e) => e.type === "PullRequestEvent" && e.payload.action === "opened").length;
  const merged = recent.filter((e) => e.type === "PullRequestEvent" && e.payload.action === "closed" && e.payload.pull_request?.merged).length;
  const repos = recent.filter((e) => e.type === "CreateEvent" && e.payload.ref_type === "repository").length;
  return [
    ["Pushes", pushes],
    ["PRs opened", prsOpened],
    ["Merged", merged],
    ["New repos", repos],
  ];
}

// ---- Row list ----

const MAX_ROWS = 15;

function timeAgo(iso) {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime());
  const min = Math.round(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min} minute${min === 1 ? "" : "s"} ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr} hour${hr === 1 ? "" : "s"} ago`;
  const d = Math.round(hr / 24);
  return `${d} day${d === 1 ? "" : "s"} ago`;
}

const EXT_LINK_PATH = "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3h6v6 M10 14 21 3";

function extLinkIcon() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "shipped-ext");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  for (const d of EXT_LINK_PATH.split(" M")) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d.startsWith("M") ? d : `M${d}`);
    svg.appendChild(path);
  }
  return svg;
}

function appendRow(container, row) {
  const a = document.createElement("a");
  a.className = "shipped-row";
  a.href = row.url;

  const dot = document.createElement("span");
  dot.className = "shipped-dot";
  dot.dataset.kind = row.kind;

  const body = document.createElement("div");
  body.className = "shipped-body";

  const title = document.createElement("p");
  title.className = "shipped-title";
  title.append(`${row.verb} `);
  if (row.count) title.append(`${row.count} commit${row.count === 1 ? "" : "s"} to `);
  const repoSpan = document.createElement("span");
  repoSpan.className = "repo";
  repoSpan.textContent = row.repo;
  title.appendChild(repoSpan);
  if (row.detail) title.append(row.detail);

  const meta = document.createElement("p");
  meta.className = "shipped-meta";
  meta.textContent = `Updated ${timeAgo(row.sort)}`;

  body.append(title, meta);
  a.append(dot, body, extLinkIcon());
  container.appendChild(a);
}

function renderRows(rows) {
  const log = document.getElementById("log");
  log.textContent = "";

  if (!rows.length) {
    const p = document.createElement("p");
    p.className = "log-empty";
    p.textContent = `No activity in the last ${CONFIG.maxDays} days. Ship something.`;
    log.appendChild(p);
    return;
  }

  for (const row of rows.slice(0, MAX_ROWS)) appendRow(log, row);
}

function rowsFromSearch({ commits, prs }) {
  const rows = [];

  for (const c of commits.items) {
    const repo = c.repository?.full_name?.split("/")[1] || "repo";
    const message = (c.commit?.message || "").split("\n")[0];
    rows.push({
      verb: "committed:",
      repo,
      detail: ` — ${message}`,
      url: c.html_url,
      sort: c.commit?.author?.date || c.commit?.committer?.date,
      kind: "commit",
    });
  }

  for (const pr of prs.items) {
    const repo = (pr.repository_url || "").split("/").pop() || "repo";
    const verb = pr.pull_request?.merged_at
      ? "merged PR:"
      : pr.state === "closed"
        ? "closed PR:"
        : pr.draft
          ? "draft PR:"
          : "open PR:";
    rows.push({ verb, repo, detail: ` — ${pr.title}`, url: pr.html_url, sort: pr.updated_at, kind: "pr" });
  }

  return rows.sort((a, b) => b.sort.localeCompare(a.sort));
}

// One log line per event; PushEvents to the same repo+branch+day are merged.
function rowsFromEvents(events, cutoff) {
  const rows = [];
  const pushes = new Map();

  for (const ev of events) {
    const day = ev.created_at.slice(0, 10);
    if (day < cutoff) continue;

    const repo = ev.repo.name.replace(/^.*\//, "");
    const repoUrl = `https://github.com/${ev.repo.name}`;

    if (ev.type === "PushEvent") {
      const branch = (ev.payload.ref || "").replace("refs/heads/", "");
      const key = `${day}|${ev.repo.name}|${branch}`;
      const size = ev.payload.size ?? ev.payload.distinct_size ?? 0;
      const prev = pushes.get(key);
      if (prev) {
        prev.count += size;
        prev.verb = prev.count ? "pushed:" : "pushed to";
      } else {
        const row = {
          verb: size ? "pushed:" : "pushed to",
          count: size,
          repo,
          detail: branch === "main" || branch === "master" ? "" : ` (${branch})`,
          url: repoUrl,
          sort: ev.created_at,
          kind: "commit",
        };
        pushes.set(key, row);
        rows.push(row);
      }
    } else if (ev.type === "PullRequestEvent") {
      const pr = ev.payload.pull_request;
      const verb = ev.payload.action === "closed" && pr.merged ? "merged PR:" : `${ev.payload.action} PR:`;
      rows.push({ verb, repo, detail: ` — ${pr.title}`, url: pr.html_url, sort: ev.created_at, kind: "pr" });
    } else if (ev.type === "CreateEvent" && ev.payload.ref_type === "repository") {
      rows.push({ verb: "created repo:", repo, detail: "", url: repoUrl, sort: ev.created_at, kind: "repo" });
    } else if (ev.type === "ReleaseEvent") {
      rows.push({ verb: "released:", repo, detail: ` ${ev.payload.release.tag_name}`, url: ev.payload.release.html_url, sort: ev.created_at, kind: "release" });
    } else if (ev.type === "IssuesEvent" && ev.payload.action === "opened") {
      rows.push({ verb: "opened issue:", repo, detail: ` — ${ev.payload.issue.title}`, url: ev.payload.issue.html_url, sort: ev.created_at, kind: "issue" });
    }
  }

  return rows.sort((a, b) => b.sort.localeCompare(a.sort));
}

async function init() {
  renderGreeting();
  renderShortcuts();
  renderHeatmap();
  document.getElementById("log-user").textContent = `@${CONFIG.githubUser} · last ${CONFIG.maxDays} days`;

  try {
    const { mode, data } = await fetchShipped();
    if (mode === "search") {
      renderStatCells(statsFromSearch(data));
      renderRows(rowsFromSearch(data));
    } else {
      const cutoff = new Date(Date.now() - CONFIG.maxDays * 86400000).toISOString().slice(0, 10);
      renderStatCells(statsFromEvents(data, cutoff));
      renderRows(rowsFromEvents(data, cutoff));
    }
  } catch (err) {
    const p = document.createElement("p");
    p.className = "log-error";
    p.textContent = `Could not reach the GitHub API (${err.message}). It refreshes on the next tab.`;
    document.getElementById("log").appendChild(p);
  }
}

init();
