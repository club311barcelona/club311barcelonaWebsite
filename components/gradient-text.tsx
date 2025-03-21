"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import type { GradientTextProps } from "@/types"

export function GradientText({ children, variant = "gold" }: GradientTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start({
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      })
    }
  }, [isInView, controls])

  const gradientMap = {
    gold: "bg-gradient-to-r from-gold-dark via-gold-light to-gold",
    burgundy: "bg-gradient-to-r from-burgundy-dark via-burgundy-light to-burgundy",
    royal: "bg-gradient-to-r from-royal-dark via-royal-light to-royal",
    purple: "bg-gradient-to-r from-purple-dark via-purple-light to-purple",
  }

  return (
    <motion.span
      ref={ref}
      animate={controls}
      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      className={`${gradientMap[variant]} bg-[length:200%_auto] bg-clip-text text-transparent`}
    >
      {children}
    </motion.span>
  )
}

