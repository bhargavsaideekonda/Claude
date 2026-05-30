# Assets

Drop your branding here. The app reads each file by name.

| File | What it is | Required size |
|---|---|---|
| `logo.png` | The Palnadu Co-operative Society circular logo (the one Bhargav shared). Used inside the SoldierBadge ring everywhere. | 512×512 (square, transparent or white background) |
| `icon.png` | App launcher icon (Android & iOS) | 1024×1024 |
| `adaptive-icon.png` | Android adaptive icon foreground | 1024×1024 (transparent center; safe zone 660px) |
| `splash.png` | Native splash image shown before JS boots | 1242×2436 (or any 2:1 portrait) |

If `logo.png` is missing the app falls back to a stylised "P · MACS" monogram so it still looks great while you prepare the assets.

## Quick way to add the logo

1. Save the society logo image as `logo.png` in this folder.
2. (Optional) duplicate it to `icon.png`, `adaptive-icon.png`, and `splash.png` for now — Expo will pick them up.
3. Run `npm start` and the SoldierBadge will show the real logo.
