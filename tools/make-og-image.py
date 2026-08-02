#!/usr/bin/env python3
"""Generate the Open Graph share card.

The old og:image was the bare wordmark PNG — transparent, so chat apps
composited it onto white and the yellow mark washed out. This paints it onto
the brand background at the 1200x630 that Facebook, WhatsApp, LinkedIn, Slack
and X all expect, and adds the details worth seeing in a preview.

Usage:  python3 tools/make-og-image.py [path-to-open-sauce-sans-bold.ttf]
"""
import sys

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
INK = (20, 20, 20)
YELLOW = (228, 255, 0)
MINT = (173, 248, 245)
STRIPES = [(255, 173, 0), (20, 20, 20), (247, 247, 244), (105, 5, 4)]

FONT = sys.argv[1] if len(sys.argv) > 1 else None
OUT = 'assets/og-blastoff-2026.png'


def load(size):
    if FONT:
        try:
            return ImageFont.truetype(FONT, size)
        except OSError:
            pass
    for path in ('/System/Library/Fonts/Avenir Next.ttc',
                 '/System/Library/Fonts/Supplemental/Arial Bold.ttf'):
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

# Wordmark, composited onto the dark background so it never lands on white.
mark = Image.open('assets/blastoff-wordmark.png').convert('RGBA')
mw = 820
mh = round(mw * mark.height / mark.width)
mark = mark.resize((mw, mh), Image.LANCZOS)
card.paste(mark, ((W - mw) // 2, 140), mark)

centre(draw, '14 AUGUST 2026  ·  SUNTEC CONVENTION CENTRE', load(38), 372, YELLOW)
centre(draw, 'The UKSSC careers fair for overseas Singaporean students', load(29), 442, MINT)
centre(draw, 'Free admission', load(29), 492, YELLOW)

# The footer's four-colour band, tying the card to the page.
band = 18
for i, colour in enumerate(STRIPES):
    draw.rectangle([i * W / 4, H - band, (i + 1) * W / 4, H], fill=colour)

card.save(OUT, optimize=True)
print(f'{OUT}  {card.size[0]}x{card.size[1]}')
