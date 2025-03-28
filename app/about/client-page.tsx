"use client"

import { useRef } from "react"
import Image from "next/legacy/image";
import { motion } from "framer-motion"
import { ChevronRight, ChevronDown } from "lucide-react"
import { EnhancedScrollReveal } from "@/components/enhanced-scroll-reveal"
import { GradientText } from "@/components/gradient-text"
import { TouchRipple } from "@/components/touch-ripple"
import Navbar from "@/components/navbar"
import  CTA  from "@/components/CTA"
import Footer from "@/components/footer"


export const metadata = {
  title: "About Us | Club 311 - Private Cannabis Social Club in Barcelona",
  description:
    "Learn about Club 311, Barcelona's premier cannabis social club. Discover our history, values, and what makes our community special.",
  keywords: "about Club 311, cannabis club history, Barcelona social club, Club 311 values, cannabis community",
};

const faqs = [
  {
    question: "How do I become a member?",
    answer:
      "Membership at Club 311 requires a referral from an existing member and completion of our Membership application process. If you don't know a current member, you can contact us through our website or our Instagram account to inquire about membership options.",
  },
  {
    question: "What are the membership fees?",
    answer:
      "We have various membership options with different fee structures. Annual memberships offer the best value, while we also offer monthly and temporary options. Please contact us directly for current membership rates.",
  },
  {
    question: "Is Club 311 legal?",
    answer:
      "Yes, Club 311 operates as a private, non-profit association in accordance with Spanish law. We adhere to all legal requirements for cannabis social clubs in Barcelona, including membership restrictions and private consumption guidelines.",
  },
  {
    question: "Can tourists join Club 311?",
    answer:
      "While we welcome international members, Spanish law requires that members have a local address in Spain. Tourists staying for a short period may be eligible for temporary membership, subject to our application process.",
  },
]

