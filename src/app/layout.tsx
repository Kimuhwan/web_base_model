import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google"; // ★ Sans 제거, Serif만 유지
import "./globals.css";

// 제목용 명조체는 유지 (고급스러움 담당)
const serif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["300", "400", "600", "900"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "스테이 해온 | 바다가 머무는 곳",
  description: "한국의 미와 바다가 어우러진 프라이빗 스테이",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      {/* ★ 중요: body class에서 sans.variable을 삭제하고, serif.variable만 남김 */}
      <body className={`${serif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}