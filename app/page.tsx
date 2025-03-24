"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Instagram, Calendar, MapPin, Clock, ChevronRight, ChevronDown, Phone, Mail,
    Users, MessageCircle, Twitter, Facebook, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import TestimonialSlider from "@/components/testimonial-slider"
import InstagramFeed from "@/components/instagram-feed"
import { EnhancedScrollReveal } from "@/components/enhanced-scroll-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { GradientText } from "@/components/gradient-text"
import { ParallaxText } from "@/components/parallax-text"
import { motion } from "framer-motion"
import { Parallax } from "@/components/parallax"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Newsletter from "@/components/newsletter"
import { AgeVerification } from "@/components/age-verification"
import { MembershipForm } from "@/components/membership-form"
import { AnimatedHeadline } from "@/components/animated-headline"
import { TouchRipple } from "@/components/touch-ripple"
import  CTA  from "@/components/CTA"
import EventsGrid from '@/components/EventsGrid';
import { ContactForm } from "@/components/ui/contact-form"

export default function HomePage() {
  // Refs for sections
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const eventsRef = useRef(null)
  const contactRef = useRef(null)

  return (
    <main className="bg-charcoal text-white">
      {/* <AgeVerification /> */}
      <AgeVerification />
      {/* Navbar should be added here */}
      <Navbar />

      {/* Hero Section */}
    <section id="home" ref={heroRef} className="relative min-h-screen bg-charcoal">
      <div className="absolute inset-0 z-0">
        <Image
          src="/Images/homepage/HeroImage-LoungeArea2-Club311.jpg"
          alt="Club 311 Interior"
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/70 to-charcoal"></div>
      </div>

    <div className="container relative z-10 mx-auto grid min-h-screen items-center gap-5 px-4 py-20 lg:grid-cols-2">
      {/* Left Content Column */}
      <div className="text-left relative">
        {/* Gold accent line */}
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: '80px' }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute -left-4 top-0 w-[1px] bg-gradient-to-b from-gold via-gold/80 to-transparent"
        />
        
        {/* Small gold badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-3 inline-block"
        >
          <div className="rounded-full border border-gold/30 bg-black/30 px-3 py-1 backdrop-blur-sm">
            <span className="text-xs font-medium uppercase tracking-wider text-gold">Since 2018</span>
          </div>
        </motion.div>
        
        <AnimatedHeadline />
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '80px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-3 mt-2 h-[2px] bg-gradient-to-r from-gold to-gold/0"
        />

        {/* Two-part approach for paragraph: static + animated overlay */}
<div className="relative">
  {/* Static paragraph that loads immediately for LCP - INVISIBLE */}
<p 
  className="absolute opacity-0 overflow-hidden w-0 h-0" 
  aria-hidden="true"
  style={{ 
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    position: 'absolute',
    whiteSpace: 'nowrap'
  }}
>
  Tucked away near the city's most iconic sights, we invite you to experience an intimate social space designed for connection, relaxation, and unforgettable experiences
</p>
  
  {/* Animated overlay that creates the animation effect */}
  <motion.div
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ 
      duration: 0.5, 
      delay: 0.4,
      ease: "easeOut"
    }}
    className="mb-4 max-w-md"
  >
    <p className="text-base leading-relaxed text-white/80">
    Tucked away near the city’s most iconic sights, we invite you to experience an intimate social space designed for connection, relaxation, and unforgettable experiences    </p>
  </motion.div>
