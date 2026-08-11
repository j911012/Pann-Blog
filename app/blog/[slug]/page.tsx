import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import { processPostBody } from "@/lib/processContent";
import { TableOfContents } from "@/components/TableOfContents";

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

  const { html, headings } = await processPostBody(post.body);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12">
        {/* 本文カラム */}
        <div className="max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-300 hover:underline underline-offset-4 transition mb-8"
          >
            <ArrowLeft size={16} />
            一覧に戻る
          </Link>

          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-sm text-neutral-500 mb-3">
              {post.publishedAt?.slice(0, 10).replaceAll("-", "/")}
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
            className="
              prose prose-invert prose-neutral max-w-none
              [&_h2]:scroll-mt-8 [&_h3]:scroll-mt-8 [&_h4]:scroll-mt-8
              [&_:not(pre)>code]:before:content-none
              [&_:not(pre)>code]:after:content-none
              [&_:not(pre)>code]:bg-neutral-800
              [&_:not(pre)>code]:text-neutral-200
              [&_:not(pre)>code]:px-1.5
              [&_:not(pre)>code]:py-0.5
              [&_:not(pre)>code]:rounded
              [&_:not(pre)>code]:font-normal
            "
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>

        {/* 目次カラム(lg以上でのみ表示) */}
        <aside className="hidden lg:block">
          <div className="sticky top-10">
            <p className="font-semibold text-white mb-3">Table of Contents</p>
            <TableOfContents headings={headings} />
          </div>
        </aside>
      </div>
    </main>
  );
}
