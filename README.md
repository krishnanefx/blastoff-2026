# BlastOFF! 2026

The UKSSC's career fair site. One self-contained Web Component — markup, styles,
fonts, carousels, accordion — in `blastoff-element.js`, mounted by `index.html`.

```
blastoff-element.js   ← the whole site. Tag name: <ukssc-blastoff>
index.html            ← the page that mounts it
assets/               ← wordmark, crest, partner logos, photos, fonts, share card
tools/                ← build scripts for the logos and the share card
```

Ships to **blastoff2026.com**. This repo also publishes to
`krishnanefx.github.io/blastoff-2026/`, which is a staging mirror — `index.html`
carries `noindex` for that reason, and a `canonical` pointing at the real domain.
Delete the `noindex` line at launch; it is commented as such in the file.

The previous Wix custom-element build is preserved two ways: tagged
`v1-wix-element` in git, and zipped outside the repo as
`ukssc-blastoff-site-v1-20260803.zip`.

## Preview locally

Any static server from the repo root, e.g.:

```bash
python3 -m http.server 4321
```

Then open <http://localhost:4321>.

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

## The 2026 refresh

Everything below was rebuilt against material the Communications Dept supplied.
No invented copy, no substituted colours.

| Source | Drives |
| --- | --- |
| `Blastoff Brand Deck.pdf` | palette, typefaces, minimum text size, logo rules |
| `BlastOff! Copywriting.docx` | About, Why visit, Legacy |
| `Company Details.docx` | partner tiers, partner profiles, logo restrictions |
| `Company Logos/`, `AvePoint Logo/` | official partner artwork + their guidelines |
| `BlastOff! Website Update/Photos to Use` | gallery, About plate, Legacy plate |
| <https://www.theukssc.co.uk> | every outbound link and the contact address |

These source folders are **deliberately not committed** — see `.gitignore`. They
are large, and more importantly several are partner-confidential (PwC's
third-party co-branding guidelines, HSBC's TMLA brand guidelines, MAS's branding
guidelines). Committing them would publish those documents on a public Pages
site. Keep them locally and in Drive.

### Brand guidelines, as applied

- **Palette** is the deck's exact hexes: Electric Lime `#E9FF47`, Beige Linen
  `#FFF5E9`, Black `#141414`, Vivid Royal `#2216B4`, Icy Aqua `#BDF5F4`. The old
  sheet used `#DFFF3E` / `#FFF6E7` / `#ADF8F5` plus a maroon — none of which are
  brand colours.
- **Every pairing is one the Colour Usage page sanctions.** On Black that means
  Lime or Beige Linen only, so body copy is warm cream rather than white.
- **Icy Aqua is a background, not a foreground.** p8 shows it as a ground
  carrying Black or Vivid Royal and never as text on Black, so nothing on the
  dark page is set in it.
- **Typefaces** are League Spartan (primary) and Open Sauce (secondary), in
  Regular and Bold only — the deck documents no Medium, and Open Sauce ships
  here as 400/700, so a `500` was being synthesised. DM Sans is gone.
- **The 15px minimum text size is enforced.** Verified in-browser: nothing
  computes below it. This is why the small-caps labels read larger than a
  typical web eyebrow. It is the guideline, not an oversight.
- **Partner marks are never filtered or recoloured**, which several partners'
  guidelines require — MFA's forbids any alteration. The cream band is what
  makes that possible for dark artwork.

### The logo lockup

p3 "Main Logo" is the wordmark **and** "to new horizons!" set as one object, not
a wordmark with a subtitle under it. Measured off the deck rendered at 3400px
and reproduced to within 2%:

| | Deck | Now |
| --- | --- | --- |
| Gap, wordmark ink → tagline ink | 0.192h | 0.190h |
| Tagline ink height | 0.126h | 0.126h |
| Tagline width ÷ wordmark width | 0.247 | 0.252 |
| Clear space, all four sides | 0.5h | 0.500h |

The tagline is Electric Lime, not Icy Aqua: p14 forbids two colours in the logo
at once. It is League Spartan — that matches the deck's width-to-ink ratio (9.4
against a measured 9.05–9.24) where Open Sauce gives 9.9; the giveaway is the
very tall x-height, the `t` barely clearing the `o`. The deck's lockup is tracked
to about −0.02em, tighter than the −0.01em the typeface pages give for text.

