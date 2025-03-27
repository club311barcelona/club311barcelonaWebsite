"use client"

import { GradientText } from "@/components/gradient-text"
import { motion } from "framer-motion"
import { TouchRipple } from "@/components/touch-ripple"
import { Mail } from "lucide-react"

export default function Newsletter() {
return (




<div className="container mx-auto px-4">
  <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-b from-gold/10 to-transparent p-[1px]">
    <div className="rounded-2xl bg-black/40 px-6 py-12 backdrop-blur-sm md:px-12">
      <div className="text-center">
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-3"
        >
          <span className="inline-block rounded-full border border-gold/30 bg-gold/5 px-4 py-1 text-xs font-medium uppercase tracking-wider text-gold backdrop-blur-sm">
            Stay Connected
          </span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-playfair text-2xl font-bold text-white md:text-3xl"
        >
          Subscribe to Our <GradientText>Newsletter</GradientText>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 max-w-md text-white/70"
        >
          Get exclusive updates on events, new products, and member-only offers directly to your inbox
        </motion.p>
        
        <motion.form 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
            <input
              type="email"
              placeholder="Your email address"
              className="h-12 w-full rounded-full border border-white/10 bg-white/5 pl-10 pr-4 text-white placeholder:text-white/40 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50"
              required
            />
          </div>
          <TouchRipple>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="h-12 rounded-full bg-gold px-6 font-medium text-black transition-colors duration-300 hover:bg-gold-light sm:whitespace-nowrap"
            >
              Subscribe Now
            </motion.button>
          </TouchRipple>
        </motion.form>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-xs text-white/50"
        >
          By subscribing, you agree to our Privacy Policy and consent to receive updates.
        </motion.p>
      </div>
    </div>
  </div>
</div>
) }