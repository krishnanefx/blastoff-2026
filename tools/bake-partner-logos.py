#!/usr/bin/env python3
"""Bake the partners' own logo artwork into the web PNGs the site loads.

These replace the marks that were previously sourced from Wikidata and agency
websites. Anything a partner supplied wins; the rest of assets/logos/ still
comes from tools/logo-sources/ and is flagged in the README.

Two things matter and neither is obvious:

1. The cream band means dark artwork needs a TRANSPARENT background, and half
   the supplied files are JPEGs on white. A global "make white transparent"
   would punch holes straight through MAS's reversed-out lettering, the white
   rays at the centre of bp's Helios, and the LSE letters knocked out of the red
   block. So the background is found by flood-filling inward from the border —
   only white that is *connected to the edge* is removed.

2. That leaves a hard, aliased edge. A one-pixel fringe around the filled region
   gets partial alpha derived from its luminance, so the antialiasing the
   original artwork shipped with survives instead of turning into a white halo.

No recolouring, no filters, no redrawing: the pixels are the partners' own.

Usage:  python3 tools/bake-partner-logos.py
"""
import os
import subprocess
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

OUT = 'assets/logos'
SCRATCH = 'tools/logo-render'

# slug -> (path from the repo root, needs background knockout)
# Where a partner supplied several versions, the note says why this one.
JOBS = [
    # Already transparent PNGs — used as supplied.
    # AvePoint shipped five variants; full-colour is the primary and the band is
    # cream, so neither the knockout nor the mono versions apply.
    ('avepoint',   'AvePoint Logo/AvePoint-Logo_Full-color-4128x860-a8266f7.png', False),
    ('accenture',  'Company Logos/Accenture/Accenture.png', False),
    ('bofa',       'Company Logos/Bank of America/bofa_lo1_rgb_Digital (3).png', False),
    ('hsbc',       'Company Logos/HSBC/HSBC_MASTERBRAND_LOGO_RGB.png', False),
    # Black wordmark, not the white one: the band is cream.
    ('jpmorgan',   'Company Logos/JPMC_Logo_Standard_Black_RGB.png', False),
    ('mfa',        'Company Logos/MFA Logo.png', False),
    # The horizontal lockup, finally supplied. The old mark was the vertical
    # purple tile, which at equal ink area rendered as a small dark block on the
    # cream band with the wordmark reversed out and barely legible.
    ('htx',        'Company Logos/HTX/HTX_Horizontal Logo_Web_RGB_Full Colour.png', False),
    ('pwc',        'Company Logos/PwC/PwC_logo_rgb_colour_pos 2.png', False),
    # Flattened on white — knock the background out.
    ('bp',         'Company Logos/BPP_Rlbg.jpg', True),
    ('lse-alumni', 'Company Logos/LSE Alumni/LSEAAS Logo.jpeg', True),
    ('lta',        'Company Logos/LTA/LTA Logo with Tagline (jpg file).jpg', True),
    # Rendered from the supplied vector PDFs (see render_pdf below).
    ('mas',        'Company Logos/MAS/Monetary Authority of Singapore.pdf', True),
    ('mof',        'Company Logos/MOF/Color/4c-MOF logo-CMYK copy.pdf', True),
]

LONG_EDGE = 1000      # plenty for a mark that renders at most ~380px wide
WHITE_TOL = 22        # how far from pure white still counts as background
FRINGE = 2            # px of antialiased edge to recover


def render_pdf(path, out_png):
    """Quick Look is the only vector rasteriser on this machine. It writes
    <name>.pdf.png next to the output directory, so the file is renamed after."""
    os.makedirs(SCRATCH, exist_ok=True)
    tmp = os.path.join(SCRATCH, os.path.basename(path))
    if tmp != path:
        subprocess.run(['cp', path, tmp], check=True)
    subprocess.run(['qlmanage', '-t', '-s', '2000', '-o', SCRATCH, tmp],
                   check=False, capture_output=True, timeout=90)
    produced = tmp + '.png'
    if not os.path.exists(produced):
        raise RuntimeError(f'Quick Look could not rasterise {path}')
    os.replace(produced, out_png)
    return out_png


def knockout(im):
    """Remove only the background that is reachable from the image border."""
    rgb = np.asarray(im.convert('RGB')).astype(np.int16)
    near_white = (rgb > (255 - WHITE_TOL)).all(axis=2)

    # Seed from the border and keep only the white component touching it.
    seeds = np.zeros_like(near_white)
    seeds[0, :] = seeds[-1, :] = True
    seeds[:, 0] = seeds[:, -1] = True
    seeds &= near_white
    background = ndimage.binary_propagation(seeds, mask=near_white)

    alpha = np.where(background, 0, 255).astype(np.uint8)

    # Recover the antialiased edge: pixels just inside the background that are
    # still light get partial alpha instead of a hard white halo.
    grown = ndimage.binary_dilation(background, iterations=FRINGE)
    fringe = grown & ~background
    lum = rgb.mean(axis=2)
    feather = np.clip(255 - lum, 0, 255).astype(np.uint8)
    alpha = np.where(fringe, np.maximum(feather, 0), alpha).astype(np.uint8)

    out = im.convert('RGBA')
    out.putalpha(Image.fromarray(alpha, 'L'))
    return out


def trim(im):
    """Crop to the ink. The sizer in blastoff-draft.js normalises by ink area,
    so baked-in padding would make a mark render smaller than its peers."""
    box = im.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
    return im.crop(box) if box else im


def main():
    if not os.path.isdir(OUT):
        sys.exit(f'{OUT}/ not found — run from the repo root')
    os.makedirs(SCRATCH, exist_ok=True)

    for slug, rel, needs_knockout in JOBS:
        path = rel
        if not os.path.exists(path):
            print(f'  SKIP {slug:11s} missing: {rel}')
            continue

        if path.lower().endswith('.pdf'):
            path = render_pdf(path, os.path.join(SCRATCH, slug + '.png'))

        im = Image.open(path)
        im = knockout(im) if needs_knockout else im.convert('RGBA')
        im = trim(im)

        if max(im.size) > LONG_EDGE:
            scale = LONG_EDGE / max(im.size)
            im = im.resize((round(im.width * scale), round(im.height * scale)),
                           Image.LANCZOS)

        dest = os.path.join(OUT, slug + '.png')
        im.save(dest, optimize=True)
        print(f'  {slug:11s} {im.width:4d}x{im.height:<4d} '
              f'{os.path.getsize(dest)//1024:4d}K  <- {rel}')


if __name__ == '__main__':
    main()
