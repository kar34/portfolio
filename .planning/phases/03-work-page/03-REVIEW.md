---
phase: 03-work-page
depth: standard
files_reviewed: 6
status: issues_found
findings:
  critical: 1
  warning: 8
  info: 4
  total: 13
---

# Code Review — Phase 03: Work Page

**Files reviewed:**
- `portfolio/src/pages/index.astro`
- `portfolio/src/pages/work.astro`
- `portfolio/src/components/WorkCards.astro`
- `portfolio/src/pages/project/linkedin-video.astro`
- `portfolio/src/pages/project/linkedin-reactions.astro`
- `portfolio/src/pages/project/nearby-friends.astro`

_(Layout.astro read as supporting context only)_

---

## Critical

### CR-001 (critical)
**File:** `portfolio/src/pages/index.astro`
**Issue:** Image `src` contains an unencoded `&` character — `/b&w ken sm.png`. The `&` in a URL attribute is technically invalid HTML and some parsers/servers may fail to resolve it. Browsers generally handle it, but it violates the HTML spec and will trigger validator errors. Additionally, the file name contains spaces, which should be percent-encoded in URLs.
**Fix:** Rename the asset to `bw-ken-sm.png` (and update the public folder accordingly) and reference it as `/bw-ken-sm.png`. Apply the same treatment to any other asset names with special characters or spaces (e.g., `LinkedIn Logo Icon (1).png` → `linkedin-logo.png`). All public asset filenames should be URL-safe.

---

## Warnings

### WR-001 (warning)
**File:** `portfolio/src/pages/work.astro`
**Issue:** Conflicting padding classes on the same element — `pt-28 py-20 md:py-28`. The `py-20` sets both top and bottom padding, but `pt-28` overrides the top. On mobile the section has `pt-28` + `py-20` top padding applied in that order; Tailwind applies the last-declared class that wins in the cascade, meaning `pt-28` wins on mobile (correct intent) but this is fragile and visually confusing. The redundancy makes the intent unclear.
**Fix:** Use explicit `pt-28 pb-20 md:pt-28 md:pb-28` to make top and bottom intent unambiguous.

### WR-002 (warning)
**File:** `portfolio/src/components/WorkCards.astro`
**Issue:** The LinkedIn Reactions card uses `src="/Reaction menu 9.png"` but per the Assets Inventory in CLAUDE.md the correct tile asset for this card is `Reactionshero.png` (or `Reactionshero.png` is described as the card thumbnail). The `Reaction menu 9.png` asset is a UI detail image, not the tile thumbnail. This will display the wrong image on both the home page and work page.
**Fix:** Verify against the live site / mocks, then change the `src` to `/Reactionshero.png` if that is the correct tile image.

### WR-003 (warning)
**File:** `portfolio/src/layouts/Layout.astro`
**Issue:** The menu overlay (`#menu-overlay`) has no `aria-hidden` attribute and the hamburger button has no `aria-expanded` attribute. When the menu is hidden, assistive technology can still traverse its links.
**Fix:** Toggle `aria-hidden="true/false"` on the overlay and `aria-expanded="true/false"` on the toggle button in the script block.

### WR-004 (warning)
**File:** `portfolio/src/layouts/Layout.astro`
**Issue:** The menu overlay has no way to close via keyboard (e.g., Escape key). Keyboard and screen reader users who open the menu cannot dismiss it without clicking a nav link.
**Fix:** Add a `keydown` listener for `Escape` that adds the `hidden` class back to the overlay.

### WR-005 (warning)
**File:** `portfolio/src/layouts/Layout.astro`
**Issue:** The `<script>` block imports `lenis/dist/lenis.css` directly. Lenis v1+ ships CSS at `lenis/lenis.css`. The `dist/` path may not exist depending on the installed package version, which would silently fail (no smooth scroll styles applied) or throw a build error.
**Fix:** Verify the installed Lenis version (`package.json`) and confirm the correct CSS import path. For Lenis ≥ 1.0 use `import 'lenis/lenis.css'`.

### WR-006 (warning)
**File:** `portfolio/src/pages/index.astro`
**Issue:** The `<Layout>` component is used without a `title` prop, so the page title falls back to the default `'Kenny Raymond - Product Designer'`. This is functionally fine but it means the home page title is not explicitly declared, making future title changes fragile.
**Fix:** Pass an explicit `title="Kenny Raymond - Product Designer"` prop to the Layout on the index page to match the explicit pattern used on all other pages.

### WR-007 (warning)
**File:** `portfolio/src/pages/index.astro`
**Issue:** Asset file paths contain spaces and special characters in the `src` attribute (e.g., `/LinkedIn Logo Icon (1).png`, `/Email Logo Icon (1).png`, `/SoundCloud Logo Icon (1).png`). Spaces in file paths must be percent-encoded as `%20` in HTML `src` attributes to be spec-compliant; parentheses should also be encoded. While browsers are lenient, some CDN configurations or build tooling may fail to serve these paths.
**Fix:** Rename all public assets to use kebab-case without spaces or parentheses (e.g., `linkedin-logo.png`, `email-logo.png`, `soundcloud-logo.png`) and update all references.

### WR-008 (warning)
**File:** `portfolio/src/components/WorkCards.astro`
**Issue:** All three project cards are `<a>` elements wrapping `<img>` elements with no visible text label (only an `alt` attribute on the image). The card links have no `aria-label`, so screen readers announce the image alt text as the link purpose. This is acceptable but imprecise — "LinkedIn Video project" as a link label does not convey the action (navigate to case study).
**Fix:** Add a descriptive `aria-label` to each `<a>` element, e.g., `aria-label="View LinkedIn Video case study"`.

---

## Info

### IN-001 (info)
**File:** `portfolio/src/pages/project/linkedin-video.astro`, `linkedin-reactions.astro`, `nearby-friends.astro`
**Issue:** All three project pages are placeholder stubs showing only "Coming soon" text. They are not yet implemented against the mocks. This is expected for the current phase but should be tracked for the next build phase.
**Fix:** Implement full case study content per the Mocks/ files and CLAUDE.md project page specs in a subsequent phase.

### IN-002 (info)
**File:** `portfolio/src/pages/index.astro`
**Issue:** The "About" section on the home page uses an `<h2>` tag. The page already has an `<h1>` (Kenny Raymond) and a second `<h2>` (Product Designer). A third `<h2>` for "About" is semantically valid but the heading hierarchy skips any `<h2>` sub-sections within the hero. Consider whether the "Work" heading (also `<h2>`) and "About" heading should be `<h2>` or a different level given the page structure.
**Fix:** Audit heading levels across the full page to ensure a logical outline: one `<h1>`, then `<h2>` for major sections only.

### IN-003 (info)
**File:** `portfolio/src/layouts/Layout.astro`
**Issue:** No `<meta name="description">` tag is present in the `<head>`. This omission does not break anything but will result in poor SEO and blank social previews.
**Fix:** Add a default `description` prop to the Layout and render it as `<meta name="description" content={description} />`.

### IN-004 (info)
**File:** `portfolio/src/components/WorkCards.astro`
**Issue:** The frontmatter fence opens with `---` followed immediately by a comment (`// Shared work project cards...`). In Astro, frontmatter is JavaScript/TypeScript; `//` comments are valid JS but this is an unusual style. The comment would be more consistent and readable as a JSDoc-style block comment `/* ... */` or placed outside the frontmatter as an HTML comment in the template.
**Fix:** Move the component description comment into the template as `<!-- Shared work project cards... -->` or use `/* ... */` style inside the frontmatter fence.
