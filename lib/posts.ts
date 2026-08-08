import { client } from "./microcms";
import type { Post } from "./types";

/**
 * 記事一覧を公開日時降順で取得する
 * @returns microCMSの記事一覧レスポンス（contents, totalCountなど）
 */
export const getPosts = async () => {
  return await client.getList<Post>({
    endpoint: "posts",
    queries: {
      orders: "-publishedAt",
    },
  });
};

/**
 * slugを指定して記事を1件取得する
 * @param slug - 記事のURLスラッグ
 * @returns 該当する記事。存在しない場合はundefined
 */
export const getPostBySlug = async (slug: string) => {
  const res = await client.getList<Post>({
    endpoint: "posts",
    queries: {
      filters: `slug[equals]${slug}`,
    },
  });

  return res.contents[0];
};
