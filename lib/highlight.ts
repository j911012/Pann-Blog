import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import rehypeShiki from "@shikijs/rehype";

/**
 * microCMSのリッチエディタから返るHTML文字列内の<pre><code>ブロックに
 * シンタックスハイライトを適用し、色付け済みのHTML文字列を返す
 * サイト全体がダークテーマ固定のため、Shikiのテーマも単一指定にしている
 * @param html - リッチエディタのbodyフィールドの生HTML
 * @returns シンタックスハイライト適用後のHTML文字列
 */
export async function highlightCode(html: string): Promise<string> {
  const file = await unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeShiki, {
      theme: "github-dark",
    })
    .use(rehypeStringify)
    .process(html);

  return String(file);
}
