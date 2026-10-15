# BlastOFF! 2026

The landing page for BlastOFF! 2026, the United Kingdom Singapore Student
Council's (UKSSC) career fair. The whole site is one self-contained Web
Component — markup, styles, carousels, accordion — in `blastoff-element.js`,
mounted by `index.html`.

```
blastoff-element.js   ← the whole site. Tag name: <ukssc-blastoff>
index.html            ← mounts it; meta/OG tags, structured data, GA4 + Consent Mode
assets/               ← wordmark, crest, partner logos, photos, fonts, favicons, share card
tools/                ← Python scripts for logos, favicons and the share card
design/               ← Figma file and footer reference
.githooks/pre-commit  ← refuses commits where blastoff-element.js doesn't parse
```

Served from GitHub Pages on **blastoff2026.com** (`CNAME`, `.nojekyll`). The old
`krishnanefx.github.io/blastoff-2026/` URL redirects there, so the page is
indexable and `canonical` points at the real domain.

The previous Wix custom-element build is tagged `v1-wix-element` in git.

## Working on it

Preview with any static server from the repo root:

```bash
python3 -m http.server 4321   # then open http://localhost:4321
```

Enable the pre-commit hook once per clone (it runs `node --check` on the
component, since a stray backtick in the CSS template literal once took the
live page down):

```bash
git config core.hooksPath .githooks
```

`index.html` loads `blastoff-element.js?v=N` — bump `N` when you ship a change
so browsers don't serve a cached copy.

## Where the content lives

Everything editable is a constant near the top of `blastoff-element.js`:
`CONFIG` (tickets URL, asset paths, contact email), `UKSSC` (outbound links),
`EVENT` (date, time, venue), `STATS`, `ABOUT`, `LEGACY`, `GALLERY`, `PARTNERS`,
`PROFILES` and `FAQS`.

## Partners and logos

`PARTNERS` groups the marks into tiers: Community (SGN) and Gold (JPMorgan
Chase, EDB) sit still; Bronze and Government scroll in opposite directions on a
cream band. Each item loads `assets/logos/<slug>.png` — **drop a correctly named
file in and it appears**. A missing or broken file falls back to the typeset
name, so a slot is never blank.

**The band is cream, not black, on purpose.** Most brand PNGs are dark artwork
on transparency, and partner guidelines (MFA's especially) forbid recolouring or
filtering, so the marks need a light ground.

**Sizing is by equal ink area, not equal height.** The `_logos()` sizer sets
`h = √(AREA / aspect)` with `AREA = 10000` px², clamped to 30–104px tall and
300px wide; gold marks get double the area. A partner's own minimum can be set
per item with `minWidth` (Bank of America: 125px). Because size is computed
from the file, **logos must be cropped tight to their artwork** — padding is
read as part of the mark.

### Rebuilding logo files

| Script | Use |
| --- | --- |
| `tools/bake-partner-logos.py` | Bakes partner-supplied artwork (13 marks) from the committee's source folders. Needs Pillow, numpy, scipy, and macOS `qlmanage` for the PDF sources. |
| `tools/bake-logos.py <src> assets/logos` | Bakes the online-sourced fallbacks from `tools/logo-sources/`. Needs Pillow and numpy. |
| `tools/crop-logos.py` | Crops `assets/logos/*.png` to their alpha box and re-quantises. Idempotent. |

Always bake from the sources, **not** from `assets/logos/` — re-baking baked
output slowly degrades it.

Removing a white background has two modes, and they are not interchangeable:

- **Edge flood fill** (default) removes only white connected to the border, so
  brand white survives — but it can't reach white enclosed by ink.
- **Un-matting** (opt-in: `INK_ON_WHITE` / `'unmatte'`) solves
  `observed = a*C + (1 - a)*255` per pixel, removing *all* white while keeping
  anti-aliasing and colour. Only use it for artwork with no meaningful white;
  MOF is the only one in the set.

Still online-sourced (no artwork supplied): UOB, SGN, EDB, MOE, A*STAR, MOT,
SCDF, ICA, CNB, SPS. When sourcing a logo, Wikidata property `P154` is the most
reliable, then the English Wikipedia file namespace, then the agency's own site
— and **open every file before shipping it**; searches return wrong, historic
or reversed-out variants that a filename can't reveal.

## Carousels

The sponsor rows and the photo rail share one engine, `loopTrack()`. Each track
holds enough copies of its content that wrapping the offset modulo one copy's
width is seamless in both directions. A single `offset` is driven by autoplay
(34 px/s for logos, 20 px/s for photos), pointer drag with flick momentum, and
the photo rail's prev/next buttons. Drift pauses on hover and keyboard focus,
and stops under `prefers-reduced-motion`.

Two things worth not breaking:

- **Item spacing is a trailing `margin`, never a flex `gap`.** The loop only
  lands seamlessly if every item carries its own trailing space.
- **`touch-action: pan-y`** gives the horizontal axis to the drag while
  vertical page scrolling stays with the browser.

## Brand rules, as applied

Source material (brand deck, copywriting doc, company details, partner logos,
photos) came from the UKSSC Communications Dept. It is **deliberately not
committed** — see `.gitignore` — because several files are partner-confidential
and this repo publishes to a public Pages site. Keep it locally and in Drive.

- **Palette** is the deck's exact hexes: Electric Lime `#E9FF47`, Beige Linen
  `#FFF5E9`, Black `#141414`, Vivid Royal `#2216B4`, Icy Aqua `#BDF5F4`. On
  Black only Lime or Beige Linen; on Beige Linen only Black or Vivid Royal; Icy
  Aqua is a ground, never text on Black.
- **Typefaces**: League Spartan (primary, from Google Fonts) and Open Sauce Sans
  (secondary, self-hosted from `assets/fonts/`). Font faces are injected into
  `document.head`, since `@font-face` doesn't resolve inside a shadow root.
- **15px minimum text size** everywhere — why the small-caps labels read larger
  than a typical web eyebrow.
- **Logo lockup**: wordmark and "to new horizons!" are one object with 0.5h
  clear space. Clear space uses `cqw`, not `%`, because percentage padding
  resolves against the containing block.
- **Partner marks are never filtered or recoloured.**
- Translucent colours are custom properties at the top of the stylesheet
  (Beige Linen or Black at stated alphas); no new hues.

### Naming, settled with the committee

- **BlastOFF!** in prose; the logotype stays lowercase `blastoff!`.
- **United Kingdom Singapore Student Council** — singular, no apostrophe,
  matching theukssc.co.uk.
- **20+** partners in copy, and **bp Singapore** in lowercase.

## Analytics

`index.html` loads GA4 with Consent Mode v2, with `analytics_storage` defaulting
to denied. There is no consent banner yet; the comment in `index.html` shows the
`gtag('consent', 'update', …)` call to make if one is added.

## Still open

- **Logo provenance** — replace the online-sourced marks above with brand-pack
  artwork, starting with EDB (gold tier).
- **FAQ copy** — written by us from the event details; confirm with the
  committee.
- **Translucent colours** need brand sign-off: the deck publishes solid
  swatches only, so every translucent value is a derivation.
