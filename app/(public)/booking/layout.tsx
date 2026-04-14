import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Now — Reserve Your Spot | Enter10",
  description: "Book your entertainment experience at Enter10 Philippines. Reserve bowling lanes, billiards tables, VIP rooms, and party packages online.",
  alternates: {
    canonical: "https://www.enter-ten.com/ph/booking",
  },
  openGraph: {
    title: "Book Now — Enter10 Philippines",
    description: "Reserve bowling, billiards, VIP rooms & party packages online. Venice Grand Canal Mall, Taguig.",
    url: "https://www.enter-ten.com/ph/booking",
    siteName: "Enter10 Philippines",
    images: [{ url: "https://www.enter-ten.com/ph/images/og-image.jpg", width: 1200, height: 630, alt: "Enter10 entertainment venue" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Now — Enter10 Philippines",
    description: "Reserve bowling, billiards, VIP rooms & party packages online.",
    images: ["https://www.enter-ten.com/ph/images/og-image.jpg"],
  },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
