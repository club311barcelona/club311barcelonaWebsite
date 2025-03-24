"use client"

import { motion } from "framer-motion"
import { GradientText } from "@/components/gradient-text"

export function AnimatedHeadline() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.div className="mb-6" initial="hidden" animate="visible" variants={container}>
      <div className="overflow-hidden">
        <motion.h2
          className="font-playfair text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
          variants={item}
        >
          <span className="block">Club 311 Barcelona :</span>
        </motion.h2>
      </div>

      <div className="overflow-hidden">
        <motion.h2 className="font-playfair text-4xl font-bold leading-tight md:text-5xl lg:text-6xl" variants={item}>
          <GradientText>Premier Social Club</GradientText>
        </motion.h2>
      </div>

      <div className="overflow-hidden">
        <motion.h2
          className="font-playfair text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
          variants={item}
        >
          <span className="block">Near Sagrada Família</span>
        </motion.h2>
      </div>
    </motion.div>
  )
}

