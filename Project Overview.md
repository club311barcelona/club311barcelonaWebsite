# Club311Barcelona Project Overview

## Project Purpose
Club311Barcelona is a modern web application built with Next.js, React, and Tailwind CSS. The project appears to be a website for a club or organization, featuring:
- Rich UI components using Radix UI and custom animations
- Smooth page transitions and scroll effects
- Integration with Supabase for backend services
- Responsive design and mobile-friendly components
- Content management through Next.js pages

## Technology Stack
- **Framework**: Next.js 15
- **Styling**: Tailwind CSS with animations
- **UI Components**: Radix UI, Framer Motion, Lucide Icons
- **State Management**: React Hook Form, Zod for validation
- **Backend**: Supabase integration
- **Type Safety**: TypeScript
- **Build Tools**: PostCSS, Tailwind Merge

## File Tree Structure
```
.
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   ├── api/
│   ├── blog/
│   ├── contact/
│   ├── data/
│   ├── events/
├── components/
│   ├── age-verification.tsx
│   ├── animated-headline.tsx
│   ├── CTA.tsx
│   ├── elegant-loader.tsx
│   ├── enhanced-scroll-reveal.tsx
│   ├── EventCard.jsx
│   ├── EventsGrid.jsx
│   ├── EventsSection.jsx
│   ├── faq-accordion.tsx
│   ├── footer.tsx
│   ├── glowing-button.tsx
│   ├── gradient-text.tsx
│   ├── hover-card.tsx
│   ├── instagram-feed.tsx
│   ├── loading-indicator.tsx
│   ├── magnetic-button.tsx
│   ├── membership-form.tsx
│   ├── mobile-menu.tsx
│   ├── navbar.tsx
│   ├── newsletter.tsx
│   ├── page-header.tsx
│   ├── page-transition.tsx
│   ├── parallax-text.tsx
│   ├── parallax.tsx
│   ├── premium-button.tsx
│   ├── responsive-container.tsx
│   ├── scroll-reveal.tsx
│   ├── smooth-scroll.tsx
│   ├── staff-profile.tsx
│   ├── testimonial-card.tsx
│   ├── testimonial-slider.tsx
│   ├── text-reveal.tsx
│   ├── theme-provider.tsx
│   ├── touch-ripple.tsx
│   ├── ui/
├── hooks/
│   ├── use-media-query.tsx
│   ├── use-mobile.tsx
│   ├── use-toast.ts
├── lib/
│   ├── supabase-browser.js
│   ├── utils.ts
├── public/
│   ├── age-verification-static.html
│   ├── noise.png
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   ├── placeholder.jpg
│   ├── placeholder.svg
│   ├── Images/
├── styles/
│   ├── globals.css
├── types/
│   ├── index.ts
```

## Major Components
1. **UI Components**:
   - `animated-headline.tsx`: Animated text components
   - `parallax.tsx`: Parallax scrolling effects
   - `testimonial-slider.tsx`: Testimonial carousel
   - `hover-card.tsx`: Interactive hover cards
   - `glowing-button.tsx`: Animated button components

2. **Layout Components**:
   - `navbar.tsx`: Main navigation
   - `footer.tsx`: Page footer
   - `mobile-menu.tsx`: Responsive mobile menu
   - `page-transition.tsx`: Smooth page transitions

3. **Form Components**:
   - `membership-form.tsx`: Membership application
   - `contact-form.tsx`: Contact form
   - `newsletter.tsx`: Newsletter subscription

4. **Utility Components**:
   - `theme-provider.tsx`: Theme management
   - `loading-indicator.tsx`: Loading states
   - `responsive-container.tsx`: Responsive layout

5. **Specialized Components**:
   - `age-verification.tsx`: Age gate component
   - `instagram-feed.tsx`: Social media integration
   - `staff-profile.tsx`: Team member profiles

## Project Structure
The project follows Next.js best practices with:
- Page routing in `app/` directory
- Reusable components in `components/`
- Custom hooks in `hooks/`
- Utility functions in `lib/`
- Static assets in `public/`
- Type definitions in `types/`