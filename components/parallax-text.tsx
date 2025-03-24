"use client"

import { useRef, useState, useEffect } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion"
import { wrap } from "@motionone/utils"

interface ParallaxProps {
  children: string
  baseVelocity?: number
  direction?: "left" | "right"
  className?: string
  repeat?: number
  textClassName?: string
}

export function ParallaxText({
  children,
  baseVelocity = 5,
  direction = "left",
  className = "",
  repeat = 4,
  textClassName = "",
}: ParallaxProps) {
  const [isMounted, setIsMounted] = useState(false)
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const directionFactor = useRef(direction === "left" ? -1 : 1)
  
  // Create an array of repeated text based on the repeat prop
  const repeatedText = Array(repeat).fill(children)
  
  // Smoother scroll velocity with adjusted spring settings
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60,
    stiffness: 500,
    mass: 0.5,
  })
  
  // Improved transform mapping for more responsive parallax effect
  const velocityFactor = useTransform(smoothVelocity, 
    [-2000, 0, 2000], 
    [-3, 0, 3], 
    { clamp: false }
  )

  // Adjusted wrap values for better text spacing
  const x = useTransform(baseX, (v) => `${wrap(-5, -45, v)}%`)
  
  // Client-side only execution
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Optimized animation frame handler - removed unused 't' parameter
  useAnimationFrame((_, delta) => {
    if (!isMounted) return
    
    // Base movement calculation
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
    
    // Apply scroll velocity influence
    const currentVelocity = velocityFactor.get()
    
    // Update direction based on scroll velocity
    if (currentVelocity < 0) {
      directionFactor.current = direction === "left" ? -1 : 1
    } else if (currentVelocity > 0) {
      directionFactor.current = direction === "left" ? -1.2 : 0.8
    }
    
    const scrollInfluence = directionFactor.current * moveBy * Math.abs(currentVelocity) * 0.1
    
    // Apply movement with some easing
    baseX.set(baseX.get() + moveBy + scrollInfluence)
  })

  // Add a subtle hover effect
  const [isHovered, setIsHovered] = useState(false)
  
  if (!isMounted) return null

  return (
    <div 
      className={`overflow-hidden whitespace-nowrap flex items-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="flex whitespace-nowrap items-center"
        style={{ x }}
        animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {repeatedText.map((text, i) => (
          <span 
            key={i} 
            className={`inline-block ${textClassName}`}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  )
}