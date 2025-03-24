"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GradientText } from "@/components/gradient-text"
import { Calendar, ShieldCheck } from "lucide-react"
import { TouchRipple } from "@/components/touch-ripple"

export function AgeVerification() {
  const [isVerified, setIsVerified] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check verification status - memoized for performance
  const checkVerification = useCallback(() => {
    if (typeof window === "undefined") return false;
    
    const verifiedTimestamp = localStorage.getItem("age-verified-timestamp");
    
    if (verifiedTimestamp) {
      const currentTime = Date.now();
      const verifiedTime = parseInt(verifiedTimestamp, 10);
      const oneDayInMs = 24 * 60 * 60 * 1000;
      
      return (currentTime - verifiedTime < oneDayInMs);
    }
    
    return false;
  }, []);

  // Popstate handler - memoized to prevent recreations
  const handlePopState = useCallback((event: PopStateEvent) => {
    if (!isVerified && !isLoading) {
      event.preventDefault();
      window.history.pushState(null, "", window.location.pathname);
    }
  }, [isVerified, isLoading]);

  // Tab key handler for focus trap - memoized
  const handleTabKey = useCallback((e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    
    const modal = document.getElementById('age-verification-modal');
    if (!modal) return;
    
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }, []);

  // Verification handler - memoized
  const handleVerify = useCallback((verified: boolean) => {
    setIsAnimating(true);
    
    if (verified) {
      // Show success animation before closing
      setSuccess(true);
      
      setTimeout(() => {
        // Store verification in localStorage with timestamp for 1 day
        localStorage.setItem("age-verified", "true");
        localStorage.setItem("age-verified-timestamp", Date.now().toString());
        setIsVerified(true);
      }, 1000);
    } else {
      // Redirect if not verified
      window.location.href = "https://www.barcelona.cat/en/";
    }
  }, []);

  // Combined main effect for initialization
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check verification on mount and set state
    const isUserVerified = checkVerification();
    setIsVerified(isUserVerified);
    setIsLoading(false);
    
    // Set up scroll control and history handling
    if (!isUserVerified) {
      document.body.style.overflow = 'hidden';
      window.history.pushState(null, "", window.location.pathname);
      window.addEventListener('popstate', handlePopState);
    } else {
      document.body.style.overflow = 'auto';
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('popstate', handlePopState);
    };
  }, [checkVerification, handlePopState]);

  // Focus trap effect - separate because it depends on isVerified state
  useEffect(() => {
    if (typeof window === 'undefined' || isVerified || isLoading) return;

    const modal = document.getElementById('age-verification-modal');
    if (!modal) return;

    // Add tab key handler
    document.addEventListener('keydown', handleTabKey);
    
    // Focus first focusable element
    const firstFocusable = modal.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;
    
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 100);
    }

    // Clean up
    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isVerified, isLoading, handleTabKey]);

  // Memoize background decorative elements to prevent re-renders
  const backgroundElements = useMemo(() => (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        className="absolute h-full w-full bg-[url('/noise.png')] bg-repeat opacity-20"
      />
      
      {/* Gold accent elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute left-0 top-0 h-32 w-32 overflow-hidden opacity-20"
      >
        <div className="absolute h-[1px] left-8 top-16 w-24 bg-gold"></div>
        <div className="absolute h-24 left-16 top-8 w-[1px] bg-gold"></div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-0 right-0 h-32 w-32 overflow-hidden opacity-20"
      >
        <div className="absolute bottom-16 h-[1px] right-8 w-24 bg-gold"></div>
        <div className="absolute bottom-8 h-24 right-16 w-[1px] bg-gold"></div>
      </motion.div>
      
      {/* Animated gradient orbs */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5 }}
        className="absolute -left-32 top-1/3 h-64 w-64 rounded-full bg-gold blur-[100px]"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
        className="absolute -right-32 bottom-1/3 h-64 w-64 rounded-full bg-gold blur-[100px]"
      />
    </div>
  ), []);

  // Early return if verified or loading
  if (isVerified || isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        id="age-verification-modal"
        aria-modal="true"
        role="dialog"
        aria-labelledby="age-verification-title"
      >
        {/* Background decorative elements */}
        {backgroundElements}

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="mx-auto max-w-lg overflow-hidden rounded-2xl"
          >
            {/* Success Animation */}
            {success && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-md"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/20"
                >
                  <ShieldCheck className="h-10 w-10 text-gold" />
                </motion.div>
              </motion.div>
            )}
            
            {/* Card with gold gradient border */}
            <div className="p-[1px] rounded-2xl bg-gradient-to-b from-gold/30 via-gold/20 to-gold/5">
              <div className="relative rounded-2xl bg-gradient-to-b from-black/80 to-black/40 p-8 text-center backdrop-blur-sm">
                {/* Logo/Icon */}
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="mb-6 flex justify-center"
                >
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center border border-gold/20">
                    <Calendar className="h-10 w-10 text-gold" />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 id="age-verification-title" className="mb-4 font-playfair text-3xl font-bold text-white">
                    Age <GradientText className="from-gold to-gold-light">Verification</GradientText>
                  </h2>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <p className="mb-8 text-lg text-white/80">
                    Please confirm you are of legal age to access information related to cannabis social clubs in Spain.
                  </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col gap-4 sm:flex-row sm:justify-center mb-6"
                >
                  <TouchRipple>
                    <Button
                      onClick={() => handleVerify(true)}
                      disabled={isAnimating}
                      className="bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 min-w-[180px]"
                    >
                      I am 21 or older
                    </Button>
                  </TouchRipple>
                  
                  <TouchRipple>
                    <Button
                      onClick={() => handleVerify(false)}
                      disabled={isAnimating}
                      variant="outline"
                      className="border-white/10 text-white hover:bg-white/10 transition-all duration-300 min-w-[180px]"
                    >
                      I am under 21
                    </Button>
                  </TouchRipple>
                </motion.div>

                {/* Footer text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <p className="mt-6 text-sm text-white/60">
                    By entering, you acknowledge that you are legally old enough to view content related to cannabis
                    social clubs in your jurisdiction.
                  </p>
                </motion.div>
                
                {/* Decorative corner accents */}
                <div className="absolute left-0 top-0 h-16 w-16 overflow-hidden opacity-40">
                  <div className="absolute h-[1px] left-4 top-6 w-8 bg-gold/40"></div>
                  <div className="absolute h-8 left-6 top-4 w-[1px] bg-gold/40"></div>
                </div>
                <div className="absolute bottom-0 right-0 h-16 w-16 overflow-hidden opacity-40">
                  <div className="absolute h-[1px] bottom-6 right-4 w-8 bg-gold/40"></div>
                  <div className="absolute h-8 bottom-4 right-6 w-[1px] bg-gold/40"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}