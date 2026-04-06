import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Enter10 Philippines | Your Night Out Starts Here",
  description: "Play. Eat. Celebrate. Enter10 is Metro Manila's premier entertainment hub — bowling, billiards, arcade, air hockey, and more at Venice Grand Canal Mall, Taguig.",
  keywords: ["Enter10", "bowling", "entertainment", "Taguig", "Venice Grand Canal", "team building", "birthday party", "arcade"],
  openGraph: {
    title: "Enter10 Philippines",
    description: "Your all-in-one entertainment destination at Venice Grand Canal Mall, Taguig.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-bg text-text-primary font-sans">
        {children}
      </body>
    </html>
  );
}
