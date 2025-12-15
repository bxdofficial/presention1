import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap"
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap"
})

export const metadata: Metadata = {
  title: "NPN Transistor Circuit Operation | Interactive Electronics Tutorial",
  description:
    "Interactive animated presentation showing the full operation of an electronic circuit based on a bipolar junction transistor (NPN). Learn about transistor switching, current amplification, and circuit analysis.",
  keywords: ["NPN transistor", "electronics", "circuit analysis", "transistor operation", "semiconductor", "current amplification", "electronic switch"],
  authors: [{ name: "Yousef Khames" }],
  creator: "Electronics Education Team",
  publisher: "Electronics Education",
  generator: "v0.app",
  openGraph: {
    title: "NPN Transistor Circuit Operation",
    description: "Interactive animated presentation for understanding NPN transistor circuits",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NPN Transistor Circuit Operation",
    description: "Interactive animated presentation for understanding NPN transistor circuits",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
