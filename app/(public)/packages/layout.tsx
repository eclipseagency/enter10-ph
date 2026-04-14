import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Packages — Birthday, Corporate & Group Deals | Enter10",
  description: "Explore Enter10 party and event packages. Birthday celebrations, corporate team building, and group entertainment deals at Venice Grand Canal Mall, Taguig.",
  alternates: {
    canonical: "https://www.enter-ten.com/ph/packages",
  },
  openGraph: {
    title: "Packages — Enter10 Philippines",
    description: "Birthday parties, corporate events & group packages. All-in-one entertainment at Venice Grand Canal Mall.",
    url: "https://www.enter-ten.com/ph/packages",
    siteName: "Enter10 Philippines",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Enter10 VIP party room" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Packages — Enter10 Philippines",
    description: "Birthday parties, corporate events & group entertainment packages.",
    images: ["/images/og-image.jpg"],
  },
};

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
