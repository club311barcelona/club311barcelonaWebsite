// app/about/page.tsx
import AboutPageClient from './client-page'

export const metadata = {
  title: "About Us | Club 311 - Private Cannabis Social Club in Barcelona",
  description:
    "Learn about Club 311, Barcelona's premier cannabis social club. Discover our history, values, and what makes our community special.",
  keywords: "about Club 311, cannabis club history, Barcelona social club, Club 311 values, cannabis community",
}

export default function AboutPage() {
  return <AboutPageClient />
}