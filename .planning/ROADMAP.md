# Kenny Raymond Portfolio — Roadmap

## Milestone 1: Full Site Build

### Phase 1: Project Setup & Global Styles
**Goal:** Initialize the Astro project with all tooling, base layout, global styles, and assets in place — a blank but correctly structured foundation ready for page development.

**Requirements:** REQ-001, REQ-002, REQ-003, REQ-004, REQ-005, REQ-006, REQ-007

**Plans:** 2/2 plans complete

Plans:
- [x] 01-01-PLAN.md — Initialize Astro project, install dependencies, copy assets, configure Tailwind and global styles
- [x] 01-02-PLAN.md — Create base Layout.astro with nav, footer, Lenis smooth scroll, and placeholder index page

**Deliverables:**
- Astro project created in `portfolio/` with Tailwind CSS and Lenis installed
- `portfolio/public/` populated with all assets from `Assets/`
- Base layout (`src/layouts/Layout.astro`) with nav and footer
- Global CSS: black background (#000), white text (#fff), Poppins font, hidden scrollbar
- Favicon configured
- Dev server runs without errors (`npm run dev`)

---

### Phase 2: Home Page
**Goal:** Implement the home page pixel-perfectly matching HomeDesktop.jpeg and HomeMobile.jpeg — hero section, About snippet, and WORK section with 3 project cards.

**Requirements:** REQ-008, REQ-009, REQ-010, REQ-016, REQ-017

**Plans:** 2 plans

Plans:
- [ ] 02-01-PLAN.md — Hero section (name, portrait, email, social icons, title, location) and About section (heading + bio snippet)
- [ ] 02-02-PLAN.md — WORK section with 3 project cards (LinkedIn Video, Reactions, Nearby Friends) + visual verification checkpoint

**Deliverables:**
- `src/pages/index.astro` complete
- Hero: "KENNY RAYMOND", portrait (b&w circular), email link, social icons, "PRODUCT DESIGNER", "Based in Los Angeles"
- About section: "ABOUT" heading + bio snippet
- WORK section: "WORK" heading + 3 project cards linking to project pages
- Matches desktop and mobile mocks

---

### Phase 3: Work Page
**Goal:** Implement the /work page with the 3 project cards — same grid as the home page WORK section.

**Requirements:** REQ-011, REQ-016, REQ-017

**Deliverables:**
- `src/pages/work.astro` complete
- 3 project cards (LinkedIn Video, Reactions, Nearby Friends) linking to their pages
- Matches desktop and mobile mocks

---

### Phase 4: About Page
**Goal:** Implement the /about page matching AboutDesktop.jpeg and AboutMobile.jpeg — portrait, heading, and full bio.

**Requirements:** REQ-012, REQ-016, REQ-017

**Deliverables:**
- `src/pages/about.astro` complete
- Circular b&w portrait (b&w ken sm.png)
- "About Me" heading
- Full 5-paragraph bio text
- Matches desktop and mobile mocks

---

### Phase 5: LinkedIn Video Project Page
**Goal:** Implement the /project/linkedin-video page matching LinkedInVideoProjectPageDesktop.jpeg and LinkedInVideoProjectPageMobile.jpeg.

**Requirements:** REQ-013, REQ-016, REQ-017

**Deliverables:**
- `src/pages/project/linkedin-video.astro` complete
- Title, hero image (Videohero.png), Overview section, tabcompressed.gif, Impact section, two mockup images (video mock left.png, video mock right.png), "← More Projects" link

---

### Phase 6: LinkedIn Reactions Project Page
**Goal:** Implement the /project/linkedin-reactions page matching ReactionsProjectPageDesktop.jpeg and ReactionsProjectPageMobile.jpeg.

**Requirements:** REQ-014, REQ-016, REQ-017

**Deliverables:**
- `src/pages/project/linkedin-reactions.astro` complete
- Title, hero image (Reactionshero.png), Overview section, before/after image, reactionMotion.gif (if applicable), Impact section, phone mockup, "← More Projects" link

---

### Phase 7: Nearby Friends Project Page
**Goal:** Implement the /project/nearby-friends page matching NearbyFriendsProjectPageDesktop.jpeg and NearbyFriendsProjectPageMobile.jpeg.

**Requirements:** REQ-015, REQ-016, REQ-017

**Deliverables:**
- `src/pages/project/nearby-friends.astro` complete
- Title, hero (NBFhero.png), Overview, 3 Problems, Design Improvements, Impact, bottom image (nbfbottom.png), "← More Projects" link

---

### Phase 8: Responsive Polish & Vercel Deploy
**Goal:** Final QA pass — verify all pages match mobile mocks, no layout regressions, then deploy to Vercel.

**Requirements:** REQ-016, REQ-017, REQ-018, REQ-019

**Deliverables:**
- All pages verified against desktop and mobile mocks
- No animations or transitions present
- `vercel.json` or deploy config ready
- Site deployed to Vercel and accessible via URL
