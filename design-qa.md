# Design QA

source visual truth path: `/var/folders/_q/2x5vxtkn6lj6m57thqq0_tmm0000gp/T/codex-clipboard-l4xy8I.png`
implementation screenshot path: `design-qa-desktop.png`
responsive screenshot path: `design-qa-mobile.png`

## Evidence

- Source: 2048 × 1216 px screenshot, desktop hero reference.
- Desktop implementation: 1435 × 797 CSS px Chrome viewport, captured at device scale 1. The browser’s stable local preview viewport was used for the implementation evidence; the source was reviewed at its native dimensions for composition and hierarchy.
- Mobile implementation: 390 × 844 CSS px viewport, captured at device scale 1.
- State: homepage at scroll position 0, globe textures loaded, single Trenggalek marker visible, auto-rotation enabled.
- Full-view comparison: black canvas, smaller Inter typography, restrained white/gray hierarchy, right-side globe crop, and primary/secondary actions match the requested direction. The implementation intentionally adds navigation and below-the-fold capability/contact sections because this is a landing page rather than a hero-only mock.
- Focused region comparison: hero copy/actions and globe marker placement were checked separately; the globe uses the supplied Aceternity avatar-marker treatment rather than country flags.

## Findings

No actionable P0, P1, or P2 findings remain.

P3 follow-up: the remote Earth texture and Aceternity avatar are external assets; self-host them later if the production deployment needs offline or deterministic asset loading.

## Interaction checks

- Mobile `Open menu` control resolved uniquely and opened a `Close menu` state.
- Navigation anchors and CTA links are present.
- Desktop document width did not overflow the viewport.
- One canvas rendered in the browser; screenshot samples differed across a 2.2 second interval, confirming globe motion.
- A real drag gesture on the rendered canvas changed the globe frame, confirming direct orbit rotation is playable.
- Browser console had no page-owned errors. Dev-only warnings observed were the existing TanStack not-found fallback warning and `THREE.Clock` deprecation warning.

## Final result

passed