</div>

        <div className="flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-4 flex flex-col sm:flex-row gap-3 w-full max-w-md"
          >
            <div className="group flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-2 backdrop-blur-sm transition-all duration-300 hover:border-gold/20 hover:bg-white/10 flex-1">
              <Clock className="h-4 w-4 text-gold transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm text-white/90">10:30 - 00:00 Daily</span>
            </div>
            
            <div className="group flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-2 backdrop-blur-sm transition-all duration-300 hover:border-gold/20 hover:bg-white/10 flex-1">
              <MapPin className="h-4 w-4 text-gold transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm text-white/90">Near Sagrada Familia</span>
            </div>
          </motion.div>

          <motion.div 
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="relative overflow-hidden rounded-full w-full">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gold/20 via-gold/40 to-gold/20"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 5,
                  ease: "linear"
                }}
              />
              <TouchRipple className="w-full">
                <Button 
                  variant="premium-gold" 
                  size="default" 
                  asChild 
                  className="relative z-10 px-6 py-2 w-full justify-center !text-black font-medium"
                >
                  <Link href="#about" className="flex items-center justify-center !text-black font-medium">
                    <span className="!text-black">Discover Club 311</span>
                    <motion.span 
                      className="ml-2 !text-black"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                    >
                      →
                    </motion.span>
                  </Link>
                </Button>
              </TouchRipple>
            </div>
          </motion.div>
          
        {/* Social proof - more compact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-4 flex items-center gap-3"
        >
          <div className="flex -space-x-1">
            {[ 5 ].map((i) => (
              <div key={i} className="h-6 w-6 rounded-full border-2 border-charcoal bg-gold/20 text-[10px] flex items-center justify-center text-gold">
                {i}★
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs text-white/70">
              <span className="font-medium text-gold">4.9/5</span> from over 600 members
            </p>
          </div>
        </motion.div>
      </div>
    </div>
    
    {/* Mobile decoration - only visible on smaller screens */}
    <div className="absolute bottom-10 left-0 right-0 z-10 lg:hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mx-auto h-[1px] w-1/3 bg-gradient-to-r from-transparent via-gold/50 to-transparent"
      />
    </div>

    <div id="membership-form" className="lg:pl-8 relative">
      <MembershipForm />
    </div>
  </div>

  <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full border border-gold/20 bg-white/10 backdrop-blur-sm"
        onClick={() => {
          const aboutSection = document.getElementById("about")
          aboutSection?.scrollIntoView({ behavior: "smooth" })
        }}
      >
        <ChevronDown className="h-6 w-6 text-gold" />
      </Button>
    </motion.div>
  </div>
</section>

      {/* About Section */}
