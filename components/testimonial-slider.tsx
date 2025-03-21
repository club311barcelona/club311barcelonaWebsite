"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, MapPin } from "lucide-react"

// Google Maps reviews data
const testimonials = [
  {
    id: 1,
    quote:
      "Amazing place with a great atmosphere. The staff is super friendly and knowledgeable. They have a great selection and the ambiance is perfect for relaxing. Definitely one of the best clubs in Barcelona!",
    author: "Miguel R.",
    rating: 5,
    date: "2 months ago",
  },
  {
    id: 2,
    quote:
      "Fantastic club with a welcoming atmosphere. The staff is incredibly helpful and the selection is top-notch. The lounge area is comfortable and well-designed. I've visited many clubs in Barcelona, but this one stands out for its quality and service.",
    author: "Sarah T.",
    rating: 5,
    date: "3 months ago",
  },
  {
    id: 3,
    quote:
      "I've been a member for over a year now and I can honestly say this is the best club in the area. The staff remembers your preferences, the atmosphere is relaxed, and they regularly host interesting events. Highly recommended!",
    author: "Carlos M.",
    rating: 5,
    date: "1 month ago",
  },
  {
    id: 4,
    quote:
      "Great place with a chill vibe. The staff is friendly and the selection is excellent. The location near Sagrada Familia is convenient and the interior design is really cool with those neon lights. Will definitely return on my next visit to Barcelona.",
    author: "Emma L.",
    rating: 4,
    date: "4 months ago",
  },
  {
    id: 5,
    quote:
      "This club has the perfect balance of professionalism and friendliness. The membership process was straightforward and the facilities are clean and comfortable. They have a great selection and the staff is very knowledgeable. One of my favorite spots in Barcelona.",
    author: "David K.",
    rating: 5,
    date: "2 months ago",
  },
]

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const handleNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }, [])

  const handlePrevious = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [handleNext])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="relative min-h-[300px] overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 text-center"
          >
            <div className="mb-3 sm:mb-4 md:mb-6 flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${
                    i < testimonials[currentIndex].rating ? "fill-purple text-purple" : "text-gray-400"
                  }`}
                />
              ))}
            </div>
            <p className="mb-3 sm:mb-4 md:mb-6 text-base sm:text-lg md:text-xl italic text-white line-clamp-6 sm:line-clamp-none">
              "{testimonials[currentIndex].quote}"
            </p>
            <div>
              <p className="font-semibold text-white text-sm sm:text-base">{testimonials[currentIndex].author}</p>
              <p className="flex items-center justify-center gap-1 text-xs sm:text-sm text-white/60">
                <MapPin className="h-3 w-3 text-[#4ADE80]" />
                Google Review · {testimonials[currentIndex].date}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-1 sm:gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-[#4ADE80] w-6 sm:w-8" : "bg-white/30 w-1.5 sm:w-2"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={handlePrevious}
        className="absolute left-0 sm:-left-4 top-1/2 flex h-8 w-8 sm:h-10 sm:w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-purple hover:text-black"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-0 sm:-right-4 top-1/2 flex h-8 w-8 sm:h-10 sm:w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-purple hover:text-black"
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  )
}

