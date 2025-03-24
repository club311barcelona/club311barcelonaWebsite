// app/blog/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Blog | Club 311 - Private Cannabis Social Club in Barcelona",
  description:
    "Explore our blog for insights on cannabis culture, events, and community news from Club 311, Barcelona's premier cannabis social club.",
  keywords: "cannabis blog, Barcelona cannabis, social club blog, cannabis culture, Club 311",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}