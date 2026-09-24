# Pull request: Author profile

## The task

Add a dynamic creator page at `/author/[authorId]` using `/authors?author=`.

## Why

Every avatar in the baseline linked to one static `/author` page. Sellers, collection owners, and item creators all need their own bio, wallet, follower count, and works.

## How

- The page awaits `params`, then calls `getAuthor`. A missing id calls `notFound()` and renders the catalog 404.
- `generateMetadata` sets the document title to the creator’s name. The same URL is memoized with the page fetch.
- `AuthorView` shows the portrait, `@tag`, shortened wallet, and follower count. Copy writes the full address to the clipboard. Follow updates the count locally because the API does not accept writes.
- Tabs split “Created” (the `nftCollection` grid) from “About” (a summary built only from fields the API actually returns).
- Each piece reuses `NftCard`, so likes behave the same way as on Explore.

## Live application screenshot placeholder

![Screenshot of an author profile](./screenshots/05-author.png)
