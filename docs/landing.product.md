# Landing Page - Product Specification

## Description / Business Context

The Landing page serves as the primary entry point for the Push Serbia platform, a non-profit initiative that enables the IT community to propose, support, and develop socially beneficial open-source projects. This page is designed to introduce visitors to the platform's mission, showcase current projects, explain how the community works, present donation options, and answer frequently asked questions.

The Landing page aims to convert visitors into active community members by clearly communicating the platform's value proposition and providing clear paths to engagement. It targets IT professionals and enthusiasts who want to contribute to open-source projects with positive social impact in Serbia.

## User Stories

- **As a first-time visitor**, I want to quickly understand what Push Serbia is, so that I can decide if it aligns with my interests and values.
- **As a potential contributor**, I want to see examples of current projects, so that I can evaluate the quality and relevance of work being done.
- **As an interested developer**, I want to understand how the community works, so that I can decide if and how to participate.
- **As a potential supporter**, I want to see donation options, so that I can financially contribute to the platform's sustainability.
- **As a curious visitor**, I want to find answers to common questions, so that I can better understand the platform without contacting support.
- **As a returning visitor**, I want clear navigation paths to different sections of the platform, so that I can quickly access the features I'm interested in.

## Functionality Overview

The Landing page is structured as a single-page layout with five distinct sections:

1. **Hero Section (LandingHeroComponent)**
   - Displays a prominent headline "Unapredi društvo u kome živiš!" (Improve the society you live in!)
   - Features a subheading explaining the platform's purpose
   - Provides two primary call-to-action buttons: "Istraži projekte" (Explore projects) and "Saznaj više" (Learn more)
   - Shows community member avatars to create social proof
   - Includes a relevant image that illustrates collaboration

2. **Projects Section (LandingProjectsComponent)**
   - Displays a heading "Aktuelni projekti" (Current Projects)
   - Shows a curated selection of 2 active projects from the platform
   - Includes a "New Project" card to encourage project creation
   - Provides a link to view all projects
   - Uses signals to track which projects the user has supported
   - Implements view transitions for smooth navigation to project details

3. **How It Works Section (LandingHowToComponent)**
   - Explains the open-source community process in three steps:
     a. "Predloži ideju" (Suggest an idea) - How to propose new projects
     b. "Glasaj i podrži projekte" (Vote and support projects) - How to vote for the best ideas
     c. "Zajedno ih realizujemo" (We realize them together) - How the community develops selected projects
   - Each step includes a descriptive icon, explanation text, and a relevant call-to-action button

4. **Pricing/Donation Section (LandingPricingComponent)**
   - Presents three donation options:
     a. "Prijatelj zajednice" (Community Friend) - €5/month basic support
     b. "Aktivni član" (Active Member) - €15/month enhanced support (highlighted option)
     c. "Jednokratna podrška" (One-time Support) - €97 one-time donation
   - Each option includes a description, price, benefits list, and impact statement
   - Provides buttons to donate or subscribe
   - Includes information about transparency in fund usage

5. **FAQ Section (LandingFaqComponent)**
   - Features a searchable list of frequently asked questions
   - Includes quick filter buttons for common question categories
   - Initially displays 6 questions with an option to show more
   - Provides comprehensive information about the platform, registration, project proposal, voting, and other features

## UX Notes / Wireframe Ideas

- **Overall Layout**:
  - Clean, modern design with ample white space
  - Responsive layout that adapts to different screen sizes
  - Consistent color scheme using primary colors and dark/light mode support
  - Clear visual hierarchy with prominent headings and subheadings

- **Hero Section**:
  - Full-width section with gradient background
  - Large, bold headline with supporting text
  - Two prominent CTA buttons with different visual weights
  - Community member avatars in a horizontal row
  - Large image on right side (desktop) or below text (mobile)

- **Projects Section**:
  - Grid layout for project cards
  - Each card shows project title, description, and support status
  - "New Project" card with distinct styling to encourage creation
  - Clear "Explore more" link at the bottom

