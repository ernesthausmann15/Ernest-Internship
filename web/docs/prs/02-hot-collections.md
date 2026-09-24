# Pull request: Hot Collections carousel

## The task

Replace the plain hot-collection titles with a draggable carousel fed by `/hotCollections`.

## Why

A text list does not show the artwork, and a static row cannot be dragged on a phone. A slider keeps several collections on screen and avoids a long horizontal scroll. keen-slider handles pointer dragging without pulling in a larger carousel framework.

## How

- The home page loads `getHotCollections()` inside its own `Suspense` boundary, so the rest of the page can paint before this request finishes.
- `HotCollections` is a Client Component because the slider needs the browser. The server passes the array in as props.
- Breakpoints show about one card on a phone, two on a small tablet, three on a laptop, and four on a wide screen. Looping turns on when there is more than one slide.
- Previous and next buttons call the slider instance. Cover art links to `/item/[nftId]`. The avatar and title link to `/author/[authorId]`. Those routes arrive in later parts.
- The numeric `code` field is displayed as `ERC-{code}`.
- Seller names and explore titles stay as the plain readout from the API setup branch.

## Live application screenshot placeholder

![Screenshot of Hot Collections](./screenshots/02-hot-collections.png)
