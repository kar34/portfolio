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
- No animations in the initial build (Lenis smooth scroll is fine, but no scroll-triggered animations or hover transitions)
- Use Astro's file-based routing — one .astro file per page, one layout component
- Copy assets from Assets/ into the Astro project's public/ folder

## What NOT to Do
- Do not invent design decisions not visible in the Mocks or live site
- Do not add features beyond what exists on the current site
- Do not implement CSS animations or transitions yet
- Do not upgrade or modify the existing site on Webflow
