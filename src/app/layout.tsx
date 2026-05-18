import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Bahen | Daima İstenilen",
  description:
    "Bahen Mühendislik için modern, scroll-driven animasyonlu Next.js vitrin taslağı.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="min-h-full antialiased">
      <head>
        <link rel="preload" as="video" href="/hero-scroll-scrub.mp4" type="video/mp4" />
        <link rel="preload" as="fetch" href="/ribbon.glb" crossOrigin="anonymous" />

        {/* Proje görselleri proxy'si bahen.com.tr'den çekiyor — TCP elden geçsin */}
        <link rel="dns-prefetch" href="https://www.bahen.com.tr" />
        <link rel="preconnect" href="https://www.bahen.com.tr" crossOrigin="anonymous" />
      </head>
      <body className="flex min-h-dvh min-w-0 flex-col overflow-x-clip bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
