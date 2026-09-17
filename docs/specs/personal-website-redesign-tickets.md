# Tickets: Personal website redesign (timgrob.ch)

Source spec: `docs/specs/personal-website-redesign.md`. Publish these manually as GitHub issues (`gh` isn't set up on this machine yet) — one issue per ticket below, in this order, each labeled `ready-for-agent`. A local git branch already exists per ticket (`ticket/01-site-shell-home` … `ticket/07-homepage-terminal`), all currently pointing at `main`; rebase a ticket's branch onto `main` after its blockers have merged, before starting work on it.

---

## 01: Site shell, dark-mode terminal aesthetic, and Home page

**Branch:** `ticket/01-site-shell-home`

### Parent

`docs/specs/personal-website-redesign.md`

### What to build

The Next.js app itself: routing, a persistent nav bar (Home/Experience/Research/Projects/Code/Contact), and the dark-mode terminal-style design system (typography, color, base components) that every later page reuses. Also a real Home page: headline identity ("Quantitative developer and researcher"), a short Interests blurb (competitive running, tennis, climbing — not crypto trading, which belongs on Experience), and a footer linking LinkedIn, GitHub, and YouTube (no Facebook). Establishes the page-level React Testing Library rendering pattern that every later ticket follows.

### Acceptance criteria

- [ ] Visiting `/` renders the Home page with the correct headline identity and Interests blurb
- [ ] A persistent nav bar links to all six sections (Home/Experience/Research/Projects/Code/Contact), even where those routes are still stubs
- [ ] Footer links to LinkedIn, GitHub, and YouTube; no Facebook link exists anywhere
- [ ] The dark-mode terminal aesthetic (typography, color, base components) is established in a way later pages can reuse without redefining it
- [ ] A page-render test (RTL) exists for the Home page and passes

### Blocked by

None (can start immediately)

---

## 02: Experience page and downloadable CV

### Parent

`docs/specs/personal-website-redesign.md`

### What to build

**Branch:** `ticket/02-experience-cv`

A real Experience page rendering Tim's career history, synthesized from `Tim_Grob_CV_Quant.pdf` (source lives at `~/Documents/private/cv/`, outside this repo — not the role-tailored "Quant Analyst"/"Quant Developer"/"Quant Researcher" variants), plus a link to download a matching CV PDF. No home address, phone number, or personal email appears anywhere on the page.

### Acceptance criteria

- [ ] Experience page renders career history (company, role, dates, key achievements) matching the general "Quant" CV narrative
- [ ] A downloadable CV PDF is linked and matches the on-site narrative
- [ ] No home address, phone number, or personal email string appears anywhere in the page's rendered output
- [ ] A page-render test (RTL) asserts both the expected content and the absence of personal contact info

### Blocked by

01: Site shell, dark-mode terminal aesthetic, and Home page

---

## 03: Research page

### Parent

`docs/specs/personal-website-redesign.md`

### What to build

**Branch:** `ticket/03-research-page`

A real Research page describing Tim's PhD research topic (Numerical Particle Trajectory Simulation, University of Oxford, 2012–2016 — Monte Carlo simulation of superparamagnetic microspheres), written for a smart general reader, linking out to all three peer-reviewed papers by DOI.

### Acceptance criteria

- [ ] Research page describes the PhD topic in plain-but-technical language
- [ ] All three papers are linked by DOI:
  - `https://doi.org/10.1016/j.jmmm.2017.12.007`
  - `https://doi.org/10.1016/j.jmmm.2015.02.031`
  - `https://doi.org/10.1016/j.jmmm.2016.01.043`
- [ ] A page-render test (RTL) asserts the topic text and all three DOI links are present

### Blocked by

01: Site shell, dark-mode terminal aesthetic, and Home page

---

## 04: Projects page (Arduino builds + videos)

### Parent

`docs/specs/personal-website-redesign.md`

### What to build

**Branch:** `ticket/04-projects-page`

A real Projects page listing all four Arduino/Raspberry Pi builds as distinct entries (self-balancing robot, LCD display, DC motor, 7-segment display), each linking to or embedding its YouTube demo video. Where a specific per-project video URL can't be sourced, fall back to the channel link (`https://www.youtube.com/channel/UCgKaxbCao2Gb5t3_vq-FNrw`).

### Acceptance criteria

- [ ] All four Arduino projects appear as distinct entries, not lumped into one gallery
- [ ] Each entry links to or embeds a YouTube video (specific video URL where sourced, channel link as fallback)
- [ ] A page-render test (RTL) asserts four distinct entries, each with a video link

### Blocked by

01: Site shell, dark-mode terminal aesthetic, and Home page

---

## 05: Code page (GitHub side-projects)

### Parent

`docs/specs/personal-website-redesign.md`

### What to build

**Branch:** `ticket/05-code-page`

A real Code page listing Tim's public GitHub side-projects (e.g. the Freqtrade-based crypto trading bot, the sudoku solvers) that aren't Arduino builds ("Projects") or paid work ("Experience"), linking out to `github.com/timgrob`.

### Acceptance criteria

- [ ] Code page lists GitHub side-projects, clearly distinguished from the Projects page's Arduino content
- [ ] Entries link out to `github.com/timgrob` (per-repo or profile-level, whichever fits the content available)
- [ ] A page-render test (RTL) asserts the listed entries and their GitHub links

### Blocked by

01: Site shell, dark-mode terminal aesthetic, and Home page

---

## 06: Contact page and private relay form

### Parent

`docs/specs/personal-website-redesign.md`

### What to build

**Branch:** `ticket/06-contact-page`

A real Contact page with a working form that relays submissions to Tim privately via a backend relay service (provider chosen during this ticket, e.g. Formspree or Resend). No personal email address is ever rendered in page HTML or the client bundle.

### Acceptance criteria

- [ ] Contact page renders a form (name/email/message or equivalent)
- [ ] Valid submission triggers the correct outbound relay call with the right payload (network call mocked at the `fetch` boundary in tests)
- [ ] Invalid input is rejected client-side without firing a network call
- [ ] No personal email address string appears anywhere in rendered output or the client bundle
- [ ] Page-render/behavior tests (RTL) cover all of the above

### Blocked by

01: Site shell, dark-mode terminal aesthetic, and Home page

---

## 07: Homepage terminal widget

### Parent

`docs/specs/personal-website-redesign.md`

### What to build

**Branch:** `ticket/07-homepage-terminal`

The auto-typing terminal widget on the Home page: it types out an introduction on load, and accepts a small fixed set of commands — at minimum `whoami` (a short, fun identity blurb) and `help` (lists available commands). It is not a full CLI: no site navigation via commands (`cd`/`ls` into real pages), no global command palette — it lives on the Home page only, alongside the real nav.

### Acceptance criteria

- [ ] Terminal widget auto-types an introduction on Home page load
- [ ] Typing `whoami` and submitting produces the expected identity response
- [ ] Typing `help` lists the available commands
- [ ] An unrecognized command doesn't crash the widget or the page
- [ ] A test (RTL) simulates typing `whoami` and asserts the response; simulates an unrecognized command and asserts no crash

### Blocked by

01: Site shell, dark-mode terminal aesthetic, and Home page
