import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activities — Bowling, Billiards, Arcade & More | Enter10",
  description: "Explore all activities at Enter10 Philippines — bowling, billiards, arcade, air hockey, archery, VIP rooms, and dining at Venice Grand Canal Mall, Taguig.",
  alternates: {
    canonical: "https://www.enter-ten.com/ph/activities",
  },
  openGraph: {
    title: "Activities — Enter10 Philippines",
    description: "Bowling, billiards, arcade, air hockey, archery, VIP rooms & dining. Your ultimate entertainment destination.",
    url: "https://www.enter-ten.com/ph/activities",
    siteName: "Enter10 Philippines",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Enter10 bowling lanes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Activities — Enter10 Philippines",
    description: "Bowling, billiards, arcade, air hockey, archery & more at Venice Grand Canal Mall.",
    images: ["/images/og-image.jpg"],
  },
};

export default function ActivitiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
