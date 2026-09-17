# Spec: Personal website redesign (timgrob.ch)

## Problem Statement

Tim's current site at www.timgrob.ch is a WordPress single-pager built around a generic "Data Scientist & Software Engineer" identity, subjective skill-percentage bars, and a plain contact form. It doesn't reflect who Tim actually is — a quantitative developer/researcher with a PhD and a decade-plus of quant trading/research roles — and it has no way to showcase his PhD research or his Arduino hardware projects. It also exposes personal contact details (home address, phone number) that shouldn't be public, and gives no visibility into the more personal, "nerdy" side of Tim (GitHub side-projects, hobbies) that would make the site memorable rather than generic.

## Solution

Rebuild the site from scratch as a Next.js app deployed on Vercel, replacing the WordPress site at the same domain (www.timgrob.ch). A dark-mode, terminal/hacker-aesthetic, multi-page site with a persistent nav bar across Home, Experience, Research, Projects, Code, and Contact. Content is grounded in Tim's actual CV and public work rather than generic placeholders, and no personal contact details (address, phone, email) are ever displayed — a contact form relays inquiries privately instead.

## User Stories

1. As a recruiter, I want to see Tim's current professional identity ("Quantitative developer and researcher") immediately on the homepage, so that I can quickly assess fit for a quant role.
2. As a recruiter, I want to download Tim's CV as a PDF, so that I can share it internally or attach it to an application record.
3. As a recruiter, I want to see Tim's career history in chronological order with company, role, dates, and key achievements, so that I can evaluate his experience without opening the PDF.
4. As a recruiter, I want to read about Tim's PhD research topic, so that I can gauge the depth of his technical/academic background.
5. As a recruiter, I want links to Tim's three published papers, so that I can verify his research claims independently.
6. As a hiring manager, I want to see Tim's technical skills list, so that I can match him against role requirements.
7. As a general visitor, I want to watch videos of Tim's Arduino projects, so that I can see his hands-on engineering skill beyond his day job.
8. As a general visitor, I want to browse Tim's GitHub side-projects (like his crypto trading bot), so that I can see the kind of code he writes for fun.
9. As a general visitor, I want to read a short blurb about Tim's personal interests, so that I get a sense of him as a person, not just a resume.
10. As any visitor, I want to contact Tim through a form, so that I can reach out without needing to find his email address elsewhere.
11. As Tim, I want my home address, phone number, and personal email hidden from the public site, so that I don't expose personal contact details to the open web.
12. As Tim, I want form submissions relayed to my inbox privately, so that I can respond to inquiries without publishing my email address anywhere on the site.
13. As any visitor, I want a persistent navigation bar, so that I can jump directly to Experience, Research, Projects, Code, or Contact from any page.
14. As any visitor, I want the site to have a distinct dark, terminal/hacker-inspired visual style, so that it feels memorable and reflects Tim's technical personality rather than looking like a generic template.
15. As a mobile visitor, I want the site to be fully usable on a phone screen, so that I can review Tim's background while on the go.
16. As any visitor, I want links to Tim's LinkedIn, GitHub, and YouTube, so that I can follow up on other platforms.
17. As Tim, I do not want a link to my Facebook, so that visitors aren't directed to my personal/non-professional social presence.
18. As a recruiter evaluating quant roles, I want the CV content to reflect the general "Quant" framing rather than a role-tailored variant (e.g. "Quant Analyst"), so that the public site presents one coherent identity rather than looking narrowly targeted.
19. As any visitor, I want each Arduino project entry to clearly link to or embed its demo video, so that I don't have to go searching YouTube myself to find it.
20. As any visitor, I want the Code section to be clearly distinguished from the Projects section, so that I understand which is hobby hardware and which is side-project software.
21. As Tim, I want the site to replace the current WordPress site at www.timgrob.ch entirely, so that visitors no longer see the outdated design and content.
22. As Tim, I want the "Interests" blurb to avoid repeating content already covered in "Experience," so that the site doesn't say the same thing twice (e.g. crypto trading shown once, under Experience, not again under Interests).
23. As a developer maintaining this site later, I want Experience/Research/Projects/Code content represented as structured content data rather than hardcoded markup, so that updating content doesn't require touching page layout code.
24. As a developer testing this site, I want page-level tests asserting that no personal contact info ever appears in rendered output, so that a future content edit can't accidentally reintroduce a home address, phone number, or personal email.
25. As any visitor, I want each of the four Arduino projects (self-balancing robot, LCD display, DC motor, 7-segment display) to have its own distinct entry, so that the Projects section doesn't lump them into one generic gallery.
26. As a visitor on the homepage, I want to see a terminal-style animation type out an introduction, so that the "nerdy" aesthetic is reinforced the moment the page loads.
27. As a visitor on the homepage, I want to type `whoami` into that terminal and get a fun, real answer, so that the terminal feels like a genuine easter egg rather than just decoration.

## Implementation Decisions

