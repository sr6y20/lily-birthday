# Happy Birthday 🎂 · Birthday Wish

An animated birthday card with a Japanese sensibility: an origami star travels down the page and delivers a birthday letter, which you can fold into a keepsake card and save as an image. Trilingual (Chinese / English / Japanese), fully static, no backend.

[中文 README](./README.md) · [日本語 README](./README.ja.md)

## Features

- **Card sections**: torii gate and washi-textured opening, a blow-out-the-candles birthday cake, a haiku, a wish message, a timeline
- **Flip cards**: three wishes (health / dreams / encounters), advanced by click or keyboard Enter / Space, animated with GSAP Flip
- **The origami star's journey**: the star travels from the wishes section to the envelope in the footer driven by natural scrolling (`Flip.fit` + `ScrollTrigger`), rebuilt automatically when the layout changes
- **Birthday letter**: click the envelope to open it — flap, paper and paragraphs appear in timeline order; the letter ends with a motif drawn by DrawSVG that matches the current wish (cherry branch / star trail / binding knot)
- **Keepsake card**: "Fold the letter away" turns the paper into a keepsake card you can reopen, or export as a 1080×1440 PNG with the native Canvas API (generated locally, never uploaded)
- **Three languages**: switch between 中文 / English / 日本語; the choice persists in localStorage, and `html lang` plus the document title follow along
- **Ambient effects**: fireworks, falling sakura, shooting stars, fireflies, mouse trail, confetti, origami cranes and lanterns — all with a `prefers-reduced-motion` fallback

## Getting started

```bash
npm install
npm run dev      # dev server
npm run build    # production build to dist/
npm run preview  # preview the build
```

## URL parameters

| Param  | Description                        | Example                          |
| ------ | ---------------------------------- | -------------------------------- |
| `date` | Birthday date, `M-D` or `YYYY-M-D` | `?date=11-12`, `?date=2027-2-21` |

- Missing or invalid values (`2-30`, `abc`) fall back to the default date, **February 26**
- The date applies to the hero, the letter, the keepsake card and the exported PNG, rendered per locale (`November 12th` / `十一月十二日`)

## Project structure

```
src/
├── App.vue            # page layout, GSAP choreography, DrawSVG motifs, PNG export
├── App.css            # all styles and theme variables (--wish-accent / --wish-ink switch with the wish)
├── i18n.js            # vue-i18n setup and language persistence
├── locales/           # zh / en / ja copy
└── components/        # cake, cranes, lanterns, fireworks and other standalone effects
```

## Customizing

- **Wishes and letter copy**: edit `wishes.items` and `letter.*` in `src/locales/*.json`
- **Signature**: edit `message.signature`
- **Motif paths**: `motifVariants` in `App.vue` is the single source shared by the letter drawing, the keepsake card and the PNG — change once, all three follow
- **Palette**: the `.app[data-wish="N"]` variable blocks at the top of `App.css`

## Notes

- Image export happens entirely in the browser — nothing is collected or uploaded

## License

[MIT](./LICENSE)
