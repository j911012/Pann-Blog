import { client } from "./microcms";
import type { Post } from "./types";

// 記事一覧を取得
export const getPosts = async () => {
  return await client.getList<Post>({
    endpoint: "posts",
    queries: {
      orders: "-publishedAt",
    },
  });
};

// slugから記事を１件取得
export const getPostBySlug = async (slug: string) => {
  const res = await client.getList<Post>({
    endpoint: "posts",
    queries: {
      filters: `slug[equals]${slug}`,
    },
  });

  return res.contents[0];
};
