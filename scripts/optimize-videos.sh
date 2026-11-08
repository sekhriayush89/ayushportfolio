#!/usr/bin/env bash
# Re-creates the web-optimized videos from your original files.
# Usage: bash scripts/optimize-videos.sh path/to/originals
# Expects: video.mp4 (intro), grpahic.mp4 (portrait), banner.mp4
set -euo pipefail
SRC="${1:?Pass the folder that contains the original videos}"
OUT="$(dirname "$0")/../public/videos"
mkdir -p "$OUT"
enc() { ffmpeg -y -i "$1" -an -vf "$2" -c:v libx264 -preset slow -crf "$3" -pix_fmt yuv420p -movflags +faststart "$4"; }
enc "$SRC/video.mp4"   "scale=640:640:flags=lanczos,fps=24"  23 "$OUT/intro.mp4"
enc "$SRC/grpahic.mp4" "scale=720:-2:flags=lanczos,fps=24"   23 "$OUT/portrait.mp4"
enc "$SRC/banner.mp4"  "scale=1280:-2:flags=lanczos,fps=24"  24 "$OUT/banner.mp4"
