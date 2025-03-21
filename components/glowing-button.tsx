"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

interface GlowingButtonProps {
  children: React.ReactNode
  variant?: "gold" | "burgundy" | "royal"
}

export function GlowingButton({ children, variant = "gold" }: GlowingButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const gradientMap = {
    gold: "from-gold via-gold-light to-gold",
    burgundy: "from-burgundy via-burgundy-light to-burgundy",
    royal: "from-royal via-royal-light to-royal",
  }

  const bgColorMap = {
    gold: "bg-gold",
    burgundy: "bg-burgundy",
    royal: "bg-royal",
  }

  return (
    <motion.div
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`absolute -inset-1 rounded-full bg-gradient-to-r ${gradientMap[variant]} opacity-70 blur-md`}
        animate={{ opacity: isHovered ? 0.7 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <button className={`relative rounded-full ${bgColorMap[variant]} px-8 py-3 font-medium text-white`}>
        {children}
      </button>
    </motion.div>
  )
}

