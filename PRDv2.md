# Product Requirements Document (PRD)

## Project: Club311Barcelona Website

### 1. Introduction

This document outlines the requirements for the Club311Barcelona website, a platform designed to provide information about the club, showcase upcoming events, and facilitate communication with users. This PRD provides a comprehensive overview of the website's features, functionality, and technical specifications.

### 2. Goals

*   Provide comprehensive information about Club311Barcelona, including its history, mission, and values.
*   Showcase upcoming events with detailed information, including dates, times, locations, and descriptions.
*   Enable users to easily contact the club through a contact form.
*   Provide a modern, responsive, and user-friendly website experience.
*   Ensure the website is accessible to all users.

### 3. Architecture and Technologies

*   **Frontend:**
    *   **Framework:** React
    *   **UI Library:** Radix UI, Tailwind CSS
    *   **Styling:** Tailwind CSS, custom CSS for specific overrides
    *   **State Management:** React Context, potentially with a state management library like Zustand for more complex state needs.
    *   **Routing:** Next.js routing
    *   **Animations:** Framer Motion
    *   **Scrolling:** Lenis for smooth scrolling
*   **Backend:**
    *   **Framework:** Next.js (for server-side rendering and API routes)
    *   **Data Fetching:** Server-side data fetching using `fetch` or a similar method within Next.js's `getServerSideProps` or `getStaticProps` functions.
    *   **API Routes:** Next.js API routes for handling form submissions (e.g., contact form).
*   **Deployment:** Vercel (or similar platform)

### 4. Page and Component Details

#### 4.1 Homepage (`app/page.tsx`)

*   **Purpose:** The landing page of the website, providing an overview of the club and its activities.
*   **Functionality:**
    *   Displays a hero section with a compelling image or video and a brief introduction to the club.
    *   Showcases upcoming events in a visually appealing format (e.g., event cards).
    *   Highlights key information about the club (e.g., mission statement, membership benefits).
    *   Includes calls to action (e.g., "Learn More," "Join Us").
*   **UI Elements:**
    *   Hero section (image/video, headline, subheadline, call to action)
    *   Event cards (event title, date, time, location, image, short description) - Uses `components/event-card.tsx`
    *   About section (brief overview of the club)
    *   Newsletter signup form (using `components/newsletter.tsx`)
    *   Footer (using `components/footer.tsx`)
*   **Technologies:**
    *   React, Next.js, Tailwind CSS, Framer Motion, `components/event-card.tsx`, `components/newsletter.tsx`, `components/footer.tsx`

#### 4.2 About Us Page (`app/about/page.tsx` and `app/about/client-page.tsx`)

*   **Purpose:** Provides detailed information about the club, its history, mission, and values.
*   **Functionality:**
    *   Displays the club's history, mission, and values.
    *   May include information about the club's team or board members.
    *   May include testimonials from members.
*   **UI Elements:**
    *   Page header (using `components/page-header.tsx`)
    *   Text content (history, mission, values)
    *   Images or videos
    *   Staff profiles (using `components/staff-profile.tsx`)
    *   Testimonial slider (using `components/testimonial-slider.tsx`)
    *   Footer (using `components/footer.tsx`)
*   **Technologies:**
    *   React, Next.js, Tailwind CSS, `components/page-header.tsx`, `components/staff-profile.tsx`, `components/testimonial-slider.tsx`, `components/footer.tsx`

#### 4.3 Blog Page (`app/blog/page.tsx`)

*   **Purpose:** Displays a list of blog posts.
*   **Functionality:**
    *   Fetches and displays a list of blog posts.
    *   Each post includes a title, short description, and a link to the full post.
    *   May include pagination.
*   **UI Elements:**
    *   Page header (using `components/page-header.tsx`)
    *   Blog post previews (title, short description, image, link)
    *   Pagination (if applicable)
    *   Footer (using `components/footer.tsx`)
*   **Technologies:**
    *   React, Next.js, Tailwind CSS, `components/page-header.tsx`, `components/footer.tsx`

#### 4.4 Blog Post Page (`app/blog/[slug]/page.tsx`)

*   **Purpose:** Displays the content of a single blog post.
*   **Functionality:**
    *   Fetches the content of a blog post based on the slug in the URL.
    *   Displays the post title, content, author, and publication date.
    *   May include related posts.
*   **UI Elements:**
    *   Page header (using `components/page-header.tsx`)
    *   Blog post title
    *   Blog post content (formatted text, images, videos)
    *   Author information
    *   Publication date
    *   Related posts (if applicable)
    *   Footer (using `components/footer.tsx`)
*   **Technologies:**
    *   React, Next.js, Tailwind CSS, `components/page-header.tsx`, `components/footer.tsx`

#### 4.5 Contact Page (`app/contact/page.tsx`)

*   **Purpose:** Allows users to contact the club.
*   **Functionality:**
    *   Displays a contact form.
    *   Handles form submissions (e.g., sends an email to the club).
    *   May include contact information (e.g., email address, phone number).
