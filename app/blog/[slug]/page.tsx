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
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-sm text-neutral-500 mb-3">
          {post.publishedAt?.slice(0, 10).replace("-", "/")}
        </p>
        <div className="flex gap-2 flex-wrap">
          {post.tags.map((tag) => (
            <span
              key={tag.id}
              className="text-xs bg-neutral-800 px-2.5 py-1 rounded-full text-neutral-300"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </header>

      <hr className="border-neutral-800 mb-8" />

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
