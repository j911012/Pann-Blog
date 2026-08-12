import { client } from "./microcms";
import type { Tag, Post } from "./types";

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

/**
 * タグのslugから、該当タグのコンテンツ情報を取得する
 * @param tagSlug - タグのslug
 * @returns 該当するタグ。存在しない場合はundefined
 */
export const getTagBySlug = async (tagSlug: string) => {
  const res = await client.getList<Tag>({
    endpoint: "tags",
    queries: {
      filters: `slug[equals]${tagSlug}`,
    },
  });

  return res.contents[0];
};

/**
 * 指定したタグslugに紐づく記事一覧を取得する
 * タグの絞り込みには、slugではなくコンテンツIDが必要なため、
 * 先にタグのコンテンツIDを取得してから、posts側の絞り込みに使う
 * @param tagSlug - タグのslug
 * @returns 該当タグが付いた記事一覧。タグが存在しない場合はundefined
 */
export const getPostsByTagSlug = async (tagSlug: string) => {
  const tag = await getTagBySlug(tagSlug);
  if (!tag) return undefined;

  const res = await client.getList<Post>({
    endpoint: "posts",
    queries: {
      filters: `tags[contains]${tag.id}`,
      orders: "-publishedAt",
    },
  });

  return { tag, posts: res.contents };
};
