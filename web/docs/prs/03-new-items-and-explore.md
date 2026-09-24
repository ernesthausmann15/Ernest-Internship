# Pull request: New Items and Explore

## The task

Show live listings on the home page and add an Explore catalog with sorting, title search, likes, auction countdowns, and load-more.

## Why

The baseline hardcoded eight cards, a frozen countdown, and a filter `<select>` that did not change the list. Visitors need to sort the real catalog and see which auctions are still open. Likes and timers are interactions, so they stay in client components while the list itself is fetched on the server.

## How

- New Items uses the default `/explore` response and renders the first eight listings in a responsive grid. “View all” goes to `/explore`.
- `/explore` reads `filter` and `q` from the URL. Valid filters are forwarded to the API. `q` filters titles in the app because the API has no text search.
- Changing the shadcn select navigates to the new query string, which refetches on the server and makes the sort shareable.
- `NftCard` links to the item and the author. `CountdownBadge` ticks once a second via `useCountdown`. The first paint says “Live auction” so server and client HTML match, then the clock takes over.
- `LikeButton` adds the API count to a like stored in `localStorage`. The API is read-only, so this preference stays in the browser.
- Load more reveals the next eight cards from the payload already fetched. It does not call the API again.

## Live application screenshot placeholder

![Screenshot of Explore](./screenshots/03-explore.png)
