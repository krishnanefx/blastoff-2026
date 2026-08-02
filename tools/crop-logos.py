#!/usr/bin/env python3
"""Crop each baked logo to its alpha bounding box.

The previous bake padded wide lockups vertically to fake optical balance. That
has to come off: sizing is now computed at runtime from the true ink aspect
ratio, so any baked-in padding would skew it.
"""
import glob, os
from PIL import Image

for path in sorted(glob.glob('assets/logos/*.png')):
    im = Image.open(path).convert('RGBA')
    # Threshold the alpha so anti-aliased fringes don't inflate the box.
    mask = im.split()[-1].point(lambda a: 255 if a > 8 else 0)
    bb = mask.getbbox()
    if not bb:
        print(f'{os.path.basename(path):<14} EMPTY, skipped')
        continue
    before = im.size
    im = im.crop(bb)
    im.save(path, optimize=True)
    print(f'{os.path.basename(path):<14} {before[0]}x{before[1]} -> {im.size[0]}x{im.size[1]}'
          f'   aspect {im.size[0]/im.size[1]:.2f}')
