"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Instagram, Menu, X } from "lucide-react"
import type { NavItem } from "@/types"

interface MobileMenuProps {
  navItems: NavItem[]
}

export function MobileMenu({ navItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: "beforeChildren",
      },
    },
  }

  const itemVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const buttonVariants = {
    closed: {
      scale: 1,
    },
    open: {
      scale: 1,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <div className={`md:hidden ${isOpen ? "overflow-hidden" : ""}`}>
      {/* Menu Button */}
      <motion.button
        variants={buttonVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-[102] flex h-12 w-12 items-center justify-center rounded-full bg-black/20 backdrop-blur-md"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <X className="h-6 w-6 text-gold" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Menu className="h-6 w-6 text-gold" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[100] flex flex-col h-screen w-full overflow-hidden"
          >
            {/* Additional solid background layer */}
            <div className="fixed inset-0 z-[100] bg-black" />

            {/* Menu Items - Update z-index to be above the background */}
            <div className="relative z-[101] flex h-screen w-full flex-col items-center justify-center gap-6 p-8 bg-black">
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  variants={itemVariants}
                  className="w-full text-center"
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.path}
                    className={`relative inline-block text-2xl font-medium ${
                      isActive(item.path) ? "text-gold" : "text-white"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}

                    {/* Active indicator */}
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        className="absolute -bottom-2 left-0 right-0 mx-auto h-0.5 w-12 bg-gold"
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    {/* Hover indicator */}
                    <motion.div
                      className="absolute -bottom-2 left-0 h-0.5 w-0 bg-gold/50"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}

              {/* Social Links */}
              <motion.div variants={itemVariants} className="mt-8" whileTap={{ scale: 0.95 }}>
                <Link
                  href="https://www.instagram.com/club_311/"
                  target="_blank"
                  className="flex items-center justify-center gap-2 rounded-full border border-gold px-6 py-3 text-gold transition-all duration-300 hover:bg-gold hover:text-black"
                  onClick={() => setIsOpen(false)}
                >
                  <Instagram className="h-5 w-5" />
                  <span>Follow on Instagram</span>
                </Link>
              </motion.div>
            </div>

            {/* Footer */}
            <motion.div variants={itemVariants} className="p-6 text-center text-sm text-white/60">
              <p>© {new Date().getFullYear()} Club 311. All rights reserved.</p>
              <p className="mt-1">Must be 21+ to enter.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

