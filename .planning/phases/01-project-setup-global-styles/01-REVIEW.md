---
phase: 01-project-setup-global-styles
status: issues_found
files_reviewed: 6
findings:
  critical: 0
  warning: 5
  info: 4
  total: 9
---

# Code Review: Phase 01 — Project Setup & Global Styles

## Summary

The project scaffold is structurally sound: Tailwind v4 is wired up correctly via the Vite plugin, TypeScript extends Astro's strict preset, Lenis is installed and initialized with valid options, and the global CSS uses the correct v4 `@import "tailwindcss"` directive. No critical bugs or security vulnerabilities were found. The main concerns are: (1) the nav lacks `aria-expanded` toggling on the hamburger button, breaking screen-reader state communication; (2) the mobile overlay has no keyboard-escape or focus-trap support; (3) hiding the scrollbar globally is an accessibility regression for keyboard/motor users; (4) `index.astro` is a placeholder stub with none of the homepage content from the mock; and (5) all packages are placed in `dependencies` instead of separating build-only tools into `devDependencies`. Several informational items (missing description meta tag, nav landmark label, Google Fonts privacy) are noted for completeness.

---

## Findings

### WR-001: `aria-expanded` not toggled on hamburger button

**File:** `portfolio/src/layouts/Layout.astro:38`
**Severity:** warning
**Issue:** The `<button id="menu-toggle">` opens and closes the menu overlay but never updates its `aria-expanded` attribute. Screen readers cannot communicate the open/closed state of the menu to the user.
**Fix:** Add `aria-expanded="false"` to the button element, then toggle it in the click handler:
```js
toggle.setAttribute('aria-expanded', overlay.classList.contains('hidden') ? 'false' : 'true');
```

---

### WR-002: Menu overlay has no keyboard dismiss or focus management

**File:** `portfolio/src/layouts/Layout.astro:48-52`
**Severity:** warning
**Issue:** Pressing `Escape` does not close the overlay, and focus is not moved into the overlay when it opens. Keyboard-only users who open the menu cannot dismiss it without Tab-cycling through all three links and waiting for focus to leave the overlay naturally.
**Fix:** Add a `keydown` listener on `document` for `Escape` that closes the overlay and returns focus to the toggle button. On open, call `overlay.querySelector('a')?.focus()` to move focus into the menu.

---

### WR-003: Global scrollbar hiding is an accessibility regression

**File:** `portfolio/src/styles/global.css:17-21`
**Severity:** warning
**Issue:** Setting `scrollbar-width: none` on `html` (plus the `-webkit-scrollbar` rule) removes the scrollbar across all browsers and viewport sizes, including on large-monitor layouts where the scrollbar gives users positional context and a click-target for fast navigation. This also conflicts with WCAG 2.1 success criterion 1.4.10 (Reflow) for some users who rely on visible scroll position indicators.
**Fix:** Restrict scrollbar hiding to scenarios where Lenis is confirmed active, or remove the rule entirely. If a hidden scrollbar is a deliberate design choice confirmed by the mock, document it explicitly in the CSS with a comment and accept the trade-off.

---

### WR-004: `lenis/dist/lenis.css` import bypasses the package exports map

**File:** `portfolio/src/layouts/Layout.astro:94`
**Severity:** warning
**Issue:** The import path `'lenis/dist/lenis.css'` works today because Lenis exports `./dist/*` as a catch-all in its `package.json` exports map. However, catch-all exports are considered an implementation detail and can be removed in a semver-minor update. The canonical path for the stylesheet is `lenis/dist/lenis.css` via the `./dist/*` export entry — which exists — but it is safer to import via the documented subpath.
**Fix:** Vite resolves this correctly at build time, so this is low risk in practice. Consider adding a comment noting the dependency on the `./dist/*` wildcard export, or watch for a future `lenis/css` named export. No immediate action required but worth tracking.

---

### WR-005: All packages in `dependencies` — build tools should be `devDependencies`

**File:** `portfolio/package.json:14-19`
**Severity:** warning
**Issue:** `astro`, `@tailwindcss/vite`, and `tailwindcss` are build-time tools that produce no runtime artifact. Placing them in `dependencies` rather than `devDependencies` causes unnecessary package installation on production deploys (e.g., Vercel install step) and bloats the dependency surface area. Only `lenis` is a genuine runtime dependency.
**Fix:** Move `astro`, `@tailwindcss/vite`, and `tailwindcss` to `devDependencies`.

---

### IN-001: `index.astro` is an empty placeholder — homepage content not yet implemented

**File:** `portfolio/src/pages/index.astro:1-9`
**Severity:** info
**Issue:** The homepage contains only a centered `<h1>Kenny Raymond</h1>`. The mock (`Mocks/HomeDesktop.jpeg`) requires a full hero section with name, subtitle, email, location, portrait, social icons, an About blurb, and a three-card project grid. This is presumably intentional scaffolding from Phase 1, but is flagged so future phases track it as outstanding work.
**Fix:** Implement full homepage content in a subsequent phase per the mock.

---

### IN-002: Missing `<meta name="description">` in Layout

**File:** `portfolio/src/layouts/Layout.astro:11-15`
**Severity:** info
**Issue:** The `<head>` contains `charset`, `viewport`, favicon, and `<title>`, but no `<meta name="description">`. This reduces SEO discoverability and social share previews (Open Graph is also absent).
**Fix:** Add a `description` prop to the `Props` interface with a default value, and render `<meta name="description" content={description} />`. Add Open Graph tags (`og:title`, `og:description`, `og:image`) when assets are finalized.

---

### IN-003: `<nav>` has no accessible label

**File:** `portfolio/src/layouts/Layout.astro:20`
**Severity:** info
**Issue:** When a page contains more than one `<nav>` landmark (e.g., in-page navigation added later), screen readers cannot distinguish them without accessible labels. Adding `aria-label="Main"` to the primary nav is a low-cost defensive improvement.
**Fix:** Add `aria-label="Main"` to the `<nav>` element.

---

### IN-004: Google Fonts loaded via third-party CDN — no preconnect hint

**File:** `portfolio/src/styles/global.css:2`
**Severity:** info
**Issue:** The Google Fonts stylesheet is loaded via `@import url(...)` inside CSS, which blocks rendering until the stylesheet resolves. There is also no `<link rel="preconnect" href="https://fonts.googleapis.com">` hint in the `<head>`, adding latency before the font request begins.
**Fix:** Move the Google Fonts `<link>` tags into the Layout `<head>` with `rel="preconnect"` hints for `fonts.googleapis.com` and `fonts.gstatic.com`, then remove the `@import` from `global.css`. This matches Google's own recommended embed pattern and improves perceived load time.
