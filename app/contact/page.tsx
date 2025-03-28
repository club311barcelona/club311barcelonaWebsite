"use client"

import { useRef } from "react" // Added useRef import
import Image from "next/image"
import { MapPin, Clock, Phone, Mail, Instagram, Facebook, Twitter, Youtube, ChevronDown } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { EnhancedScrollReveal } from "@/components/enhanced-scroll-reveal"
import { motion } from "framer-motion"
import { GradientText } from "@/components/gradient-text"
import { TouchRipple } from "@/components/touch-ripple"
import Newsletter from "@/components/newsletter"
import { ContactForm } from "@/components/ui/contact-form"

  
export default function ContactPage() {
  // Added contactFormRef definition
  const contactFormRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen bg-charcoal text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-charcoal py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Images/contact/Club311BarcelonaEntrance.jpg"
            alt="Club 311 Contact"
            fill
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
          <div className="mb-8 text-center">
            <div className="mb-3">
              <span className="inline-block rounded-full border border-gold/30 bg-gold/5 px-4 py-1 text-xs font-medium uppercase tracking-wider text-gold backdrop-blur-sm">
                Get In Touch
              </span>
            </div>
            
            <h1 className="font-playfair text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Contact <GradientText className="from-gold to-gold-light">Club 311</GradientText>
            </h1>
            
            <div className="relative mx-auto mt-6 h-[2px] w-24 bg-gradient-to-r from-gold/0 via-gold to-gold/0">
              <div className="absolute -top-[3px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold"></div>
            </div>
            
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
              Get in touch with us for membership inquiries or general questions
            </p>

            {/* Down arrow button */}
            <div className="mt-12 flex justify-center">
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                <TouchRipple>
                  <button 
                    onClick={() => contactFormRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    className="rounded-full border border-gold/20 bg-white/10 p-3 backdrop-blur-sm"
                  >
                    <ChevronDown className="h-6 w-6 text-gold" />
                  </button>
                </TouchRipple>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section - Added ref while keeping the id */}
      <section id="contact-form" ref={contactFormRef} className="relative bg-charcoal py-24 lg:py-32">
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
            <EnhancedScrollReveal animation="slide" direction="right">
              <div className="h-full">
                <div className="h-full">
                  <ContactForm />
                </div>
              </div>
            </EnhancedScrollReveal>
            
            {/* Contact Information */}
            <EnhancedScrollReveal animation="slide" direction="left">
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
                        <p className="mt-1 text-white/70"> SAGRADA FAMILIA Metro Station, L5 & L2 </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold/10">
                        <Clock className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white">Hours</h4>
                        <p className="mt-1 text-white/70">Monday - Saturday: 10:30 AM - 12:00 AM</p>
                        <p className="text-white/70">Sunday: 12:00 AM - 12:00 AM</p>
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
                        <p className="mt-1 text-white/70">info@club311.com</p>
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
                        <Facebook className="h-5 w-5" />
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

      <Newsletter />
      <Footer />
    </main>
  );
}