- **Framework & hosting**: Next.js (App Router), deployed to Vercel, replacing the existing WordPress site at www.timgrob.ch.
- **Aesthetic**: dark-mode-first terminal/hacker visual language (monospace-leaning type, restrained motion/glow rather than gimmicks), applied consistently across all pages.
- **Navigation**: routed pages (not a single scrolling page) with a persistent nav bar: Home, Experience, Research, Projects, Code, Contact.
- **Content modeling**: Experience, Research, Projects, and Code entries are represented as structured content data consumed by page components, kept separate from presentation/layout.
- **Experience**: web-native narrative synthesized from Tim's general "Quant" CV (not the role-tailored "Quant Analyst"/"Quant Developer"/"Quant Researcher" variants). A single downloadable CV PDF is offered, matching the on-site narrative. No home address, phone number, or personal email is displayed anywhere on the site.
- **Homepage terminal**: primarily decorative — a terminal-style widget that auto-types an introduction on load — but with light interactivity layered on top, not a full CLI. It accepts a small, fixed set of commands (at minimum `whoami`, returning a short, fun identity blurb; `help`, listing the available commands) rather than simulating a real shell or mapping to site navigation (`cd`/`ls` into real pages is explicitly out of scope — see below). Lives only on the Home page, alongside the real persistent nav, not as a replacement for it or a global overlay.
- **Research**: a dedicated page for Tim's PhD topic (Numerical Particle Trajectory Simulation, University of Oxford, 2012–2016), written for a smart general reader, linking out to his three peer-reviewed papers by DOI:
  - `https://doi.org/10.1016/j.jmmm.2017.12.007`
  - `https://doi.org/10.1016/j.jmmm.2015.02.031`
  - `https://doi.org/10.1016/j.jmmm.2016.01.043`
- **Projects**: four Arduino/Raspberry Pi builds (self-balancing robot, LCD display, DC motor, 7-segment display), each with a linked or embedded YouTube video. Exact per-project video URLs to be sourced during implementation; fall back to the channel link (`https://www.youtube.com/channel/UCgKaxbCao2Gb5t3_vq-FNrw`) where a specific video URL isn't available.
- **Code**: a separate, lightweight section listing GitHub side-projects not covered by Experience or Projects (e.g. the Freqtrade-based crypto trading bot, the sudoku solvers), linking to `github.com/timgrob`.
- **Interests**: a short personal blurb on the Home/About page — competitive middle-distance running (Swiss Championships, 800m/1500m), tennis, climbing. Deliberately excludes "volatility-based crypto trading" (present on Tim's CV under Interests) since that's already represented under Experience and would duplicate it.
- **Contact**: a contact form (not a displayed email or mailto link) that relays submissions to Tim privately via a backend relay service (exact provider, e.g. Formspree or Resend, to be chosen during implementation). No personal email address is ever rendered in page HTML or the client bundle.
- **Footer/social links**: LinkedIn, GitHub, YouTube. The Facebook link is dropped.
- **Legacy content**: the WordPress site's percentage-based skill bars are not carried over.
- **Domain vocabulary**: this spec uses "Experience," "Research Topic," "Projects," "Code," "CV," and "Interests" exactly as defined in the repo's `CONTEXT.md`. Do not substitute synonyms (e.g. "resume," "portfolio," "side projects") when implementing.

## Testing Decisions

- **Seam**: page-level rendering tests using React Testing Library (or Next.js's supported test setup) — render each route's page component and assert on the rendered output. One seam, one technique, for both content-correctness and behavioral (contact form) testing.
- **What's tested**:
  1. Content correctness — each page renders the expected content (Experience entries, the Research topic plus all three DOI links, all four Projects with their video links, Code entries with GitHub links) given its content data.
  2. Absence of personal info — no test run should ever find a home address, phone number, or personal email string anywhere in rendered output, across all pages.
  3. Contact form behavior — filling and submitting the form triggers the outbound relay call with the correct payload, with the network call mocked at the `fetch` boundary; invalid input is rejected client-side without a network call firing.
  4. Homepage terminal behavior — typing `whoami` and submitting produces the expected response text; typing an unrecognized command doesn't crash the widget or the page.
- **What's NOT tested**: the actual behavior of the third-party relay service (Formspree/Resend/etc.) — mocked at the boundary, not exercised for real. Pixel-level/visual appearance of the terminal aesthetic, and the exact timing/animation of the auto-typing intro, are not asserted on by these tests.
- **Prior art**: none — this repo is greenfield. This is the first test suite and establishes the pattern (render + assert via RTL, network calls mocked) that later pages should follow.

## Out of Scope

- A blog/writing section.
- A CMS or admin UI for editing content — content is code-managed, not user-editable through a UI.
- Multi-language/i18n support.
- Analytics or SEO work beyond what Next.js provides by default.
- Choosing the specific contact-form relay provider (Formspree vs. Resend vs. other) — deferred to implementation.
- Sourcing/confirming the exact YouTube video URL per Arduino project — deferred to implementation, with the channel link as fallback.
- DNS/domain cutover from the current WordPress hosting to Vercel — an infrastructure/ops task, out of scope for this spec.
- Any use of the other three tailored CV PDF variants (Quant Analyst, Quant Developer, Quant Researcher) — irrelevant here; this spec only uses the general "Quant" variant.
- Using the homepage terminal as a real navigation mechanism (e.g. `cd research`, `ls projects` moving between pages) — it's a fun, mostly-decorative easter egg with a couple of commands, not an alternate site interface.
- A global command-palette-style terminal accessible from every page — this stays a Home-page-only feature.

## Further Notes

- Source CV lives at `~/Documents/private/cv/Tim_Grob_CV_Quant.pdf`, outside this repo — whoever implements Experience will need this content transcribed into the site's content data.
- `CONTEXT.md` at the repo root holds the canonical glossary for this project; consult it before naming anything.
- **Status**: this spec has not been published to GitHub Issues — `gh` was not installed/authenticated on this machine at the time it was written. Once `gh` is set up, publish this as an issue with the `ready-for-agent` label per `docs/agents/issue-tracker.md`, then it can be superseded/removed from here (or kept as the source, at your preference) before running `/to-tickets`.
