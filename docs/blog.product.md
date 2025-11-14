# Blog Functionality

## Description / Business Context
The blog functionality provides a platform for Push Serbia to share knowledge, experiences, and news about technology, open-source community, and programming. It serves as a content marketing tool to establish Push Serbia as a thought leader in the tech industry, engage with the community, and attract potential clients or contributors. The blog helps in building brand awareness, improving SEO, and creating valuable resources for the tech community in Serbia and beyond.

## User Stories
- **As a visitor**, I want to browse blog posts so that I can find interesting content about technology and programming.
- **As a reader**, I want to read individual blog posts so that I can gain in-depth knowledge on specific topics.
- **As a reader**, I want to see the author and publication date of blog posts so that I can understand the context and relevance of the content.
- **As a reader**, I want to see a preview (excerpt) of blog posts so that I can decide which articles interest me before clicking through.
- **As a reader**, I want to navigate back to the blog listing from an individual post so that I can explore other articles.
- **As a content creator**, I want to add new blog posts so that I can share knowledge and updates with the community.
- **As a content creator**, I want to include rich text formatting and images in my posts so that I can create engaging and visually appealing content.

## Functionality Overview
The blog functionality consists of two main components:

1. **Blog Listing Page**
   - Displays a list of all available blog posts
   - Each post preview includes:
     - Featured image
     - Title
     - Author
     - Publication date
     - Short excerpt
     - "Read more" link
   - Includes a header with a title and description
   - Provides a call-to-action for users to suggest blog post ideas

2. **Individual Blog Post Page**
   - Displays a single blog post with:
     - Featured image
     - Title
     - Author
     - Publication date
     - Full content with rich text formatting
   - Includes navigation to return to the blog listing
   - Has a comments section (currently disabled)
   - Shows an error message if the requested post is not found

The blog posts are currently stored in memory using a service that provides methods to retrieve all posts or find a specific post by its slug.

## UX Notes / Wireframe Ideas
### Blog Listing Page
- **Header Section**
  - Navigation link back to homepage
  - Blog title and description
- **Post List Section**
  - Cards layout with consistent spacing and styling
  - Each card contains:
    - Image at the top (full width of the card)
    - Author and date information below the image
    - Title with hover effect
    - Excerpt text
    - "Read more" link with arrow icon
- **Call-to-Action Section**
  - Button to contact page for suggesting blog post ideas
- **Responsive Design**
  - Adapts to different screen sizes
  - Single column on mobile, potentially multi-column on larger screens

### Individual Blog Post Page
- **Navigation**
  - "Back to blog" link at the top with arrow icon
- **Content Section**
  - Featured image at the top (full width)
  - Author and date information
  - Title in large, bold font
  - Content area with rich text formatting
- **Comments Section**
  - Currently displays a message that comments are disabled
  - Future implementation could include user comments
- **Navigation Footer**
  - "Back to blog" button at the bottom
- **Error State**
  - Clear message when post is not found
  - Link to return to blog listing

## Technical Notes (High-Level)
- **Architecture**
  - Angular standalone components
  - Lazy-loaded routes for better performance
  - Service for data management
- **Data Model**
  - BlogPost interface with properties:
    - id: unique identifier
    - title: post title
    - slug: URL-friendly version of title
    - author: post author
    - date: publication date
    - content: main content (HTML)
    - excerpt: short summary
    - image: URL to featured image (optional)
    - tags: array of topic tags (optional)
- **Content Management**
  - Currently using hardcoded data in the BlogStoreService
  - Future implementation could connect to a CMS or API
- **Rich Text Handling**
  - Using Quill editor for rendering HTML content
  - Content stored as HTML strings
- **Routing**
  - Root path ('/blog') for blog listing
  - Parameterized path ('/blog/:slug') for individual posts

## Acceptance Criteria
1. **Blog Listing Page**
   - All blog posts are displayed with their images, titles, authors, dates, and excerpts
   - Clicking on a post title or "Read more" link navigates to the individual post page
   - "Back to homepage" link returns to the main site
   - Call-to-action button links to the contact page

2. **Individual Blog Post Page**
   - Correct post is displayed based on the URL slug
   - All post content is properly rendered with HTML formatting
   - "Back to blog" links return to the blog listing page
   - Error message is displayed when an invalid slug is provided

3. **General Requirements**
   - Both pages are responsive and display correctly on mobile and desktop
   - Dark mode support is implemented
   - Content is accessible and readable
   - Navigation between pages is intuitive and consistent

## Edge Cases & Constraints
1. **Content Display**
   - Long titles or excerpts should be handled gracefully (truncation or wrapping)
   - Missing images should not break the layout
   - HTML content should be sanitized to prevent XSS attacks

2. **Navigation**
   - Invalid slugs should show a user-friendly error message
   - Deep linking to posts should work correctly

3. **Performance**
   - Large number of blog posts could impact performance of the listing page
   - Large images or complex HTML content could slow down page loading

4. **Future Considerations**
   - Currently no pagination for blog listing (may be needed as content grows)
   - No search or filtering functionality
   - Comments functionality is disabled but UI elements exist
   - Content is hardcoded rather than fetched from a backend
   - No admin interface for content management
