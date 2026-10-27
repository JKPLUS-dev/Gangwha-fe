import { Noto_Serif_KR } from "next/font/google";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../../../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  weight: "45 920",
  display: "swap",
  variable: "--font-a-sans",
});
import type { ReactNode } from "react";

const notoSerifKr = Noto_Serif_KR({
  weight: ["600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-a-serif",
});

/** /a 리뉴얼 전용 레이아웃: 제목용 Noto Serif KR + .home-a 스코프 */
export default function HomeALayout({ children }: { children: ReactNode }) {
  return <div className={`home-a ${notoSerifKr.variable} ${pretendard.variable}`}>{children}</div>;
}
