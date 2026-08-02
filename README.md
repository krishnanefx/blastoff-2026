# Blastoff! 2026 — Wix Custom Element

A single self-contained Web Component built from the Figma frame. Everything —
markup, styles, fonts, carousel, accordion — lives in `blastoff-element.js`.

```
blastoff-element.js            ← the deliverable. The only file Wix needs.
index.html                     ← local preview harness. Not used by Wix.
Asset 6ukssc blastoff 1 1.png  ← hero wordmark, 1368x300
to new heights_....svg         ← tagline, 345x20
assets/ukssc-crest.png         ← crest, extracted from Footer.svg
assets/logos/                  ← sponsor logos, named <slug>.png
Footer.png / Footer.svg        ← design reference, not used at runtime
UKSSC Website Refresh.fig      ← Figma source, untouched
```

## Preview locally

```bash
node /private/tmp/claude-501/-Users-krishnanadaikkappan-Downloads-UKSSC-BLASTOFF-2026/899802c6-9d07-4492-bcab-9a5a1f043a93/scratchpad/server.js
```

Then open <http://localhost:4321>.

## Install in Wix

Velo page code can only drive elements you have already placed in the Editor —
it cannot inject a layout. So this ships as a **Custom Element**, which Wix
renders natively in the page (unlike the HTML embed, which is a fixed-height
iframe that will not resize with your content).

1. Turn on **Dev Mode** in the Wix Editor.
2. Under **Public & Backend**, upload `blastoff-element.js` to the `public` folder.
3. **Add → Embed & Social → Custom Element**.
4. Set **Choose file** to the uploaded script and **Tag name** to `ukssc-blastoff`.
5. Stretch the element to full width, height set to *fit content*.

### Attributes

Images use relative paths so the local preview works as shipped. In Wix, upload
each asset to Media and override the path from the Editor — no code edit:

| Attribute       | Default                    |
| --------------- | -------------------------- |
| `tickets-url`   | the Eventbrite listing     |
| `hero-image`    | the 1368x300 wordmark PNG  |
| `tagline-image` | the 345x20 tagline SVG     |
| `crest-image`   | `./assets/ukssc-crest.png` |
| `logo-base`     | `./assets/logos/`          |

Everything else — copy, stats, FAQs, sponsor list — is in the config block at
the top of the file.

## Sponsor logo carousel

Two auto-scrolling rows — private sector left-to-right, government right-to-left
— on a full-bleed cream band. Each row pauses on hover or keyboard focus. Every
logo is normalised to **56px tall** with no card around it.

A sponsor with a `tier` gets the gold treatment: **100px tall**, double the
trailing margin, and a maroon `GOLD PARTNER` pill above the mark. Tier reads
through size and isolation first; the pill is the confirmation, not the signal.
The pill is maroon-on-cream (12:1) rather than amber-on-cream, which was 1.74:1
and dissolved into the band.

Each slot looks for `<logo-base><slug>.png`. **Drop a correctly-named file into
`assets/logos/` and it appears** — no code change. Missing or broken files fall
back to the typeset name, so a slot is never blank and never shows a broken
image. Slugs are in the `SPONSORS` array (`jpmorgan`, `pwc`, `uob`, `accenture`,
`bofa`, `edb`, `mof`, `mas`, `mfa`, `moe`, `astar`, `lta`, `mot`, `scdf`, `ica`,
`cnb`, `sps`, `htx`, …).

**The band is cream, not black, on purpose.** Most brand PNGs are dark artwork
on a transparent background. With the white cards removed, anything dark would
have vanished against `#141414` — AvePoint's wordmark especially. Knocking every
logo to white with a CSS filter would fix contrast but destroy brand colours
(bp's green, HSBC's red), which sponsor brand guidelines generally forbid.

For Wix, set `logo` on a sponsor entry to a full `static.wixstatic.com` URL
instead — that takes priority over the slug lookup.

**All 22 logos are in place.** 272KB for the set.

### How the files are normalised

Sponsor artwork arrives at wildly different aspect ratios — Bank of America is
9.9:1, the ICA crest is 0.97:1. Equal *height* makes the crest read tiny and the
wordmark read enormous, so each file is pre-baked to a **200px-tall transparent
canvas** with the mark scaled by `(2.2 / aspect) ** 0.4` inside it: wide lockups
sit shorter, tall crests fill the canvas. Everything then renders at one CSS
height and lands at the same optical weight. This is what fixed bp — at 960x1275
it used to read smaller than HSBC.

