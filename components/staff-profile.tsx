import Image from "next/image"

interface StaffProfileProps {
  name: string
  role: string
  image: string
  bio: string
}

export default function StaffProfile({ name, role, image, bio }: StaffProfileProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 h-48 w-48 overflow-hidden rounded-full">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={200}
          height={200}
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="mb-1 font-montserrat text-xl font-semibold text-[#2F4F4F]">{name}</h3>
      <p className="mb-3 text-[#DAA520]">{role}</p>
      <p className="text-gray-600">{bio}</p>
    </div>
  )
}

