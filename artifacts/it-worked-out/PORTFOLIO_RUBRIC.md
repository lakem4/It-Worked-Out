# Portfolio Project — Sprint 2 Rubric Notes

This file documents how each rubric criterion is satisfied in the deployed
site, plus the Google Analytics campaign URLs for the GA criterion.

> **Site URL (production):** `https://lakemauer.com/`
> Deployed via **Azure Static Web Apps** (workflow: `azure-static-web-apps-calm-sand-03052540f.yml`) on a custom domain.

---

## 1. Cookie popup

- **Component:** `src/components/cookie-consent.tsx`
- Mounted globally in `src/App.tsx` so it appears on every route.
- Uses `localStorage` key `iwo_cookie_consent_v1` to remember acceptance.
- Contains a working link to `/cookies`.
- "Accept" (and "Dismiss") closes the popup.

## 2. Cookie policy

- **Page:** `src/pages/cookies.tsx` → `/cookies`
- Linked from the global footer **and** from the cookie popup.
- Describes the only cookies/local storage actually in use:
  - `iwo_cookie_consent_v1` (local storage, strictly necessary)
  - Google Analytics 4 cookies (`_ga`, `_ga_<id>`)

## 3. Privacy policy

- **Page:** `src/pages/privacy.tsx` → `/privacy`
- Linked from the global footer.
- Plain-language description of what is and isn't collected, and how to
  delete entries.

## 4. Terms & conditions policy

- **Page:** `src/pages/terms.tsx` → `/terms`
- Linked from the global footer.

## 5. Favicon

- **File:** `public/favicon.svg`
- Wired in `index.html` via `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`
- A solid orange rounded square with a white checkmark — readable at 16px and
  reinforces the "it worked out" theme.

## 6. Social media `<meta>` tags

- All in `index.html`:
  - Open Graph (`og:title`, `og:description`, `og:image`, `og:url`,
    `og:type`, `og:image:width/height/alt`, `og:site_name`)
  - Twitter Cards (`twitter:card=summary_large_image`, `twitter:title`,
    `twitter:description`, `twitter:image`, `twitter:image:alt`)
- Image served from `/opengraph.jpg` (already in `public/`, 1200×630).
- Test with the LinkedIn Post Inspector or the [Open Graph debugger](https://www.opengraph.xyz/).

## 7. Google Analytics campaign

GA4 is already loaded via `gtag.js` in `index.html`
(measurement ID `G-Q158Y15D96`).

A "campaign URL" is just your normal site URL with `utm_*` query parameters
on the end. When someone clicks it, GA4 records *where* they came from. Use
a different URL per place you share the link.

### Campaign URLs to use

**LinkedIn share:**
```
https://lakemauer.com/?utm_source=linkedin&utm_medium=social&utm_campaign=portfolio_sprint2
```

**Class submission (Canvas / instructor):**
```
https://lakemauer.com/?utm_source=canvas&utm_medium=referral&utm_campaign=portfolio_sprint2
```

**Resume / direct share:**
```
https://lakemauer.com/?utm_source=resume&utm_medium=link&utm_campaign=portfolio_sprint2
```

To verify a URL is well-formed, paste it into Google's
[Campaign URL Builder](https://ga-dev-tools.google/campaign-url-builder/) —
it'll round-trip the same value back out.

To verify it's actually firing in GA, open the campaign URL in an incognito
window, then check **Realtime → Traffic acquisition** in your GA4 property
within ~30 seconds.

## 8. Website content & validation

- **Page:** `src/pages/about.tsx` → `/about`
  - Image: gradient avatar with "LM" initials (decorative, `aria-hidden`)
  - Blurb about Lake Mauer, education, current role, and the project itself
  - Working link to PDF resume → `/Lake-Mauer-Resume.pdf`
    (file lives at `public/Lake-Mauer-Resume.pdf`)
  - Working link to LinkedIn → `https://www.linkedin.com/in/lake-mauer/`
  - Working link to GitHub → `https://github.com/lakem4`
  - Working email link → `lakemauer@gmail.com`

### Validation steps (run before submitting)

For each policy page (`/privacy`, `/cookies`, `/terms`) and the home page,
run:

1. **HTML5:** https://validator.w3.org/nu/?doc=<page-url>
2. **CSS3:** https://jigsaw.w3.org/css-validator/validator?uri=<page-url>&profile=css3svg
3. **WCAG 2.1 AA:** https://wave.webaim.org/report#/<page-url>

Take a screenshot of each clean validation report and add to your
submission. The pages were built with semantic HTML (`<main>`, `<header>`,
`<footer>`, `<nav>`, `<article>`), proper heading order (single `<h1>` per
page → `<h2>` → `<h3>`), `aria-label` on the cookie dialog, `aria-hidden`
on decorative icons, and Tailwind's accessible color tokens — they should
pass cleanly.
