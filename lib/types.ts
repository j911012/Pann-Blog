import type { MicroCMSListContent } from "microcms-js-sdk";

export type Tag = {
  name: string;
  slug: string;
} & MicroCMSListContent;

export type Post = {
  title: string;
  content: string;
  description: string;
  slug: string;
  tags: Tag[];
} & MicroCMSListContent;
