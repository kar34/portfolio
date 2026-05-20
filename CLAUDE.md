# Kenny Raymond Portfolio

## Project Status
The original kenny-raymond.com (built in Webflow) has been fully rebuilt as a static Astro + Tailwind site and migrated over. Webflow is no longer in use and is no longer a reference. From here on, work is incremental — improvements, new content, copy tweaks, and updates to the deployed Astro site. The code in `portfolio/` is the source of truth.

## Ask Before Assuming
If you are unsure about a styling detail, spacing value, color, layout behavior, font size, copy choice, or anything else visual — ask. Do not guess or invent. Kenny can provide exact values, missing assets, or additional context at any time. When in doubt, stop and ask.

## Live Site
- https://www.kenny-raymond.com/
- https://www.kenny-raymond.com/work
- https://www.kenny-raymond.com/about
- https://www.kenny-raymond.com/project/linkedin-video
- https://www.kenny-raymond.com/project/linkedin-reactions
- https://www.kenny-raymond.com/project/nearby-friends

## Stack
- **Framework:** Astro (static output, no SSR needed)
- **Styling:** Tailwind CSS
- **Smooth scroll:** Lenis
- **Font:** Poppins (weights: 400, 500, 600) via Google Fonts
- **Deploy target:** Vercel

## Directory Structure
```
NewPortfolioSite/
├── Assets/       ← source images, icons, GIFs (copied into portfolio/public/ as needed)
├── Mocks/        ← local-only progress screenshots (gitignored, not in the repo)
├── CLAUDE.md     ← this file
└── portfolio/    ← the Astro project — source of truth for the live site
```

## Assets Inventory (`Assets/`)
Use these files exactly — do not rename them.

### Global
- `favicon.png` — site favicon
- `white.png` — white background/placeholder image
- `Footer Social Arrow.png` — arrow icon used on footer social links

### Social / Footer Icons
- `LinkedIn Logo Icon (1).png` — LinkedIn icon
- `Email Logo Icon (1).png` — Email icon
- `SoundCloud Logo Icon (1).png` — SoundCloud icon

### About / Portrait
- `bw-ken-big.png` — large black and white portrait (used on About page; also default OG image)
- `bw-ken-sm.png` — smaller black and white portrait (used on Home portrait + intro)
- `li 100.png` — LinkedIn logo mark (used somewhere in About or nav)

### Work Page — Project Tiles
- `LinkedInVideodesktopTile.png` — LinkedIn Video project card thumbnail (desktop)
- `LinkedInVideomobileTile.png` — LinkedIn Video project card thumbnail (mobile)
- `NBFTile.png` — Nearby Friends project card thumbnail
- `Reactionshero.png` — Reactions project card thumbnail (also used as hero)

### LinkedIn Video Case Study
- `Videohero.png` — hero image
- `tabcompressed.gif` — animated GIF showing tab interface
- `video mock left.png` — product mockup (left)
- `video mock right.png` — product mockup (right)

### LinkedIn Reactions Case Study
- `Reactionshero.png` — hero image
- `reactionMotion.gif` — animated GIF showing interaction
- `reactionsbeforeafter.png` — before/after comparison image
- `Reaction menu 9.png` — reaction menu UI

### Nearby Friends Case Study
- `NBFhero.png` — hero image
- `nbfmocks2.png` — design improvement mockups
- `nbfbottom.png` — bottom section image

## Design System
- **Color palette:** Black and white only — monochromatic
- **Font:** Poppins, weights 400 / 500 / 600
- **Style:** Minimalist, high whitespace, no decorative elements
- **Images:** All photography is black and white
- **Nav:** Logo (name) left, links (Work, About) right — collapses to hamburger on mobile
- **Footer:** Name repeated, three social links with arrow icons (LinkedIn, Email, SoundCloud)

