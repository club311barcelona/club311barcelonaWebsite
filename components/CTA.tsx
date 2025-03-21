import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { EnhancedScrollReveal } from "@/components/enhanced-scroll-reveal"
import { GradientText } from "@/components/gradient-text"
import { TouchRipple } from "@/components/touch-ripple"

const CTA: React.FC = () => {
  return (
    <section className="relative bg-charcoal py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/noise.png')] bg-repeat opacity-5"></div>
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
      <div className="absolute -right-32 top-1/3 w-96 h-96 bg-gold/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute -left-32 bottom-1/3 w-96 h-96 bg-gold/5 rounded-full blur-[100px] -z-10"></div>
      
      {/* Cannabis leaf decorative elements */}
      <div className="absolute top-10 left-10 opacity-5 rotate-45">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
          <path d="M12,2C10.57,2 9.19,2.5 8,3.34C5.44,5.53 4.57,9.17 5.75,12.25C4.83,10.36 4.7,8.12 5.47,6.25C2.21,8.11 1,12.21 3.06,15.47C4.25,17.23 6.24,18.17 8.33,18.17C8.83,18.17 9.34,18.09 9.83,17.94C7.84,19.13 5.64,18.94 4.09,17.91C6.25,21 10.3,21.96 13.62,19.96C15.43,18.82 16.56,16.92 16.84,14.83C17.41,17.39 16.5,19.95 14.5,21.17C17.82,20.09 19.77,16.69 18.69,13.37C18.47,12.67 18.12,12.03 17.68,11.5C20.38,13.53 20.76,17.6 18.34,20.1C22.04,17.5 22.47,12.25 19.87,8.55C18.94,7.35 17.69,6.46 16.32,5.95C18.19,6.23 19.9,7.5 20.72,9.34C21.38,6.23 19.33,3.16 16.22,2.5C15.5,2.32 14.77,2.32 14.05,2.5C16.5,1.32 19.17,1.69 21,3.5C18.15,0.94 13.92,1.05 11.25,3.32C10.95,3.07 10.39,2.57 10.25,2.5C9.66,3.43 9.36,4.55 9.47,5.7C9.56,6.67 9.92,7.55 10.47,8.27C9.38,7.08 7.71,6.55 6.08,6.97C4.76,7.31 3.77,8.2 3.33,9.27C5.33,7.08 8.67,7 10.78,9.11C8.9,7.39 6.15,7.07 3.91,8.11C6.67,6 10.17,6.5 12.28,9.26V2L12,2Z" />
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 opacity-5 -rotate-15">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
          <path d="M12,2C10.57,2 9.19,2.5 8,3.34C5.44,5.53 4.57,9.17 5.75,12.25C4.83,10.36 4.7,8.12 5.47,6.25C2.21,8.11 1,12.21 3.06,15.47C4.25,17.23 6.24,18.17 8.33,18.17C8.83,18.17 9.34,18.09 9.83,17.94C7.84,19.13 5.64,18.94 4.09,17.91C6.25,21 10.3,21.96 13.62,19.96C15.43,18.82 16.56,16.92 16.84,14.83C17.41,17.39 16.5,19.95 14.5,21.17C17.82,20.09 19.77,16.69 18.69,13.37C18.47,12.67 18.12,12.03 17.68,11.5C20.38,13.53 20.76,17.6 18.34,20.1C22.04,17.5 22.47,12.25 19.87,8.55C18.94,7.35 17.69,6.46 16.32,5.95C18.19,6.23 19.9,7.5 20.72,9.34C21.38,6.23 19.33,3.16 16.22,2.5C15.5,2.32 14.77,2.32 14.05,2.5C16.5,1.32 19.17,1.69 21,3.5C18.15,0.94 13.92,1.05 11.25,3.32C10.95,3.07 10.39,2.57 10.25,2.5C9.66,3.43 9.36,4.55 9.47,5.7C9.56,6.67 9.92,7.55 10.47,8.27C9.38,7.08 7.71,6.55 6.08,6.97C4.76,7.31 3.77,8.2 3.33,9.27C5.33,7.08 8.67,7 10.78,9.11C8.9,7.39 6.15,7.07 3.91,8.11C6.67,6 10.17,6.5 12.28,9.26V2L12,2Z" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Card with animated border */}
          <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-gold/30 via-transparent to-gold/30 bg-size-200 animate-gradient-x shadow-xl shadow-gold/10">
            <div className="rounded-2xl bg-black/60 px-6 py-12 md:px-14 md:py-14 relative">
              {/* Top decorative element */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gold-dark to-gold-light  flex items-center justify-center shadow-lg">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-charcoal">
          <path d="M12,2C10.57,2 9.19,2.5 8,3.34C5.44,5.53 4.57,9.17 5.75,12.25C4.83,10.36 4.7,8.12 5.47,6.25C2.21,8.11 1,12.21 3.06,15.47C4.25,17.23 6.24,18.17 8.33,18.17C8.83,18.17 9.34,18.09 9.83,17.94C7.84,19.13 5.64,18.94 4.09,17.91C6.25,21 10.3,21.96 13.62,19.96C15.43,18.82 16.56,16.92 16.84,14.83C17.41,17.39 16.5,19.95 14.5,21.17C17.82,20.09 19.77,16.69 18.69,13.37C18.47,12.67 18.12,12.03 17.68,11.5C20.38,13.53 20.76,17.6 18.34,20.1C22.04,17.5 22.47,12.25 19.87,8.55C18.94,7.35 17.69,6.46 16.32,5.95C18.19,6.23 19.9,7.5 20.72,9.34C21.38,6.23 19.33,3.16 16.22,2.5C15.5,2.32 14.77,2.32 14.05,2.5C16.5,1.32 19.17,1.69 21,3.5C18.15,0.94 13.92,1.05 11.25,3.32C10.95,3.07 10.39,2.57 10.25,2.5C9.66,3.43 9.36,4.55 9.47,5.7C9.56,6.67 9.92,7.55 10.47,8.27C9.38,7.08 7.71,6.55 6.08,6.97C4.76,7.31 3.77,8.2 3.33,9.27C5.33,7.08 8.67,7 10.78,9.11C8.9,7.39 6.15,7.07 3.91,8.11C6.67,6 10.17,6.5 12.28,9.26V2L12,2Z" />
        </svg>
      </div>
    </div>

    {/* Content */}
    <div className="text-center pt-4">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-playfair text-2xl font-bold text-white md:text-4xl lg:text-5xl"
      >
        Ready to Join <GradientText className="bg-gradient-to-r from-gold-light via-gold to-gold-dark bg-clip-text text-transparent">Club 311</GradientText>?
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mx-auto mt-4 md:mt-6 max-w-md text-white/80 text-base md:text-xl font-light px-2"
      >
        Become a member today and experience Barcelona's premier cannabis social club
      </motion.p>
      
      {/* Decorative divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="h-px w-24 bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto my-6 md:my-8"
      ></motion.div>
      
      <EnhancedScrollReveal animation="fade" delay={0.4}>
        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row justify-center gap-4 md:gap-6 px-2">
          <TouchRipple>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light px-5 md:px-6 font-medium text-black transition-colors duration-300 hover:opacity-90 mb-3 sm:mb-0"
              onClick={() => {
                const form = document.getElementById('membership-form');
                if (form) {
                  const offset = window.innerWidth < 768 ? 80 : 120;
                  const formPosition = form.getBoundingClientRect().top + window.pageYOffset - offset;
                  window.scrollTo({
                    top: formPosition,
                    behavior: 'smooth'
                  });
                } else {
                  window.location.href = "/#membership-form";
                }
              }}
            >
              <span className="font-bold text-sm md:text-base whitespace-nowrap">Apply for Membership</span>
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
            </motion.button>
          </TouchRipple>
          
          <TouchRipple>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 px-5 md:px-6 font-medium text-white transition-colors duration-300 hover:opacity-90"
              onClick={() => window.location.href = "/contact"}
            >
              <span className="font-bold text-sm md:text-base whitespace-nowrap">Contact Us</span>
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
            </motion.button>
          </TouchRipple>
        </div>
      </EnhancedScrollReveal>
    </div>
  </div>
</div>

{/* Bottom decorative elements */}
<div className="flex justify-center mt-6 md:mt-8 opacity-70">
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay: 0.7 }}
    className="text-gold/30 text-xs md:text-sm px-2 text-center"
            >
              • Premium Selection • Exclusive Experience • Barcelona's Finest •
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;