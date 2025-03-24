"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, AlertCircle, User, Mail, MessageSquare, Send } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// Form schema with Zod validation
const formSchema = z.object({
  name: z.string().min(3, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Please enter a subject for your message"),
  message: z.string().min(10, "Your message should be at least 10 characters long"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
   
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  })
   
  // Focus first field on mount
  useEffect(() => {
    const nameInput = document.getElementById('name') as HTMLInputElement
    if (nameInput) {
      nameInput.focus()
    }
  }, [])
  
  // Process form submission
const onSubmit = async (data: FormData) => {
  setIsSubmitting(true)
  
  try {
    // Send data to your API endpoint
    const response = await fetch('/api/contact-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Something went wrong');
    }
    
    console.log("Form submitted successfully:", result);
    setSubmitted(true);
  } catch (error) {
    console.error("Submission error:", error);
    // You could add error handling UI here
  } finally {
    setIsSubmitting(false);
  }
}
  
  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
  }
  
  const successVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }
  
  // Success screen
  if (submitted) {
    return (
      <motion.div
        variants={successVariants}
        initial="hidden"
        animate="visible"
        className="rounded-2xl bg-black/30 p-8 backdrop-blur-md border border-gold/20 shadow-lg"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Check className="h-8 w-8 text-gold" />
          </motion.div>
          
          <motion.h3 
            className="mb-2 font-playfair text-2xl font-bold text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Message Sent!
          </motion.h3>
          
          <motion.p 
            className="mb-4 text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Thank you for reaching out. We'll respond to your inquiry within 24-48 hours.
          </motion.p>
          
          <motion.div 
            className="mt-6 h-1 bg-gold"
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="rounded-2xl bg-black/30 p-8 backdrop-blur-md border border-gold/20 shadow-lg"
    >
      <h3 className="mb-2 font-playfair text-2xl font-bold text-white">Send Us a Message</h3>
      <p className="mb-6 text-sm text-white/70">Have questions? We'd love to hear from you</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name Field */}
        <div className="space-y-2">
          <label htmlFor="name" className="flex items-center gap-1 text-sm font-medium text-white/90">
            <User className="h-4 w-4 text-gold/70" />
            Full Name <span className="text-gold">*</span>
          </label>
          
          <div className="relative">
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              className={`w-full rounded-md border ${
                errors.name ? "border-red-500/50 bg-red-500/5" : "border-white/10 bg-white/5"
              } px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-gold/50 focus:bg-gold/5 transition-colors`}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name")}
            />
            
            <AnimatePresence>
              {touchedFields.name && !errors.name && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400"
                >
                  <Check className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <AnimatePresence>
            {errors.name && (
              <motion.div
                id="name-error"
                role="alert"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.name.message}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Email Field */}
        <div className="space-y-2">
        <label htmlFor="email" className="flex items-center gap-1 text-sm font-medium text-white/90">
    <Mail className="h-4 w-4 text-gold/70" />
    Email Address <span className="text-gold">*</span>
  </label>
  
  <div className="relative">
    <input
      id="email"
      type="email"
      placeholder="Your email address"
      className={`w-full rounded-md border ${
        errors.email ? "border-red-500/50 bg-red-500/5" : "border-white/10 bg-white/5"
      } px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-gold/50 focus:bg-gold/5 transition-colors`}
      aria-invalid={errors.email ? "true" : "false"}
      aria-describedby={errors.email ? "email-error" : undefined}
      {...register("email")}
    />
    
    <AnimatePresence>
      {touchedFields.email && !errors.email && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400"
        >
          <Check className="h-5 w-5" />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
  
  <AnimatePresence>
    {errors.email && (
      <motion.div
        id="email-error"
        role="alert"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="overflow-hidden"
      >
        <div className="flex items-center gap-1 text-xs text-red-400">
          <AlertCircle className="h-3 w-3" />
          <span>{errors.email.message}</span>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>

{/* Subject Field */}
<div className="space-y-2">
  <label htmlFor="subject" className="flex items-center gap-1 text-sm font-medium text-white/90">
    <MessageSquare className="h-4 w-4 text-gold/70" />
    Subject <span className="text-gold">*</span>
  </label>
  
  <div className="relative">
    <input
      id="subject"
      type="text"
      placeholder="What is your message about?"
      className={`w-full rounded-md border ${
        errors.subject ? "border-red-500/50 bg-red-500/5" : "border-white/10 bg-white/5"
      } px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-gold/50 focus:bg-gold/5 transition-colors`}
      aria-invalid={errors.subject ? "true" : "false"}
      aria-describedby={errors.subject ? "subject-error" : undefined}
      {...register("subject")}
    />
    
    <AnimatePresence>
      {touchedFields.subject && !errors.subject && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400"
        >
          <Check className="h-5 w-5" />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
  
  <AnimatePresence>
    {errors.subject && (
      <motion.div
        id="subject-error"
        role="alert"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="overflow-hidden"
      >
        <div className="flex items-center gap-1 text-xs text-red-400">
          <AlertCircle className="h-3 w-3" />
          <span>{errors.subject.message}</span>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>

{/* Message Field */}
<div className="space-y-2">
  <label htmlFor="message" className="flex items-center gap-1 text-sm font-medium text-white/90">
    <MessageSquare className="h-4 w-4 text-gold/70" />
    Your Message <span className="text-gold">*</span>
  </label>
  
  <div className="relative">
    <textarea
      id="message"
      rows={5}
      placeholder="Please type your message here..."
      className={`w-full rounded-md border ${
        errors.message ? "border-red-500/50 bg-red-500/5" : "border-white/10 bg-white/5"
      } px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-gold/50 focus:bg-gold/5 transition-colors`}
      aria-invalid={errors.message ? "true" : "false"}
      aria-describedby={errors.message ? "message-error" : undefined}
      {...register("message")}
    />
    
    <AnimatePresence>
      {touchedFields.message && !errors.message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute right-3 top-6 text-green-400"
        >
          <Check className="h-5 w-5" />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
  
  <AnimatePresence>
    {errors.message && (
      <motion.div
        id="message-error"
        role="alert"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="overflow-hidden"
      >
        <div className="flex items-center gap-1 text-xs text-red-400">
          <AlertCircle className="h-3 w-3" />
          <span>{errors.message.message}</span>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>

{/* Submit Button */}
<motion.button
  type="submit"
  disabled={isSubmitting}
  className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-gold-dark via-gold to-gold-light py-3 font-medium text-black transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 disabled:opacity-70"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  {isSubmitting ? (
    <>
      <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>Send Message</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}