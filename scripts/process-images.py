#!/usr/bin/env python3
"""
Image pipeline for The Cake Vibe.

Reads original photos from raw-photos/, then for each photo:
  1. crops away phone "story" bars / watermarks (see CROPS)
  2. enhances it (JPEG de-noise, Lanczos upscale, levels, gentle local
     contrast, vibrance, unsharp mask)
  3. writes responsive WebP sizes to public/images/cakes/
  4. writes src/data/imageManifest.json (dimensions + tiny blur placeholder)

Requires ImageMagick 7 (`magick`) and Pillow.
Run:  python3 scripts/process-images.py
"""
import base64
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "raw-photos"
OUT = ROOT / "public" / "images" / "cakes"
MANIFEST = ROOT / "src" / "data" / "imageManifest.json"

WIDTHS = [480, 960, 1440]
TARGET_LONG_SIDE = 1800  # smaller photos are upscaled to this before enhancing

# id -> (x, y, w, h) crop to remove story bars / watermarks
CROPS = {
    "cake-01": (0, 328, 900, 944),
    "cake-03": (0, 393, 900, 814),
    "cake-04": (0, 383, 900, 834),
    "cake-17": (0, 385, 899, 737),
    "cake-18": (0, 3, 713, 577),  # removes "Shot by" phone watermark
}

ENHANCE = [
    "-enhance",  # mild JPEG/noise cleanup
    "-filter", "Lanczos", "-resize", f"{TARGET_LONG_SIDE}x{TARGET_LONG_SIDE}<",
    "-contrast-stretch", "0.2%x0.4%",
    "-clahe", "32x32%+128+1.3",
    "-modulate", "103,110,100",
    "-unsharp", "0x1.2+0.8+0.015",
]


def run(args):
    subprocess.run(args, check=True)


def dims(path):
    out = subprocess.run(
        ["magick", "identify", "-format", "%w %h", str(path)],
        check=True, capture_output=True, text=True,
    ).stdout.split()
    return int(out[0]), int(out[1])


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = {}
    for src in sorted(RAW.glob("*.jpg")):
        cid = src.stem
        master = OUT / f"{cid}-master.png"
        cmd = ["magick", str(src), "-auto-orient", "-colorspace", "sRGB"]
        if cid in CROPS:
            x, y, w, h = CROPS[cid]
            cmd += ["-crop", f"{w}x{h}+{x}+{y}", "+repage"]
        cmd += ENHANCE + ["-strip", str(master)]
        run(cmd)

        mw, mh = dims(master)
        for w in WIDTHS:
            target = min(w, mw)
            run([
                "magick", str(master), "-filter", "Lanczos",
                "-resize", f"{target}x", "-quality", "82",
                "-define", "webp:method=6", str(OUT / f"{cid}-{w}.webp"),
            ])
        # tiny blurred placeholder, inlined as base64
        lq = subprocess.run(
            ["magick", str(master), "-resize", "20x", "-quality", "40", "webp:-"],
            check=True, capture_output=True,
        ).stdout
        manifest[cid] = {
            "width": mw,
            "height": mh,
            "placeholder": "data:image/webp;base64," + base64.b64encode(lq).decode(),
        }
        master.unlink()
        print(f"{cid}: {mw}x{mh}")

    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Wrote {len(manifest)} images -> {MANIFEST.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