## Pages
1. **Home** — hero with name/title/location, brief bio, project grid (3 cards)
2. **Work** — project grid (same 3 cards as Home)
3. **About** — portrait image, bio copy, social links
4. **Project: LinkedIn Video** — hero, overview, impact, GIF, mockups
5. **Project: LinkedIn Reactions** — hero, overview, impact, GIF, before/after
6. **Project: Nearby Friends** — hero, overview, problems (3 listed), design improvements, impact

## Contacts / Footer Links
- LinkedIn: linked in footer
- Email: kennyraymond20@gmail.com
- SoundCloud: username dj-m3lodic

## Working Approach
- Use GSD for phase planning when changes are non-trivial — keep phases small and executable
- Mobile-first responsive — check both mobile and desktop after every visual change
- Astro file-based routing — one `.astro` file per page, shared layout component
- Copy any new assets from `Assets/` into the Astro project's `public/` folder
- The live deployed site and the code in `portfolio/` are the source of truth — there is no longer a Webflow or Mocks reference

## Local Dev Server
- The dev server runs at **http://localhost:4321**
- After every change, tell the user the exact URL to preview (e.g. `http://localhost:4321/about`)

## Implemented Interactions & Animations

### Hamburger → X Morph (`Layout.astro` + `global.css`)
- SVG lines have `id="line-top"` and `id="line-bottom"`
- CSS uses `transform-box: view-box; transform-origin: 50% 50%` so both lines rotate around the SVG center (14, 6)
- Open state: `#line-top` rotates `45deg translateY(4px)`, `#line-bottom` rotates `-45deg translateY(-4px)`
- SVG needs `overflow: visible` since X arms extend slightly beyond the 12px viewBox height
- JS adds/removes `is-open` class on `#menu-toggle` to trigger the CSS transition
- Transform order must be `rotate(θ) translateY(Δ)` — not `translateY translateY rotate`

### Menu Hover Spotlight (`global.css`)
- Uses CSS `:has(a:hover)` — when any link is hovered, all non-hovered siblings drop to `opacity: 0.15`
- Selector: `#menu-overlay:has(a:hover) a:not(:hover)`

### Parallax Zoom on Project Cards (`WorkCards.astro` + `global.css`)
- Card `<a>` elements have class `parallax-card`; inner `<img>` elements have class `parallax-img`
- `.parallax-img` CSS: `transform-origin: bottom center; will-change: transform`
- Driven by a `requestAnimationFrame` loop (Lenis-compatible — syncs with smooth scroll every frame)
- Scale range: `1.0` (card off-screen bottom) → `1.15` (card center reaches viewport center), then holds
- Math: `progress = clamp(0, 1, (vh - rect.top) / (vh/2 + rect.height/2))`; `scale = 1 + progress * 0.15`
- Both home page and work page use the shared `WorkCards.astro` component — effect applies to both

### Scroll-Driven Hero Exit Animations (`index.astro` + `global.css`)
- Hero section is `sticky top-0 h-screen` inside a `hero-wrapper min-h-[150vh]` container
- Scroll range = wrapper height − hero height (50vh). Progress reaches 1 at sticky release.
- "Kenny Raymond" (`hero-1`) and "Based in Los Angeles" (`hero-location`) exit left via `translateX(-progress * 120vw)`
- "Design Leader" (`hero-3`), desktop social icons (`hero-social`), mobile social icons (`hero-4`) exit right via `translateX(+progress * 120vw)`
- Opacity fades: `Math.max(0, 1 - progress * 1.2)` — hits 0 at ~83% progress
- Portrait (`hero-portrait`) scales from 0.9 → 1.25 (35% increase) during scroll
- `will-change: transform` on all animated elements for GPU compositing
- Hero section has `overflow: hidden` to clip exiting elements
- **Critical:** CSS `animation-fill-mode: both` on fadeUp entrance animations overrides inline styles. Must clear animation via `animationend` event before scroll transforms can take effect.
- `onHeroScroll()` called once at script load to set initial portrait scale (0.9)

