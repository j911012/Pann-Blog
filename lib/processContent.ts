import rehypeShiki from "@shikijs/rehype";
import { Element, Root, Text } from "hast";
import rehypeParse from "rehype-parse";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import { visit } from "unist-util-visit";

/** 目次1項目分のデータ */
export type Heading = {
  id: string;
  text: string;
  level: number; // 2, 3, 4
};

/**
 * 見出し要素からテキスト内容だけを取り出す
 * @param node - 見出しのタグ要素
 * @returns 見出しのテキスト
 */
function extractText(node: Element): string {
  let text = "";
  visit(node, "text", (textNode: Text) => {
    text += textNode.value;
  });

  return text;
}

/**
 * microCMSのリッチエディタHTMLに対して、
 * 1. シンタックスハイライト(Shiki)
 * 2. 見出しへのID付与(rehype-slug)
 * 3. 見出し一覧(目次データ)の収集
 * を1回のパースでまとめて行う
 * @param html - リッチエディタのbodyフィールドの生HTML
 * @returns ハイライト・ID付与済みのHTML文字列と、見出し一覧
 */
export async function processPostBody(html: string) {
  const headings: Heading[] = [];

  const file = await unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeSlug)
    .use(() => (tree: Root) => {
      visit(tree, "element", (node: Element) => {
        if (["h2", "h3", "h4"].includes(node.tagName)) {
          const id = node.properties?.id as string | undefined;

          if (id) {
            headings.push({
              id,
              text: extractText(node),
              level: Number(node.tagName[1]), // "h2" なら "2" を取り出す
            });
          }
        }
      });
    })
    .use(rehypeShiki, { theme: "github-dark" })
    .use(rehypeStringify)
    .process(html);

  return { html: String(file), headings };
}
