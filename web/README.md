# Ultraverse

Next.js marketplace for the live Ultraverse NFT API. The Create React App in the repository root is the original baseline. This app lives in `web/`.

## Run

```bash
cd web
npm install
npm run dev
```

Open http://localhost:3000. The home page has the carousel, new items, and seller ranking. `/explore` sorts and searches. `/author/[authorId]` is a creator profile. `/item/[nftId]` is one piece.

## Branches

- `feature/api-services` — app shell and typed client
- `feature/hot-collections` — Hot Collections carousel
- `feature/new-items-and-explore` — New Items grid and Explore catalog
- `feature/top-sellers` — ranked seller list
- `feature/author-profile` — dynamic creator page
- `feature/item-details` — piece page with price, owner, and creator

Pull request notes are in `docs/prs/`.
