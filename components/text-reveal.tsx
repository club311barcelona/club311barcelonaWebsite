"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface TextRevealProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  direction?: "up" | "down" | "left" | "right"
}

export function TextReveal({ children, delay = 0, duration = 0.5, className = "", direction = "up" }: TextRevealProps) {
  const getInitialY = () => {
    switch (direction) {
      case "up":
        return 20
      case "down":
        return -20
      case "left":
      case "right":
        return 0
      default:
        return 20
    }
  }

  const getInitialX = () => {
    switch (direction) {
      case "left":
        return 20
      case "right":
        return -20
      case "up":
      case "down":
        return 0
      default:
        return 0
    }
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{
          y: getInitialY(),
          x: getInitialX(),
          opacity: 0,
        }}
        animate={{
          y: 0,
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

