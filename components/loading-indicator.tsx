"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface LoadingIndicatorProps {
  size?: "sm" | "md" | "lg"
  color?: "gold" | "white" | "burgundy" | "royal"
  type?: "spinner" | "dots" | "pulse" | "logo"
  text?: string
  fullScreen?: boolean
}

export function LoadingIndicator({
  size = "md",
  color = "gold",
  type = "spinner",
  text,
  fullScreen = false,
}: LoadingIndicatorProps) {
  // Size mappings
  const sizeMap = {
    sm: {
      container: "h-6 w-6",
      spinner: "h-6 w-6 border-2",
      dot: "h-2 w-2",
      text: "text-sm",
      logo: "h-8 w-auto",
    },
    md: {
      container: "h-10 w-10",
      spinner: "h-10 w-10 border-3",
      dot: "h-3 w-3",
      text: "text-base",
      logo: "h-12 w-auto",
    },
    lg: {
      container: "h-16 w-16",
      spinner: "h-16 w-16 border-4",
      dot: "h-4 w-4",
      text: "text-lg",
      logo: "h-16 w-auto",
    },
  }

  // Color mappings
  const colorMap = {
    gold: {
      primary: "border-gold",
      secondary: "border-gold/30",
      text: "text-gold",
      bg: "bg-gold",
    },
    white: {
      primary: "border-white",
      secondary: "border-white/30",
      text: "text-white",
      bg: "bg-white",
    },
    burgundy: {
      primary: "border-burgundy",
      secondary: "border-burgundy/30",
      text: "text-burgundy",
      bg: "bg-burgundy",
    },
    royal: {
      primary: "border-royal",
      secondary: "border-royal/30",
      text: "text-royal",
      bg: "bg-royal",
    },
  }

  // Spinner animation
  const renderSpinner = () => (
    <motion.div
      className={`${sizeMap[size].spinner} rounded-full ${colorMap[color].secondary} border-t-transparent`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    />
  )

  // Dots animation
  const renderDots = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`${sizeMap[size].dot} rounded-full ${colorMap[color].bg}`}
          initial={{ opacity: 0.3, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  )

  // Pulse animation
  const renderPulse = () => (
    <div className="relative">
      <motion.div
        className={`${sizeMap[size].container} rounded-full ${colorMap[color].bg} opacity-75`}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className={`absolute inset-0 rounded-full ${colorMap[color].bg} opacity-50`}
        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
      />
    </div>
  )

  // Logo animation
  const renderLogo = () => (
    <div className="relative">
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.98, 1.02, 0.98],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/311%20logo-wYJXuivi4kiF4KLDiiKD8NAg9rts7M.webp"
          alt="Club 311 Logo"
          width={120}
          height={60}
          className={sizeMap[size].logo}
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 rounded-full bg-gold/20 blur-xl"
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )

  // Render the selected loader type
  const renderLoader = () => {
    switch (type) {
      case "spinner":
        return renderSpinner()
      case "dots":
        return renderDots()
      case "pulse":
        return renderPulse()
      case "logo":
        return renderLogo()
      default:
        return renderSpinner()
    }
  }

  // Full screen loader
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
        {renderLoader()}
        {text && <p className={`mt-4 ${sizeMap[size].text} ${colorMap[color].text}`}>{text}</p>}
      </div>
    )
  }

  // Inline loader
  return (
    <div className="flex flex-col items-center justify-center">
      {renderLoader()}
      {text && <p className={`mt-2 ${sizeMap[size].text} ${colorMap[color].text}`}>{text}</p>}
    </div>
  )
}

