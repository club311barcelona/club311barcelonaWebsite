"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Instagram } from "lucide-react"

// This would typically fetch from Instagram API
// For demo purposes, we're using placeholder images
const instagramPosts = [
  {
    id: "post1",
    image:
      "/Images/homepage/HeroImage-LoungeArea2-Club311.jpg",
    link: "https://www.instagram.com/club_311/",
    likes: 524,
    comments: 8,
  },
  {
    id: "post2",
    image:
      "/Images/homepage/LoungeArea1-Club311.jpg",
    link: "https://www.instagram.com/club_311/",
    likes: 98,
    comments: 5,
  },
  {
    id: "post3",
    image:
      "/Images/homepage/BoardGamesStation-Club311.jpg",
    link: "https://www.instagram.com/club_311/",
    likes: 156,
    comments: 12,
  },
  {
    id: "post4",
    image:
      "/Images/homepage/LoungeArea3-Club311.jpg",
    link: "https://www.instagram.com/club_311/",
    likes: 87,
    comments: 3,
  },
  {
    id: "post5",
    image:
      "/Images/homepage/GameTableArea-Club311.jpg",
    link: "https://www.instagram.com/club_311/",
    likes: 142,
    comments: 9,
  },
  {
    id: "post6",
    image:
      "/Images/homepage/ClubView-Club311.jpg",
    link: "https://www.instagram.com/club_311/",
    likes: 113,
    comments: 7,
  },
]

export default function InstagramFeed() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
      {instagramPosts.map((post) => (
        <motion.div
          key={post.id}
          className="group relative aspect-square overflow-hidden rounded-2xl"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onHoverStart={() => setHoveredId(post.id)}
          onHoverEnd={() => setHoveredId(null)}
        >
          <Image
            src={post.image || "/placeholder.svg"}
            alt="Instagram post"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16.66vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredId === post.id ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href={post.link} target="_blank" className="z-10">
              <div className="flex flex-col items-center">
                <Instagram className="mb-2 h-6 w-6 text-white" />
                <div className="flex gap-4 text-sm text-white">
                  <span className="flex items-center gap-1">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
                    </svg>
                    {post.comments}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

