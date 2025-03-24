"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Instagram } from "lucide-react"
import { motion, useAnimation, type Variants } from "framer-motion"
import { MobileMenu } from "@/components/mobile-menu"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Navigation items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Events", path: "/events" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ]

  // Set initial animation state on mount
  useEffect(() => {
    controls.start("top")
  }, [])

  // Handle scroll events in a separate effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY

      // Animate navbar based on scroll position
      if (scrollPosition > 10) {
        controls.start("scrolled")
      } else {
        controls.start("top")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [controls])

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  // Animation variants
  const navbarVariants: Variants = {
    top: {
      height: isMobile ? 80 : 100,
      backgroundColor: "rgba(0, 0, 0, 0)",
      backdropFilter: "blur(0px)",
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
    },
    scrolled: {
      height: isMobile ? 70 : 80,
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    },
  }

  const logoVariants: Variants = {
    top: { scale: 1 },
    scrolled: { scale: 0.9 },
  }

  const linkVariants: Variants = {
    initial: { y: 0 },
    hover: { y: -2 },
  }

  const underlineVariants: Variants = {
    initial: { width: 0, opacity: 0 },
    hover: { width: "100%", opacity: 1, transition: { duration: 0.3 } },
  }

  return (
    <motion.header
      ref={navRef}
      initial="top"
      animate={controls}
      variants={navbarVariants}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed left-0 right-0 top-0 z-50 flex items-center"
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="relative z-[60]">
          <motion.div variants={logoVariants} transition={{ duration: 0.3 }}>
            <Image
              src="/Images/Logo-Club311.png"
              width={100}
              height={50}
              className="h-10 w-auto"
              alt="Club311 Barcelona Logo" 
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <div
              key={item.path}
              className="relative"
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <motion.div
                variants={linkVariants}
                initial="initial"
                animate={hoveredItem === item.path ? "hover" : "initial"}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={item.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.path) ? "text-gold" : "text-white"
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
              <motion.div
                className="absolute -bottom-1 left-0 h-[2px] bg-gold"
                variants={underlineVariants}
                initial="initial"
                animate={hoveredItem === item.path || isActive(item.path) ? "hover" : "initial"}
                transition={{ duration: 0.3 }}
              />
            </div>
          ))}

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            <Link
              href="https://www.instagram.com/club_311/"
              target="_blank"
              className="group flex items-center gap-2 rounded-full border border-gold px-4 py-2 text-gold transition-all duration-300 hover:bg-gold hover:text-black"
            >
              <Instagram className="h-4 w-4" />
              <span className="text-sm">Instagram</span>
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Menu */}
        <MobileMenu navItems={navItems} />
      </div>
    </motion.header>
  )
}