import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "许雅涵 - 个人主页",
  description: "许雅涵的个人介绍网页，展示教育经历、实习经历和技能",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
