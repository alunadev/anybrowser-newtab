// Vercel serverless function — the only place the GitHub token is used.
// It never reaches the client; the browser calls this endpoint instead of
// api.github.com directly. Requires env vars on the Vercel project:
//   GITHUB_TOKEN      a CLASSIC personal access token with the "repo" scope.
//                     Fine-grained PATs cannot do this — there is no
//                     fine-grained permission that unlocks private events on
//                     GET /users/{username}/events; that endpoint's own docs
//                     mention an "Events" user permission, but it doesn't
//                     actually exist in the fine-grained permission system
//                     (confirmed against GitHub's docs — "Events" only
//                     exists as an org-level permission for a different
//                     endpoint). A classic "repo"-scoped token is the only
//                     way to surface private-repo activity here.
//   GITHUB_USERNAME   your GitHub username (should match config.js)

module.exports = async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token || !username) {
    res.status(500).json({ error: "GITHUB_TOKEN and GITHUB_USERNAME must both be set on this deployment" });
    return;
  }

  try {
    // Authenticated /events (not /events/public) also surfaces private
    // activity for this same user, and runs against the 5000/hr limit
    // instead of the unauthenticated 60/hr.
    const ghRes = await fetch(`https://api.github.com/users/${username}/events?per_page=100`, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (!ghRes.ok) {
      res.status(ghRes.status).json({ error: `GitHub API responded ${ghRes.status}` });
      return;
    }

    const events = await ghRes.json();
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    res.status(200).json({ events });
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
};
