import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "강화장터 | 강화도 특산품 산지직송",
  description: "강화섬쌀, 순무, 인삼, 새우젓까지 강화 생산자가 직접 보내는 특산품 쇼핑몰",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <MobileTabBar />
      </body>
    </html>
  );
}
