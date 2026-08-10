"use client";

import { Heading } from "@/lib/processContent";
import { useEffect, useState } from "react";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 画面内に入った見出しの中から、一番上にあるものをアクティブにする（findは条件に一致する最初の要素を返すため）
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        // 画面の上から20%~下から80%の範囲に入ったら「見えている」とみなす
        rootMargin: "0px 0px -80% 0px",
      },
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav className="text-sm space-y-2">
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={`block transition ${
            activeId === heading.id
              ? "text-white font-semibold"
              : "text-neutral-400 hover:text-white"
          }`}
          style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );
}
