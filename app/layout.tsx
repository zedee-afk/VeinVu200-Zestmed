import type { Metadata, Viewport } from "next";
import { Mitr, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const mitr = Mitr({
  variable: "--font-mitr",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600"],
});

const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "700"],
});

const title = "VeinVu200 - Zestmed | เครื่องสแกนเส้นเลือด NIR";
const description =
  "VeinVu 200 เครื่องช่วยมองเห็นเส้นเลือดด้วยแสง Near-Infrared 850 nm แบบ Real-time ช่วยประเมินตำแหน่งก่อนเจาะเลือดและให้สารน้ำ นัดสาธิตฟรีกับทีม Zest-Med";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: "Zest-Med",
    locale: "th_TH",
    type: "website",
    images: [{ url: "/images/hero-device.png", width: 545, height: 510, alt: "VeinVu 200" }],
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#1a4bad",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${mitr.variable} ${notoThai.variable} antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
