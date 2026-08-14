// newtab — search bar, greeting, keyboard-driven shortcuts, and a GitHub
// "Shipped" activity feed (real contribution heatmap + stats + recent items).

// Official brand glyph paths, monochrome. Generic icons only for non-brands.
// Each entry is {path, viewBox} — viewBox defaults to 24x24 (see brandIcon
// below) but stays per-icon because not every brand mark ships on that grid
// (OpenAI's official mark is drawn on a 41x41 grid).
const ICONS = {
  github: {
    path:
      "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  notion: {
    path:
      "M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.373.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.933.653.933 1.213v16.378c0 1.026-.373 1.634-1.68 1.727l-15.458.933c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.448-1.632z",
  },
  gmail: {
    path:
      "M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z",
  },
  gcal: {
    path:
      "M18.316 5.684H24v12.632h-5.684V5.684zM5.684 24h12.632v-5.684H5.684V24zM18.316 5.684V0H1.895A1.894 1.894 0 0 0 0 1.895v16.421h5.684V5.684h12.632zm-7.207 6.25v-.065c.272-.144.5-.349.687-.617s.279-.595.279-.982c0-.379-.099-.72-.3-1.025a2.05 2.05 0 0 0-.832-.714 2.703 2.703 0 0 0-1.197-.257c-.6 0-1.094.156-1.481.467-.386.311-.65.671-.793 1.078l1.085.452c.086-.249.224-.461.413-.633.189-.172.445-.257.767-.257.33 0 .602.088.816.264a.86.86 0 0 1 .322.703c0 .33-.12.589-.36.778-.24.19-.535.284-.886.284h-.567v1.085h.633c.407 0 .748.109 1.02.327.272.218.407.499.407.843 0 .336-.129.614-.387.832s-.565.327-.924.327c-.351 0-.651-.103-.897-.311-.248-.208-.422-.502-.521-.881l-1.096.452c.178.616.505 1.082.977 1.401.472.319.984.478 1.538.477a2.84 2.84 0 0 0 1.293-.291c.382-.193.684-.458.902-.794.218-.336.327-.72.327-1.149 0-.429-.115-.797-.344-1.105a2.067 2.067 0 0 0-.881-.689zm2.093-1.931l.602.913L15 10.045v5.744h1.187V8.446h-.827l-2.158 1.557zM22.105 0h-3.289v5.184H24V1.895A1.894 1.894 0 0 0 22.105 0zm-3.289 23.5l4.684-4.684h-4.684V23.5zM0 22.105C0 23.152.848 24 1.895 24h3.289v-5.184H0v3.289z",
  },
  linkedin: {
    path:
      "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  x: { path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" },
  youtube: {
    path:
      "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  globe: {
    path:
      "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm9.949 11h-3.98c-.11-2.868-.775-5.4-1.795-7.26A10.02 10.02 0 0 1 21.949 11zM12 2.05c.9 0 2.734 2.775 2.966 8.95H9.034C9.266 4.825 11.1 2.05 12 2.05zM7.826 3.74C6.806 5.6 6.14 8.132 6.031 11h-3.98a10.02 10.02 0 0 1 5.775-7.26zM2.05 13h3.98c.11 2.868.776 5.4 1.796 7.26A10.02 10.02 0 0 1 2.051 13zM12 21.95c-.9 0-2.734-2.775-2.966-8.95h5.932c-.232 6.175-2.066 8.95-2.966 8.95zm4.174-1.69c1.02-1.86 1.686-4.392 1.795-7.26h3.98a10.02 10.02 0 0 1-5.775 7.26z",
  },
  // Anthropic's official Claude mark (simple-icons, hex D97757).
  claude: {
    path:
      "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z",
  },
  // OpenAI's official "blossom" mark, sourced from openai.com's own favicon —
  // drawn on a 41x41 grid, not the 24x24 the rest of these icons use.
  openai: {
    viewBox: "0 0 41 41",
    path:
      "M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z",
  },
  // Google's official Gemini mark (simple-icons, hex 8E75B2).
  gemini: {
    path:
      "M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81",
  },
  // xAI's official Grok mark, sourced from grok.com's own favicon.svg —
  // drawn on a 512x512 grid, not the 24x24 the rest of these icons use.
  grok: {
    viewBox: "0 0 512 512",
    path:
      "M210.484 312.759L343.465 210.383C349.984 205.364 359.302 207.322 362.408 215.117C378.758 256.231 371.454 305.64 338.925 339.563C306.397 373.487 261.137 380.927 219.768 363.983L174.577 385.803C239.394 432.008 318.104 420.581 367.289 369.251C406.303 328.564 418.386 273.104 407.088 223.091L407.19 223.198C390.807 149.726 411.218 120.359 453.03 60.3072C454.02 58.8833 455.01 57.4595 456 56L400.978 113.382V113.204L210.45 312.794 M183.042 337.641C136.519 291.294 144.54 219.567 184.236 178.203C213.59 147.59 261.683 135.096 303.666 153.464L348.755 131.75C340.632 125.627 330.221 119.042 318.275 114.414C264.277 91.2407 199.63 102.774 155.735 148.516C113.513 192.549 100.236 260.254 123.036 318.027C140.069 361.206 112.148 391.748 84.0229 422.575C74.0561 433.503 64.0553 444.431 56 456L183.007 337.677",
  },
};

