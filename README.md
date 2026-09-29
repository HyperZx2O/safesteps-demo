# SafeSteps

A working demonstration of SafeSteps, a proposal for the DKC Digital Respect and
Cohesion Fellowship 2026.

SafeSteps places one trained, trusted person inside a student's own college. Each
pilot college names a **Designated Digital Safety Representative** (DDSR), a
willing teacher or counsellor. Students learn in an in-person workshop what
evidence to keep, and this site gives them a Bangla-first place to read that
guide, build a record, and reach the DDSR privately.

The framing that matters: helplines and apps send people to someone outside their
college. SafeSteps adds someone who is already there.

---

## Read this first

**This is a demonstration, not a live service.** Everything in the repository is
real and works, with two deliberate exceptions that a viewer will see on screen:

- **The form does not submit.** `FORM_ENDPOINT` in `js/form.js` is empty, so the
  submit button is disabled and a visible chip says so. This is the correct state
  for a demo. Wiring it to a real endpoint without a real DDSR to receive it
  would be worse than honest.
- **There are no hotline numbers.** The referral sections show a visible
  placeholder chip, because nobody has verified a number we are willing to
  publish.

Nothing on the site is invented to fill a gap. There are no statistics on the
site at all, no names, no college names, no contact details, and no claim that
any figure or hotline has been verified. Where a fact is missing, the page says so
in a chip. That rule is the single most consistent thing in the codebase and it
is deliberate: a demonstration that invents a phone number teaches the wrong
lesson.

Quick Exit reduces risk. It does not erase browser history, and the site never
claims it does. No website can.

---

## What is built

Five pages, all static, all working with JavaScript disabled except the two
interactive tools.

| Page | What it is for | Interaction |
|---|---|---|
| `index.html` | The whole proposition, then three routes into the tools | none |
| `evidence.html` | The evidence preservation guide: what to save, what not to do, how to organise it, what AI-generated abuse looks like | collapsible sections |
| `timeline.html` | An evidence timeline builder that produces a printable one-page record | add, edit, sort, delete, print |
| `report.html` | The private form. Limits of confidentiality and the anonymous option come before the first field | fill, draft, print |
| `404.html` | A stranded visitor gets the Quick Exit and a way back, not a dead end | none |

The two interactive tools are the substance of the demo. Everything else exists
to get someone to one of them, or to get them out safely.

### The three tools

**Evidence timeline builder.** A student writes down what happened, in order, on
their own device. It runs entirely in memory, makes no network request, and
writes nothing to any storage, so closing the tab clears it. It produces a
printable one-page record they can hand to the DDSR, a counsellor, or keep. This
is the most novel piece and the one a viewer can try immediately.

**Private form.** Anonymous by default, contact details optional, and the
confidentiality limits stated before the first field rather than in a footer
afterwards. What happens after submitting is on the same page as the form.

**Evidence guide.** Plain-language Bangla on screenshots, links, timestamps,
account names, and the single most important instruction: do not delete the
messages.

---

## Running it

Open `index.html` in a browser. It works from `file://` with no server, no
install and no network.

To serve it over HTTP, which is closer to how it will actually run:

```
python -m http.server 8000
```

Then open `http://localhost:8000`.

### Deploying

It is static files. It deploys to GitHub Pages, Netlify or Vercel by dropping the
repository in, with no build step and no configuration beyond the document root.

One host setting is required for `404.html` to work. GitHub Pages and Netlify
both serve it automatically when a request 404s. A bare static host will not, and
needs to be pointed at `404.html` explicitly.

---

## How it is built

| | |
|---|---|
| Markup | HTML5, semantic elements, no framework |
| Styling | One stylesheet, CSS custom properties, no preprocessor |
| Behaviour | Vanilla JavaScript, five files, no bundler |
| Translated strings | 176 keys, Bangla and English |
| Dependencies | None at runtime. The project ships zero npm packages |
| Requests | Every asset is local. The only outbound URL is the Quick Exit destination |
| Fonts | Six self-hosted woff2 files, 207 KB total |
| Page weight | 98 to 108 KB per page including all shared CSS and JS, uncompressed |

There is no build step, no `package.json`, and nothing to install to run the
site. The verification scripts in `tools/` need Python 3, and the browser gate
additionally needs Puppeteer, but both are development tools and neither is a
dependency of the shipped site.

### Structure

```
/
  index.html            home, the proposition, three routes
  evidence.html         evidence preservation guide
  timeline.html         timeline builder, printable record
  report.html           private form, limits first
  404.html              stranded visitor
  favicon.svg           the lit window, 2 KB
  css/
    tokens.css          both themes, spacing, type scale
    fonts.css           @font-face, self-hosted
    site.css            layout, components, print styles
  js/
    theme.js            three-way switch, one stored value
    i18n.js             Bangla and English strings, the toggle
    quickexit.js        the button and the Esc key
    timeline.js         the timeline builder
    form.js             the form, its draft, its disabled state
  fonts/                six woff2 files
  docs/                 team reference, local only, not committed
    design.md           the design system, locked
    SafeSteps_Master_Context.md   the idea, the facts, the do-not-use list
  tools/                verification scripts, not shipped
  README.md
```

Shared header and footer markup is duplicated across pages. There is no build
step to deduplicate it, and a build step would cost more than the duplication
saves. The copies are identical apart from the current-page marker.

