"use client"

import type React from "react"

import { useMediaQuery } from "@/hooks/use-media-query"

interface ResponsiveContainerProps {
  children: React.ReactNode
  mobileOnly?: React.ReactNode
  desktopOnly?: React.ReactNode
  className?: string
}

export function ResponsiveContainer({ children, mobileOnly, desktopOnly, className = "" }: ResponsiveContainerProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div className={className}>
      {/* Always render main children */}
      {children}

      {/* Conditionally render mobile or desktop specific content */}
      {isMobile && mobileOnly}
      {!isMobile && desktopOnly}
    </div>
  )
}

