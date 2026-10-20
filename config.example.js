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

  // How many days back the recent-activity list looks — NOT the heatmap
  // above it, which always shows a full year (that's what GitHub's own
  // contribution graph shows, independent of this setting).
  maxDays: 7,

  // AI Agents dock — icon-only, shown above Shortcuts. `icon` must be one of
  // claude, openai, gemini, grok (see ICONS in app.js).
  agents: [
    { label: "Claude", url: "https://claude.ai", icon: "claude" },
    { label: "ChatGPT", url: "https://chatgpt.com", icon: "openai" },
    { label: "Gemini", url: "https://gemini.google.com", icon: "gemini" },
    { label: "Grok", url: "https://grok.com", icon: "grok" },
  ],

  // Tools — work apps you open all day. Icon-only dock like AI Agents, shown
  // between AI Agents and Shortcuts (no hotkeys; the label is the tooltip).
  // `icon` must be one of the keys defined in ICONS (see app.js):
  //   github, gmail, gcal, gdrive, gsheets, vercel, notion, linkedin, x, youtube,
  //   globe (generic fallback)
  tools: [
    { label: "Gmail", url: "https://mail.google.com", icon: "gmail" },
    { label: "Calendar", url: "https://calendar.google.com", icon: "gcal" },
    { label: "Drive", url: "https://drive.google.com", icon: "gdrive" },
    { label: "Sheets", url: "https://docs.google.com/spreadsheets/u/0/", icon: "gsheets" },
    { label: "GitHub", url: "https://github.com/octocat", icon: "github" },
    { label: "Vercel", url: "https://vercel.com/dashboard", icon: "vercel" },
  ],

  // Shortcuts — everything else you visit often, as labeled rows. The first 9
  // get the Option/Ctrl+1..9 hotkeys (same `icon` keys as above).
  shortcuts: [
    { label: "Notion", url: "https://notion.so", icon: "notion" },
    { label: "Portfolio", url: "https://example.com", icon: "globe" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/your-handle/", icon: "linkedin" },
    { label: "X", url: "https://x.com/your-handle", icon: "x" },
  ],
};
