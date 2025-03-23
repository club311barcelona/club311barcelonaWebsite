"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Clock, Phone, Mail, Instagram, Facebook, Twitter, Youtube, ChevronRight,  ChevronDown, ChevronUp, Send, User, Users, Calendar } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { EnhancedScrollReveal } from "@/components/enhanced-scroll-reveal"
import { GradientText } from "@/components/gradient-text"
import { TouchRipple } from "@/components/touch-ripple"
import Newsletter from "@/components/newsletter"
import { ContactForm } from "@/components/ui/contact-form"
import CTA from '@/components/CTA';
import { Parallax } from "@/components/parallax"
import EventsGrid from '@/components/EventsGrid';



// Event categories for filtering
const categories = ["All", "Weekly", "Music", "Social", "Educational", "Wellness"]

const EventsPageClient = () => {
  const eventsRef = useRef(null);


  return (
    <main className="bg-charcoal text-white">
      <Navbar />

        {/* Hero Section */}
          <section className="relative bg-charcoal py-32">
            <div className="absolute inset-0 z-0">
              <Image
                src="/Images/events/HeroImage-LoungeArea1-Club311.jpg"
                alt="Club 311 Events"
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
                    Club Events
                  </span>
                </div>
                
                <h1 className="font-playfair text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                  Club 311 <GradientText className="from-gold to-gold-light">Events</GradientText>
                </h1>
                
                <div className="relative mx-auto mt-6 h-[2px] w-24 bg-gradient-to-r from-gold/0 via-gold to-gold/0">
                  <div className="absolute -top-[3px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold"></div>
                </div>
                
                <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
                  Join us for exclusive member gatherings, social mixers, and special events in our comfortable lounge setting.
                </p>
                
                {/* Down arrow button */}
                <div className="mt-12 flex justify-center">
                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                      <TouchRipple>
                        <button 
                          onClick={() => eventsRef.current?.scrollIntoView({ behavior: 'smooth' })}
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
                  <Link 
                    href="#membership-form" 
                    scroll={false} 
                    onClick={(e) => {
                      e.preventDefault();
                      const form = document.getElementById('membership-form');
                      if (form) {
                        const offset = window.innerWidth < 768 ? 80 : 120;
                        const formPosition = form.getBoundingClientRect().top + window.pageYOffset - offset;
                        window.scrollTo({
                          top: formPosition,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="inline-flex items-center gap-3 h-12 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light px-6 font-medium text-black transition-colors duration-300 hover:opacity-90 relative z-10"
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
                </motion.div>
              </TouchRipple>
            </div>
          </EnhancedScrollReveal>
        </div>
      </section>



              {/* Contact Form Section */}
              <section id="contact" className="relative bg-charcoal py-24 lg:py-32">
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
                      <EnhancedScrollReveal animation="slide-right">
                        <div className="h-full">
                          <ContactForm className="h-full" />
                        </div>
                      </EnhancedScrollReveal>
                      
                      {/* Contact Information */}
                      <EnhancedScrollReveal animation="slide-left">
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
                    allowFullScreen="" 
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
        
        <Newsletter />

      <Footer />
    </main>
  );
}

export default EventsPageClient;