"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

export function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  useEffect(() => {
    if (!isDesktop) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isLink =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")

      setIsHovering(!!isLink)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("mouseleave", handleMouseLeave)
    document.body.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
      document.body.removeEventListener("mouseover", handleMouseOver)
    }
  }, [isDesktop, isVisible])

  if (!isDesktop) return null

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/20 bg-black/5 backdrop-blur-sm"
        style={{ left: mousePosition.x, top: mousePosition.y }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? (isHovering ? 1.5 : 1) : 0.8,
          backgroundColor: isHovering ? "rgba(212, 175, 55, 0.1)" : "rgba(0, 0, 0, 0.05)",
          borderColor: isHovering ? "rgba(212, 175, 55, 0.4)" : "rgba(212, 175, 55, 0.2)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div
          className="h-1.5 w-1.5 rounded-full bg-gold"
          style={{
            transform: isHovering ? "scale(0)" : "scale(1)",
            transition: "transform 0.2s ease-out",
          }}
        />
      </motion.div>

      {/* Dot cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
        style={{ left: mousePosition.x, top: mousePosition.y }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  )
}

