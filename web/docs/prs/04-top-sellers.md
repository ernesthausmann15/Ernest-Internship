# Pull request: Top Sellers

## The task

Render the ranked seller list from `/topSellers` with avatars and ETH volume.

## Why

The original list repeated “Monica Lucas / 2.1 ETH” twelve times. A leaderboard is easier to scan as a numbered list than as another card grid, and each person should open their own profile.

## How

- `TopSellersSection` on the home page fetches `getTopSellers()` inside `Suspense`.
- The API order is the rank. The component prints `index + 1`. The first three ranks use the accent color.
- Each row shows the verified avatar, name, and `formatEth(price)`, and links to `/author/[authorId]`. That profile page arrives in the next part.
- An empty or failed response shows a short unavailable message instead of breaking the rest of the home page.

## Live application screenshot placeholder

![Screenshot of Top Sellers](./screenshots/04-top-sellers.png)
