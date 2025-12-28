import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { siteContent } from "../../public/SiteContent/seo";
import { ClientLayout } from "../components/ClientLayout";

const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME ?? "TRETA";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: siteContent.seo.title,
  description:
    siteContent.seo.description,

  keywords: [
    "TRETA",
    "tax platform",
    "enterprise SaaS",
    "financial technology",
    "tax compliance software",
    "business accounting",
    "transaction management",
    "cloud finance",
    "startup SaaS",
    "fintech platform",
  ],

  authors: [{ name: COMPANY_NAME }],
  creator: COMPANY_NAME,
  publisher: COMPANY_NAME,

  metadataBase: new URL(SITE_URL),

  openGraph: {
    title: `${COMPANY_NAME}`,
    description:
      "Precision in transactions. Confidence in tax",
    url: SITE_URL,
    siteName: COMPANY_NAME,
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: `${COMPANY_NAME} Open Graph Image`,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: `${COMPANY_NAME} — Coming Soon`,
    description:
      "Precision in transactions. Confidence in tax. Launching soon.",
    images: ["/images/logo.png"],
    creator: "@yourtwitterhandle",
  },

  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },

  themeColor: "#000000",

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
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  max-w-screen overflow-x-hidden`}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

