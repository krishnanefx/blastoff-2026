#!/usr/bin/env python3
"""Build the favicon set from the UKSSC crest.

Google was showing the generic globe in search results for two reasons, both
fixable here:

  1. The crest is 273x253 — not square. Google requires a square favicon and
     ignores ones that are not, falling back to the globe.
  2. There was no /favicon.ico at the site root, which is where Google looks
     when it cannot use the declared one.

Google also wants the edge to be a multiple of 48px, so the PNGs are 48/96/192.

The crest is padded to a square canvas rather than stretched — squashing a
heraldic device to fit would be worse than a little transparent margin. A small
breathing margin is added on top, because Google and browsers both render the
icon inside a rounded container that clips the corners.

apple-touch-icon gets an opaque Beige Linen ground: iOS composites transparent
PNGs onto black, which would bury the crest's dark outlines.

Usage:  python3 tools/make-favicons.py
"""
from PIL import Image

SRC = 'assets/ukssc-crest.png'
CREAM = (255, 245, 233, 255)   # Beige Linen, brand deck p6
MARGIN = 0.06                  # share of the canvas left clear on each side


def square(src, size, background=None):
    """Centre the crest on a square canvas at `size`, preserving its ratio."""
    im = Image.open(src).convert('RGBA')
    box = im.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
    if box:
        im = im.crop(box)

    inner = round(size * (1 - 2 * MARGIN))
    scale = min(inner / im.width, inner / im.height)
    im = im.resize((max(1, round(im.width * scale)),
                    max(1, round(im.height * scale))), Image.LANCZOS)

    canvas = Image.new('RGBA', (size, size), background or (0, 0, 0, 0))
    canvas.paste(im, ((size - im.width) // 2, (size - im.height) // 2), im)
    return canvas


def main():
    # Declared icons. Multiples of 48 because that is what Google asks for.
    for size in (48, 96, 192):
        out = f'assets/favicon-{size}.png'
        square(SRC, size).save(out, optimize=True)
        print(f'  {out:34} {size}x{size}')

    # iOS home screen — opaque, or the crest lands on black.
    out = 'assets/apple-touch-icon.png'
    square(SRC, 180, CREAM).convert('RGB').save(out, optimize=True)
    print(f'  {out:34} 180x180 (opaque)')

    # Root .ico fallback, multi-resolution. Google checks /favicon.ico when the
    # declared icon is unusable, and some crawlers only ever look here.
    ico = square(SRC, 256)
    ico.save('favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])
    print(f'  {"favicon.ico":34} 16/32/48 multi-size')


if __name__ == '__main__':
    main()
