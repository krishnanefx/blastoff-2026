#!/usr/bin/env python3
"""Generate the Open Graph share card.

The og:image cannot be the bare wordmark PNG: it is transparent, so chat apps
composite it onto white and the lime mark washes out. This paints it onto the
brand background at the 1200x630 that Facebook, WhatsApp, LinkedIn, Slack and
X all expect, and adds the details worth seeing in a preview.

Everything here is the brand deck's own kit — the p6/p7 hexes, Open Sauce for
the type, and the p12 clear space around the mark. The card is the logo's most
common appearance in the wild, so it is the one place a near-miss lime or a
crowded mark would do the most damage.

Usage:  python3 tools/make-og-image.py [path-to-a-brand-ttf]
"""
import os
import sys

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630

# Brand deck p6-p7.
INK = (20, 20, 20)        # Black          141414
LIME = (233, 255, 71)     # Electric Lime  E9FF47
CREAM = (255, 245, 233)   # Beige Linen    FFF5E9
ROYAL = (34, 22, 180)     # Vivid Royal    2216B4
AQUA = (189, 245, 244)    # Icy Aqua       BDF5F4 — grounds only, see below

# The closing band, in brand order. Black is omitted: it is the ground.
STRIPES = [LIME, AQUA, CREAM, ROYAL]

# Open Sauce is the secondary typeface (p11). The repo ships it as woff for the
# browser; tools/ttf holds the same faces converted for Pillow, which cannot
# read woff. Regenerate with:
#   python3 -c "from fontTools.ttLib import TTFont; \
#       f=TTFont('assets/fonts/open-sauce-sans-700.woff'); f.flavor=None; \
#       f.save('tools/ttf/open-sauce-sans-700.ttf')"
FONT = sys.argv[1] if len(sys.argv) > 1 else None
CANDIDATES = [
    FONT,
    'tools/ttf/open-sauce-sans-700.ttf',
    '/System/Library/Fonts/Avenir Next.ttc',
    '/System/Library/Fonts/Supplemental/Arial Bold.ttf',
]
OUT = 'assets/og-blastoff-2026-v2.png'


def load(size):
    for path in CANDIDATES:
        if not path or not os.path.exists(path):
            continue
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def centre(draw, text, font, y, fill):
    l, t, r, b = draw.textbbox((0, 0), text, font=font)
    draw.text(((W - (r - l)) / 2 - l, y), text, font=font, fill=fill)
    return b - t


card = Image.new('RGB', (W, H), INK)
draw = ImageDraw.Draw(card)

# Wordmark, composited onto the dark ground so it never lands on white.
mark = Image.open('assets/blastoff-wordmark.png').convert('RGBA')
MARK_W = 680
mark_h = round(MARK_W * mark.height / mark.width)
mark_y = 118
mark = mark.resize((MARK_W, mark_h), Image.LANCZOS)
card.paste(mark, ((W - MARK_W) // 2, mark_y), mark)

# p12: 0.5h of clear space on every side. Assert it rather than trusting the
# numbers above to stay right if someone retunes the layout.
clear = mark_h / 2
assert mark_y >= clear, 'clear space violated above the mark'
assert (W - MARK_W) / 2 >= clear, 'clear space violated beside the mark'
first_baseline = 352
assert first_baseline >= mark_y + mark_h + clear, 'clear space violated below the mark'

# The tagline is part of the logo, so it takes the logo's colour — p14 forbids
# two colours in the mark at once. Nothing here is set in Icy Aqua: the Colour
# Usage page only ever shows it as a ground, never as a foreground on Black.
centre(draw, 'to new horizons!', load(34), first_baseline, LIME)
centre(draw, 'FRIDAY 14 AUGUST 2026  ·  4PM–9PM', load(40), 414, CREAM)
centre(draw, 'Suntec Singapore Convention & Exhibition Centre  ·  Free admission',
       load(25), 478, CREAM)
centre(draw, '20+ corporate partners  ·  400+ attendees', load(25), 518, LIME)

band = 18
for i, colour in enumerate(STRIPES):
    draw.rectangle([i * W / 4, H - band, (i + 1) * W / 4, H], fill=colour)

card.save(OUT, optimize=True)
print(f'{OUT}  {card.size[0]}x{card.size[1]}')
