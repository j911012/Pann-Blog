import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pann Blog",
  description:
    "React / TypeScript / Next.js を中心に、日々の実装と気づきを記録しています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-black text-white">
        {children}
        <footer className="py-6 text-center text-xs text-neutral-600 border-t border-neutral-800">
          © 2026 Pann Blog
        </footer>
      </body>
    </html>
  );
}
