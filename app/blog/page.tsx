
import Image from "next/image"
import { Calendar, Clock, User, ArrowRight, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import { Metadata } from 'next'
import Link from "next/link"
import { GradientText } from "@/components/gradient-text"
import { TouchRipple } from "@/components/touch-ripple"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"

// Import blog posts data from the data file
import blogPosts from "@/app/data/blogpostsarticles"

interface BlogPost {
  id: number
  title: string
  slug: string
  image: string
  category: string
  date: string
  readTime: string
  author: string
  excerpt: string
}

export const metadata: Metadata = {
  title: "Blog | Club 311 - Private Cannabis Social Club in Barcelona",
  description:
    "Explore our blog for insights on cannabis culture, events, and community news from Club 311, Barcelona's premier cannabis social club.",
  keywords: "cannabis blog, Barcelona cannabis, social club blog, cannabis culture, Club 311",
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-charcoal text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-charcoal py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Images/blog/HeroSection-LoungeArea1-Club311.jpg"
            alt="Club 311 Interior"
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
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3">
              <span className="inline-block rounded-full border border-gold/30 bg-gold/5 px-4 py-1 text-xs font-medium uppercase tracking-wider text-gold backdrop-blur-sm">
                Insights & Stories
              </span>
            </div>
            
            <h1 className="font-playfair text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Club 311 <GradientText className="from-gold to-gold-light">Blog</GradientText>
            </h1>
            
            <div className="relative mx-auto mt-6 h-[2px] w-24 bg-gradient-to-r from-gold/0 via-gold to-gold/0">
              <div className="absolute -top-[3px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold"></div>
            </div>
            
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
              Insights, stories, and updates from Barcelona's premier cannabis social club
            </p>
            
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="relative bg-charcoal py-16">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[url('/noise.png')] bg-repeat"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-playfair text-3xl font-bold text-white">
                Featured <GradientText className="from-gold to-gold-light">Article</GradientText>
              </h2>
              <div className="mt-2 h-[2px] w-24 bg-gradient-to-r from-gold/0 via-gold to-gold/0"></div>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-2xl border border-white/5 p-0.5 backdrop-blur-sm">
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-gold/10 via-transparent to-gold/10"></div>
            </div>
            
            <div className="relative rounded-2xl bg-black/20 overflow-hidden">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="relative h-[400px] md:h-auto">
                  <Image
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent md:bg-gradient-to-l md:from-transparent md:to-black/70"></div>
                </div>
                
                <div className="flex flex-col justify-center p-8">
                  <div className="mb-4">
                    <span className="rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold backdrop-blur-sm">
                      {blogPosts[0].category}
                    </span>
                  </div>
                  
                  <h3 className="mb-4 font-playfair text-2xl font-bold text-white md:text-3xl">
                    {blogPosts[0].title}
                  </h3>
                  
                  <div className="mb-4 flex items-center gap-4 text-sm text-white/60">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gold" />
                      {blogPosts[0].date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gold" />
                      {blogPosts[0].readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4 text-gold" />
                      {blogPosts[0].author}
                    </span>
                  </div>
                  
                  <p className="mb-6 text-white/70">
                    {blogPosts[0].excerpt}
                  </p>
                  
                  <div className="flex justify-start">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={`/blog/${blogPosts[0].slug}`}
                      className="inline-flex items-center gap-3 h-12 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light px-6 font-medium text-black transition-colors duration-300 hover:opacity-90"
                    >
                      <span className="font-bold">Read Article </span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </motion.button>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="relative bg-charcoal py-16">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[url('/noise.png')] bg-repeat"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-playfair text-3xl font-bold text-white">
                Latest <GradientText className="from-gold to-gold-light">Articles</GradientText>
              </h2>
              <div className="mt-2 h-[2px] w-24 bg-gradient-to-r from-gold/0 via-gold to-gold/0"></div>
            </div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(1).map((post: BlogPost) => (
              <article
                key={post.id}
                className="group h-full overflow-hidden rounded-2xl border border-white/5 bg-black/20 backdrop-blur-sm transition-all duration-300 hover:border-gold/20"
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent"></div>
                    
                    {post.category && (
                      <div className="absolute left-4 top-4 z-10">
                        <span className="rounded-full border border-gold/30 bg-black/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold backdrop-blur-sm">
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4 flex items-center gap-4 text-sm text-white/60">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gold" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gold" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h2 className="mb-3 font-playfair text-xl font-bold text-white transition-colors duration-300 group-hover:text-gold">
                      {post.title}
                    </h2>
                    
                    <p className="mb-4 text-white/70 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <span className="flex items-center gap-1 text-sm text-white/60">
                        <User className="h-4 w-4 text-gold" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-medium text-gold transition-all duration-300 group-hover:translate-x-1">
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-16 flex justify-center">
            <div className="flex items-center gap-2">
              <TouchRipple>
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-gold/30 hover:bg-gold/5 hover:text-gold">
                  <ArrowRight className="h-4 w-4 rotate-180" />
                </button>
              </TouchRipple>
              
              <TouchRipple>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-black">
                  1
                </button>
              </TouchRipple>
              
              <TouchRipple>
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-gold/30 hover:bg-gold/5 hover:text-gold">
                  2
                </button>
              </TouchRipple>
              
              <TouchRipple>
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-gold/30 hover:bg-gold/5 hover:text-gold">
                  3
                </button>
              </TouchRipple>
              
              <TouchRipple>
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-gold/30 hover:bg-gold/5 hover:text-gold">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </TouchRipple>
            </div>
          </div>
        </div>
      </section>

      
      
      <Newsletter />

      <Footer />
    </main>
  )
}