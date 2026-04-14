import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://www.enter-ten.com/ph";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.enter-ten.com"),
  title: {
    default: "Enter10 Philippines | Bowling, Arcade & Entertainment in Taguig",
    template: "%s | Enter10 Philippines",
  },
  description: "Enter10 Philippines — Metro Manila's premier entertainment destination. Bowling, billiards, arcade, air hockey, dining & VIP rooms at Venice Grand Canal Mall, Taguig. Book your party today!",
  keywords: ["Enter10", "Enter10 Philippines", "bowling Taguig", "bowling Manila", "entertainment Taguig", "Venice Grand Canal Mall", "team building Manila", "birthday party venue", "arcade Philippines", "billiards Taguig", "air hockey", "VIP rooms", "bowling alley BGC", "family entertainment"],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Enter10 Philippines — Play. Eat. Celebrate.",
    description: "Metro Manila's premier entertainment hub — bowling, billiards, arcade, air hockey, dining & VIP rooms at Venice Grand Canal Mall, Taguig. Book your visit!",
    url: siteUrl,
    siteName: "Enter10 Philippines",
    images: [
      {
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Enter10 Philippines — Bowling & Entertainment at Venice Grand Canal Mall",
        type: "image/jpeg",
      },
    ],
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enter10 Philippines — Play. Eat. Celebrate.",
    description: "Metro Manila's premier entertainment hub — bowling, billiards, arcade & more at Venice Grand Canal Mall, Taguig.",
    images: [
      {
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Enter10 Philippines — Bowling & Entertainment",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/images/logo.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EntertainmentBusiness",
  name: "Enter10 Philippines",
  description: "Metro Manila's premier entertainment destination — bowling, billiards, arcade, air hockey, dining & VIP rooms.",
  url: siteUrl,
  logo: "https://www.enter-ten.com/ph/images/logo.png",
  image: "https://www.enter-ten.com/images/og-image.jpg",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Venice Grand Canal Mall",
    addressLocality: "Taguig",
    addressRegion: "Metro Manila",
    addressCountry: "PH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 14.5176,
    longitude: 121.0509,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Entertainment Activities",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bowling" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Billiards" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Arcade Games" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Air Hockey" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dining" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "VIP Rooms" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Birthday Parties" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Team Building Events" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-bg text-text-primary font-sans">
        {children}
      </body>
    </html>
  );
}
