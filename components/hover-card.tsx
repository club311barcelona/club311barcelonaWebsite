"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

interface HoverCardProps {
  children: React.ReactNode
}

export function HoverCard({ children }: HoverCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e
    const { left, top, width, height } = currentTarget.getBoundingClientRect()

    const x = (clientX - left) / width
    const y = (clientY - top) / height

    setMousePosition({ x, y })
  }

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      animate={{
        background: isHovered
          ? `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(74, 222, 128, 0.1), transparent 50%)`
          : "none",
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

