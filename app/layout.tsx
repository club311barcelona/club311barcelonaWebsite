import type { Metadata } from "next"
import { Playfair_Display, Montserrat, Open_Sans } from "next/font/google"
import "./globals.css"
import { Cursor } from "@/components/cursor"
import { AgeVerification, NoJsAgeVerification } from "@/components/age-verification"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://club311barcelona.com"),
  title: "Club 311 - Private Cannabis Social Club in Barcelona",
  description:
    "Join Barcelona's premier cannabis social club near Sagrada Familia. Experience a sophisticated atmosphere, premium products, and exclusive events in our private community.",
  keywords: "cannabis club, Barcelona, social club, Sagrada Familia, private club, Club 311, membership",
  openGraph: {
    title: "Club 311 - Private Cannabis Social Club in Barcelona",
    description: "Join Barcelona's premier cannabis social club near Sagrada Familia.",
    url: "https://club311barcelona.com",
    siteName: "Club 311 Barcelona",
    images: [
      {
        url: "/og-image.jpg", // Add a proper OG image here
        width: 1200,
        height: 630,
        alt: "Club 311 - Private Cannabis Social Club in Barcelona",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Fix: Use Next.js proper head handling instead of manually adding a head tag
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} ${openSans.variable}`}>
      <body suppressHydrationWarning={true}>
        <AgeVerification />
        <main>{children}</main>
        <Cursor />
        <noscript>
          <NoJsAgeVerification />
        </noscript>
      </body>
    </html>
  )
}