Two source files arrived as opaque white rectangles (MFA, MOF) which would have
shown as white boxes on the cream band; an edge flood fill strips them. PwC's SVG
was 24% content and 76% padding, so everything is cropped to its alpha bounding
box first. Files are then quantised to a 256-colour palette — 896KB to 221KB with
no visible difference at 56px.

**If you drop in a new raw logo, run it through the same pipeline** or it will
not match the others:

```bash
python3 "tools/bake-logos.py" /path/to/raw-logos assets/logos
```

It needs Pillow and numpy, prints what it did to each file, and is idempotent —
a already-baked file passes through unchanged.

> ### Sourcing: what works, and what does not
>
> A previous attempt scraped Wikipedia *articles* with a filename filter and got
> **wrong logos for 4 of 9** companies — JPMorgan as "BANK ONE" (acquired 2004),
> PwC as "Coopers & Lybrand" (pre-1998 merger), Bank of America as a defunct
> securities subsidiary, UOB as clipart of money. Articles embed historical logos
> in the body and a filename filter cannot tell them apart. Clearbit's logo API is
> shut down and favicons are unusable (UOB returns 16px).
>
> What worked, in order of reliability:
>
> 1. **Wikidata property `P154` (logo image).** A curated per-entity claim, not a
>    filename guess. Resolved all five private-sector logos correctly and current
>    — JPMorgan's 2024 rebrand, PwC's 2025 mark, UOB 2022.
> 2. **English Wikipedia file namespace** (`srnamespace=6`). Where the Singapore
>    statutory boards live; Wikidata `P154` coverage for them is thin and Commons
>    has almost nothing.
> 3. **The agency's own website.** Best for EDB, MOF and CNB.
>
> **Then look at every file before shipping it.** That is the step that was
> missing. A search for CNB also returns the *Indian* Central Bureau of Narcotics,
> SCDF's homepage header is a marathon campaign logo, and HTX's is the reverse
> (white) variant that would have disappeared against the cream. None of those are
> catchable from a filename — only by opening the image.
>
> These are third-party trademarks. For anything public-facing it is still worth
> getting the approved artwork from each sponsor's brand pack, which most brand
> guidelines require.

## Design fidelity

Measured against the Figma at 1440px — nav `36..1404`, hero `1368` wide, body
column starting at `668`, stat cards `668..1404`, footer columns at `84 / 667 /
920`. All within 1–2px.

Two things worth knowing about how it was adapted:

- The 1368px content column sits *inside* a 36px gutter on the 1440 canvas, so
  the gutter is added to the max-width, not subtracted from it.
- The photo rail starts on the left gutter but has **no right padding**, so the
  photos bleed off the right edge rather than stopping short of it. The prev/next
  arrows sit in their own `.wrap` so they stay aligned to the content edge.
- The frame is a fixed 1440px desktop canvas. Absolute positioning was
  reinterpreted as a fluid layout — sizes use `clamp()`, and the page reflows at
  900px, 760px (nav collapses to a hamburger) and 560px. Verified at 1440, 942
  and 375px with zero horizontal overflow.

The footer is real HTML rather than the exported `Footer.svg`, so the links are
clickable and the text reflows. `Footer.png` was used as the layout reference.

Fonts load from CDN: **DM Sans** (Google) for nav and footer, **Open Sauce Sans**
(jsDelivr/Fontsource) for everything else. They are injected into `document.head`
rather than the shadow root, because `@font-face` only resolves in document scope.
Note that cdnfonts, the usual Open Sauce host, is currently returning 500s.

## Still outstanding

- **Sponsor logo provenance** — all 22 are in and visually verified, but they came
  from Wikidata, Wikipedia and agency websites rather than from the sponsors. Worth
  swapping in brand-pack artwork for the ones that matter most, starting with EDB
  (gold tier). HTX is a vertical purple tile — ask them for a horizontal lockup.
- **Photo carousel** — deliberately empty grey plates, per your call. Add URLs to
  the `PHOTOS` array.
- **FAQ copy** — the three Q&As are drafts written from the event details, marked
  with a TODO in the file. Confirm with the committee.
- **Links** — `SG60` in the nav, plus Constitution, Telegram, LinkedIn and the
  contact email, are placeholders in `CONFIG`. The tickets button is live and
  points at the Eventbrite listing (opens in a new tab).
- **Stat figures** — 600+ / 30 / 40 came from the Figma. Worth checking against
  2026 numbers, given the sponsor list currently has 22 names.
