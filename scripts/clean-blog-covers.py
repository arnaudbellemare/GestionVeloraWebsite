#!/usr/bin/env python3
"""Crop black letterboxing from blog cover WebP assets (900x675)."""
from pathlib import Path

from PIL import Image

BLOG_DIR = Path(__file__).resolve().parents[1] / "public" / "images" / "blog"
SKIP = {"noi-data-clean", "preventive-maintenance-clean", "tenant-experience-clean"}


def is_black(pixel, threshold: int = 32) -> bool:
    if len(pixel) == 4:
        r, g, b, a = pixel
        if a < 8:
            return True
    else:
        r, g, b = pixel
    return r <= threshold and g <= threshold and b <= threshold


def content_bbox(img: Image.Image, threshold: int = 32) -> tuple[int, int, int, int]:
    pixels = img.load()
    w, h = img.size
    xmin, ymin, xmax, ymax = w, h, 0, 0
    for y in range(h):
        for x in range(w):
            if not is_black(pixels[x, y], threshold):
                xmin = min(xmin, x)
                ymin = min(ymin, y)
                xmax = max(xmax, x)
                ymax = max(ymax, y)
    if xmin >= xmax or ymin >= ymax:
        return (0, 0, w, h)
    pad = 4
    return (
        max(0, xmin - pad),
        max(0, ymin - pad),
        min(w, xmax + pad),
        min(h, ymax + pad),
    )


def main() -> None:
    for src in sorted(BLOG_DIR.glob("*.webp")):
        stem = src.stem
        if stem.endswith("-clean") or stem in SKIP:
            continue
        out = BLOG_DIR / f"{stem}-clean.webp"
        img = Image.open(src).convert("RGB")
        cropped = img.crop(content_bbox(img))
        cropped.save(out, "WEBP", quality=88, method=6)
        print(f"{src.name} -> {out.name} ({cropped.size[0]}x{cropped.size[1]})")


if __name__ == "__main__":
    main()