### Hero Social Icon Hover Spotlight (`global.css`)
- Uses CSS `:has(a:hover)` — when any social icon is hovered, all other hero content dims to `opacity: 0.5`
- Desktop: targets `.hero-1`, `.hero-location`, `.hero-portrait`, `.hero-3`, and non-hovered social links
- Mobile: targets `.hero-1`, `.hero-2`, `.hero-3`, and non-hovered social links in `.hero-4`
- Uses `!important` on opacity to override inline styles set by the scroll animation script

### Hero Layout — Photo-Centered Grid (`index.astro`)
- Contact row uses `grid grid-cols-[1fr_auto_1fr]` so the portrait is always at exact horizontal center
- Portrait has `col-start-2`; "Based in Los Angeles" right-aligns in column 1; social icons left-align in column 3
- On mobile, hidden flanking elements leave balanced empty 1fr columns — photo stays centered

### About Section Overlap (`index.astro`)
- About section uses `-mt-[35vh]` to pull up into the hero wrapper area, with `bg-black relative z-10`
- `pt-[6vh]` padding prevents the About heading from clipping the photo
- Background color change threshold on work cards set to `0.45` (not `0.15`) to avoid premature color switch
- Cards container uses `mt-[20rem] md:mt-[28rem]` gap below "WORK" heading for proper timing

### Responsive Hero Sizing (`index.astro`)
- All hero content uses viewport-relative `clamp()` values instead of fixed sizes
- Headings: `clamp(2.5rem, 8.5vw, 14rem)`
- "Based in Los Angeles": `clamp(1rem, 2.5vw, 3rem)`
- Portrait: `clamp(120px, 13vw, 280px)` width/height
- Social icons: LinkedIn `clamp(2rem, 3.5vw, 5rem)`, Email/SoundCloud `clamp(2.5rem, 4.5vw, 6rem)`
- Gaps: `2vw` (rows), `2.5vw` (grid), `1.5vw` (icon spacing)

### Footer (`Layout.astro`)
- Centered layout: `flex flex-col items-center text-center`
- Social links have hover effects: `group hover:text-white` with arrow nudge `group-hover:translate-x-0.5 group-hover:-translate-y-0.5`

## What NOT to Do
- Do not invent design decisions inconsistent with the deployed site's established style
- Do not add features beyond what was requested for the current improvement
- Do not reintroduce Webflow as a reference — that platform is no longer used
- Do not add reference mocks or screenshots to the public repo without Kenny's explicit ask

## Local Context (not committed — never publish)
The repo is public on GitHub. The files below live locally for Claude's reference but must never end up in the public repo. They are gitignored. Do not stage them, do not suggest committing them, do not move them to a tracked location, and do not echo their contents into tracked files (e.g., README, blog copy, PR descriptions). If you see a new evaluative or screenshot-style file appear in the working tree, assume local-only and confirm with Kenny before any `git add`.

Local-only files:
- `EVALUATION.md` — hiring-manager evaluation of the live site for a staff product designer candidacy, the changes shipped in response, Kenny's preferences (e.g., do-not-publish items), and intentional design choices that should not be "fixed" (e.g., the AMBIGUITY/building expressive typography on About). Read this before making copy, positioning, or content decisions.
- `Kenny_Raymond_Portfolio_Evaluation.docx` and any other `*.docx` / `*.doc` — the Word version of the same evaluation plus any related private notes. Covered by the `*.docx` / `*.doc` rules in `.gitignore`.
- `Mocks/` (entire folder) — Kenny's personal screenshots of the deployed site for his own progress tracking and reference (e.g., `home.png`, `about.png`, `video_casestudy.png`, `reactions_casestudy.png`, `nbf_casestudy.png`). The original Webflow reference jpegs that used to live here were removed when the rebuild completed and should not be restored to the repo. The whole folder is gitignored.

Rule of thumb: anything in `Mocks/` is local-only. The entire folder is Kenny's private workspace, not a public reference. If Kenny later asks to add new mocks or references, confirm whether they should be tracked before staging.
