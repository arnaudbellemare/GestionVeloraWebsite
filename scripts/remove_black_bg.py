#!/usr/bin/env python3
"""
Remove black border from the second image (Pasted_Graphic).
Outputs cropped image with black background removed at best quality.
"""
from pathlib import Path

from PIL import Image

# Paths: Cursor saved assets
CURSOR_ASSETS = Path(
    "/Users/cno/.cursor/projects/Users-cno-GestionVeloraWebsite-GestionVeloraWebsite/assets"
)
WORKSPACE = Path("/Users/cno/GestionVeloraWebsite/GestionVeloraWebsite")
OUT_DIR = WORKSPACE / "public" / "images"

IMG_WITH_BORDER = CURSOR_ASSETS / "Pasted_Graphic_1-8b566a52-b482-4d18-967b-494e87389d93.png"
IMG_CLEAN_REF = CURSOR_ASSETS / "Cre_ation_sans_titre__2_-16eea167-561d-4fe8-bb64-3f7a5d8029a2.png"


def is_black(pixel, threshold=30):
    if len(pixel) == 4:
        r, g, b, a = pixel
    else:
        r, g, b = pixel
    return r <= threshold and g <= threshold and b <= threshold


def find_content_bbox(img: Image.Image, black_threshold: int = 30) -> tuple:
    """Find bounding box of non-black pixels."""
    pixels = img.load()
    w, h = img.size
    xmin, ymin, xmax, ymax = w, h, 0, 0
    for y in range(h):
        for x in range(w):
            if not is_black(pixels[x, y], black_threshold):
                xmin = min(xmin, x)
                ymin = min(ymin, y)
                xmax = max(xmax, x)
                ymax = max(ymax, y)
    if xmin >= xmax or ymin >= ymax:
        return (0, 0, w, h)
    pad = 2
    xmin = max(0, xmin + pad)
    ymin = max(0, ymin + pad)
    xmax = min(w, xmax - pad)
    ymax = min(h, ymax - pad)
    return (xmin, ymin, xmax, ymax)


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    if not IMG_WITH_BORDER.exists():
        print("Image not found:", IMG_WITH_BORDER)
        return
    img = Image.open(IMG_WITH_BORDER).convert("RGBA")
    bbox = find_content_bbox(img, black_threshold=35)
    cropped = img.crop(bbox)
    out_path = OUT_DIR / "our-standards-bg-no-border.png"
    cropped.save(out_path, "PNG", compress_level=6)
    print("Saved (black border removed):", out_path, "size:", cropped.size)

    if IMG_CLEAN_REF.exists():
        ref = Image.open(IMG_CLEAN_REF).convert("RGBA")
        ref_path = OUT_DIR / "our-standards-bg-clean.png"
        ref.save(ref_path, "PNG", compress_level=6)
        print("Saved clean reference:", ref_path, "size:", ref.size)


if __name__ == "__main__":
    main()
