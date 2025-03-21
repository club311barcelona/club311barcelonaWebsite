import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight, ChevronDown } from 'lucide-react';
import { TouchRipple } from "@/components/touch-ripple";
import { EnhancedScrollReveal } from "@/components/enhanced-scroll-reveal";

const EventCard = ({ event, index = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <EnhancedScrollReveal animation="fade" delay={index * 0.1}>
      <div 
        className="group h-full overflow-hidden rounded-2xl border border-white/5 p-0.5 backdrop-blur-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-full rounded-xl bg-black/20 overflow-hidden">
          {/* Event image - ADJUSTED HEIGHT */}
          <div className="relative w-full h-40 overflow-hidden"> {/* Changed from h-52 to h-40 */}
            <motion.div
              animate={{
                scale: isHovered ? 1.1 : 1,
                filter: isHovered ? "brightness(1.2)" : "brightness(1)"
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Image
                src={event.image || '/placeholder-event.jpg'}
                alt={event.title || "Event"}
                width={500}
                height={200} // Reduced height
                className="w-full h-full object-cover"
                priority
              />
            </motion.div>
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent"></div>

            {/* Event tag */}
            {event.tag && (
              <motion.div 
                className="absolute left-4 top-4 z-10"
                animate={{ y: isHovered ? -2 : 0, scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="rounded-full border border-gold/30 bg-black/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold backdrop-blur-sm">
                  {event.tag}
                </span>
              </motion.div>
            )}
          </div>
          
          {/* Event content */}
          <div className="p-6 flex flex-col">
            <motion.h3 
              className="mb-3 font-playfair text-xl font-bold text-white group-hover:text-gold transition-colors duration-300"
              animate={{ color: isHovered ? "rgb(212, 175, 55)" : "rgb(255, 255, 255)" }}
              transition={{ duration: 0.3 }}
            >
              {event.title}
            </motion.h3>
            
            <div className="mb-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-white/70">
                <Calendar className="h-4 w-4 text-gold" />
                <span className="text-sm">{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Clock className="h-4 w-4 text-gold" />
                <span className="text-sm">{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <MapPin className="h-4 w-4 text-gold" />
                <span className="text-sm">Club 311 Lounge</span>
              </div>
            </div>
            
            {/* Condensed description */}
            {!isExpanded && (
              <p className="mb-4 text-sm text-white/70 line-clamp-3">
                {event.description}
              </p>
            )}
            
            {/* Expanded content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-gold/10 pt-4">
                    <p className="mb-4 text-sm text-white/70">{event.description}</p>
                    
                    {/* Features list */}
                    {event.features?.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gold">Event Features:</h4>
                        <ul className="ml-4 space-y-1 mt-2">
                          {event.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-white/70">
                              <div className="mt-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-gold"></div>
                              </div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Registration button */}
                <TouchRipple className="w-full">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      // First try to find the home section
                      const homeSection = document.getElementById("home");
                      if (homeSection) {
                        // Scroll to the home section
                        homeSection.scrollIntoView({ behavior: "smooth" });
                    
                    // Focus on the membership form (optional)
                    setTimeout(() => {
                      const membershipForm = document.querySelector("#home .MembershipForm");
                      if (membershipForm) {
                        membershipForm.scrollIntoView({ behavior: "smooth" });
                        const firstInput = membershipForm.querySelector('input');
                        if (firstInput) firstInput.focus();
          }
            }, 800); // Delay to allow for the initial scroll
            } else {
              // If we're not on the homepage, navigate to homepage
              window.location.href = "/#membership-form";
                        }
                      }}
                      className="flex w-full items-center justify-center gap-2 h-11 rounded-full bg-gold px-5 font-medium text-black transition-colors duration-300 hover:bg-gold/90"
                    >
                      <span className="text-sm font-bold">Register Your Membership Right Now!</span>
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </TouchRipple>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Toggle button */}
            <div className="mt-auto pt-3">
              <TouchRipple className="w-full">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="group flex w-full items-center justify-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-2 text-gold transition-all duration-300 hover:bg-gold/10"
                >
                  <span className="text-sm">{isExpanded ? "Show Less" : "Show Details"}</span>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </motion.button>
              </TouchRipple>
            </div>
          </div>
        </div>
      </div>
    </EnhancedScrollReveal>
  );
};

export default EventCard;