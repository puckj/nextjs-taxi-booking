import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import NavBar from "@/components/NavBar";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taxi Go",
  description: "Taxi booking nextjs web app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <NavBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
