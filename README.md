# Asmaa Ahmed Salah — AI & Data Science Portfolio

## Visit the portfolio

**[Open the live portfolio →](https://123asmaa123ahmed220-sketch.github.io/asmaa-portfolio/)**

Explore Asmaa's background, education, training, technical skills, and data projects, or find her contact details. The portfolio runs in your browser — no downloads or setup needed.

| Featured project | What it covers |
| --- | --- |
| Amazon Sales Data Analysis | Sales insights using Excel, Pivot Tables, and dashboards |
| Hotel Booking Analysis | Booking patterns and metrics using Power BI and Python |
| Online Course Platform Database | Database design, relational modeling, and SQL |

Looking for the code? Continue to the [developer documentation](#developer-documentation) below.

---

## Developer documentation

This repository contains the website for the portfolio, including its page content, styles, interactions, and branding assets. The datasets, notebooks, Power BI files, and SQL implementations of the featured projects are not included here.

**Production site:** [Asmaa's portfolio on GitHub Pages](https://123asmaa123ahmed220-sketch.github.io/asmaa-portfolio/)

**Repository:** [asmaa-portfolio](https://github.com/123asmaa123ahmed220-sketch/asmaa-portfolio)

The documentation below describes the current source tree. Local changes appear on the live site only after they are committed, pushed to the configured publishing source, and successfully deployed.

### Technology stack

| Technology | Role |
| --- | --- |
| HTML5 | Single-page content, forms, metadata, and Person JSON-LD |
| CSS3 | Design tokens, Grid/Flexbox layouts, responsive styling, and animations |
| Vanilla JavaScript | Navigation, project dialogs, scroll effects, and contact handling |
| Canvas 2D | Interactive particle background in the hero section |
| Web3Forms | External contact form endpoint; no application backend in this repository |
| Google Fonts | Plus Jakarta Sans and JetBrains Mono, with system font fallbacks |
| GitHub Pages | Static website hosting |

There is no framework, package manager configuration, bundler, database, or custom build step. Node.js is optional for syntax checks; Python is only one way to serve the files locally. Neither is needed by the deployed site.

### Current status

| Area | Current implementation | Remaining work |
| --- | --- | --- |
| Content | Hero, workflow, about/education, DEPI experience, skills, projects, courses, and contact | Keep profile and training details current |
| Branding | Transparent AA logo in header/footer; multi-size ICO favicon | Check appearance at small sizes after asset changes |
| Projects | Three cards and shared detail dialog | Replace screenshot placeholders and profile-level GitHub links |
| Contact form | Web3Forms integration, validation, sending state, error feedback, and basic honeypot | Confirm actual inbox delivery with an end-to-end submission |
| Navigation and motion | Mobile menu, active section highlighting, scroll reveal, and interactive canvas | Verify layouts across screen sizes and improve keyboard handling |
| Search and sharing | Title, description, Person structured data, canonical URL, and Open Graph/Twitter image metadata | Verify previews on sharing platforms after deployment |
| Verification | No committed automated test suite or custom build pipeline | Add focused checks for important interactions |

The canvas respects reduced-motion preferences and pauses when the hero is off-screen. Dialogs support Escape and restore focus to the trigger, but focus containment and hidden-state accessibility still need work.

### Current structure

```text
asmaa-portfolio/
├── index.html                 # Content, metadata, project dialog, and contact form
├── README.md
├── css/
│   ├── style.css              # Imports the other stylesheets
│   ├── tokens.css             # Shared colors, typography, spacing, and sizes
│   ├── base.css               # Reset, backgrounds, layout, and reduced motion
│   ├── components.css         # Navigation, cards, dialog, form, and notifications
│   └── responsive.css         # Tablet and mobile adjustments
├── js/
│   ├── hero-canvas.js         # Canvas rendering and animation lifecycle
│   └── main.js                # Project data, navigation, dialogs, and contact logic
└── assets/
    ├── images/
    │   ├── logo.png           # Transparent header/footer logo
    │   └── social-preview.png # Alternative 1200 × 630 sharing card
    └── icons/
        ├── favicon.ico        # 16, 32, 48, 64, 128, and 256 px frames
        └── favicon.png        # 256 px PNG companion
```

`index.html` loads `css/style.css`, which imports the four styling layers. The two JavaScript files run directly in the browser. Project card content lives in HTML, while the dialog content lives in the `projectCaseStudies` object in `js/main.js`; both need to stay consistent.

### Run locally

From the repository root, with Python 3 installed:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

On Windows, you can use `py` instead of `python` if the Python launcher is installed. Open [localhost:8000](http://localhost:8000) and stop the server with `Ctrl+C`. Any equivalent static HTTP server also works.

Internet access is needed for Google Fonts and actual contact submissions. There are no dependencies to install for the website itself.

### Contact form configuration

The form's `action`, public `access_key`, subject, and sender display name are configured in `index.html`. The handler in `js/main.js` sends JSON to `https://api.web3forms.com/submit`.

1. Trim input, run browser validation, and check the hidden honeypot.
2. Disable the submit button and make the fields read-only while sending.
3. Clear the form only after an HTTP success response with `success: true`.
4. Preserve entered text on failure and restore the controls.
5. Stop waiting after 20 seconds and explain that submission may still have occurred.

Progress and results are announced through an inline live status region. API acceptance does not confirm inbox delivery; an actual receiving-inbox check is still pending.

**Recipient:** the intended receiving address is `123asmaa123ahmed22.0@gmail.com`. The email associated with the Web3Forms access key determines where messages go. Confirm that the configured key is associated with this address.

**Changing the recipient:** create and verify an access key for the new email, replace the form's `access_key` in `index.html`, and update the fallback address in the error message in `js/main.js`.

**Public contact address:** `123asma123aahmed123@gmail.com` is still used in the visible contact card, `mailto:` link, Person structured data, and copy-email helper. Those are separate from the form recipient and should be updated together if the public contact address changes.

The access key is designed for browser-side use and is not a secret email password. See the [Web3Forms FAQ](https://docs.web3forms.com/getting-started/faq) and [setup documentation](https://docs.web3forms.com/getting-started/installation).

### Maintenance guide

| Change | Files or locations |
| --- | --- |
| Profile, training, education, skills, and public links | `index.html` |
| Project descriptions and links | Project cards in `index.html` and `projectCaseStudies` in `js/main.js` |
| Project screenshots | Add assets, then replace card and dialog placeholders |
| Colors, typography, and shared values | `css/tokens.css` |
| Layout and responsive behavior | `css/components.css` and `css/responsive.css` |
| Logo | `assets/images/logo.png` |
| Favicon | `assets/icons/favicon.ico` and its PNG companion |
| Social preview | `assets/images/logo.png` and sharing metadata in `index.html`; `social-preview.png` is an available alternative |

After replacing branding assets, increment their URL query versions in `index.html` so browsers request the new files. Preserve relative asset paths so the site continues to work under the `/asmaa-portfolio/` GitHub Pages path.

### Publishing updates

The portfolio is hosted at **[the live GitHub Pages site](https://123asmaa123ahmed220-sketch.github.io/asmaa-portfolio/)**.

Commit and push the intended changes to the repository's configured Pages publishing source, then check the deployment result on GitHub. Confirm the publishing branch/folder or workflow under **Settings → Pages** rather than assuming the current local branch is the deployment source. Once deployment succeeds, check the live URL for the updated content and assets.

See [GitHub's publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) for configuration details.

### Social sharing previews

The page includes Open Graph and Twitter card metadata with absolute HTTPS URLs to the production page and the 500 × 500 AA logo. The square image and short description are intended for compact link previews; each sharing platform controls the final layout. Twitter uses the `summary` card. An alternative 1200 × 630 design is available in `assets/images/social-preview.png`, but it is not currently referenced by the sharing tags.

After deployment, check that the image URL opens publicly and that the deployed page source contains the new tags, then share the portfolio in a new message. Sharing platforms may retain older previews; local changes alone do not refresh their caches. Actual WhatsApp preview behavior still needs a check after deployment. If replacing the image later, use a new image filename or URL version and update both image tags.

### Validation

Optional syntax checks, with Node.js installed:

```sh
node --check js/main.js
node --check js/hero-canvas.js
```

Before publishing changes, check mobile/tablet/desktop layouts, project dialogs, navigation, branding, keyboard interaction, and reduced-motion behavior. For contact changes, submit an intentional test message and verify the receiving inbox; also test failed requests and confirm the entered message is retained. Syntax checks alone do not verify these behaviors.

### Proposed improvements

These are suggestions for future work, not completed features or a committed schedule.

| Priority | Improvement | Intended benefit |
| --- | --- | --- |
| High | Add real project screenshots, individual repository links, and supported findings | Make the work easier to inspect and evaluate |
| High | Confirm contact delivery and decide whether to align public and receiving emails | Make communication reliable and consistent |
| High | Contain dialog focus and remove closed dialogs/menus from keyboard navigation | Improve keyboard and assistive-technology access |
| High | Make content visible by default when JavaScript is unavailable | Avoid hiding essential content if scripts fail |
| Medium | Test navigation at intermediate widths and course/contact cards on narrow screens | Resolve layout pressure across devices |
| Medium | Move featured projects earlier and reduce repeated introductory copy | Help visitors reach the work faster |
| Medium | Add a downloadable CV when the file is supplied | Give recruiters a convenient offline reference |
| Later | Consolidate project data and move inline styling into CSS | Reduce duplication and simplify maintenance |
| Later | Add focused interaction checks and tune font/canvas performance after measurement | Catch regressions and improve loading/rendering behavior |