- **How It Works Section**:
  - Two-column layout with image on left and content on right
  - Three step cards with hover animation
  - Each card has a colored icon, heading, description, and CTA button
  - Visual progression between steps

- **Pricing/Donation Section**:
  - Three-column layout for donation options (responsive to single column on mobile)
  - Highlighted middle option with ring effect and scaling
  - Each option card includes price, benefits list, and impact statement
  - Clear CTA buttons with appropriate text based on donation type

- **FAQ Section**:
  - Search bar at the top with filter buttons below
  - Two-column grid of question cards (single column on mobile)
  - Question cards with hover effect
  - Show more/less button at the bottom when appropriate

## Technical Notes (High-Level)

- **Architecture**:
  - Built with Angular framework
  - Component-based structure with five main section components
  - Uses standalone components with explicit imports
  - Implements lazy loading for optimal performance

- **State Management**:
  - Uses Angular signals for reactive state management
  - Project data fetched from ProjectStoreService
  - Vote data managed through VoteStoreService
  - Search state managed locally in the FAQ component

- **Styling**:
  - Uses Tailwind CSS for utility-based styling
  - Implements dark/light mode support
  - Responsive design with mobile-first approach
  - Animation effects for interactive elements

- **Routing**:
  - Landing page set as the default route of the application
  - Links to other sections of the application (projects, documentation, etc.)
  - View transitions for smooth navigation between pages

- **Data Flow**:
  - Projects data fetched from backend API via store services
  - Donation options defined in a static configuration file
  - FAQ questions and search functionality managed locally

## Acceptance Criteria

1. **Hero Section**:
   - Displays headline, subheading, and two CTA buttons
   - Shows community member avatars
   - Renders appropriately on all screen sizes
   - CTA buttons link to correct destinations

2. **Projects Section**:
   - Displays up to 2 projects from the database
   - Shows "New Project" card
   - Indicates which projects the user has supported
   - "Explore projects" link navigates to the projects list page
   - View transitions work correctly when navigating to project details

3. **How It Works Section**:
   - Displays all three steps with correct icons and text
   - All CTA buttons link to appropriate destinations
   - Hover animations work correctly
   - Section is responsive on all screen sizes

4. **Pricing/Donation Section**:
   - Displays all three donation options with correct information
   - Highlights the recommended option
   - Donation buttons link to the payment page with correct parameters
   - "Learn more" link navigates to the financing information page

5. **FAQ Section**:
   - Displays initial set of questions with option to show more
   - Search functionality filters questions correctly
   - Quick filter buttons work as expected
   - Questions expand/collapse properly
   - Section is responsive on all screen sizes

6. **Overall**:
   - Page loads within acceptable time limits
   - All sections render correctly in both light and dark modes
   - All interactive elements are accessible via keyboard
   - Page passes basic accessibility checks

## Edge Cases & Constraints

1. **Performance Considerations**:
   - Large number of projects in the database should not affect landing page load time
   - FAQ search should remain responsive even with many questions

2. **Empty States**:
   - If no projects exist in the database, the Projects section should display an appropriate message
   - If search in FAQ returns no results, a helpful message should be displayed

3. **Authentication States**:
   - Landing page should adapt to both authenticated and unauthenticated users
   - For authenticated users, "New Project" card should link directly to project creation
   - For unauthenticated users, appropriate authentication prompts should appear

4. **Responsive Design Edge Cases**:
   - Extremely small screens should maintain readability and functionality
   - Extra large screens should maintain appropriate content width and spacing

5. **Browser Compatibility**:
   - Page should function correctly on all modern browsers
   - Graceful degradation for browsers that don't support view transitions

6. **Accessibility Constraints**:
   - All images must have appropriate alt text
   - Color contrast must meet WCAG standards
   - Interactive elements must be keyboard accessible
   - Screen readers must be able to navigate the page structure

7. **Internationalization**:
   - Currently only Serbian language is supported
   - Text elements should accommodate potential future translations
   - Currency display should handle different formats

8. **Content Limitations**:
   - FAQ section should be maintainable without code changes
   - Donation options should be configurable without requiring component changes
