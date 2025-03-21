"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TouchRippleProps {
  children: React.ReactNode
  color?: string
  disabled?: boolean
  className?: string
}

export function TouchRipple({
  children,
  color = "rgba(212, 175, 55, 0.4)",
  disabled = false,
  className = "",
}: TouchRippleProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(0)

  // Clean up ripples after animation completes
  useEffect(() => {
    const timeoutIds: NodeJS.Timeout[] = []

    ripples.forEach((ripple) => {
      const timeoutId = setTimeout(() => {
        setRipples((prevRipples) => prevRipples.filter((r) => r.id !== ripple.id))
      }, 800) // Match the animation duration

      timeoutIds.push(timeoutId)
    })

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id))
    }
  }, [ripples])

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (disabled) return

    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const touch = e.touches[0]

    // Calculate ripple position and size
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    const size = Math.max(rect.width, rect.height) * 2

    // Add new ripple
    setRipples((prevRipples) => [...prevRipples, { id: nextId.current, x, y, size }])

    nextId.current += 1
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`} onTouchStart={handleTouchStart}>
      {children}

      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              borderRadius: "50%",
              backgroundColor: color,
              transform: "translate(-50%, -50%) scale(0)",
              pointerEvents: "none",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

