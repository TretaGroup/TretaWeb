import "./globals.css";
import type { ReactNode } from "react";


export const metadata = {
  title: "Treta Advisor — Coming Soon",
  description: "Enterprise-grade SaaS platform launching soon.",
  openGraph: {
    title: "Treta Advisor — Coming Soon",
    description: "A premium enterprise SaaS experience.",
    url: "https://www.tretaadvisor.com",
    siteName: "tretaAdvisor",
    images: [{ url: "/images/og.png", width: 1200, height: 630 }],
    type: "website",
  },
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}