---

### The safety shell

The header is a safety bar, not a site navigation. It carries the wordmark, the
language toggle, the theme switch and Quick Exit, and nothing else.

**Quick Exit** is a fixed coral pill, so it stays reachable at any scroll
position. 

---

## Privacy

The site stores no case data. It sets no cookies.

- The timeline builder runs on the device, makes no request, and writes nothing
  anywhere. Closing the tab clears it.
- `localStorage` holds exactly two values: `safesteps.theme` and
  `safesteps.lang`. Both inside `try`/`catch`, both recoverable.
- There are no trackers, no analytics, no third-party scripts, no remote fonts
  and no CDN.
- The only outbound URL in the entire project is the Quick Exit destination.

**One deliberate exception.** The report form keeps a draft of what you have typed
in `sessionStorage`, so an accidental navigation does not destroy an account of
what happened. It is the weakest storage the platform offers: scoped to the one
tab, not shared with other tabs, not written to disk by this site, gone when the
tab closes, never sent anywhere, cleared on a successful submit.

If the team would rather hold the line at "nothing is ever written", delete the
draft block in `js/form.js` and the paragraph above with it. It is one
self-contained set of functions and no other file depends on it.

---

## Verification

Everything below was measured, not assumed.

| Check | Result |
|---|---|
| Responsive and accessibility gates, 5 pages x 2 themes x 6 widths from 320px to 1280px | 60 combinations, all clean. No horizontal scroll, no target under 24px, no label wrapping, unique ids, every control labelled, correct heading order, one `h1` per page |
| Accessibility, axe-core WCAG 2.1/2.2 A and AA plus best practice | 0 violations across 10 page and theme combinations, 404 included |
| Behaviour | 63 automated tests pass: Quick Exit by button and by Esc, both toggles in both directions and across reload, limits before the first field, anonymous clears and disables contact fields, timeline add, edit, sort, delete, validate, no storage, no network, empty after reload |
| Keyboard order | Skip link, then Quick Exit, on every page |
| Contrast, both themes | Every token pair meets its target. `tools/contrast.py` |
| Privacy | Zero third-party requests, confirmed against the server access log. No cookies |
| Content | No U+2013 and no U+2014 in any of 19 source files. No invented name, number, college or statistic. Every `data-i18n` key resolves in both languages |
| Performance | 98 to 108 KB per page excluding fonts, against a 300 KB budget. Fonts 207 KB, against 400 KB |
| Reduced motion | All animation collapses to 0.01ms under `prefers-reduced-motion: reduce` |
| Print | The timeline record prints as one clean A4 page. The form prints what was typed, without its button, helper text, privacy checkbox or card |
| Layout shift | Zero |

Run the checks that need nothing but Python:

```
python tools/check_dashes.py    # no en or em dash in any source file
python tools/contrast.py        # contrast ratios for every token pair
python tools/check_weight.py    # page and font weight against budget
```

The browser gate needs Puppeteer, installed in a scratch directory rather than in
this repository, because the shipped site has no dependencies:

```
python -m http.server 8912 --bind 127.0.0.1
node tools/browser-gates.js     # 60 responsive and accessibility combinations
```

---

## Honest limits

Worth reading before anyone presents this.

- **The form does not work, on purpose.** See the top of this file.
- **No referral contacts are published.** The chip is the honest state.
- **Quick Exit does not erase history.** The site says so in the footer and on
  the 404 page. A private browsing window is the actual mitigation.
- **This is informed by trauma-informed design principles, not validated by
  research.** The sources are design systems and practitioner guidance. No study
  shows that dark mode or any other choice here helps a trauma-affected user. In
  a pitch, say "informed by", not "evidence-based".
- **The Bangla line-height of 1.6 or higher comes from an informal test.**
  Conjuncts and numerals should be checked on a real device.
- **Contrast ratios were computed for these tokens only**, not for the site as
  rendered.
- **The site was never tested on a physical phone.** Headless Chrome at 320px is
  the closest available proxy. This should be the first thing anyone does before
  showing it to a real audience.
- **`--border` on `--surface` is 2.73:1** in the dark theme, where
  `docs/design.md` section 4 asks for 3:1 against input borders. It tabulates
  that ratio only against the background, where it is 3.04. Inputs therefore use
  the background colour and never sit on a card. The tokens were not changed.
- **Switching back to Bangla briefly shows Bangla flash** if English was the last
  choice, because Bangla is the source text and the swap runs deferred. This is
  the price of the no-JavaScript guarantee.
- **Date and time inputs show the browser's own format.** That is native
  behaviour and it follows the device locale.
- **The browser gate was measuring nothing for most of the build.**
  `tools/browser-gates.js` fetched `/index` rather than `/index.html`, which is a
  404 on a static server, so early "all clean" results were an error page with no
  stylesheet on it. It is fixed and now runs 60 combinations against 5 real
  pages, but earlier notes in the git history are worth discounting.
- **`js/i18n.js` used to destroy inline markup** by assigning `textContent` to
  every `[data-i18n]` element, flattening any `<strong>` or `<a>` inside one. The
  evidence guide's lead-in terms were being wiped on every page load. It now
  assigns only when the string differs, which is never in Bangla.
