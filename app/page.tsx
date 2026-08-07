import { getPosts } from "@/lib/posts";

export default async function Home() {
  const { contents, totalCount } = await getPosts();

  return (
    <div style={{ padding: "40px" }}>
      <h1>Pann Blog（疎通確認）</h1>
      <p>件数: {totalCount}</p>
      <ul>
        {contents.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <br />
            slug: {post.slug} / publishedAt: {post.publishedAt}
            <br />
            tags: {post.tags?.map((tag) => tag.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}
