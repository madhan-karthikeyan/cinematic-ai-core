## Goal
Replace the hero portrait with the newly uploaded B&W photo, relit to studio-grade quality that matches the portfolio's cinematic dual-tone (cool cyan / warm amber) aesthetic on a near-black background.

## Steps

1. **Save the upload as a working source**
   - Copy `user-uploads://ChatGPT_Image_May_15_2026_11_22_03_AM.png` to `src/assets/portrait-source.png` (kept as raw reference, not imported).

2. **AI relight pass** (`imagegen--edit_image`)
   - Input: the uploaded B&W portrait.
   - Prompt direction:
     - Convert B&W → low-key color grade with natural skin tones.
     - **Key light:** soft warm amber (≈ #ffb27a) from camera-right, sculpting the cheekbone and jaw.
     - **Rim light:** cool cyan (≈ #6ec5ff) from camera-left, defining hair silhouette and shoulder edge.
     - **Fill:** very low, deep shadows preserved (low-key studio).
     - Background: pure near-black (#050505), seamless, no banding.
     - Subtle atmospheric haze where rim light meets background.
     - Sharp eyes, retain pores/texture, no beautify smoothing.
     - Cinematic editorial color grade, mild highlight lift, crushed blacks.
     - Composition, framing, facial features unchanged.
   - Output: `src/assets/portrait.png` (overwrites current portrait so `Portrait.tsx` import keeps working — no code change needed there).
   - Aspect ratio: `3:4` to match the existing hero frame.

3. **Verify in preview**
   - Confirm portrait swap renders correctly inside the existing alpha-mask + dual-tone aura in `Portrait.tsx`.
   - If edges feel too hard against the background, lightly tune the existing radial mask in `Portrait.tsx` (no structural changes).

## Out of scope
- No layout/animation/typography changes to the hero.
- No changes to other sections.
- Not touching `Hero.tsx` unless the relit image needs mask tweaks.
