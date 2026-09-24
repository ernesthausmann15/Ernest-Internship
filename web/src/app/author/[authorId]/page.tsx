/**
 * Author page.
 *
 * What: Dynamic profile at `/author/[authorId]`.
 * Why: Top sellers, collection avatars, and item owner links all need a
 *      real profile instead of one shared placeholder route.
 * How: The id comes from the URL. We await `params`, fetch `/authors`,
 *      and call `notFound()` when the API has no matching creator.
 */

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { AuthorView } from "@/components/author/author-view"
import { getAuthor } from "@/lib/api"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ authorId: string }>
}): Promise<Metadata> {
  const { authorId } = await params
  const author = await getAuthor(authorId)
  return {
    title: author?.authorName ?? "Author",
    description: author ? `Collection by ${author.authorName}` : "Author profile",
  }
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ authorId: string }>
}) {
  const { authorId } = await params
  const author = await getAuthor(authorId)
  if (!author) notFound()
  return <AuthorView author={author} />
}