**Clear space is `cqw`, not `%`.** Percentage padding resolves against the
*containing block's* width, not the element's own, so `padding: 9%` produced
0.93h instead of 0.5h — that, not the tagline, was what made the hero cavernous.

**One deliberate departure:** held to the p3 proportion the tagline computes to
8px on a 375px phone, below p10–p11's own 15px minimum. The floor wins, so under
a ~381px wordmark the lockup stretches slightly rather than the type going
sub-legible. The gap is in `em` so it stays proportional.

### Partner tiers and logos

The "Full List" table resolves to **1 Gold + 8 Silver + 1 Bronze + 13 government
agencies = 23**, matching the 23 files in `assets/logos/`. Gold (JPMorganChase)
and Bronze (SGN) are single marks and sit still; Silver and the agencies scroll.
This **reassigns the gold tier** — the previous build gave it to EDB, which the
table lists as a government agency. The page says **20+** throughout, the Why
visit copy's figure.

**12 of the 23 now use official artwork.** `tools/bake-partner-logos.py` builds
them. Half the supplied files are JPEGs or PDFs flattened onto white and the band
is cream, so the background has to come out — but a global white-knockout would
punch holes through MAS's reversed-out lettering, the white rays at the centre of
bp's Helios, and the LSE letters knocked out of the red block. The script
flood-fills inward from the border, removing only white *connected to the edge*,
then feathers a two-pixel fringe so the original antialiasing survives.

Still online-sourced, no artwork supplied: UOB, SGN, EDB, MOE, A*STAR, MOT, SCDF,
ICA, CNB, SPS, HTX.

Minimum sizes, enforced in code from the partners' own documents:

| Partner | Minimum | Source |
| --- | --- | --- |
| PwC | 62px wide | Third-Party Co-Branding Guidelines, p4 |
| HSBC | 105px wide | TMLA Brand Guidelines, p11 |
| Bank of America | 125px wide | logo sheet in Company Details.docx |
| LTA | 132px (35mm print at 96ppi) | Corporate Logo Guidelines, Jan 2024 |

### Photography

Five supplied JPEGs (up to 21MB) resized into `assets/photos/` at 1600w and 900w
and served with `srcset` — 2.3MB for all ten files. Four in the gallery rail, one
as the About plate, and the older orange banner in Legacy where the earlier
branding is the point. Captions name no year and no venue: the files carry no
shoot date and these were not taken at Suntec.

### Contrast and palette fixes from the compliance audit

- CTA hover was `#F1FF7A`, absent from the deck. The ground now stays Lime and
  the label moves to Vivid Royal — the other sanctioned foreground — at 10.2:1.
- Pill numerals hovered to 55%-opacity Black on Lime: an unlisted `#747E2B` at
  3.96:1. Now Vivid Royal at 10.2:1.
- **The mobile drawer's CTA was invisible.** `.nav-list a` outranks `.btn-solid`
  on specificity, so it painted the button's label in the muted nav colour —
  1.01:1. Nav rules are now scoped `a:not(.btn)`. All five solid CTAs measure
  16.54:1.
- Opacity recipes consolidated from 21 ad-hoc `rgba()` values into an
  **eleven-step ladder** declared at the top of the stylesheet. **This still
  needs brand sign-off**: the deck publishes solid swatches and documents no
  tint scale, so every translucent value is a derivation. No new hue is
  introduced — each step is Beige Linen or Black at a stated alpha.

## Settled with the committee

- Event name is **BlastOFF!** in prose. The logotype artwork stays lowercase
  `blastoff!` — p14 forbids changing the logo's text.
- The council is the **United Kingdom Singapore Student Council** — singular, no
  apostrophe, no hyphen, matching theukssc.co.uk. This disagrees with the crest
  and the roll-up banner, which read "Students' Council"; the artwork is
  untouched, only the typeset name.
- **20+** partners, not 23.
- Contact is `enquiries@theukssc.co.uk`, the published general inbox.

## Still open

- **Venue name** — the copy doc says "Suntec City Convention & Exhibition
  Centre"; the correct name is "Suntec Singapore Convention & Exhibition
  Centre", which is what the page uses.
- **"bp Singapore" is intentionally lowercase.** bp's identity has been
  lowercase since 2000, the supplied artwork shows a lowercase wordmark, and
  Company Details.docx writes it lowercase. Every other partner name was checked
  against the supplied list and official usage.
- **FAQ copy** is still ours, not the committee's, and marked TODO in the file.
- **Opacity ladder** needs brand approval (above).
