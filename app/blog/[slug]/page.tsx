import { highlightCode } from "@/lib/highlight";
import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const highlightedBody = await highlightCode(post.body);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{post.title}</h1>
      <div
        className="prose prose-invert prose-neutral max-w-none
    [&_:not(pre)>code]:before:content-none
    [&_:not(pre)>code]:after:content-none
    [&_:not(pre)>code]:bg-neutral-800
    [&_:not(pre)>code]:text-neutral-200
    [&_:not(pre)>code]:px-1.5
    [&_:not(pre)>code]:py-0.5
    [&_:not(pre)>code]:rounded
    [&_:not(pre)>code]:font-normal"
        dangerouslySetInnerHTML={{ __html: highlightedBody }}
      />
    </main>
  );
}