function brandIcon(key, className) {
  const icon = ICONS[key] || ICONS.globe;
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  if (className) svg.setAttribute("class", className);
  svg.setAttribute("viewBox", icon.viewBox || "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  const path = document.createElementNS(ns, "path");
  path.setAttribute("d", icon.path);
  svg.appendChild(path);
  return svg;
}

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

// Alt (⌥) on Mac, Ctrl elsewhere. Only the first 9 shortcuts get a hotkey —
// there's no single-digit key past 9.
const IS_MAC = /Mac|iPod|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
const HOTKEY_LABEL = IS_MAC ? "⌥" : "Ctrl";

function renderShortcuts() {
  const row = document.getElementById("shortcuts");
  CONFIG.shortcuts.forEach((s, i) => {
    const a = document.createElement("a");
    a.className = "shortcut";
    a.href = s.url;
    a.dataset.brand = s.icon;
    a.appendChild(brandIcon(s.icon));
    a.appendChild(document.createTextNode(s.label));

    if (i < 9) {
      const key = document.createElement("span");
      key.className = "shortcut-key";
      key.textContent = `${HOTKEY_LABEL}${i + 1}`;
      a.appendChild(key);
    }

    row.appendChild(a);
  });
}

// AI Agents dock — icon-only, no labels/hotkeys. Kept visually and
// semantically separate from Shortcuts: these are a small fixed set of
// assistant tabs, not a growing personal bookmark list.
function renderAgents() {
  const row = document.getElementById("agents");
  if (!row) return;
  CONFIG.agents.forEach((agent) => {
    const a = document.createElement("a");
    a.className = "agent";
    a.href = agent.url;
    a.dataset.brand = agent.icon;
    a.title = agent.label;
    a.setAttribute("aria-label", agent.label);
    a.appendChild(brandIcon(agent.icon));
    row.appendChild(a);
  });
}

// Global hotkeys: Option+1..9 (Mac) / Ctrl+1..9 (elsewhere) jump straight to
// the matching shortcut; Option+K / Ctrl+K focuses the search bar. Uses
// e.code (physical key), not e.key, since Option remaps what character
// digits (and letters) produce on Mac keyboard layouts.
// Note: on Windows, Chrome/Firefox already reserve Ctrl+1..8 for switching
// browser tabs (Ctrl+9 for the last tab) and Ctrl+K for the omnibox search —
// those browsers will intercept the combo before this page ever sees it.
function initShortcutHotkeys() {
  document.addEventListener("keydown", (e) => {
    if (!(e.altKey || e.ctrlKey) || e.metaKey) return;

    if (e.code === "KeyK") {
      e.preventDefault();
      const input = document.getElementById("search-input");
      input.focus();
      input.select();
      return;
    }

    const match = e.code.match(/^Digit([1-9])$/);
    if (!match) return;
    const shortcut = CONFIG.shortcuts[Number(match[1]) - 1];
    if (!shortcut) return;
    e.preventDefault();
    window.location.href = shortcut.url;
  });
}

// Builds our own SVG from GitHub's real per-day contribution levels (see
// api/contributions.js) — same grid density as your actual profile graph,
// colored via our own tokens rather than GitHub's page CSS.
function buildHeatmapSvg(days) {
  const cell = 10;
  const gap = 3;
  const pitch = cell + gap;
  const originX = 24;
  const originY = 14;

  if (!days.length) throw new Error("no contribution data");

  const parsed = days.map((d) => ({ ...d, dateObj: new Date(`${d.date}T00:00:00Z`) }));
  const minDate = new Date(Math.min(...parsed.map((d) => d.dateObj.getTime())));
  const weekStart = new Date(minDate);
  weekStart.setUTCDate(weekStart.getUTCDate() - weekStart.getUTCDay());

  const columns = new Map();
  for (const d of parsed) {
    const col = Math.round((d.dateObj - weekStart) / (7 * 86400000));
    const row = d.dateObj.getUTCDay();
    if (!columns.has(col)) columns.set(col, {});
    columns.get(col)[row] = d;
  }
  const numCols = Math.max(...columns.keys()) + 1;

  const width = originX + numCols * pitch;
  const height = originY + 7 * pitch;

  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("class", "heatmap-svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "GitHub contribution graph");

  const dayLabels = { 1: "Mon", 3: "Wed", 5: "Fri" };
  for (const [row, label] of Object.entries(dayLabels)) {
    const t = document.createElementNS(ns, "text");
    t.setAttribute("x", 0);
    t.setAttribute("y", originY + Number(row) * pitch + cell - 1);
    t.setAttribute("class", "heatmap-label");
    t.textContent = label;
    svg.appendChild(t);
  }

  let lastMonth = null;
  for (let col = 0; col < numCols; col++) {
    const colDate = new Date(weekStart);
    colDate.setUTCDate(colDate.getUTCDate() + col * 7);
    const month = colDate.getUTCMonth();
    if (month !== lastMonth) {
      const t = document.createElementNS(ns, "text");
      t.setAttribute("x", originX + col * pitch);
      t.setAttribute("y", 9);
      t.setAttribute("class", "heatmap-label");
      t.textContent = colDate.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
      svg.appendChild(t);
      lastMonth = month;
    }

    const cellsInCol = columns.get(col) || {};
    for (let row = 0; row < 7; row++) {
      const info = cellsInCol[row];
      if (!info) continue;
      const rect = document.createElementNS(ns, "rect");
      rect.setAttribute("x", originX + col * pitch);
      rect.setAttribute("y", originY + row * pitch);
      rect.setAttribute("width", cell);
      rect.setAttribute("height", cell);
      rect.setAttribute("rx", 2);
      rect.setAttribute("class", "heatmap-cell");
      rect.dataset.level = info.level;
      const title = document.createElementNS(ns, "title");
      title.textContent = `${info.level > 0 ? "Contributions" : "No contributions"} on ${info.date}`;
      rect.appendChild(title);
      svg.appendChild(rect);
    }
  }

  return svg;
}

// Contribution levels change at most once a day — cache client-side so
// opening a dozen tabs in an hour doesn't refetch/rebuild the SVG each time.
const HEATMAP_CACHE_KEY = "newtab-heatmap-data";
const HEATMAP_CACHE_TTL = 60 * 60 * 1000;

// The section header's "@user · <span>" text describes the heatmap
// specifically (not the row-list below, which is windowed to maxDays
// separately) — derive it from the real date range instead of hardcoding
// "last year", so it can't silently drift if GitHub ever returns a
// different span.
function describeHeatmapSpan(days) {
  if (!days.length) return "activity";
  const dates = days.map((d) => new Date(`${d.date}T00:00:00Z`).getTime());
  const spanDays = Math.round((Math.max(...dates) - Math.min(...dates)) / 86400000) + 1;
  if (spanDays >= 350) return "last year activity";
  if (spanDays >= 25) return `last ${Math.round(spanDays / 30)} months activity`;
  return `last ${spanDays} day${spanDays === 1 ? "" : "s"} activity`;
}

function describeTotal(total) {
  return typeof total === "number" ? ` · ${total.toLocaleString("en-US")} contributions` : "";
}

async function renderHeatmap() {
  const container = document.getElementById("heatmap");
  try {
    let cached = null;
    try {
      cached = JSON.parse(localStorage.getItem(HEATMAP_CACHE_KEY) || "null");
    } catch {
      cached = null;
    }

    let days, total;
    if (cached && Date.now() - cached.at < HEATMAP_CACHE_TTL) {
      ({ days, total } = cached);
    } else {
      const res = await fetch(`/api/contributions?username=${CONFIG.githubUser}`, {
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`proxy ${res.status}`);
      ({ days, total } = await res.json());
      localStorage.setItem(HEATMAP_CACHE_KEY, JSON.stringify({ at: Date.now(), days, total }));
    }

    container.textContent = "";
    container.appendChild(buildHeatmapSvg(days));
    document.getElementById("log-user").textContent =
      `@${CONFIG.githubUser} · ${describeHeatmapSpan(days)}${describeTotal(total)}`;
  } catch {
    // Fallback: a third-party image render, used when the proxy isn't
    // available (local static preview, or not yet deployed).
    const img = document.createElement("img");
    img.className = "heatmap-fallback-img";
    img.src = `https://ghchart.rshah.org/4a6fa5/${CONFIG.githubUser}`;
    img.alt = `${CONFIG.githubUser}'s GitHub contribution graph`;
    container.textContent = "";
    container.appendChild(img);
  }
}

// ---- Search bar ----
// Recreates "open a new tab, start typing" now that the browser's own
// omnibox landing behavior is replaced by this page. Suggestions come from
// this box's own search history (localStorage — this browser/origin only),
// not Chrome's real address-bar history: no page can read that.
function looksLikeUrl(query) {
  if (/\s/.test(query)) return false;
  if (/^https?:\/\//i.test(query)) return true;
  return /^[a-z0-9-]+(\.[a-z0-9-]+)+([:/?#].*)?$/i.test(query);
}

const SEARCH_HISTORY_KEY = "nt-search-history";
const SEARCH_HISTORY_MAX = 10;
const SEARCH_SUGGESTIONS_MAX = 5;

function loadSearchHistory() {
  try {
    const raw = JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY));
    return Array.isArray(raw) ? raw.filter((q) => typeof q === "string") : [];
  } catch {
    return [];
  }
}

function saveSearchHistory(history) {
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
}

function addToSearchHistory(query) {
  const history = loadSearchHistory().filter((q) => q.toLowerCase() !== query.toLowerCase());
  history.unshift(query);
  saveSearchHistory(history.slice(0, SEARCH_HISTORY_MAX));
}

function removeFromSearchHistory(query) {
  saveSearchHistory(loadSearchHistory().filter((q) => q !== query));
}

function matchingSearchHistory(query) {
  const history = loadSearchHistory();
  const matches = query ? history.filter((q) => q.toLowerCase().includes(query.toLowerCase())) : history;
  return matches.slice(0, SEARCH_SUGGESTIONS_MAX);
}

function initSearch() {
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");
  input.focus();

  const hint = document.createElement("span");
  hint.className = "search-hint";
  hint.textContent = `${HOTKEY_LABEL}K`;
  form.appendChild(hint);

  const suggestionsBox = document.createElement("div");
  suggestionsBox.className = "search-suggestions";
  suggestionsBox.setAttribute("role", "listbox");
  suggestionsBox.hidden = true;
  form.appendChild(suggestionsBox);

  let suggestions = [];
  let activeIndex = -1;

  function navigate(query) {
    window.location.href = looksLikeUrl(query)
      ? /^https?:\/\//i.test(query)
        ? query
        : `https://${query}`
      : `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  }

  function performSearch(query) {
    addToSearchHistory(query);
    navigate(query);
  }

  function hideSuggestions() {
    suggestions = [];
    activeIndex = -1;
    suggestionsBox.hidden = true;
    suggestionsBox.innerHTML = "";
  }

  function renderSuggestions() {
    suggestionsBox.innerHTML = "";

    suggestions.forEach((query, i) => {
      const row = document.createElement("div");
      row.className = "search-suggestion" + (i === activeIndex ? " active" : "");
      row.setAttribute("role", "option");
      row.setAttribute("aria-selected", String(i === activeIndex));

      const text = document.createElement("span");
      text.className = "search-suggestion-text";
      text.textContent = query;
      row.appendChild(text);

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "search-suggestion-remove";
      remove.setAttribute("aria-label", `Remove "${query}" from search history`);
      remove.textContent = "×";
      // mousedown + preventDefault (not click) keeps focus in the input, so
      // removing an entry doesn't blur-close the dropdown out from under it.
      remove.addEventListener("mousedown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        removeFromSearchHistory(query);
        updateSuggestions(input.value.trim());
      });
      row.appendChild(remove);

      row.addEventListener("mousedown", (e) => {
        e.preventDefault();
        input.value = query;
        performSearch(query);
      });

      suggestionsBox.appendChild(row);
    });

    if (suggestions.length) {
      const clear = document.createElement("button");
      clear.type = "button";
      clear.className = "search-suggestions-clear";
      clear.textContent = "Clear search history";
      clear.addEventListener("mousedown", (e) => {
        e.preventDefault();
        saveSearchHistory([]);
        hideSuggestions();
      });
      suggestionsBox.appendChild(clear);
    }

    suggestionsBox.hidden = suggestions.length === 0;
  }

  function updateSuggestions(query) {
    suggestions = matchingSearchHistory(query);
    activeIndex = -1;
    renderSuggestions();
  }

  input.addEventListener("input", () => updateSuggestions(input.value.trim()));
  input.addEventListener("focus", () => updateSuggestions(input.value.trim()));
  input.addEventListener("blur", () => hideSuggestions());

  input.addEventListener("keydown", (e) => {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, suggestions.length - 1);
      renderSuggestions();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, -1);
      renderSuggestions();
    } else if (e.key === "Escape") {
      hideSuggestions();
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      input.value = suggestions[activeIndex];
      performSearch(suggestions[activeIndex]);
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    performSearch(query);
  });
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
  const res = await fetch(`/api/github-stats?days=${CONFIG.maxDays}`, {
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`proxy ${res.status}`);
  const data = await res.json();
  return { mode: "search", data };
}

async function fetchPublicEvents() {
  const res = await fetch(
    `https://api.github.com/users/${CONFIG.githubUser}/events/public?per_page=100`,
    { headers: { Accept: "application/vnd.github+json" }, signal: AbortSignal.timeout(8000) }
  );
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const events = await res.json();
  return { mode: "events", data: events };
}

async function fetchShipped() {
  let cached = null;
  try {
    cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
  } catch {
    cached = null; // corrupted cache entry — treat as absent, don't crash the whole feed
  }
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

// Single source of truth for merged > closed > draft > open precedence, fed
// by each data source's own shape. Previously this cascade was written out
// separately in statsFromSearch, rowsFromSearch, and rowsFromEvents, and the
// copies had already drifted (rowsFromEvents fell through to printing the
// raw GitHub event action for cases the others normalized to "open").
function classifyPr({ merged, closed, draft }) {
  if (merged) return "pr-merged";
  if (closed) return "pr-closed";
  if (draft) return "pr-draft";
  return "pr-open";
}

const PR_VERBS = {
  "pr-merged": "merged PR:",
  "pr-closed": "closed PR:",
  "pr-draft": "draft PR:",
  "pr-open": "open PR:",
};

// ---- Row list ----

const MAX_ROWS = 5;

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

// Row-kind icons — same visual language GitHub itself uses for PR state
// (git-pull-request / git-merge / closed / draft), plus a commit dot and a
// few generic shapes for the event-feed fallback's extra row types.
const ROW_ICONS = {
  commit: { circles: [{ cx: 12, cy: 12, r: 3 }], paths: ["M3 12h6", "M15 12h6"] },
  "pr-open": {
    circles: [
      { cx: 18, cy: 18, r: 3 },
      { cx: 6, cy: 6, r: 3 },
    ],
    paths: ["M13 6h3a2 2 0 0 1 2 2v7", "M6 9v12"],
  },
  "pr-draft": {
    circles: [
      { cx: 18, cy: 18, r: 3 },
      { cx: 6, cy: 6, r: 3 },
    ],
    paths: ["M13 6h3a2 2 0 0 1 2 2v7", "M6 9v12"],
    dashed: true,
  },
  "pr-merged": {
    circles: [
      { cx: 18, cy: 18, r: 3 },
      { cx: 6, cy: 6, r: 3 },
    ],
    paths: ["M6 21V9a9 9 0 0 0 9 9"],
  },
  "pr-closed": {
    circles: [
      { cx: 6, cy: 6, r: 3 },
      { cx: 18, cy: 18, r: 3 },
    ],
    paths: ["M6 9v12", "m21 3-6 6", "m15 3 6 6"],
  },
  issue: { circles: [{ cx: 12, cy: 12, r: 8 }], paths: ["M12 8v4", "M12 15.5v.01"] },
  repo: { paths: ["M4 7V5a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"] },
  release: { circles: [{ cx: 7.5, cy: 7.5, r: 1.2 }], paths: ["M12 2H2v10l9.29 9.29a1 1 0 0 0 1.42 0l7.29-7.29a1 1 0 0 0 0-1.42Z"] },
};

function rowIcon(kind) {
  const spec = ROW_ICONS[kind] || ROW_ICONS.commit;
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("class", "shipped-icon");
  svg.dataset.kind = kind;
  if (spec.dashed) svg.dataset.dashed = "true";
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");

  for (const c of spec.circles || []) {
    const circle = document.createElementNS(ns, "circle");
    circle.setAttribute("cx", c.cx);
    circle.setAttribute("cy", c.cy);
    circle.setAttribute("r", c.r);
    svg.appendChild(circle);
  }
  for (const d of spec.paths || []) {
    const path = document.createElementNS(ns, "path");
    path.setAttribute("d", d);
    svg.appendChild(path);
  }
  return svg;
}

function appendRow(container, row) {
  const a = document.createElement("a");
  a.className = "shipped-row";
  a.href = row.url;

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
  a.append(rowIcon(row.kind), body, extLinkIcon());
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
    const kind = classifyPr({
      merged: Boolean(pr.pull_request?.merged_at),
      closed: pr.state === "closed",
      draft: Boolean(pr.draft),
    });
    rows.push({ verb: PR_VERBS[kind], repo, detail: ` — ${pr.title}`, url: pr.html_url, sort: pr.updated_at, kind });
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
      const kind = classifyPr({
        merged: ev.payload.action === "closed" && Boolean(pr.merged),
        closed: ev.payload.action === "closed",
        draft: Boolean(pr.draft),
      });
      rows.push({ verb: PR_VERBS[kind], repo, detail: ` — ${pr.title}`, url: pr.html_url, sort: ev.created_at, kind });
    } else if (ev.type === "CreateEvent" && ev.payload.ref_type === "repository") {
      rows.push({ verb: "created repo:", repo, detail: "", url: repoUrl, sort: ev.created_at, kind: "repo" });
    } else if (ev.type === "ReleaseEvent" && ev.payload.action === "published") {
      rows.push({ verb: "released:", repo, detail: ` ${ev.payload.release.tag_name}`, url: ev.payload.release.html_url, sort: ev.created_at, kind: "release" });
    } else if (ev.type === "IssuesEvent" && ev.payload.action === "opened") {
      rows.push({ verb: "opened issue:", repo, detail: ` — ${ev.payload.issue.title}`, url: ev.payload.issue.html_url, sort: ev.created_at, kind: "issue" });
    }
  }

  return rows.sort((a, b) => b.sort.localeCompare(a.sort));
}

async function init() {
  initSearch();
  renderGreeting();
  renderAgents();
  renderShortcuts();
  initShortcutHotkeys();
  // Placeholder text first: renderHeatmap can resolve synchronously (cache
  // hit, no network round-trip), so setting this after the call would
  // sometimes stomp its real result right back to the plain fallback.
  document.getElementById("log-user").textContent = `@${CONFIG.githubUser} · last year activity`;
  renderHeatmap();

  try {
    const { mode, data } = await fetchShipped();
    if (mode === "search") {
      renderRows(rowsFromSearch(data));
    } else {
      const cutoff = new Date(Date.now() - CONFIG.maxDays * 86400000).toISOString().slice(0, 10);
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
