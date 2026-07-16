// anybrowser-newtab — your personal config.
//
// Copy this file to config.js and fill in your own values:
//   cp config.example.js config.js
//
// config.js is gitignored on purpose — your shortcuts and GitHub username
// never get committed, even to your own fork.

const CONFIG = {
  // Shown in the greeting: "Good morning, <name>".
  name: "Your Name",

  // Your GitHub username. Public activity for this account powers the
  // "Shipped" section (contribution heatmap, stats, recent pushes/PRs).
  githubUser: "octocat",

  // How many days back the stats row and recent-activity list look — NOT
  // the heatmap above them, which always shows a full year (that's what
  // GitHub's own contribution graph shows, independent of this setting).
  maxDays: 7,

  // Shortcuts row. Order here is display order.
  // `icon` must be one of the keys defined in ICONS (see app.js):
  //   github, notion, gmail, gcal, linkedin, x, globe (generic fallback)
  shortcuts: [
    { label: "GitHub", url: "https://github.com/octocat", icon: "github" },
    { label: "Gmail", url: "https://mail.google.com", icon: "gmail" },
    { label: "Calendar", url: "https://calendar.google.com", icon: "gcal" },
    { label: "Notion", url: "https://notion.so", icon: "notion" },
    { label: "Portfolio", url: "https://example.com", icon: "globe" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/your-handle/", icon: "linkedin" },
    { label: "X", url: "https://x.com/your-handle", icon: "x" },
  ],
};
