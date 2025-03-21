"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import type { PremiumButtonProps } from "@/types"

export function PremiumButton({ children, href, variant = "gold" }: PremiumButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const colorMap = {
    gold: {
      gradient: "from-gold-dark via-gold-light to-gold",
      border: "gold-border",
      text: "text-gold",
      bg: "bg-charcoal",
      hoverBg: "bg-charcoal-light",
    },
    purple: {
      gradient: "from-purple-dark via-purple-light to-purple",
      border: "purple-border",
      text: "text-purple",
      bg: "bg-charcoal",
      hoverBg: "bg-charcoal-light",
    },
    burgundy: {
      gradient: "from-burgundy-dark via-burgundy-light to-burgundy",
      border: "burgundy-border",
      text: "text-burgundy",
      bg: "bg-charcoal",
      hoverBg: "bg-charcoal-light",
    },
    royal: {
      gradient: "from-royal-dark via-royal-light to-royal",
      border: "royal-border",
      text: "text-royal",
      bg: "bg-charcoal",
      hoverBg: "bg-charcoal-light",
    },
  }

  return (
    <motion.div
      className="relative inline-block"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsPressed(true)}
      onTap={() => setTimeout(() => setIsPressed(false), 150)}
      onTapCancel={() => setIsPressed(false)}
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute -inset-1 rounded-full bg-gradient-to-r ${colorMap[variant].gradient} opacity-0 blur-md`}
        animate={{
          opacity: isHovered ? 0.7 : 0,
          scale: isPressed ? 0.97 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Shimmer effect */}
      <motion.div className="absolute inset-0 overflow-hidden rounded-full" animate={{ opacity: isHovered ? 1 : 0 }}>
        <motion.div
          className="absolute -inset-[100%] rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            left: isHovered ? "200%" : "-100%",
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Button */}
      <motion.div
        animate={{
          scale: isPressed ? 0.97 : 1,
          y: isPressed ? 2 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <Link
          href={href}
          className={`${colorMap[variant].border} relative inline-flex items-center justify-center rounded-full ${colorMap[variant].bg} px-8 py-3 font-medium ${colorMap[variant].text} transition-colors duration-300 hover:${colorMap[variant].hoverBg}`}
        >
          <span className="relative z-10">{children}</span>
        </Link>
      </motion.div>
    </motion.div>
  )
}

