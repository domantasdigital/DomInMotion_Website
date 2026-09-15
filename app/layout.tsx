import type { Metadata } from "next";
import { Bevan, Pontano_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar/navbar";
import Footer from "@/components/Footer/Footer";

const bevan = Bevan({
  weight: "400",
  variable: "--font-bevan",
  subsets: ["latin"],
  display: "swap",
});

const pontanoSans = Pontano_Sans({
  weight: "variable",
  variable: "--font-pontano-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DOM IN MOTION",
  description:
    "DOM IN MOTION 3D animation, 3D intragrations and motion graphics official portfolio website",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bevan.variable} ${pontanoSans.variable} h-full`}
    >
      <body id="top" className="min-h-full flex flex-col">
        <header className="fixed inset-x-0 top-0 z-100">
          <NavBar />
        </header>
        {children}
        <Footer />
      </body>
    </html>
  );
}
