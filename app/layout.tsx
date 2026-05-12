import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Templezzy",
    template: "%s | Templezzy"
  },
  description: "Find Cool Templates For Your Projects!!!",
  keywords: ["dashboard", "creator", "templates", "design", "assets"],
  authors: [{ name: "Templezzy Team" }],
  creator: "Templezzy",
  publisher: "Templezzy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://templezzy.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Templezzy",
    description: "The ultimate hub for creator templates.",
    url: "https://templezzy.vercel.app",
    siteName: "Templezzy",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Templezzy Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Templezzy",
    description: "High quality creator templates.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.ico",
    shortcut: "/logo.ico",
    apple: "/logo.ico",
  },
  verification: {
    google: "oR1vFDbIf-85CemIwzQupghHx1F07kWTM9UCqgzdTG8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
