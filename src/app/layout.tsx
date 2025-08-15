import "./globals.css";
import { Inter } from "next/font/google";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LangProvider } from "@/context/lang";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SmartTicker",
  description: "Predict stock prices using AI and news sentiment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-gray-100 min-h-screen flex flex-col`}
      >
        <LangProvider>
          <Navbar />
          <main className="flex-grow bg-black">{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
