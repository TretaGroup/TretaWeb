import localFont from "next/font/local";

export const caldina = localFont({
  src: [
    {
      path: "../../public/fonts/CaldinaSemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-caldina",
  display: "swap",
});
