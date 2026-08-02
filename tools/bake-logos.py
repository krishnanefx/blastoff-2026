#!/usr/bin/env python3
"""Normalise sponsor logos for the Blastoff! cream logo band.

    python3 tools/bake-logos.py <raw-dir> assets/logos


Three passes per file:
  1. strip an opaque near-white background (edge flood fill -> alpha 0)
  2. crop to the alpha bounding box (kills SVG export padding)
  3. optical-area normalise onto a fixed-height transparent canvas

Height normalisation alone cannot balance a 9.9:1 wordmark against a 0.97:1
crest -- equal height makes the crest read tiny. So content height is scaled by
(A_REF / aspect) ** P: wide lockups sit shorter, tall crests fill the canvas.
Every output is CANVAS_H tall, so the existing `height: 56px` CSS still works
and every logo lands at the same optical weight.
"""
import os, sys
import numpy as np
from PIL import Image, ImageDraw

CANVAS_H = 200          # every output is exactly this tall
A_REF    = 2.2          # aspect that gets full-ish height
P        = 0.40         # how hard to punish extreme aspects
F_MIN    = 0.50         # a wide lockup never drops below half canvas height
F_MAX    = 1.00
MAX_ASPECT = 5.0        # cap canvas aspect so nothing blows past CSS max-width
SENTINEL = (1, 2, 3)


def strip_white_box(im):
    """Flood fill an opaque near-white background from the edges to transparent."""
    a = np.array(im.getchannel('A'))
    if a.min() < 250:
        return im, False                      # already has real transparency
    rgb = np.array(im.convert('RGB'))
    border = np.concatenate([rgb[0, :], rgb[-1, :], rgb[:, 0], rgb[:, -1]])
    if border.min() < 225:
        return im, False                      # border isn't white -> real tile (e.g. HTX)

    flat = im.convert('RGB')
    w, h = flat.size
    seeds = [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1),
             (w // 2, 0), (w // 2, h - 1), (0, h // 2), (w - 1, h // 2)]
    for s in seeds:
        try:
            ImageDraw.floodfill(flat, s, SENTINEL, thresh=42)
        except Exception:
            pass
    arr = np.array(flat)
    mask = np.all(arr == np.array(SENTINEL), axis=-1)
    out = np.array(im)
    out[mask] = (0, 0, 0, 0)
    return Image.fromarray(out), True


def bake(path):
    im = Image.open(path).convert('RGBA')
    im, stripped = strip_white_box(im)

    bb = im.getchannel('A').getbbox()
    if bb:
        im = im.crop(bb)
    cw, ch = im.size
    aspect = cw / ch

    f = min(F_MAX, max(F_MIN, (A_REF / aspect) ** P))
    target_h = CANVAS_H * f
    target_w = target_h * aspect
    if target_w > CANVAS_H * MAX_ASPECT:            # too wide -> fit to the cap
        target_w = CANVAS_H * MAX_ASPECT
        target_h = target_w / aspect

    im = im.resize((max(1, round(target_w)), max(1, round(target_h))), Image.LANCZOS)
    canvas = Image.new('RGBA', (im.width, CANVAS_H), (0, 0, 0, 0))
    canvas.alpha_composite(im, (0, (CANVAS_H - im.height) // 2))
    return canvas, dict(src=(cw, ch), aspect=aspect, f=f, stripped=stripped,
                        out=canvas.size, content_h=im.height)


def save(im, path):
    """Palette-quantise when it pays. At a 56px render the crests are visually
       identical to full RGBA and the set drops from ~900KB to ~220KB."""
    import io
    buf = io.BytesIO()
    q = im.quantize(colors=256, method=Image.FASTOCTREE, dither=Image.NONE)
    q.save(buf, 'PNG', optimize=True)
    rgba = io.BytesIO()
    im.save(rgba, 'PNG', optimize=True)
    if buf.tell() < rgba.tell() * 0.92:
        open(path, 'wb').write(buf.getvalue())
        return buf.tell(), True
    open(path, 'wb').write(rgba.getvalue())
    return rgba.tell(), False


if __name__ == '__main__':
    src, dst = sys.argv[1], sys.argv[2]
    if os.path.abspath(src) == os.path.abspath(dst):
        sys.exit('refusing to bake a directory onto itself — bake from raw sources')
    os.makedirs(dst, exist_ok=True)
    print(f'{"slug":11} {"source":11} {"asp":>5} {"f":>5} {"canvas":11} {"@56px":11} {"size":>8}  notes')
    for fn in sorted(os.listdir(src)):
        if not fn.endswith('.png'):
            continue
        out, info = bake(os.path.join(src, fn))
        nbytes, quantised = save(out, os.path.join(dst, fn))
        r56 = (round(out.width * 56 / CANVAS_H), 56)
        notes = ' '.join(filter(None, ['white-box-stripped' if info['stripped'] else '',
                                       'quantised' if quantised else 'rgba']))
        print(f'{fn[:-4]:11} {str(info["src"]):11} {info["aspect"]:5.2f} {info["f"]:5.2f} '
              f'{str(info["out"]):11} {str(r56):11} {nbytes/1024:7.1f}K  {notes}')
