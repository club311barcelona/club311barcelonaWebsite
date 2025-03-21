import type React from "react"
// Common interfaces for the project

export interface NavItem {
  name: string
  path: string
}

export interface EventCardProps {
  id?: number
  title: string
  date: string
  time: string
  description: string
  image: string
  tag?: string
  featured?: boolean
  slug?: string
}

export interface TestimonialProps {
  id: number
  quote: string
  author: string
  location?: string
  rating: number
  date?: string
}

export interface BlogPostProps {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  author: string
  image: string
  slug: string
  content?: string
  tags?: string[]
}

export interface StaffProfileProps {
  name: string
  role: string
  image: string
  bio: string
  socialLinks?: {
    instagram?: string
    twitter?: string
    linkedin?: string
  }
}

export interface FAQItemProps {
  question: string
  answer: string
}

export interface PageHeaderProps {
  title: string
  subtitle?: string
  accentWord?: string
  gradientVariant?: "gold" | "burgundy" | "royal" | "purple"
}

export interface GradientTextProps {
  children: React.ReactNode
  variant?: "gold" | "burgundy" | "royal" | "purple"
  className?: string
}

export interface AnimationProps {
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
  className?: string
}

export interface ScrollRevealProps extends AnimationProps {
  children: React.ReactNode
}

export interface EnhancedScrollRevealProps extends ScrollRevealProps {
  animation?: "fade" | "slide" | "scale" | "stagger" | "reveal"
  direction?: "up" | "down" | "left" | "right"
  distance?: number
  staggerChildren?: number
}

export interface LoadingIndicatorProps {
  size?: "sm" | "md" | "lg"
  color?: "gold" | "white" | "burgundy" | "royal" | "purple"
  type?: "spinner" | "dots" | "pulse" | "logo"
  text?: string
  fullScreen?: boolean
}

export interface TouchRippleProps {
  children: React.ReactNode
  color?: string
  disabled?: boolean
  className?: string
}

export interface MagneticButtonProps {
  children: React.ReactNode
  strength?: number
}

export interface PremiumButtonProps {
  children: React.ReactNode
  href: string
  variant?: "gold" | "purple" | "burgundy" | "royal"
}

export interface GlowingButtonProps {
  children: React.ReactNode
  variant?: "gold" | "burgundy" | "royal" | "purple"
}

export interface HoverCardProps {
  children: React.ReactNode
}

export interface ParallaxProps {
  children: React.ReactNode
  speed?: number
}

export interface ParallaxTextProps {
  children: string
  baseVelocity: number
}

export interface TextRevealProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  direction?: "up" | "down" | "left" | "right"
}

export interface ResponsiveContainerProps {
  children: React.ReactNode
  mobileOnly?: React.ReactNode
  desktopOnly?: React.ReactNode
  className?: string
}

