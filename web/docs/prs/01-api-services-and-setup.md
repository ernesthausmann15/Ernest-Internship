# Pull request: API services and app setup

## The task

Stand up a Next.js App Router project beside the Create React App baseline and add the typed client for every live Ultraverse endpoint.

## Why

The existing app renders placeholder cards and never calls the marketplace API. A single API module keeps URLs, error handling, and JSON shapes out of the UI, so later sections can focus on layout and interaction. Next.js Server Components can fetch those functions during render, which means the browser does not need a second data library.

## How

- `web/` is a Next.js 16 app with TypeScript, Tailwind CSS v4, and shadcn/ui.
- `src/lib/types.ts` describes hot collections, sellers, explore listings, item details, and author profiles.
- `src/lib/api.ts` calls the Cloud Functions. Explore accepts `price_low_to_high`, `price_high_to_low`, and `likes_high_to_low`. Missing auctions are normalized to `expiryDate: null`. Unknown ids return `null` instead of throwing.
- `src/lib/format.ts` turns prices into `ETH` labels and collection codes into `ERC-192`.
- Remote artwork from `nft-place.web.app` is allowed in `next.config.ts`.
- The root layout sets the dark theme, Outfit and Syne fonts, and the shared header and footer.
- The home page calls the three list endpoints and prints the live titles and prices. It is a data check, not the finished marketplace UI.

Run it from `web/` with `npm install` and `npm run dev`.

## Live application screenshot placeholder

![Screenshot of the app shell](./screenshots/01-setup.png)
