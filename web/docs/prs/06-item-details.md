# Pull request: Item details

## The task

Add a piece page at `/item/[nftId]` using `/itemDetails?nftId=`.

## Why

Cards can show a title and a price. The purchase decision needs the description, view count, owner, creator, and full image. A route is shareable in a way a modal is not, and it matches the links already used by the grids and the carousel.

## How

- The page awaits the id from the URL and loads `getItemDetails`. Unknown ids render the 404 state.
- The title and description become the page metadata.
- `ItemView` lays the optimized image beside the metadata. Owner and creator rows link to their author pages.
- Creator portraits sometimes arrive as base64 data URIs. `NftImage` and the avatar use a normal image tag for those, and `next/image` for hosted files.
- The like control uses the same `useLikes` hook as the grid, so a heart tap is remembered across both screens in this browser.
- Price is formatted through `formatEth`.

## Live application screenshot placeholder

![Screenshot of item details](./screenshots/06-item-details.png)
