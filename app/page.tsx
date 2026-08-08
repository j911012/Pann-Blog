import Link from "next/link";
import { getGradient, noiseTexture } from "@/lib/gradients";
import { getPosts } from "@/lib/posts";

export default async function Home() {
  const { contents } = await getPosts();

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10 max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-2xl font-bold">Pann Blog</h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contents.map((post, index) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="block rounded-xl overflow-hidden bg-neutral-900 hover:opacity-90 transition"
          >
            <div
              className="relative h-44 p-4 flex flex-col justify-between overflow-hidden"
              style={{
                backgroundImage: getGradient(index),
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* ノイズオーバーレイ */}
              <div
                className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: noiseTexture }}
              />

              <h2 className="relative font-bold text-lg leading-snug">
                {post.title}
              </h2>
              <span className="relative self-end text-xs text-white/70">
                Pann Blog
              </span>
            </div>

            <div className="p-4">
              <p className="text-xs text-neutral-400 mb-2">
                {post.publishedAt?.slice(0, 10)}
              </p>
              <div className="flex gap-2 flex-wrap">
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="text-xs bg-neutral-800 px-2 py-1 rounded-full text-neutral-300"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
