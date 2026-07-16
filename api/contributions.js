// Vercel serverless function — fetches GitHub's own contribution graph
// fragment (the same markup that powers your profile page) and extracts
// per-day contribution levels. No token needed; this is public data.
//
// Rendering the exact same {date, level} pairs GitHub uses gives a heatmap
// that matches your real profile pixel-for-pixel in structure, while
// letting the client render it with its own colors (see tokens.css
// --heat-0..4) instead of depending on GitHub's page CSS, which isn't
// available outside github.com.

module.exports = async function handler(req, res) {
  const username = req.query.username;
  if (!username) {
    res.status(400).json({ error: "username query param is required" });
    return;
  }

  try {
    const ghRes = await fetch(`https://github.com/users/${username}/contributions`, {
      signal: AbortSignal.timeout(10000),
    });
    if (!ghRes.ok) {
      res.status(ghRes.status).json({ error: `GitHub responded ${ghRes.status}` });
      return;
    }

    const html = await ghRes.text();
    const days = [];
    const tdRe = /<td\b[^>]*>/g;
    let match;
    while ((match = tdRe.exec(html))) {
      const tag = match[0];
      if (!tag.includes("ContributionCalendar-day")) continue;
      const date = tag.match(/data-date="([\d-]+)"/)?.[1];
      const level = tag.match(/data-level="(\d)"/)?.[1];
      if (date && level !== undefined) days.push({ date, level: Number(level) });
    }

    if (!days.length) {
      res.status(502).json({ error: "could not parse contribution graph" });
      return;
    }

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).json({ days });
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
};
