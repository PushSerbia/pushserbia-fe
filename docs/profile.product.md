# Profile Page - Product Specification

## Description / Business Context

The Profile page serves as the personal dashboard for users of the Push Serbia platform, a non-profit initiative that enables the IT community to propose, support, and develop socially beneficial open-source projects. This page allows users to manage their account information, view their activity statistics, and access their projects and notifications.

The Profile page is designed to provide users with a centralized location to manage their presence on the platform and track their contributions to the community. It targets registered users who want to update their personal information, monitor their activity, and easily navigate to their projects and other relevant sections of the platform.

## User Stories

- **As a registered user**, I want to view and edit my profile information, so that I can keep my account details up to date.
- **As a project contributor**, I want to see statistics about my platform activity, so that I can track my contributions and engagement.
- **As a project creator**, I want to quickly access my created projects, so that I can monitor and manage them efficiently.
- **As a project supporter**, I want to easily find projects I've supported, so that I can stay updated on their progress.
- **As an active user**, I want to access my notifications, so that I can stay informed about relevant platform activities.
- **As a community member**, I want to understand how to contribute to the platform, so that I can increase my involvement.
- **As a potential subscriber**, I want to access subscription options, so that I can financially support the platform.

## Functionality Overview

The Profile page is structured with a main content area and a sidebar navigation, containing several components:

1. **Profile Details Component (ProfileDetails)**
   - Displays the user's profile image, name, and role
   - Shows the user's email address
   - Displays the user's LinkedIn and GitHub URLs (if provided)
   - Provides a button to open a dialog for updating profile information
   - Includes a commented-out section for a potential pro card feature

2. **Profile Information Dialog (ProfileInformationDialog)**
   - Allows users to edit their full name
   - Enables users to add or update their LinkedIn URL
   - Enables users to add or update their GitHub URL
   - Includes a commented-out section for a potential biography field
   - Provides buttons to save changes or cancel

3. **Profile Statistics Component (ProfileStats)**
   - Displays the number of projects proposed by the user
   - Shows the number of projects supported by the user
   - Indicates the user's current level on the platform

4. **Profile Sidebar Navigation (ProfileSidenav)**
   - Provides links to the user's created projects
   - Offers access to projects supported by the user
   - Includes a link to information about how to contribute
   - Contains a link to subscription options
   - Features a logout button to sign out of the platform

5. **Notifications Page (NotificationsListPage)**
   - Accessible via the "obavestenja" route
   - Currently a placeholder for future implementation of notifications functionality

## UX Notes / Wireframe Ideas

- **Overall Layout**:
  - Clean, modern design with ample white space
  - Responsive layout that adapts to different screen sizes
  - Consistent color scheme using primary colors and dark/light mode support
  - Clear visual hierarchy with prominent headings and subheadings

- **Profile Details Section**:
  - Card-based layout with border and shadow for visual separation
  - User image displayed as a rounded square
  - Role badge with distinctive background color
  - Clear labeling for contact information
  - External links for social profiles with hover effects
  - Prominent "Update data" button with icon

- **Profile Information Dialog**:
  - Modal dialog with clear header and close button
  - Form inputs with appropriate labels and placeholders
  - Helper text for URL format examples
  - Validation for required fields
  - Clear primary and secondary action buttons
  - Responsive design that works on all screen sizes

- **Profile Statistics Section**:
  - Card-based layout with grid structure
  - Each statistic has an icon, label, and value
  - Clear visual separation between statistics
  - Responsive grid that adapts to different screen sizes

- **Sidebar Navigation**:
  - Vertical menu with clear icons and labels
  - Hover effects for interactive elements
  - Visual separation between main navigation and logout option
  - Sticky positioning to remain visible during scrolling

## Technical Notes (High-Level)

- **Architecture**:
  - Built with Angular framework
  - Component-based structure with standalone components
  - Uses Angular's input/output pattern for component communication
  - Implements lazy loading for optimal performance

- **State Management**:
  - Uses Angular signals for reactive state management
  - User data managed through AuthService
  - Modal state managed through ModalService
  - Form handling with ReactiveFormsModule

- **Styling**:
  - Uses Tailwind CSS for utility-based styling
  - Implements dark/light mode support
  - Responsive design with mobile-first approach
  - Consistent styling with the rest of the application

- **Routing**:
  - Profile page accessible via the "/profile" route
  - Notifications page accessible via the "/profile/obavestenja" route
  - Both routes protected by authentication guard
  - Navigation to projects with query parameters for filtering

- **Data Flow**:
  - User data fetched from backend API via AuthService
  - Profile updates sent to backend via AuthService.updateMe() method
  - Authentication state monitored to redirect unauthenticated users

## Acceptance Criteria

1. **Profile Details Component**:
   - Displays user's profile image, name, role, and email
   - Shows LinkedIn and GitHub URLs if available, or "Unesi podatak" if not provided
   - "Ažuriraj podatke" button opens the profile information dialog
   - Component renders appropriately on all screen sizes

2. **Profile Information Dialog**:
   - Opens when the update button is clicked
   - Pre-populates form fields with existing user data
   - Validates required fields (full name)
   - Successfully updates user information when submitted
   - Closes properly when cancel button is clicked or changes are saved

3. **Profile Statistics Component**:
   - Displays correct count of projects proposed by the user
   - Shows accurate count of projects supported by the user
   - Indicates the user's current level
   - Component is responsive on all screen sizes

4. **Profile Sidebar Navigation**:
   - All links navigate to the correct destinations
   - Project links include appropriate query parameters
   - Logout button successfully signs the user out
   - Navigation is responsive and accessible

5. **Notifications Page**:
   - Route is protected by authentication guard
   - Page structure is in place for future implementation

6. **Overall**:
   - Page loads within acceptable time limits
   - All sections render correctly in both light and dark modes
   - All interactive elements are accessible via keyboard
   - Page passes basic accessibility checks
   - Unauthenticated users are redirected to the home page

## Edge Cases & Constraints

1. **Authentication States**:
   - Profile page should only be accessible to authenticated users
   - If authentication expires during the session, user should be redirected to login
   - After logout, user should be redirected to the home page

2. **Data Loading States**:
   - Loading indicators should be displayed while user data is being fetched
   - Appropriate error handling for failed API requests
   - Form submission should show loading state and handle errors gracefully

3. **Form Validation**:
   - Full name is required and should not be empty
   - URL fields should accept valid URL formats or be empty
   - Form should prevent submission if validation fails

4. **Responsive Design Edge Cases**:
   - On mobile devices, sidebar should be hidden or adapted for smaller screens
   - Statistics grid should collapse to a single column on very small screens
   - Dialog should be usable on all screen sizes

5. **Browser Compatibility**:
   - Page should function correctly on all modern browsers
   - Graceful degradation for older browsers

6. **Accessibility Constraints**:
   - All images must have appropriate alt text
   - Color contrast must meet WCAG standards
   - Interactive elements must be keyboard accessible
   - Screen readers must be able to navigate the page structure

7. **Internationalization**:
   - Currently only Serbian language is supported
   - Text elements should accommodate potential future translations

8. **Future Expansion**:
   - Notifications functionality is planned for future implementation
   - Profile pro card feature is commented out but may be implemented later
   - Biography field in the profile information dialog is prepared for future use
