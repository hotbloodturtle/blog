import type { Metadata } from "next";
import localFont from "next/font/local";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Blog",
    template: "%s | Blog",
  },
  description: "개인 생각 정리 및 웹앱 개발 기술 지식 공유",
  keywords: ["블로그", "개발", "기술", "웹개발", "Next.js", "React"],
  authors: [{ name: "Blog Author" }],
  creator: "Blog Author",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: "Blog",
    description: "개인 생각 정리 및 웹앱 개발 기술 지식 공유",
    siteName: "Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: "개인 생각 정리 및 웹앱 개발 기술 지식 공유",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body
        className={`font-sans min-h-screen flex flex-col ${pretendard.className}`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
