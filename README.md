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
— on a full-bleed cream band. Each row pauses on hover or keyboard focus, and can
be dragged, flicked, trackpad-scrolled or arrow-keyed (see [Carousels](#carousels)
below). Every
logo is normalised to **equal ink area** with no card around it (see below).

A sponsor with a `tier` gets the gold treatment: **double the ink area**, double
the trailing margin, and a maroon `GOLD PARTNER` pill above the mark. Tier reads
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
10:1, the HTX crest is 0.83:1. **Equal height is the wrong target.** At one
shared height the wide wordmark carries several times the ink of the square
crest, and the crest collapses into unreadable detail: HTX used to render its
entire emblem into 46x56px.

So logos are equalised by **ink area**, the standard for a sponsor wall. Each
mark gets the same visual mass: wide lockups sit shorter and wider, square
crests get taller. `sizeLogo()` computes it at load time from the file's own
aspect ratio — `h = √(AREA / aspect)`, with `AREA = 10000` px², clamped to
30–104px tall and 300px wide so a 10:1 lockup can't run away.

Measured across the 22 logos, that took the spread in rendered area from
**3.7× down to 1.25×**. HTX went from 46x56 to 86x104 — 3.5 times the area.
Gold tier gets double the ink budget, i.e. √2 on each edge.

Because it is computed from the image rather than baked in, **a new logo
self-sizes** — no per-file tuning. Files must be cropped tight to their artwork
though, since padding would be read as part of the mark; `tools/crop-logos.py`
does that.

PwC's SVG was 24% content and 76% padding, so everything is cropped to its alpha
bounding box first. Files are then quantised to a 256-colour palette — 896KB to
221KB with no visible difference at 56px.

### Getting white backgrounds off

Two source files arrived flattened onto opaque white (MFA, MOF), which would have
shown as white boxes on the cream band. There are two fixes and they are not
interchangeable:

**Edge flood fill** (`strip_white_box`, the default) walks in from the borders.
It is safe for any logo, because it only removes white that is connected to the
outside — brand white stays put. But it cannot reach white that ink encloses.
That is why MOF's "O" kept a solid white disc in its counter: the letter ring
seals it off. Raising the threshold does not help; it just trades the disc for a
hard white halo along every anti-aliased edge.

**Un-matting** (`unmatte_white`, opt-in via `INK_ON_WHITE`) solves the compositing
that produced the file instead. Each pixel is ink `C` over white at coverage `a`:

```
observed = a*C + (1 - a)*255   ->   a = 1 - min(R,G,B)/255
                                    C = (observed - 255*(1 - a)) / a
```

White becomes `a=0`, solid ink `a=1`, and a half-covered edge pixel returns as
full-strength ink at 50% alpha — anti-aliasing intact, no halo. Taking coverage
from the *minimum* channel keeps colour, so MOF's red "SINGAPORE" survives (its
saturation actually improves, since un-premultiplying recovers full-strength ink).
A `FLOOR` of 0.03 discards near-white that is not quite 255 — exports are often
253, and without the floor every background pixel stays faintly opaque, enough to
defeat the bbox crop and veil the canvas.

**Only add a slug to `INK_ON_WHITE` if the artwork has no meaningful white.** It
removes *all* white, everywhere. Most of the set would be destroyed by it: HSBC's
hexagon segments, LSE's white letters on red, bp's sunburst, the white "HTX" on
its purple tile, and the MFA/ICA/SPS/SCDF crests all contain real white. MOF is
the only flattened wordmark in the set, so the list is just `{'mof'}`.

**If you drop in a new raw logo, run it through the same pipeline** or it will
not match the others. Put the original in `tools/logo-sources/` and re-bake the
whole set:

```bash
python3 "tools/bake-logos.py" tools/logo-sources assets/logos
```

Needs Pillow and numpy. Running it on the 22 sources reproduces the shipped
files byte-for-byte, so it is safe to re-run.

Bake from `tools/logo-sources/`, **not** from `assets/logos/` — the output is
cropped to its content box, so re-baking already-baked files drifts (it refuses
to run in-place, but a copy would still slowly degrade). The sources are kept
in the repo for exactly this reason: changing `CANVAS_H` or the normalisation
curve means re-baking everything from the originals.

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

## Carousels

Both sponsor rows and the photo rail run on one engine, `loopTrack()`. Each track
holds exactly two copies of its content, so wrapping the offset modulo one copy's
width is seamless **in both directions** — there is no start or end to hit, and a
drag can keep going either way forever.

| Input | Behaviour |
| ----- | --------- |
| Drag (mouse or touch) | Grabs the row; a flick carries on and decays |
| Trackpad swipe | Horizontal deltas only |
| `Shift` + wheel | Same, for a one-axis mouse |
| `←` `→` | Steps one plate (rail) or 80% of a screen (rows) |
| Hover / focus | Holds the sponsor-row drift while you read it |
| Photo arrows | Step one plate; never disabled, since there is no end |

Everything is driven from one `offset` number that autoplay adds to, a drag sets,
a flick decays into and the buttons ease. That is why the sponsor rows are no
longer a CSS keyframe: **a keyframe cannot be grabbed.** The rows drift at a fixed
44 px/sec rather than a fixed duration, so the 13-logo row moves at the same rate
as the 9-logo one.

Two things worth not breaking:

- **Plate and logo spacing is a trailing `margin`, never a flex `gap`.** The loop
  only lands seamlessly if every item carries its own trailing space; a gap leaves
  a half-gap jump at the seam.
- **A plain vertical wheel is deliberately not consumed.** Only horizontal intent
  is taken, so the page still scrolls normally over a carousel — swallowing that
  is what makes a carousel feel like a trap.

`touch-action: pan-y` claims the horizontal axis for the drag while leaving
vertical page scrolling to the browser. Under `prefers-reduced-motion` the drift
stops but every manual input still works.

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