<section id="about" ref={aboutRef} className="relative bg-charcoal py-24 lg:py-32">
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
    {/* Section Header */}
    <EnhancedScrollReveal animation="reveal">
      <div className="mb-16 text-center">
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
        
        <h2 className="font-playfair text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          Experience <GradientText>Club 311</GradientText>
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
          Where sophistication meets relaxation in Barcelona's premier cannabis social club
        </p>
      </div>
    </EnhancedScrollReveal>

    <div className="grid gap-12 lg:grid-cols-2">
      {/* Left column - Text content */}
      <EnhancedScrollReveal animation="slide" direction="left">
        <div className="relative flex flex-col justify-center space-y-6 rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm lg:p-8">
          {/* Accent corner */}
          <div className="absolute left-0 top-0 h-16 w-16 overflow-hidden">
            <div className="absolute h-[1px] left-2 top-5 w-8 bg-gold/40"></div>
            <div className="absolute h-8 left-5 top-2 w-[1px] bg-gold/40"></div>
          </div>
          
          <motion.p 
            className="relative text-lg leading-relaxed text-white/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="mr-2 inline-block text-2xl font-light leading-none text-gold">"</span>
            Since 2018, Club 311 Barcelona has been a sanctuary where social connection meets personal relaxation. 
            Our space balances comfort and style—floral accents, plush seating, and eclectic music from hip-hop to house create the perfect atmosphere.
          </motion.p>
          
          <motion.p 
            className="text-lg leading-relaxed text-white/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            With warm lighting and attentive service, we've cultivated a private environment where members truly feel at home. 
            Our team ensures every visit exceeds expectations while preserving the discretion and intimacy that defines our community.
          </motion.p>
          
          <div className="mt-2 flex flex-wrap gap-3 pt-2">
            {['Refined Ambiance', 'Expert Guidance', 'Knowledgeable Staff' ].map((feature, i) => (
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
          
          <TouchRipple>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-2"
          >
            <div className="inline-flex items-center h-12 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light px-6 font-medium text-black transition-colors duration-300 hover:opacity-90">
              <Link href="/about" className="flex items-center justify-between">
                <span className="font-bold mr-3">Learn More About Us</span>
                <motion.div
                  className="relative"
                  initial={{ x: 0 }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse", ease: "easeInOut" }}
                  style={{ overflow: "visible" }}
                >
                  <ChevronRight className="h-4 w-4" />
                </motion.div>
              </Link>
            </div>
          </motion.div>
          </TouchRipple>
        </div>
      </EnhancedScrollReveal>

      {/* Right column - Image */}
      <EnhancedScrollReveal animation="slide" direction="right" delay={0.2}>
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
              src="/Images/homepage/LoungeArea1-Club311.jpg"
              alt="Club 311 Interior"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent"></div>
            
            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="mb-2 font-playfair text-xl font-bold text-white">Our Unique Space</h3>
              
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: '🛋️', text: 'Lounge Area' },
                  { icon: '🎮', text: 'Entertainment' },
                  { icon: '🌿', text: 'Refined Ambiance' }
                ].map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + (i * 0.1) }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-sm"
                  >
                    <span>{item.icon}</span>
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
    </div>

    {/* Feature cards - added new section */}
    <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[
        {
          icon: "🛋️",
          title: "Comfort First",
          desc: "Our interior design prioritizes genuine comfort with thoughtfully arranged seating areas that accommodate both lively conversations and quiet contemplation. Every element has been selected to create a true home away from home."
        },
        {
          icon: "👥",
          title: "Exclusive Community",
          desc: "Join a community of like-minded individuals in a private, members-only environment."
        },
        {
          icon: "🕙",
          title: "Extended Hours",
          desc: "Open daily from 10:30 AM until Midnight, our schedule accommodates both afternoon relaxation and evening unwinding, making Club 311 your accessible sanctuary whenever you need it."
        }
      ].map((feature, i) => (
        <EnhancedScrollReveal animation="fade" delay={0.1 * i} key={feature.title}>
          <motion.div
            whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }}
            className="group h-full rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.05] to-transparent p-1"
          >
            <div className="h-full rounded-xl bg-black/20 p-6 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-xl text-gold ring-1 ring-gold/20 group-hover:bg-gold/20">
                {feature.icon}
              </div>
              <h3 className="mb-3 font-playfair text-xl font-bold text-white group-hover:text-gold transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-white/70">
                {feature.desc}
              </p>
            </div>
          </motion.div>
        </EnhancedScrollReveal>
      ))}
    </div>
    
    {/* Parallax text banner */}
    <div className="mt-20 overflow-hidden">
      <EnhancedScrollReveal>
        <ParallaxText baseVelocity={-3}>
          ★ BARCELONA'S EXCLUSIVE CANNABIS SOCIAL CLUB ★
        </ParallaxText>
      </EnhancedScrollReveal>
    </div>
  </div>
</section>

      {/* Events Section */}
