// Vercel serverless function — the only place the GitHub token is used.
// It never reaches the client; the browser calls this endpoint instead of
// api.github.com directly. Requires env vars on the Vercel project:
//   GITHUB_TOKEN      a fine-grained personal access token, read-only.
//                     Grant Repository permissions: Contents (read) and
//                     Pull requests (read) on the repos whose activity you
//                     want counted (or all repos). Uses GitHub's Search API
//                     (commits, PRs, repos), which — unlike the Events feed
//                     — respects normal per-repo fine-grained permissions.
//   GITHUB_USERNAME   your GitHub username (should match config.js)

module.exports = async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token || !username) {
    res.status(500).json({ error: "GITHUB_TOKEN and GITHUB_USERNAME must both be set on this deployment" });
    return;
  }

  const days = Math.min(90, Math.max(1, parseInt(req.query.days, 10) || 7));
  const since = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);

  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const searchUrl = (endpoint, q, sort) =>
    `https://api.github.com/search/${endpoint}?q=${encodeURIComponent(q)}&per_page=50${sort ? `&sort=${sort}&order=desc` : ""}`;

  try {
    const signal = AbortSignal.timeout(10000);
    const [commitsRes, prsRes, reposRes] = await Promise.all([
      fetch(searchUrl("commits", `author:${username} author-date:>=${since}`, "author-date"), { headers, signal }),
      fetch(searchUrl("issues", `author:${username} type:pr updated:>=${since}`, "updated"), { headers, signal }),
      fetch(searchUrl("repositories", `user:${username} created:>=${since}`), { headers, signal }),
    ]);

    for (const r of [commitsRes, prsRes, reposRes]) {
      if (!r.ok) {
        res.status(r.status).json({ error: `GitHub API responded ${r.status}` });
        return;
      }
    }

    const [commits, prs, repos] = await Promise.all([commitsRes.json(), prsRes.json(), reposRes.json()]);

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    res.status(200).json({
      commits: { total: commits.total_count, items: commits.items },
      prs: { total: prs.total_count, items: prs.items },
      repos: { total: repos.total_count, items: repos.items },
    });
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
};
