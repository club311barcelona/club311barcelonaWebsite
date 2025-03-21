# Product Requirements Document (PRD)

## Project: Club311Barcelona Website

### 1. Introduction

This document outlines the requirements for the Club311Barcelona website.

### 2. Goals

*   Provide information about the club.
*   Showcase upcoming events.
*   Allow users to contact the club.

### 3. File Tree

```
.gitignore
components.json
next.config.mjs
package-lock.json
package.json
postcss.config.mjs
tailwind.config.js
tsconfig.json
app/
app/globals.css
app/layout.tsx
app/page.tsx
app/about/
app/about/page.tsx
app/blog/
app/blog/page.tsx
app/blog/[slug]/
app/blog/[slug]/page.tsx
app/contact/
app/contact/page.tsx
app/events/
app/events/page.tsx
components/
components/age-verification.tsx
components/animated-headline.tsx
components/cursor.tsx
components/elegant-loader.tsx
components/enhanced-scroll-reveal.tsx
components/event-card.tsx
components/faq-accordion.tsx
components/footer.tsx
components/glowing-button.tsx
components/gradient-text.tsx
components/hover-card.tsx
components/instagram-feed.tsx
components/loading-indicator.tsx
components/magnetic-button.tsx
components/membership-form.tsx
components/mobile-menu.tsx
components/navbar.tsx
components/newsletter.tsx
components/page-header.tsx
components/page-transition.tsx
components/parallax-text.tsx
components/parallax.tsx
components/premium-button.tsx
components/responsive-container.tsx
components/scroll-reveal.tsx
components/smooth-scroll.tsx
components/staff-profile.tsx
components/testimonial-card.tsx
components/testimonial-slider.tsx
components/text-reveal.tsx
components/theme-provider.tsx
components/touch-ripple.tsx
components/ui/
components/ui/accordion.tsx
components/ui/alert-dialog.tsx
components/ui/alert.tsx
components/ui/aspect-ratio.tsx
components/ui/avatar.tsx
components/ui/badge.tsx
components/ui/breadcrumb.tsx
components/ui/button.tsx
components/ui/calendar.tsx
components/ui/card.tsx
components/ui/carousel.tsx
components/ui/chart.tsx
components/ui/checkbox.tsx
components/ui/collapsible.tsx
components/ui/command.tsx
components/ui/context-menu.tsx
components/ui/dialog.tsx
components/ui/drawer.tsx
components/ui/dropdown-menu.tsx
components/ui/form.tsx
components/ui/hover-card.tsx
components/ui/input-otp.tsx
components/ui/input.tsx
components/ui/label.tsx
components/ui/menubar.tsx
components/ui/navigation-menu.tsx
components/ui/pagination.tsx
components/ui/popover.tsx
components/ui/progress.tsx
components/ui/radio-group.tsx
components/ui/resizable.tsx
components/ui/scroll-area.tsx
components/ui/select.tsx
components/ui/separator.tsx
components/ui/sheet.tsx
components/ui/sidebar.tsx
components/ui/skeleton.tsx
components/ui/slider.tsx
components/ui/sonner.tsx
components/ui/switch.tsx
components/ui/table.tsx
components/ui/tabs.tsx
components/ui/textarea.tsx
components/ui/toast.tsx
components/ui/toaster.tsx
components/ui/toggle-group.tsx
components/ui/toggle.tsx
components/ui/tooltip.tsx
components/ui/use-mobile.tsx
components/ui/use-toast.ts
hooks/
hooks/use-media-query.tsx
hooks/use-mobile.tsx
hooks/use-toast.ts
lib/
lib/utils.ts
public/
public/placeholder-logo.png
public/placeholder-logo.svg
public/placeholder-user.jpg
public/placeholder.jpg
public/placeholder.svg
styles/
styles/globals.css
types/
types/index.ts
```

### 4. Dependencies

#### Runtime Dependencies

*   @emotion/is-prop-valid: latest
*   @hookform/resolvers: ^3.9.1
*   @motionone/utils: latest
*   @radix-ui/react-accordion: ^1.2.2
*   @radix-ui/react-alert-dialog: ^1.1.4
*   @radix-ui/react-aspect-ratio: ^1.1.1
*   @radix-ui/react-avatar: ^1.1.2
*   @radix-ui/react-checkbox: latest
*   @radix-ui/react-collapsible: ^1.1.2
*   @radix-ui/react-context-menu: ^2.2.4
*   @radix-ui/react-dialog: ^1.1.4
*   @radix-ui/react-dropdown-menu: ^2.1.4
*   @radix-ui/react-hover-card: ^1.1.4
*   @radix-ui/react-label: latest
*   @radix-ui/react-menubar: ^1.1.4
*   @radix-ui/react-navigation-menu: ^1.2.3
*   @radix-ui/react-popover: ^1.1.4
*   @radix-ui/react-progress: ^1.1.1
*   @radix-ui/react-radio-group: ^1.2.2
*   @radix-ui/react-scroll-area: ^1.2.2
*   @radix-ui/react-select: ^2.1.4
*   @radix-ui/react-separator: ^1.1.1
*   @radix-ui/react-slider: ^1.2.2
*   @radix-ui/react-slot: latest
*   @radix-ui/react-switch: ^1.1.2
*   @radix-ui/react-tabs: ^1.1.2
*   @radix-ui/react-toast: ^1.2.4
*   @radix-ui/react-toggle: ^1.1.1
*   @radix-ui/react-toggle-group: ^1.1.1
*   @radix-ui/react-tooltip: ^1.1.6
*   @studio-freight/lenis: latest
*   autoprefixer: ^10.4.20
*   class-variance-authority: ^0.7.1
*   clsx: ^2.1.1
*   cmdk: 1.0.4
*   date-fns: 3.0.0
*   embla-carousel-react: 8.5.1
*   framer-motion: latest
*   input-otp: 1.4.1
*   lucide-react: ^0.454.0
*   next: ^15.2.1
*   next-themes: ^0.4.4
*   react: ^18.2.0
*   react-day-picker: ^9.6.1
*   react-dom: ^18.2.0
*   react-hook-form: ^7.54.1
*   react-resizable-panels: ^2.1.7
*   recharts: 2.15.0
*   sonner: ^1.7.1
*   tailwind-merge: ^2.5.5
*   tailwindcss-animate: ^1.0.7
*   vaul: ^0.9.6
*   zod: ^3.24.1

#### Development Dependencies

*   @types/node: ^22
*   @types/react: latest
*   @types/react-dom: latest
*   postcss: ^8
*   tailwindcss: ^3.4.17
*   typescript: ^5

### 5. Features

*   Homepage
*   About Us
*   Blog
*   Contact
*   Events

### 6. UI/UX Design

*   Modern and responsive design.
*   Consistent with the Club311Barcelona brand.

### 7. Technical Requirements

*   React
*   TypeScript
*   Tailwind CSS
*   Next.js

### 8. Release Criteria

*   All features implemented and tested.
*   Website is responsive and accessible.

### 9. Future Considerations

*   Membership system.
*   Online ticketing for events.