<section id="events" ref={eventsRef} className="relative bg-charcoal py-24 lg:py-32">
  {/* Background effects */}
  <Parallax>
    <div className="absolute inset-0 z-0 opacity-30">
      <div className="h-full w-full bg-[url('/noise.png')] bg-repeat opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-transparent to-charcoal"></div>
    </div>
  </Parallax>
  
  {/* Decorative elements */}
  <div className="absolute left-0 top-1/4 h-40 w-[1px] bg-gradient-to-b from-transparent via-gold/20 to-transparent opacity-60"></div>
  <div className="absolute right-0 top-1/2 h-60 w-[1px] bg-gradient-to-b from-transparent via-gold/20 to-transparent opacity-60"></div>

  <div className="container relative z-10 mx-auto px-4">
    <EnhancedScrollReveal animation="reveal">
      <div className="mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-3"
        >
          <span className="inline-block rounded-full border border-gold/30 bg-gold/5 px-4 py-1 text-xs font-medium uppercase tracking-wider text-gold backdrop-blur-sm">
            <Calendar className="mr-1.5 inline-block h-3 w-3" /> Exclusive Gatherings
          </span>
        </motion.div>
        
        <h2 className="font-playfair text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          Upcoming <GradientText>Events</GradientText>
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
        
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
          Join us for special gatherings, tastings, and social events exclusive to our members
        </p>
      </div>
    </EnhancedScrollReveal>

    {/* Calendar legend */}
    <EnhancedScrollReveal animation="fade" delay={0.1}>
      <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
        {[
          { color: "bg-gold/20 border-gold/40", label: "Weekly Events" },
          { color: "bg-purple-500/20 border-purple-500/40", label: "Music & Entertainment" },
          { color: "bg-emerald-500/20 border-emerald-500/40", label: "Social Gatherings" }
        ].map((category) => (
          <div key={category.label} className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${category.color}`}></div>
            <span className="text-sm text-white/70">{category.label}</span>
          </div>
        ))}
      </div>
    </EnhancedScrollReveal>

    <EventsGrid />

                <EnhancedScrollReveal animation="fade" delay={0.4}>
                  <div className="mt-16 text-center">
                    <TouchRipple>
                      
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="inline-flex items-center gap-3 h-12 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light px-6 font-medium text-black transition-colors duration-300 hover:opacity-90 relative z-10">
                            <Link 
                              href="#membership-form" 
                              scroll={false} 
                              onClick={(e) => {
                                e.preventDefault();
                                const form = document.getElementById('membership-form');
                                if (form) {
                                  const offset = window.innerWidth < 768 ? 80 : 120; // Adjust these values based on your header height
                                  const formPosition = form.getBoundingClientRect().top + window.pageYOffset - offset;
                                  window.scrollTo({
                                    top: formPosition,
                                    behavior: 'smooth'
                                  });
                                }
                              }}
                              className="flex items-center"
                            >
                              <span className="font-bold">Become a Member Today!</span>
                              <motion.span
                                className="ml-2"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                              >
                                <ChevronRight className="h-4 w-4" />
                              </motion.span>
                            </Link>
                          </div>
                        </motion.div>
                      
                    </TouchRipple>
                  </div>
              </EnhancedScrollReveal>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative bg-charcoal py-24 lg:py-32">
          <div className="absolute inset-0 z-0">
            <Image
              src="/Images/homepage/ClubView-Club311.jpg"
              alt="Club 311 Club View"
              fill
              className="object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/80 to-charcoal"></div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute left-1/4 top-0 h-20 w-20 rounded-full bg-gold opacity-5 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-gold opacity-5 blur-3xl"></div>
          <div className="absolute right-8 top-[30%] text-5xl text-gold opacity-10">❝</div>
          <div className="absolute bottom-[20%] left-8 text-5xl text-gold opacity-10">❞</div>

          <div className="container relative z-10 mx-auto px-4">
            <EnhancedScrollReveal animation="reveal">
              <div className="mb-16 text-center">
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-3"
                >
                  <span className="inline-block rounded-full border border-gold/30 bg-gold/5 px-4 py-1 text-xs font-medium uppercase tracking-wider text-gold backdrop-blur-sm">
                    <span className="mr-1.5"></span> 5 ★★★★★ Rating
                  </span>
                </motion.div>
                
                <h2 className="font-playfair text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                  What Our <GradientText>Members Say</GradientText>
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
                
                <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
                  Read genuine experiences from our community of members
                </p>
              </div>
            </EnhancedScrollReveal>

            {/* Google badge */}
            <EnhancedScrollReveal animation="fade" delay={0.1}>
              <div className="mb-10 flex justify-center">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.8055 10.0415H12V14.0415H17.6515C16.827 16.3275 14.6115 18.0415 12 18.0415C8.6865 18.0415 6 15.355 6 12.0415C6 8.72799 8.6865 6.04149 12 6.04149C13.5295 6.04149 14.921 6.63249 15.9805 7.59149L18.809 4.76299C17.023 3.10699 14.634 2.04149 12 2.04149C6.4775 2.04149 2 6.51899 2 12.0415C2 17.564 6.4775 22.0415 12 22.0415C18.6515 22.0415 22 17.2915 22 12.1415C22 11.4415 21.931 10.7415 21.8055 10.0415Z" fill="#FFC107"/>
                    <path d="M3.15302 7.34L6.43852 9.755C7.32752 7.554 9.48052 6.041 12 6.041C13.5295 6.041 14.921 6.633 15.9805 7.591L18.809 4.763C17.023 3.107 14.634 2.041 12 2.041C8.15902 2.041 4.82802 4.17 3.15302 7.34Z" fill="#FF3D00"/>
                    <path d="M12 22.0415C14.583 22.0415 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3038 18.0414 12 18.0415C9.39903 18.0415 7.19053 16.3415 6.35853 14.069L3.09753 16.5975C4.75253 19.778 8.11403 22.0415 12 22.0415Z" fill="#4CAF50"/>
                    <path d="M21.8055 10.0415H12V14.0415H17.6515C17.2571 15.1018 16.5467 16.0164 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17.0415 22 12.1415C22 11.4415 21.931 10.7415 21.8055 10.0415Z" fill="#1976D2"/>
                  </svg>
                  <span className="text-xs text-white/80">Reviews sourced from Google Maps</span>
                </div>
              </div>
            </EnhancedScrollReveal>

            {/* Testimonial slider with frame */}
            <EnhancedScrollReveal animation="fade">
              <div className="relative mx-auto max-w-5xl rounded-2xl border border-white/5 bg-black/20 p-1 backdrop-blur-md">
                {/* Decorative corner elements */}
                <div className="absolute left-0 top-0 h-10 w-10 overflow-hidden">
                  <div className="absolute h-[1px] left-2 top-4 w-6 bg-gold/40"></div>
                  <div className="absolute h-6 left-4 top-2 w-[1px] bg-gold/40"></div>
                </div>
                <div className="absolute right-0 top-0 h-10 w-10 overflow-hidden">
                  <div className="absolute h-[1px] right-2 top-4 w-6 bg-gold/40"></div>
                  <div className="absolute h-6 right-4 top-2 w-[1px] bg-gold/40"></div>
                </div>
                <div className="absolute bottom-0 left-0 h-10 w-10 overflow-hidden">
                  <div className="absolute bottom-4 h-[1px] left-2 w-6 bg-gold/40"></div>
                  <div className="absolute bottom-2 h-6 left-4 w-[1px] bg-gold/40"></div>
                </div>
                <div className="absolute bottom-0 right-0 h-10 w-10 overflow-hidden">
                  <div className="absolute bottom-4 h-[1px] right-2 w-6 bg-gold/40"></div>
                  <div className="absolute bottom-2 h-6 right-4 w-[1px] bg-gold/40"></div>
                </div>
                
                <TestimonialSlider />
              </div>
            </EnhancedScrollReveal>

            <EnhancedScrollReveal animation="fade" delay={0.3}>
              <div className="mt-12 text-center">
                <MagneticButton>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a
                      href="https://g.co/kgs/AN9tNvp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-gold/20 bg-black/40 px-6 py-2 text-gold backdrop-blur-sm transition-all duration-300 hover:border-gold/40"
                    >
                      View all our reviews on Google
                      <motion.div 
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </motion.div>
                    </a>
                  </motion.div>
                </MagneticButton>
              </div>
            </EnhancedScrollReveal>
            
            {/* Trust indicators */}
            <EnhancedScrollReveal animation="fade" delay={0.4}>
              <div className="mt-16 flex flex-wrap items-center justify-center gap-6 lg:gap-12">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-medium text-gold">600+</span>
                  <span className="text-sm text-white/60">Active Members</span>
                </div>
                
                <div className="h-12 w-[1px] bg-white/10"></div>
                
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-medium text-gold">4.9/5</span>
                  <span className="text-sm text-white/60">Average Rating</span>
                </div>
                
                <div className="h-12 w-[1px] bg-white/10"></div>
                
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-medium text-gold">98%</span>
                  <span className="text-sm text-white/60">Membership Renewal</span>
                </div>
              </div>
            </EnhancedScrollReveal>
          </div>
        </section>

              {/* Instagram Feed Section */}
        <section className="relative bg-charcoal py-24 lg:py-32">
          {/* Background effects */}
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-pink-500/20 blur-[100px]"></div>
            <div className="absolute right-1/4 top-0 h-64 w-64 rounded-full bg-purple-500/20 blur-[100px]"></div>
          </div>
          
          {/* Instagram gradient corners */}
          <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-bl from-purple-500/10 via-pink-500/5 to-transparent opacity-60"></div>
          <div className="absolute bottom-0 left-0 h-32 w-32 bg-gradient-to-tr from-purple-500/10 via-pink-500/5 to-transparent opacity-60"></div>

          <div className="container relative z-10 mx-auto px-4">
            <EnhancedScrollReveal animation="reveal">
              <div className="mb-16 text-center">
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-3"
                >
                  <span className="inline-block rounded-full border border-pink-500/30 bg-pink-500/5 px-4 py-1 text-xs font-medium uppercase tracking-wider text-pink-300 backdrop-blur-sm">
                    <Instagram className="mr-1.5 inline-block h-3 w-3" /> Social Media
                  </span>
                </motion.div>
                
                <h2 className="font-playfair text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                  Follow Us on <GradientText className="from-pink-500 to-purple-500">Instagram</GradientText>
                </h2>
                
                <motion.div 
                  className="relative mx-auto mt-6 h-[2px] w-24 bg-gradient-to-r from-pink-500/0 via-pink-500 to-pink-500/0"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "6rem", opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <motion.div 
                    className="absolute -top-[3px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-pink-400"
                    animate={{ 
                      boxShadow: ["0 0 0px rgba(236, 72, 153, 0.3)", "0 0 8px rgba(236, 72, 153, 0.8)", "0 0 0px rgba(236, 72, 153, 0.3)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                
                <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
                  Stay updated with our latest events, promotions, and community highlights
                </p>
              </div>
            </EnhancedScrollReveal>

            {/* Instagram feed frame */}
            <EnhancedScrollReveal animation="fade">
              <div className="relative mx-auto max-w-6xl rounded-2xl border border-white/5 bg-black/20 p-1 backdrop-blur-md">
                {/* Instagram-style corners */}
                <div className="absolute -left-3 -top-3 h-6 w-6 rounded-md bg-gradient-to-br from-pink-500 to-purple-500 opacity-80"></div>
                <div className="absolute -bottom-3 -right-3 h-6 w-6 rounded-md bg-gradient-to-tl from-pink-500 to-purple-500 opacity-80"></div>
                
                <InstagramFeed />
                                
              </div>
            </EnhancedScrollReveal>

            <EnhancedScrollReveal animation="fade" delay={0.3}>
              <div className="mt-16 text-center">
              <TouchRipple>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="inline-flex items-center gap-3 h-12 rounded-full bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300 px-6 font-medium text-white transition-colors duration-300 hover:opacity-90 relative z-10"
                  >
                    <a
                      href="https://www.instagram.com/club_311/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Instagram className="h-5 w-5" />
                      <span className="font-bold">@club_311</span>
                    </a>
                  </motion.button>
              </TouchRipple>
                
                {/* Instagram stats */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-pink-400" />
                    <span className="text-sm text-white/70"><span className="font-medium text-white">2.8K</span> Followers</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-pink-400" />
                    <span className="text-sm text-white/70"><span className="font-medium text-white">100%</span> Response Rate</span>
                  </div>
                </div>
              </div>
            </EnhancedScrollReveal>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="relative bg-charcoal py-20">
          <div className="absolute inset-0 bg-[url('/noise.png')] bg-repeat opacity-5"></div>
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
          
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
                    Get exclusive updates on events, new insights, and member-only offers directly to your inbox
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
                    By subscribing, you agree to our Privacy Policy and consent to receive updates. You can unsubscribe at any desired time.
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" ref={contactRef} className="relative bg-charcoal py-24 lg:py-32">
                {/* Background effects */}
                <div className="absolute inset-0 z-0 opacity-30">
                  <div className="h-full w-full bg-[url('/noise.png')] bg-repeat opacity-10"></div>
                  <div className="absolute bottom-0 right-0 h-[400px] w-[400px] bg-gradient-radial from-gold/5 to-transparent opacity-60"></div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute left-0 top-10 h-20 w-20 overflow-hidden">
                  <div className="absolute h-[1px] left-4 top-8 w-16 bg-gold/20"></div>
                  <div className="absolute h-16 left-8 top-4 w-[1px] bg-gold/20"></div>
                </div>
                
                <div className="container relative z-10 mx-auto px-4">
                  <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Contact Form */}
                      <EnhancedScrollReveal animation="slide">
                        <div className="h-full">
                          <div className="h-full">
                            <ContactForm />
                          </div>
                        </div>
                      </EnhancedScrollReveal>
                      
                      {/* Contact Information */}
                      <EnhancedScrollReveal animation="slide">
                        <div className="group h-full overflow-hidden rounded-2xl border border-white/5 p-0.5 backdrop-blur-sm">
                          <div className="relative h-full rounded-xl bg-black/20 p-6 md:p-8 overflow-hidden flex flex-col">
                            <h3 className="mb-6 font-playfair text-2xl font-bold text-white">Contact Information</h3>
                            
                            <div className="space-y-6 flex-grow">
                              <div className="flex items-start">
                                <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold/10">
                                  <MapPin className="h-5 w-5 text-gold" />
                                </div>
                                <div>
                                  <h4 className="text-lg font-medium text-white">Address</h4>
                                  <p className="mt-1 text-white/70"> Carrer de Lepant, 311, L'Eixample, 08025 Barcelona</p>
                                </div>
                              </div>
                              
                              <div className="flex items-start">
                                <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold/10">
                                  <Clock className="h-5 w-5 text-gold" />
                                </div>
                                <div>
                                  <h4 className="text-lg font-medium text-white">Hours</h4>
                                  <p className="mt-1 text-white/70">Monday - Saturday: 10:30 AM - 12:00 AM</p>
                                  <p className="text-white/70">Sunday: 11:00 AM - 12:00 AM</p>
                                </div>
                              </div>
                              
                              <div className="flex items-start">
                                <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold/10">
                                  <Phone className="h-5 w-5 text-gold" />
                                </div>
                                <div>
                                  <h4 className="text-lg font-medium text-white">Phone</h4>
                                  <p className="mt-1 text-white/70">+34 693 224138</p>
                                </div>
                              </div>
                              
                              <div className="flex items-start">
                                <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold/10">
                                  <Mail className="h-5 w-5 text-gold" />
                                </div>
                                <div>
                                  <h4 className="text-lg font-medium text-white">Email</h4>
                                  <p className="mt-1 text-white/70">info.club311@gmail.com</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="pt-6 mt-auto">
                              <h4 className="mb-4 text-lg font-medium text-white">Follow Us</h4>
                              <div className="flex space-x-4">
                                <a href="https://www.instagram.com/club_311/" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors duration-300 hover:bg-gold/20 hover:text-gold">
                                  <Instagram className="h-5 w-5" />
                                </a>
                                <a href="https://www.instagram.com/club_311/" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors duration-300 hover:bg-gold/20 hover:text-gold">
                                  <Twitter className="h-5 w-5" />
                                </a>
                                <a href="https://www.instagram.com/club_311/" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors duration-300 hover:bg-gold/20 hover:text-gold">
                                  <Youtube className="h-5 w-5" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </EnhancedScrollReveal>
                    </div>
                    
                    {/* Map Section - Moved below the form and contact info */}
            <EnhancedScrollReveal animation="fade" delay={0.2}>
              <div className="mt-12 rounded-2xl border border-white/5 bg-black/20 p-1 backdrop-blur-sm">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl lg:aspect-[21/9]">
                  <div className="absolute inset-0 bg-gradient-to-b from-charcoal/5 to-charcoal/30 pointer-events-none z-10"></div>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11970.00428293288!2d2.163228163619446!3d41.40664043483199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a37a2acf743d%3A0x7f9c0f880dcc8837!2sClub%20311%20BCN%20Weed%20Social%20Club!5e0!3m2!1sen!2ses!4v1741711388249!5m2!1sen!2ses" 
                    width="100%" 
                    height="100%" 
                    className="border-0"
                    allowFullScreen={true}
                    loading="lazy"
                    title="Club 311 Location"
                  ></iframe>

                  
                  {/* Map marker with pulsing effect */}
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform z-20">
                            <motion.div
                              className="h-6 w-6 rounded-full bg-gold/80"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.7, 0.4, 0.7],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                            <motion.div
                              className="absolute -inset-4 rounded-full border-2 border-gold/30"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 0, 0.3],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </EnhancedScrollReveal>
                  </div>
                </section>

                {/* CTA Section */}
                          <CTA />

                {/* Newsletter Section */}
                <Newsletter />          

                {/* Footer */}
                <Footer />
    </main>
  )
}

