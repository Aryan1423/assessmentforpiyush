# Logistics Order Form And Live Preview

Design-first logistics order form built in `Next.js` with plain `JavaScript`, `React`, and `CSS Modules`. The experience is split into a responsive two-panel layout:

- Left panel: shipment creation form
- Right panel: live logistics summary preview

The application follows the assignment constraints:

- `Next.js` App Router
- plain JavaScript only
- CSS Modules only
- no global CSS files
- no inline styles
- no CSS-in-JS libraries
- no UI frameworks
- no external form libraries

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run test
```

## Project Structure

- [app/page.js](/workspaces/assessmentforpiyush/app/page.js): page entry, intro shell, initial order meta generation
- [components/LogisticsOrderApp.jsx](/workspaces/assessmentforpiyush/components/LogisticsOrderApp.jsx): client-side reducer container and app orchestration
- [components/LivePreviewPanel.jsx](/workspaces/assessmentforpiyush/components/LivePreviewPanel.jsx): real-time shipment preview
- [utils/orderState.js](/workspaces/assessmentforpiyush/utils/orderState.js): initial state, order ID generation, reducer logic
- [utils/orderSelectors.js](/workspaces/assessmentforpiyush/utils/orderSelectors.js): derived preview totals and summaries
- [tests/LogisticsOrderApp.test.jsx](/workspaces/assessmentforpiyush/tests/LogisticsOrderApp.test.jsx): UI interaction coverage

## Architecture Notes

- A page-level `useReducer` manages shipment details, sender/receiver data, package rows, and additional options.
- Numeric package values remain string inputs in state for better editing UX, then convert to numbers only inside selectors for totals and summaries.
- The preview is fully derived from state and updates on every input change with no submit step.
- Package cards are independently editable, support add/remove behavior, and enforce the minimum one-package rule.

## Design Rationale

- The UI uses a warm logistics palette with dark ink preview surfaces and amber highlights to avoid generic dashboard styling.
- Serif display typography and a structured spacing system create stronger visual hierarchy.
- The preview panel stays sticky on larger screens so form edits and logistics output stay visible together.
- Subtle motion is kept inside CSS Modules for polish without overwhelming the interface.

## Testing

The project includes reducer, selector, and interaction tests for:

- shipment field updates
- sender and receiver updates
- package add/remove behavior
- minimum package enforcement
- live preview recalculation
- delivery badge and shipment option indicators

## Submission Handoff

- Figma design link: `TODO`
- GitHub repository link: `TODO`
- Live deployed preview link: `TODO`

## Submission Checklist

- [ ] Figma design closely matches implemented UI
- [ ] Public GitHub repository is ready to share
- [ ] Live preview is deployed and functional
- [ ] Responsive behavior verified on desktop, tablet, and mobile
- [ ] `npm run build` passes
- [ ] `npm run test` passes
