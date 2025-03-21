"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import Image from "next/image"

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isFirstMount, setIsFirstMount] = useState(true)

  // Only animate after the first mount to prevent animation on initial page load
  useEffect(() => {
    setIsFirstMount(false)
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={isFirstMount ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Overlay that slides in and out */}
        {!isFirstMount && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black"
            initial={{ scaleY: 0, originY: 0 }}
            animate={{
              scaleY: [0, 1, 1, 0],
              originY: [0, 0, 1, 1],
            }}
            transition={{
              duration: 1.2,
              times: [0, 0.4, 0.6, 1],
              ease: [0.645, 0.045, 0.355, 1.0],
            }}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.2,
                times: [0, 0.4, 0.6, 1],
              }}
            >
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/311%20logo-wYJXuivi4kiF4KLDiiKD8NAg9rts7M.webp"
                  alt="Club 311 Logo"
                  width={120}
                  height={60}
                  className="h-16 w-auto"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {children}
      </motion.div>
    </AnimatePresence>
  )
}

