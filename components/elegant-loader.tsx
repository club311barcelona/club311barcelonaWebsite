"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function ElegantLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/311%20logo-wYJXuivi4kiF4KLDiiKD8NAg9rts7M.webp"
          alt="Club 311 Logo"
          width={150}
          height={75}
          className="h-16 w-auto"
        />

        <motion.div
          className="mt-8 h-0.5 bg-gold"
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-4 text-sm text-white/60"
        >
          Barcelona's Premium Cannabis Social Club
        </motion.p>
      </motion.div>
    </div>
  )
}

