import { Noto_Serif_KR } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";

const pretendard = localFont({
  src: "../../../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  weight: "45 920",
  display: "swap",
  variable: "--font-a-sans",
});

const notoSerifKr = Noto_Serif_KR({
  weight: ["600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-a-serif",
});

/** /a 전용: Pretendard 본문·제목, Noto Serif KR은 히어로·생산자 인용만 */
export default function HomeALayout({ children }: { children: ReactNode }) {
  return <div className={`home-a ${pretendard.variable} ${notoSerifKr.variable}`}>{children}</div>;
}
