#!/usr/bin/env python3
"""Crop each sponsor logo tight to its artwork, then re-quantise.

Sizing is computed at runtime from each file's aspect ratio (see sizeLogo in
blastoff-element.js), so any transparent padding baked into a file would be
read as part of the mark and throw the balance off. Everything must be cropped
tight to its alpha bounding box.

Re-quantising matters too: cropping re-saves as RGBA, which discards the
palette and takes the set from ~272K to ~692K. RGBA images can only be
quantised with Fast Octree or libimagequant, not the default Median Cut.

Idempotent — safe to re-run after dropping in a new logo.
"""
import glob
import os

from PIL import Image

total_before = total_after = 0

for path in sorted(glob.glob('assets/logos/*.png')):
    before_bytes = os.path.getsize(path)
    im = Image.open(path).convert('RGBA')

    # Threshold the alpha so anti-aliased fringes don't inflate the box.
    mask = im.split()[-1].point(lambda a: 255 if a > 8 else 0)
    bb = mask.getbbox()
    if not bb:
        print(f'{os.path.basename(path):<15} EMPTY, skipped')
        continue

    before_size = im.size
    im = im.crop(bb)
    im.quantize(colors=256, method=Image.FASTOCTREE).save(path, optimize=True)

    after_bytes = os.path.getsize(path)
    total_before += before_bytes
    total_after += after_bytes
    w, h = im.size
    print(f'{os.path.basename(path):<15} {before_size[0]}x{before_size[1]} -> {w}x{h}'
          f'  aspect {w / h:5.2f}  {before_bytes // 1024:>4}K -> {after_bytes // 1024:>4}K')

print(f'\ntotal {total_before // 1024}K -> {total_after // 1024}K')
