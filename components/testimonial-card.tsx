import { Star } from "lucide-react"
import type { TestimonialProps } from "@/types"

type TestimonialCardProps = Omit<TestimonialProps, "id" | "date">

export default function TestimonialCard({ quote, author, location, rating }: TestimonialCardProps) {
  return (
    <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
      <div className="mb-4 flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-5 w-5 ${i < rating ? "fill-purple text-purple" : "text-gray-400"}`} />
        ))}
      </div>
      <p className="mb-4 text-lg italic">"{quote}"</p>
      <div>
        <p className="font-semibold">{author}</p>
        {location && <p className="text-sm text-white/80">{location}</p>}
      </div>
    </div>
  )
}

