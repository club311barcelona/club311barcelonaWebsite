"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, AlertCircle, User, Mail, MapPin, Globe, Shield } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import DOMPurify from 'dompurify' // For sanitizing inputs

// Form schema with Zod validation
const formSchema = z.object({
  name: z.string()
    .min(3, "Please enter your full name")
    .max(100, "Name is too long")
    .refine(val => /^[a-zA-Z\s'-]+$/.test(val), "Please enter a valid name"), // Only allow letters, spaces, apostrophes and hyphens
  
  email: z.string()
    .email("Please enter a valid email address")
    .max(254, "Email is too long")
    .refine(val => /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val), "Please enter a valid email format"),
  
  city: z.string()
    .min(2, "Please enter your home city")
    .max(100, "City name is too long")
    .refine(val => /^[a-zA-Z\s'-]+$/.test(val), "Please enter a valid city name"),
  
  country: z.string()
    .min(2, "Please select your country")
    .max(100, "Country name is too long"),
  
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms to continue" }),
  }),
});

type FormData = z.infer<typeof formSchema>;

// Complete list of countries
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", 
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", 
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", 
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", 
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "DR Congo", "Ecuador", 
  "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", 
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", 
  "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", 
  "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", 
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", 
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", 
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", 
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", 
  "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", 
  "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", 
  "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", 
  "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", 
  "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", 
  "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", 
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export function MembershipForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submissionCount, setSubmissionCount] = useState(0)
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0)
  const firstInputRef = useRef<HTMLInputElement>(null)
  
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    watch
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      city: "",
      country: "",
      acceptTerms: false
    }
  })
  
  // Focus first field on mount
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus()
    }
  }, [])

  // Generate CSRF token on component mount
  const [csrfToken, setCsrfToken] = useState("")
  
  useEffect(() => {
    // Generate a random token
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36)
    setCsrfToken(token)
    
    // Store in sessionStorage (in a real app, this would be handled by the server)
    sessionStorage.setItem('csrfToken', token)
  }, [])
  
  // Process form submission with rate limiting
  const onSubmit = async (data: FormData) => {
    // Check for rate limiting (3 submissions per minute)
    const now = Date.now()
    if (submissionCount >= 3 && now - lastSubmissionTime < 60000) {
      setSubmitError("Too many submission attempts. Please try again in a minute.")
      return
    }
    
    setIsSubmitting(true)
    setSubmitError("")
    
    try {
      // Sanitize inputs before sending
      const sanitizedData = {
        name: DOMPurify.sanitize(data.name),
        email: DOMPurify.sanitize(data.email),
        city: DOMPurify.sanitize(data.city),
        country: DOMPurify.sanitize(data.country),
        acceptTerms: data.acceptTerms
      }
      
      const response = await fetch('/api/membership-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken // Add CSRF token in header
        },
        body: JSON.stringify({
          ...sanitizedData,
          _csrf: csrfToken // Also include in body as fallback
        }),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to submit form');
      }
      
      // Update rate limiting tracking
      setSubmissionCount(prev => prev + 1)
      setLastSubmissionTime(now)
      
      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError("There was a problem submitting your application. Please try again.");
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
            Thank You!
          </motion.h3>
          
          <motion.p 
            className="mb-4 text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Your membership application has been received. We'll contact you within 24 hours to complete your registration. 
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
      <h3 className="mb-2 font-playfair text-2xl font-bold text-white">Become a Member</h3>
      <p className="mb-6 text-sm text-white/70">Join Barcelona's most exclusive cannabis social club</p>
      
      {submitError && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md"
        >
          <div className="flex items-center gap-2 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{submitError}</span>
          </div>
        </motion.div>
      )}
      
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
              ref={firstInputRef}
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
        
        {/* City and Country Fields - Side by Side */}
          <div className="flex gap-4">
            {/* City Field */}
            <div className="space-y-2 w-1/2">
              <label htmlFor="city" className="flex items-center gap-1 text-sm font-medium text-white/90">
                <MapPin className="h-4 w-4 text-gold/70" />
                Home City <span className="text-gold">*</span>
              </label>
              <div className="relative">
                <input
                  id="city"
                  type="text"
                  placeholder="Your home city"
                  className={`w-full rounded-md border ${
                    errors.city ? "border-red-500/50 bg-red-500/5" : "border-white/10 bg-white/5"
                  } px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-gold/50 focus:bg-gold/5 transition-colors`}
                  aria-invalid={errors.city ? "true" : "false"}
                  aria-describedby={errors.city ? "city-error" : undefined}
                  {...register("city")}
                />
                <AnimatePresence>
                  {touchedFields.city && !errors.city && (
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
                {errors.city && (
                  <motion.div
                    id="city-error"
                    role="alert"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-1 text-xs text-red-400">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.city.message}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Country Field */}
            <div className="space-y-2 w-1/2">
              <label htmlFor="country" className="flex items-center gap-1 text-sm font-medium text-white/90">
                <Globe className="h-4 w-4 text-gold/70" />
                Country <span className="text-gold">*</span>
              </label>
              <div className="relative">
                <select
                  id="country"
                  className={`w-full rounded-md border ${
                    errors.country ? "border-red-500/50 bg-red-500/5" : "border-white/10 bg-white/5"
                  } px-4 py-3 text-white bg-black/50 placeholder:text-white/40 focus:outline-none focus:border-gold/50 focus:bg-gold/5 transition-colors appearance-none`}
                  aria-invalid={errors.country ? "true" : "false"}
                  aria-describedby={errors.country ? "country-error" : undefined}
                  {...register("country")}
                >
                  <option value="" className="bg-black">Select your country</option>
                  {countries.map(country => (
                    <option key={country} value={country} className="bg-black">
                      {country}
                    </option>
                  ))}
                </select>
                {/* Custom select arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white/50">
                  <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
                <AnimatePresence>
                  {touchedFields.country && !errors.country && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute right-10 top-1/2 -translate-y-1/2 text-green-400"
                    >
                      <Check className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <AnimatePresence>
                {errors.country && (
                  <motion.div
                    id="country-error"
                    role="alert"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-1 text-xs text-red-400">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.country.message}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        
        {/* Terms Checkbox */}
        <div className="space-y-2">
          <div className="relative flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="acceptTerms"
                type="checkbox"
                className="h-4 w-4 rounded border-white/30 bg-white/5 text-gold focus:ring-gold/50"
                {...register("acceptTerms")}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="acceptTerms" className="text-white/80">
                I confirm I am at least 21 years old and accept the{" "}
                <a href="#" className="text-gold hover:underline">
                  membership terms
                </a>
              </label>
            </div>
          </div>
          
          <AnimatePresence>
            {errors.acceptTerms && (
              <motion.div
                role="alert"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.acceptTerms.message}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Security notice */}
        <div className="bg-black/20 rounded-md p-3 border border-gold/10">
          <div className="flex items-start gap-2">
            <Shield className="h-4 w-4 text-gold/70 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-white/60">
              Your information is secure and encrypted. We never share your personal details with third parties.
            </p>
          </div>
        </div>
        
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative mt-4 w-full overflow-hidden rounded-md bg-gold py-3 font-medium text-black transition-all duration-300 hover:bg-gold-light disabled:opacity-70"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="h-4 w-4 rounded-full border-2 border-black border-t-transparent"
              />
              <span>Processing...</span>
            </div>
          ) : (
            <>
              Apply for Membership
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 -z-10 opacity-0"
                animate={{
                  opacity: [0, 0.5, 0],
                  left: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 5,
                }}
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                }}
              />
            </>
          )}
        </motion.button>
        
        {/* Hidden CSRF token field */}
        <input type="hidden" name="_csrf" value={csrfToken} />
      </form>
      
      <p className="mt-4 text-xs text-white/60">
        By applying, you agree to our membership terms and conditions. Must be 21+ to join.
      </p>
    </motion.div>
  )
}