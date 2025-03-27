"use client"

import React, { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AgeVerification() {
  const pathname = usePathname()
  
  // Skip verification for admin routes
  if (pathname?.startsWith('/admin')) {
    return null
  }
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    // Check verification status on component mount
    if (typeof window !== "undefined" && localStorage.getItem("age-verified") === "true") {
      setIsVerified(true)
      document.body.style.overflow = 'auto'
    } else {
      document.body.style.overflow = 'hidden'
    }
  }, [])

  const handleConfirm = () => {
    localStorage.setItem("age-verified", "true")
    setIsVerified(true)
    document.body.style.overflow = 'auto'
  }
  
  const handleReject = () => {
    window.location.href = "https://www.barcelona.cat/en/"
  }

  if (isVerified) return null
  
  return (
    <div 
      id="age-verification-modal"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
    >
      <div className="max-w-md w-full mx-4 overflow-hidden rounded-xl">
        <div className="p-[1px] rounded-xl bg-gradient-to-b from-gold/30 via-gold/20 to-gold/5">
          <div className="bg-black/80 p-6 rounded-xl relative">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-5">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center border border-gold/20">
                <Calendar className="h-8 w-8 text-gold" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-center text-white mb-3">
              Age <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">Verification</span>
            </h2>

            {/* Description */}
            <p className="text-center mb-6 text-white/80">
              Please confirm you are of legal age to access information related to cannabis social clubs in Spain.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <Button
                onClick={handleConfirm}
                className="bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black hover:opacity-90 transition-opacity"
              >
                I am 21 or older
              </Button>
              
              <Button
                onClick={handleReject}
                variant="outline"
                className="border-white/10 text-white hover:bg-white/10"
              >
                I am under 21
              </Button>
            </div>

            {/* Footer text */}
            <p className="text-xs text-center text-white/60 mt-4">
              By entering, you acknowledge that you are legally old enough to view content related to cannabis
              social clubs in your jurisdiction.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}