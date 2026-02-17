import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Portfolio | Full Stack Developer",
  description: "Full Stack JavaScript Developer specializing in MERN Stack, Next.js, NestJS, and cloud deployments.",
  keywords: ["Full Stack Developer", "MERN Stack", "Next.js", "NestJS", "React", "Node.js", "Pakistan"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${syne.variable} ${dmSans.variable} font-dm`}>
        <ThemeProvider>
          <GrainOverlay />
          <CursorGlow />
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
