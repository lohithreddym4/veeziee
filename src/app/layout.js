import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Veeziee: Calling made easy",
  description: "Veeziee is a calling app that makes calling easy and fun.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}  className={inter.className}>{children}</body>
    </html>
  );
}
