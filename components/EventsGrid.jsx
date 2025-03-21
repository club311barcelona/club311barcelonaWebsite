import { useState } from 'react';
import EventCard from '@/components/EventCard';

// Default events data
const defaultEvents = [
  {
    id: 1,
    title: "Weedza Thursday",
    date: "Every Thursday",
    time: "19:45 - 21:00",
    description:
      "Join us for our weekly Weedza Thursday event, featuring special cannabis-infused pizza and a relaxed social atmosphere. Our chef creates unique flavor combinations that perfectly complement our premium selection.",
    image:
      "/Images/events/weedza-IG-Club311.jpg",
    tag: "Weekly",
    features: ["Premium cannabis-infused pizza", "Social atmosphere", "Member networking"],
  },
  {
    id: 2,
    title: "Club 311 SPANNABIS",
    date: "Saturday, March 15",
    time: "20:00 - 23:00",
    description:
      "Experience an evening of DJ performances in our comfortable lounge area. We've invited 2 talented DJ's to create the perfect ambiance for a relaxing night. Enjoy our premium selection while listening to House/Minimal melodies.",
    image:
      "/Images/events/Spannabis2025.jpg",
    tag: "Music",
    features: ["Live DJ performances", "Intimate setting", "Premium selections"],
  },
  {
    id: 3,
    title: "Members Mixer",
    date: "Saturday, March 23",
    time: "19:00 - 22:00",
    description:
      "Network with fellow members and enjoy complimentary refreshments at our monthly Members Mixer. This is a great opportunity to meet new people, share experiences, and strengthen our community bonds.",
    image:
      "/Images/events/ClubEntrance-Club311.jpg",
    tag: "Social",
    features: ["Networking opportunities", "Complimentary refreshments", "New product introductions"],
  },
];

const EventsGrid = ({ events = defaultEvents, categories = ["All", "Weekly", "Music", "Social"] }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredEvents = activeCategory === "All" 
    ? events 
    : events.filter(event => event.tag === activeCategory);
  
  return (
    <div className="w-full">
      {/* Category filters */}
      {categories.length > 1 && (
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 
                ${activeCategory === category 
                  ? "bg-gold text-black" 
                  : "bg-white/5 text-white/70 hover:bg-white/10"}`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      
      {/* Events grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg text-white/70">No events found in this category.</p>
          <button 
            onClick={() => setActiveCategory("All")}
            className="mt-4 rounded-full bg-gold/10 px-4 py-2 text-sm font-medium text-gold hover:bg-gold/20 transition-colors"
          >
            View all events
          </button>
        </div>
      )}
    </div>
  );
};

export default EventsGrid;