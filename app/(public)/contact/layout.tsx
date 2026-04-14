import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Venice Grand Canal Mall, Taguig | Enter10",
  description: "Get in touch with Enter10 Philippines. Located at Venice Grand Canal Mall, McKinley Hill, Taguig. Call, email, or visit us for bookings and inquiries.",
  alternates: {
    canonical: "https://www.enter-ten.com/ph/contact",
  },
  openGraph: {
    title: "Contact Enter10 Philippines",
    description: "Venice Grand Canal Mall, McKinley Hill, Taguig. Call, email or visit us for bookings and inquiries.",
    url: "https://www.enter-ten.com/ph/contact",
    siteName: "Enter10 Philippines",
    images: [{ url: "/ph/images/og-image.jpg", width: 1200, height: 630, alt: "Enter10 venue at Venice Grand Canal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Enter10 Philippines",
    description: "Venice Grand Canal Mall, McKinley Hill, Taguig. Bookings and inquiries.",
    images: ["/ph/images/og-image.jpg"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
