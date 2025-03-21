import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-charcoal py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-8 border-t border-gold/10 pt-8 md:flex-row">
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/311%20logo-wYJXuivi4kiF4KLDiiKD8NAg9rts7M.webp"
              alt="Club 311 Logo"
              width={120}
              height={60}
              className="mb-4"
            />
            <p className="text-center text-sm text-white/60 md:text-left">
              &copy; {new Date().getFullYear()} Club 311. All rights reserved.
              <br />
              This is a private members club. You must be 18+ and a member to enter.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 md:items-end">
            <div className="flex gap-4">
              <Link
                href="https://www.instagram.com/club_311/"
                target="_blank"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-gold hover:text-black"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
            <nav className="flex flex-wrap justify-center gap-6">
              <Link href="/" className="text-sm text-white/60 transition-colors hover:text-gold">
                Home
              </Link>
              <Link href="/about" className="text-sm text-white/60 transition-colors hover:text-gold">
                About
              </Link>
              <Link href="/events" className="text-sm text-white/60 transition-colors hover:text-gold">
                Events
              </Link>
              <Link href="/blog" className="text-sm text-white/60 transition-colors hover:text-gold">
                Blog
              </Link>
              <Link href="/contact" className="text-sm text-white/60 transition-colors hover:text-gold">
                Contact
              </Link>
            </nav>
            <div className="mt-2 flex gap-6">
              <Link href="/privacy-policy" className="text-xs text-white/40 transition-colors hover:text-gold">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-xs text-white/40 transition-colors hover:text-gold">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

