#!/usr/bin/env python3
"""Convert generated cover-*.png assets into optimized 1200x900 WebP blog covers.

Crops to a 4:3 center frame, writes to public/images/blog/, then removes the
source PNG to reclaim disk space. Corrupt/truncated PNGs are deleted and skipped.
"""
from pathlib import Path

from PIL import Image, UnidentifiedImageError

ASSETS = Path("/Users/cno/.cursor/projects/Users-cno-GestionVeloraWebsite-2/assets")
OUT_DIR = Path(__file__).resolve().parents[1] / "public" / "images" / "blog"
TARGET_W, TARGET_H = 1200, 900


def crop_cover(img: Image.Image) -> Image.Image:
    src_ratio = img.width / img.height
    target_ratio = TARGET_W / TARGET_H
    if src_ratio > target_ratio:
        new_w = int(img.height * target_ratio)
        left = (img.width - new_w) // 2
        img = img.crop((left, 0, left + new_w, img.height))
    else:
        new_h = int(img.width / target_ratio)
        top = (img.height - new_h) // 2
        img = img.crop((0, top, img.width, top + new_h))
    return img.resize((TARGET_W, TARGET_H), Image.LANCZOS)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for src in sorted(ASSETS.glob("cover-*.png")):
        try:
            img = Image.open(src)
            img.load()
        except (UnidentifiedImageError, OSError) as exc:
            print(f"SKIP corrupt {src.name}: {exc}")
            src.unlink(missing_ok=True)
            continue
        out = OUT_DIR / f"{src.stem}.webp"
        crop_cover(img.convert("RGB")).save(out, "WEBP", quality=86, method=6)
        size_kb = out.stat().st_size // 1024
        print(f"{src.name} -> {out.name} ({size_kb} KB)")
        src.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
