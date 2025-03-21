// components/ui/EventsSection.jsx
import { GradientText } from '@/components/gradient-text';
import EventsGrid from '@/components/EventsGrid';

// Default events data - can be overridden via props
const defaultEvents = [
    {
      id: 1,
      title: "Weedza Thursday",
      date: "Every Thursday",
      time: "19:45 - 21:00",
      description:
        "Join us for our weekly Weedza Thursday event, featuring special cannabis-infused pizza and a relaxed social atmosphere. Our chef creates unique flavor combinations that perfectly complement our premium selection. It's the perfect opportunity to meet fellow members and enjoy great food in a comfortable setting.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9f4c8187-f587-4568-bdc5-9e07ce0025b7.jpg-DrHwNp8YH2IE1QG35PXsXrWxy3AVzt.jpeg",
      tag: "Weekly",
      featured: true,
      features: ["Premium cannabis-infused pizza", "Social atmosphere", "Member networking"],
    },
    {
      id: 2,
      title: "Club 311 SPANNABIS",
      date: "Saturday, March 15",
      time: "20:00 - 23:00",
      description:
        "Experience an evening of DJ performances in our comfortable lounge area. We've invited 2 talented DJ's to create the perfect ambiance for a relaxing night. Enjoy our premium selection while listening to House/Minimal melodies in an intimate setting.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/47bc4da2-bbed-4931-830c-1300ce9010ef.jpg-Wzl0oGc6EAiFBpmUZckweqeZzcKSM9.jpeg",
      tag: "Music",
      featured: true,
      features: ["Live acoustic performances", "Intimate setting", "Premium selections"],
    },
    {
      id: 3,
      title: "Members Mixer",
      date: "Saturday, March 23",
      time: "19:00 - 22:00",
      description:
        "Network with fellow members and enjoy complimentary refreshments at our monthly Members Mixer. This is a great opportunity to meet new people, share experiences, and strengthen our community bonds. Our staff will be introducing some new products and gathering feedback from our valued members.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a869c9f2-30af-47a5-abf8-7963fdf36ed5.jpg-YKokAwj13J1oD5VPv3DVKg9IoMfy3H.jpeg",
      tag: "Social",
      featured: true,
      features: ["Complimentary refreshments", "Product introductions", "Community networking"],
    },
  ];
  
  // Default categories - can be overridden via props
  const defaultCategories = ["All", "Weekly", "Music", "Social", "Educational", "Wellness"];
  
  const EventsSection = ({ 
    title = "Upcoming Events", 
    subtitle = "Join us for special events and member gatherings", 
    events = defaultEvents,
    categories = defaultCategories,
    alignment = "center"
  }) => {
    // Split title for gradient text
    const titleParts = title.split(' ');
    const lastWord = titleParts.pop();
    const firstPart = titleParts.join(' ');
  
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Section heading */}
          <div className={`max-w-3xl mx-auto text-${alignment}`}>
            <h2 className={`font-playfair text-3xl font-bold md:text-4xl text-${alignment}`}>
              {firstPart && <span className="text-white">{firstPart} </span>}
              <GradientText>{lastWord}</GradientText>
            </h2>
            
            {subtitle && (
              <p className={`mt-4 text-white/70 text-${alignment}`}>
                {subtitle}
              </p>
            )}
          </div>
          
          <div className="mt-12">
            <EventsGrid events={events} categories={categories} />
          </div>
        </div>
      </section>
    );
  };
  
  export default EventsSection;