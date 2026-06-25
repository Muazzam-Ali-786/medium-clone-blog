import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Providers from "@/components/ui/Providers";
import ServiceWorkerRegistration from "@/components/ui/ServiceWorkerRegistration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "MediumClone – Stories Worth Reading",
    template: "%s | MediumClone",
  },
  description: "Discover stories, thinking, and expertise from writers on any topic. MediumClone is a place to read, write, and deepen your understanding.",
  keywords: ["blog", "articles", "writing", "technology", "programming"],
  authors: [{ name: "MediumClone Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mediumclone.com",
    siteName: "MediumClone",
    title: "MediumClone – Stories Worth Reading",
    description: "Discover stories, thinking, and expertise from writers on any topic.",
    images: [{ url: "https://picsum.photos/seed/og/1200/630", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MediumClone – Stories Worth Reading",
    description: "Discover stories, thinking, and expertise from writers on any topic.",
    images: ["https://picsum.photos/seed/og/1200/630"],
  },
  manifest: "/manifest.json",
  themeColor: "#4f46e5",
};



export default function RootLayout({ children }) {

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <Providers>
          <ServiceWorkerRegistration />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
