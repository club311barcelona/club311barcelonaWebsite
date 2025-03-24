"use client"

import React from "react"
import { useRef, useEffect, useState } from "react"
import { motion, useInView, useAnimation, type Variants } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"
import type { EnhancedScrollRevealProps } from "@/types"

export function EnhancedScrollReveal({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  animation = "fade",
  direction = "up",
  distance = 50,
  staggerChildren = 0.1,
  once = true,
  className = "",
}: EnhancedScrollRevealProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [hasAnimated, setHasAnimated] = useState(false)

  // Reduce motion on mobile for better performance
  const mobileDistance = isMobile ? distance * 0.5 : distance
  const mobileDuration = isMobile ? duration * 0.8 : duration

  // Define animation variants
  const getVariants = (): Variants => {
    // Base fade animation
    if (animation === "fade") {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: mobileDuration,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }
    }

    // Slide animation with direction
    if (animation === "slide") {
      const directionMap = {
        up: { y: mobileDistance },
        down: { y: -mobileDistance },
        left: { x: mobileDistance },
        right: { x: -mobileDistance },
      }

      return {
        hidden: { opacity: 0, ...directionMap[direction] },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: mobileDuration,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }
    }

    // Scale animation
    if (animation === "scale") {
      return {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: mobileDuration,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }
    }

    // Stagger children animation
    if (animation === "stagger") {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren,
            delayChildren: delay,
          },
        },
      }
    }

    // Text reveal animation
    if (animation === "reveal") {
      return {
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
            delayChildren: delay,
          },
        },
      }
    }

    // Default to fade
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: mobileDuration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    }
  }

  // Child variants for stagger animation
  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      y: animation === "stagger" ? 20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: mobileDuration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  // Text reveal child variants
  const textRevealVariants: Variants = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start("visible")
      if (once) {
        setHasAnimated(true)
      }
    } else if (!isInView && !once && hasAnimated) {
      controls.start("hidden")
    }
  }, [isInView, controls, once, hasAnimated])

  // Special handling for text reveal animation
  if (animation === "reveal") {
    // Split text into words for reveal animation
    const renderTextReveal = () => {
      // Check if children is a string
      if (typeof children === "string") {
        return (
          <motion.div ref={ref} initial="hidden" animate={controls} variants={getVariants()} className={className} style={{ position: 'relative' }}>
            {children.split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
                <motion.span className="inline-block" variants={textRevealVariants}>
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.div>
        )
      }

      // If not a string, just wrap in the motion div
      return (
        <motion.div ref={ref} initial="hidden" animate={controls} variants={getVariants()} className={className}>
          {children}
        </motion.div>
      )
    }

    return renderTextReveal()
  }

  // For stagger animation, we need to wrap each child
  if (animation === "stagger") {
    return (
      <motion.div ref={ref} initial="hidden" animate={controls} variants={getVariants()} className={className} style={{ position: 'relative' }}>
        {React.Children.map(children, (child, i) => (
          <motion.div key={i} variants={childVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    )
  }

  // Default animation
  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={getVariants()} className={className}>
      {children}
    </motion.div>
  )
}

