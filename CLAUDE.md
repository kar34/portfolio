# Kenny Raymond Portfolio — Rebuild

## Project Goal
Build a pixel-perfect replica of kenny-raymond.com as a clean, static Astro + Tailwind CSS site. The goal is an exact replica — same look, same feel, same content, same layout. Not just "visually similar" — it should be indistinguishable when viewed side by side with the original. The underlying code does not need to match Webflow's output, but the rendered result must be identical. Animations are deferred — do not implement scroll animations, hover transitions, or entrance effects in the initial build.

## Ask Before Assuming
If you are ever unsure about a styling detail, spacing value, color, layout behavior, font size, or anything else visual — ask. Do not guess or invent. The user can open Webflow at any time to provide exact values, missing assets, or additional context. When in doubt, stop and ask.

## First Step
Before doing anything else: WebFetch all 6 URLs below and read all Mocks/ images to understand the full site structure and visual design. Do not start writing code until you have done this.

## Live Site Reference URLs
Scrape these to get all copy, structure, and content:
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
├── Assets/       ← all images, icons, GIFs used in the site
├── Mocks/        ← full-page desktop + mobile screenshots of every page
├── CLAUDE.md     ← this file
└── portfolio/    ← Astro project goes here
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
- `b&w ken big.png` — large black and white portrait (used on About page)
- `b&w ken sm.png` — smaller black and white portrait (used on Home or secondary)
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

## Mocks Inventory (`Mocks/`)
Read these before writing any code. They are the source of truth for layout, spacing, and visual design.

| File | Page |
|---|---|
| `HomeDesktop.jpeg` | Home page — desktop |
| `HomeMobile.jpeg` | Home page — mobile |
| `AboutDesktop.jpeg` | About page — desktop |
| `AboutMobile.jpeg` | About page — mobile |
| `LinkedInVideoProjectPageDesktop.jpeg` | LinkedIn Video case study — desktop |
| `LinkedInVideoProjectPageMobile.jpeg` | LinkedIn Video case study — mobile |
| `ReactionsProjectPageDesktop.jpeg` | Reactions case study — desktop |
| `ReactionsProjectPageMobile.jpeg` | Reactions case study — mobile |
| `NearbyFriendsProjectPageDesktop.jpeg` | Nearby Friends case study — desktop |
| `NearbyFriendsProjectPageMobile.jpeg` | Nearby Friends case study — mobile |

## Design System (inferred from live site)
- **Color palette:** Black and white only — monochromatic
- **Font:** Poppins, weights 400 / 500 / 600
- **Style:** Minimalist, high whitespace, no decorative elements
- **Images:** All photography is black and white
- **Nav:** Logo (name) left, links (Work, About) right — collapses to hamburger on mobile
- **Footer:** Name repeated, three social links with arrow icons (LinkedIn, Email, SoundCloud)

## Pages to Build
1. **Home** — hero with name/title/location, brief bio, project grid (3 cards)
2. **Work** — project grid (same 3 cards, may be same as Home or separate page)
3. **About** — portrait image, bio copy, social links
4. **Project: LinkedIn Video** — hero, overview, impact, GIF, mockups
5. **Project: LinkedIn Reactions** — hero, overview, impact, GIF, before/after
6. **Project: Nearby Friends** — hero, overview, problems (3 listed), design improvements, impact

## Contacts / Footer Links
- LinkedIn: linked in footer
- Email: kennyraymond20@gmail.com
- SoundCloud: username dj-m3lodic

## Build Approach
- Use GSD for phase planning — keep phases small and executable
- Build and verify one page at a time against the Mocks/
- Mobile-first responsive — check HomeMobile.jpeg and other mobile mocks
- Use Astro's file-based routing — one .astro file per page, one layout component
- Copy assets from Assets/ into the Astro project's public/ folder

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
- Do not invent design decisions not visible in the Mocks or live site
- Do not add features beyond what exists on the current site
- Do not upgrade or modify the existing site on Webflow