export default function AboutPage() {
  // Refs for sections
  const storyRef = useRef<HTMLElement>(null)
  const valuesRef = useRef(null)
  const spaceRef = useRef(null)
  const faqRef = useRef(null)

  return (
    <main className="bg-charcoal text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-charcoal py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Images/about/HeroImage-LoungeArea1-Club311.jpg"
            alt="Club 311 Interior"
            layout='fill'
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/70 to-charcoal"></div>
          <div className="h-full w-full bg-[url('/noise.png')] bg-repeat opacity-10"></div>
        </div>
        
        {/* Decorative gold corners */}
        <div className="absolute left-0 top-0 h-20 w-20 overflow-hidden opacity-20 lg:opacity-30">
          <div className="absolute h-[1px] left-4 top-8 w-16 bg-gold"></div>
          <div className="absolute h-16 left-8 top-4 w-[1px] bg-gold"></div>
        </div>
        <div className="absolute bottom-0 right-0 h-20 w-20 overflow-hidden opacity-20 lg:opacity-30">
          <div className="absolute bottom-8 h-[1px] right-4 w-16 bg-gold"></div>
          <div className="absolute bottom-4 h-16 right-8 w-[1px] bg-gold"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <EnhancedScrollReveal animation="reveal">
            <div className="mb-8 text-center">
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-3"
              >
                <span className="inline-block rounded-full border border-gold/30 bg-gold/5 px-4 py-1 text-xs font-medium uppercase tracking-wider text-gold backdrop-blur-sm">
                  About Us
                </span>
              </motion.div>
              
              <h1 className="font-playfair text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                About <GradientText>Club 311</GradientText>
              </h1>
              
              <motion.div 
                className="relative mx-auto mt-6 h-[2px] w-24 bg-gradient-to-r from-gold/0 via-gold to-gold/0"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "6rem", opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <motion.div 
                  className="absolute -top-[3px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold"
                  animate={{ 
                    boxShadow: ["0 0 0px rgba(212, 175, 55, 0.3)", "0 0 8px rgba(212, 175, 55, 0.8)", "0 0 0px rgba(212, 175, 55, 0.3)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              
              <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
                Discover the story behind Barcelona's premier cannabis social club
              </p>
            </div>
          </EnhancedScrollReveal>
        </div>
        
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
            <TouchRipple>
              <button
                className="rounded-full border border-gold/20 bg-white/10 p-3 backdrop-blur-sm"
                onClick={() => {
                  storyRef.current?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <ChevronDown className="h-6 w-6 text-gold" />
              </button>
            </TouchRipple>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section ref={storyRef} className="relative bg-charcoal py-24 lg:py-32">
        {/* Background texture and effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[url('/noise.png')] bg-repeat"></div>
        </div>
        
        <section className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <EnhancedScrollReveal animation="slide" direction="left">
              <div className="relative rounded-2xl border border-white/5 p-0.5 backdrop-blur-sm">
                {/* Animated gold border effect */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    animate={{ 
                      background: [
                        "linear-gradient(0deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)",
                        "linear-gradient(60deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)",
                        "linear-gradient(120deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)",
                        "linear-gradient(180deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)",
                        "linear-gradient(240deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)",
                        "linear-gradient(300deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)",
                        "linear-gradient(360deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)",
                      ]
                    }}
                    transition={{ 
                      duration: 10, 
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
                
                <div className="relative h-[500px] overflow-hidden rounded-2xl">
                  <Image
                    src="/Images/about/Club311BarcelonaEntrance.jpg"
                    alt="Club 311 Interior"
                    layout='fill'
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent"></div>
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="mb-2 font-playfair text-xl font-bold text-white">Our Beginning</h3>
                    <p className="mb-4 text-white/80">Discover our private social club in Barcelona.</p>
                    
                    <div className="flex flex-wrap gap-3">
                      {[
                        { text: 'Est. 2018' },
                        { text: 'Barcelona' },
                        { text: 'Member-Owned' }
                      ].map((item, i) => (
                        <motion.div
                          key={item.text}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 + (i * 0.1) }}
                          viewport={{ once: true }}
                          className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-sm"
                        >
                          <span className="text-sm text-white/90">{item.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Decorative element */}
                  <div className="absolute right-6 top-6 rounded-full bg-black/30 p-2 backdrop-blur-sm">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="h-14 w-14 rounded-full border border-gold/20 p-2"
                    >
                      <div className="flex h-full w-full items-center justify-center rounded-full border border-gold/40 bg-black/50">
                        <span className="font-playfair text-lg font-medium text-gold">311</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </EnhancedScrollReveal>

            <EnhancedScrollReveal animation="slide" direction="right" delay={0.2}>
              <div className="relative flex flex-col justify-center space-y-6 rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm lg:p-8">
                {/* Accent corner */}
                <div className="absolute left-0 top-0 h-16 w-16 overflow-hidden">
                  <div className="absolute h-[1px] left-2 top-5 w-8 bg-gold/40"></div>
                  <div className="absolute h-8 left-5 top-2 w-[1px] bg-gold/40"></div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: -10 }} 
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-2"
                >
                  <span className="inline-block rounded-full border border-gold/30 bg-gold/5 px-4 py-1 text-xs font-medium uppercase tracking-wider text-gold backdrop-blur-sm">
                    Our Story
                  </span>
                </motion.div>
                
                <h2 className="font-playfair text-3xl font-bold text-white">
                  The <GradientText>Journey</GradientText> of Club 311
                </h2>
                
                <motion.p 
                  className="relative text-lg leading-relaxed text-white/80"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <span className="mr-2 inline-block text-2xl font-light leading-none text-gold">"</span>
                  Club 311 was founded in 2018 by a group of cannabis enthusiasts who shared a vision of creating a
                  sophisticated, welcoming space for like-minded individuals in Barcelona. Located near the iconic
                  Sagrada Familia, our club quickly established itself as a premier destination for those seeking
                  quality products in an elegant environment.
                </motion.p>
                
                <motion.p 
                  className="text-lg leading-relaxed text-white/80"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  What began as a small community has grown into one of Barcelona's most respected cannabis social
                  clubs, known for our commitment to quality, exceptional service, and vibrant community events.
                  Throughout our journey, we've remained dedicated to our founding principles of creating a safe, legal,
                  and enjoyable space for our members.
                </motion.p>
                
                <motion.p 
                  className="text-lg leading-relaxed text-white/80"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Today, Club 311 continues to evolve while staying true to our roots. We pride ourselves on our
                  knowledgeable staff, carefully curated selection, and the unique atmosphere that makes our club feel
                  like a second home to our members.
                </motion.p>
                
                <div className="mt-2 flex flex-wrap gap-3 pt-2">
                  {['Premium Experience', 'Community-Focused', 'Established 2018', 'Member-Owned'].map((feature, i) => (
                    <motion.div 
                      key={feature}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + (i * 0.1) }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-3 py-1"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-gold"></div>
                      <span className="text-sm text-gold">{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                <EnhancedScrollReveal animation="fade" delay={0.4}>
                  <div className="mt-12 text-center">
                    <TouchRipple>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        className="inline-flex items-center gap-3 h-12 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light px-6 font-medium text-black transition-colors duration-300 hover:opacity-90"
                        onClick={() => window.location.href = "/#membership-form"}
                      >
                        <span>Become a Member</span>
                        <ChevronRight className="h-5 w-5" />
                      </motion.button>
                    </TouchRipple>
                  </div>
                </EnhancedScrollReveal>

              </div>
            </EnhancedScrollReveal>
          </div>
        </section>
      </section>

      {/* Our Values Section */}
      <section ref={valuesRef} className="relative bg-gradient-to-b from-charcoal to-black py-24 lg:py-32">
        {/* Background texture and effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[url('/noise.png')] bg-repeat"></div>
        </div>
        
        {/* Decorative gold corners */}
        <div className="absolute left-0 top-0 h-20 w-20 overflow-hidden opacity-20 lg:opacity-30">
          <div className="absolute h-[1px] left-4 top-8 w-16 bg-gold"></div>
          <div className="absolute h-16 left-8 top-4 w-[1px] bg-gold"></div>
        </div>
        <div className="absolute bottom-0 right-0 h-20 w-20 overflow-hidden opacity-20 lg:opacity-30">
          <div className="absolute bottom-8 h-[1px] right-4 w-16 bg-gold"></div>
          <div className="absolute bottom-4 h-16 right-8 w-[1px] bg-gold"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <EnhancedScrollReveal animation="reveal">
            <div className="mb-16 text-center">
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-3"
              >
                <span className="inline-block rounded-full border border-gold/30 bg-gold/5 px-4 py-1 text-xs font-medium uppercase tracking-wider text-gold backdrop-blur-sm">
                  Our Philosophy
                </span>
              </motion.div>
              
              <h2 className="font-playfair text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Our <GradientText>Values</GradientText>
              </h2>
              
              <motion.div 
                className="relative mx-auto mt-6 h-[2px] w-24 bg-gradient-to-r from-gold/0 via-gold to-gold/0"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "6rem", opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <motion.div 
                  className="absolute -top-[3px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold"
                  animate={{ 
                    boxShadow: ["0 0 0px rgba(212, 175, 55, 0.3)", "0 0 8px rgba(212, 175, 55, 0.8)", "0 0 0px rgba(212, 175, 55, 0.3)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              
              <p className="mx-auto mt-6 max-w-2xl text-center text-white/60">
                The principles that guide everything we do at Club 311
              </p>
            </div>
          </EnhancedScrollReveal>
 
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <EnhancedScrollReveal animation="fade" delay={0.1}>
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }}
                className="group h-full rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.05] to-transparent p-1"
              >
                <div className="h-full rounded-xl bg-black/20 p-8 backdrop-blur-sm">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-xl text-gold ring-1 ring-gold/20 group-hover:bg-gold/20 transition-colors duration-300">
                    <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-4 font-playfair text-xl font-bold text-white group-hover:text-gold transition-colors duration-300">
                    Quality & Safety
                  </h3>
                  <p className="text-white/70">
                  We are committed to operating within the legal framework to provide a safe and respectful environment for our members.
                  </p>
                </div>
              </motion.div>
            </EnhancedScrollReveal>

            <EnhancedScrollReveal animation="fade" delay={0.2}>
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }}
                className="group h-full rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.05] to-transparent p-1"
              >
                <div className="h-full rounded-xl bg-black/20 p-8 backdrop-blur-sm">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-xl text-gold ring-1 ring-gold/20 group-hover:bg-gold/20 transition-colors duration-300">
                    <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-4 font-playfair text-xl font-bold text-white group-hover:text-gold transition-colors duration-300">
                    Community & Respect
                  </h3>
                  <p className="text-white/70">
                    We foster an inclusive community where all members are treated with respect. Our club is a place to
                    connect, share experiences, and build meaningful relationships.
                  </p>
                </div>
              </motion.div>
            </EnhancedScrollReveal>
 
            <EnhancedScrollReveal animation="fade" delay={0.3}>
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }}
                className="group h-full rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.05] to-transparent p-1"
              >
                <div className="h-full rounded-xl bg-black/20 p-8 backdrop-blur-sm">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-xl text-gold ring-1 ring-gold/20 group-hover:bg-gold/20 transition-colors duration-300">
                    <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-4 font-playfair text-xl font-bold text-white group-hover:text-gold transition-colors duration-300">
                    Education & Awareness
                  </h3>
                  <p className="text-white/70">
                    We believe in promoting responsible consumption through education. Our staff is knowledgeable and
                    always available to provide guidance and information.
                  </p>
                </div>
              </motion.div>
            </EnhancedScrollReveal>
          </div>
        </div>

        <EnhancedScrollReveal animation="fade" delay={0.4}>
                  <div className="mt-12 text-center">
                    <TouchRipple>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        className="inline-flex items-center gap-3 h-12 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light px-6 font-medium text-black transition-colors duration-300 hover:opacity-90"
                        onClick={() => window.location.href = "/#membership-form"}
                      >
                        <span>Become a Member</span>
                        <ChevronRight className="h-5 w-5" />
                      </motion.button>
                    </TouchRipple>
                  </div>
                </EnhancedScrollReveal>          

      </section>

      {/* Our Space Section */}
      <section ref={spaceRef} className="relative bg-charcoal py-24 lg:py-32">
        {/* Background texture and effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[url('/noise.png')] bg-repeat"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <EnhancedScrollReveal animation="reveal">
            <div className="mb-16 text-center">
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-3"
              >
                <span className="inline-block rounded-full border border-gold/30 bg-gold/5 px-4 py-1 text-xs font-medium uppercase tracking-wider text-gold backdrop-blur-sm">
                  Our Location
                </span>
              </motion.div>
              
              <h2 className="font-playfair text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Our <GradientText>Space</GradientText>
              </h2>
              
              <motion.div 
                className="relative mx-auto mt-6 h-[2px] w-24 bg-gradient-to-r from-gold/0 via-gold to-gold/0"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "6rem", opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <motion.div 
                  className="absolute -top-[3px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold"
                  animate={{ 
                    boxShadow: ["0 0 0px rgba(212, 175, 55, 0.3)", "0 0 8px rgba(212, 175, 55, 0.8)", "0 0 0px rgba(212, 175, 55, 0.3)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              
              <p className="mx-auto mt-6 max-w-2xl text-center text-white/60">
                Designed for comfort, style, and an exceptional experience
              </p>
            </div>
          </EnhancedScrollReveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <EnhancedScrollReveal animation="fade" delay={0.1}>
              <div className="relative rounded-2xl border border-white/5 p-0.5 backdrop-blur-sm">
                <div className="relative h-[400px] overflow-hidden rounded-2xl">
                  <Image
                    src="/Images/about/LoungeArea3-Club311.jpg"
                    alt="Club 311 Lounge Area"
                    layout='fill'
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent"></div>
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="mb-2 font-playfair text-xl font-bold text-white">Lounge Area</h3>
                    <p className="mb-4 text-white/80">Comfortable seating for relaxation and socializing</p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-sm"
                    >
                      <span className="text-sm text-white/90">Stylish & Comfortable</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </EnhancedScrollReveal>

            <EnhancedScrollReveal animation="fade" delay={0.2}>
              <div className="relative rounded-2xl border border-white/5 p-0.5 backdrop-blur-sm">
                <div className="relative h-[400px] overflow-hidden rounded-2xl">
                  <Image
                    src="/Images/about/GameTableArea-Club311.jpg"
                    alt="Club 311 Entertainment Area"
                    layout='fill'
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent"></div>
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="mb-2 font-playfair text-xl font-bold text-white">Entertainment Area</h3>
                    <p className="mb-4 text-white/80">Music, games, and a vibrant social atmosphere</p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-sm"
                    >
                      <span className="text-sm text-white/90">Entertainment & Fun</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </EnhancedScrollReveal>

            <EnhancedScrollReveal animation="fade" delay={0.3}>
              <div className="relative rounded-2xl border border-white/5 p-0.5 backdrop-blur-sm">
                <div className="relative h-[400px] overflow-hidden rounded-2xl">
                  <Image
                    src="/Images/about/LoungeArea2-Club311.jpg"
                    alt="Club 311 Product Display"
                    layout='fill'
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent"></div>
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="mb-2 font-playfair text-xl font-bold text-white">Member Area</h3>
                    <p className="mb-4 text-white/80">A private space for members</p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-sm"
                    >
                      <span className="text-sm text-white/90">Quality & Variety</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </EnhancedScrollReveal>
          </div>
          
          <EnhancedScrollReveal animation="fade" delay={0.4}>
            <div className="mt-12 text-center">
              <TouchRipple>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="inline-flex items-center gap-3 h-12 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light px-6 font-medium text-black transition-colors duration-300 hover:opacity-90"
                  onClick={() => window.location.href = "/#membership-form"}
                >
                  <span>Get Your Invitation Today !</span>
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </TouchRipple>
            </div>
          </EnhancedScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="relative bg-gradient-to-b from-black to-charcoal py-24 lg:py-32">
        {/* Background texture and effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[url('/noise.png')] bg-repeat"></div>
        </div>

        {/* Decorative gold corners */}
        <div className="absolute left-0 top-0 h-20 w-20 overflow-hidden opacity-20 lg:opacity-30">
          <div className="absolute h-[1px] left-4 top-8 w-16 bg-gold"></div>
          <div className="absolute h-16 left-8 top-4 w-[1px] bg-gold"></div>
        </div>
        <div className="absolute bottom-0 right-0 h-20 w-20 overflow-hidden opacity-20 lg:opacity-30">
          <div className="absolute bottom-8 h-[1px] right-4 w-16 bg-gold"></div>
          <div className="absolute bottom-4 h-16 right-8 w-[1px] bg-gold"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <EnhancedScrollReveal animation="reveal">
            <div className="mb-16 text-center">
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-3"
              >
                <span className="inline-block rounded-full border border-gold/30 bg-gold/5 px-4 py-1 text-xs font-medium uppercase tracking-wider text-gold backdrop-blur-sm">
                  Common Questions
                </span>
              </motion.div>
              
              <h2 className="font-playfair text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Frequently Asked <GradientText>Questions</GradientText>
              </h2>
              
              <motion.div 
                className="relative mx-auto mt-6 h-[2px] w-24 bg-gradient-to-r from-gold/0 via-gold to-gold/0"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "6rem", opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <motion.div 
                  className="absolute -top-[3px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold"
                  animate={{ 
                    boxShadow: ["0 0 0px rgba(212, 175, 55, 0.3)", "0 0 8px rgba(212, 175, 55, 0.8)", "0 0 0px rgba(212, 175, 55, 0.3)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              
              <p className="mx-auto mt-6 max-w-2xl text-center text-white/60">
                Everything you need to know about Club 311 membership and services
              </p>
            </div>
          </EnhancedScrollReveal>

          <div className="mx-auto max-w-3xl">
            {faqs.map((faq, index) => (
              <EnhancedScrollReveal key={index} animation="fade" delay={0.1 * index}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="mb-6 overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm"
                >
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between p-6 text-lg font-medium text-white">
                      <span>{faq.question}</span>
                      <span className="transition-transform duration-300 group-open:rotate-180">
                        <ChevronDown className="h-5 w-5 text-gold" />
                      </span>
                    </summary>
                    <div className="border-t border-white/5 px-6 pb-6 pt-4">
                      <p className="text-white/70">{faq.answer}</p>
                    </div>
                  </details>
                </motion.div>
              </EnhancedScrollReveal>
            ))}
          </div>
          
          <EnhancedScrollReveal animation="fade" delay={0.5}>
            <div className="mt-12 text-center">
              <p className="mb-6 text-white/70">
                Have more questions? We're here to help.
              </p>
              <TouchRipple>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="inline-flex items-center gap-3 h-12 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light px-6 font-medium text-black transition-colors duration-300 hover:opacity-90"
                  onClick={() => window.location.href = "/contact"}
                >
                  <span>Contact Us</span>
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </TouchRipple>
            </div>
          </EnhancedScrollReveal>
        </div>
      </section>
 
      {/* CTA Section */}
      <CTA />

      <Footer />
    </main>
  )
}