*   **UI Elements:**
    *   Page header (using `components/page-header.tsx`)
    *   Contact form (name, email, subject, message) - Uses `components/ui/contact-form.tsx`
    *   Contact information (email address, phone number)
    *   Footer (using `components/footer.tsx`)
*   **Technologies:**
    *   React, Next.js, Tailwind CSS, `components/page-header.tsx`, `components/ui/contact-form.tsx`, `components/footer.tsx`, Next.js API routes

#### 4.6 Events Page (`app/events/page.tsx`)

*   **Purpose:** Displays a list of upcoming events.
*   **Functionality:**
    *   Fetches and displays a list of upcoming events.
    *   Each event includes a title, date, time, location, and a short description.
    *   May include filtering or sorting options.
*   **UI Elements:**
    *   Page header (using `components/page-header.tsx`)
    *   Event cards (event title, date, time, location, image, short description) - Uses `components/event-card.tsx`
    *   Filtering/sorting options (if applicable)
    *   Footer (using `components/footer.tsx`)
*   **Technologies:**
    *   React, Next.js, Tailwind CSS, `components/page-header.tsx`, `components/event-card.tsx`, `components/footer.tsx`

#### 4.7 Components

*   **EventCard (`components/event-card.tsx`):**
    *   **Purpose:** Displays information about a single event.
    *   **Functionality:** Displays event title, date, time, location, image, and a short description.
    *   **UI Elements:** Image, title, date, time, location, description, button (optional)
    *   **Technologies:** React, Tailwind CSS
*   **Navbar (`components/navbar.tsx`):**
    *   **Purpose:** Provides navigation links to different sections of the website.
    *   **Functionality:** Displays navigation links (e.g., Home, About, Blog, Contact, Events).
    *   **UI Elements:** Logo, navigation links, mobile menu (responsive)
    *   **Technologies:** React, Tailwind CSS
*   **Footer (`components/footer.tsx`):**
    *   **Purpose:** Displays copyright information, contact details, and social media links.
    *   **Functionality:** Displays copyright information, contact details, and social media links.
    *   **UI Elements:** Copyright notice, contact information, social media icons
    *   **Technologies:** React, Tailwind CSS
*   **PageHeader (`components/page-header.tsx`):**
    *   **Purpose:** Displays a header for each page.
    *   **Functionality:** Displays a title and potentially a subtitle or breadcrumbs.
    *   **UI Elements:** Title, subtitle (optional), breadcrumbs (optional)
    *   **Technologies:** React, Tailwind CSS
*   **Newsletter (`components/newsletter.tsx`):**
    *   **Purpose:** Allows users to subscribe to a newsletter.
    *   **Functionality:** Displays a form for users to enter their email address.
    *   **UI Elements:** Email input field, submit button
    *   **Technologies:** React, Tailwind CSS, potentially Next.js API routes for handling submissions.
*   **ContactForm (`components/ui/contact-form.tsx`):**
    *   **Purpose:** Displays a contact form.
    *   **Functionality:** Displays a form for users to enter their name, email, subject, and message.
    *   **UI Elements:** Input fields (name, email, subject, message), submit button
    *   **Technologies:** React, Tailwind CSS, Radix UI, React Hook Form, potentially Next.js API routes for handling submissions.
*   **ThemeProvider (`components/theme-provider.tsx`):**
    *   **Purpose:** Manages the website's theme (e.g., light/dark mode).
    *   **Functionality:** Provides a context for managing the current theme and allows users to switch between themes.
    *   **UI Elements:** Toggle switch (optional)
    *   **Technologies:** React, Next Themes, Tailwind CSS

### 5. Data Flow

*   **Events:** Events data will be fetched from a data source (e.g., a local JSON file `app/data/eventsdata.js` or a database) and displayed on the Events page and Homepage.
*   **Blog Posts:** Blog posts will be fetched from a data source (e.g., a local file system, a headless CMS, or a database) and displayed on the Blog page and Blog Post page.
*   **Contact Form Submissions:** Contact form submissions will be handled by Next.js API routes, which will send the data to the club's email address.

### 6. UI/UX Design

*   The website will follow a modern and responsive design, ensuring a consistent user experience across all devices.
*   The design will be consistent with the Club311Barcelona brand, using the club's colors, fonts, and logo.
*   The website will be designed with accessibility in mind, following WCAG guidelines.

### 7. Technical Requirements

*   **React:** The website will be built using React for the frontend.
*   **TypeScript:** TypeScript will be used to ensure type safety and improve code maintainability.
*   **Tailwind CSS:** Tailwind CSS will be used for styling, providing a utility-first approach to design.
*   **Next.js:** Next.js will be used for server-side rendering, routing, and API routes.
*   **Radix UI:** Radix UI will be used for accessible UI components.
*   **Framer Motion:** Framer Motion will be used for animations.
*   **Lenis:** Lenis will be used for smooth scrolling.

### 8. Release Criteria

*   All features are implemented and tested.
*   The website is responsive and accessible.
*   The website meets all the requirements outlined in this PRD.

### 9. Future Considerations

*   Finish admin user authentication and management system.