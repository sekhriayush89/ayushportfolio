import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geistSans = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ayush Sekhri - MERN Stack Developer",
  description:
    "Portfolio of Ayush Sekhri, an MCA student and software engineer specializing in Node.js, AI, and modern web technologies. Located in Shimla, HP.",
  keywords: "software engineer, full stack developer, Node.js, AI, web developer, portfolio, Shimla",
  authors: [{ name: "Ayush Sekhri" }],
  openGraph: {
    title: "Ayush Sekhri - MERN Stack Developer",
    description: "Explore my portfolio featuring innovative projects in AI, web development, and software engineering.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${_geistSans.className} antialiased`}>{children}</body>
    </html>
  )
}
