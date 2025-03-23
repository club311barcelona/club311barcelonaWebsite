"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return null
}

