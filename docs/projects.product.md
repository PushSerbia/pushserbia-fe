# Projects Feature

## Description / Business Context
The Projects feature is a core component of the PushSerbia platform that enables users to propose, discover, support, and track community-driven projects. It serves as a collaborative space where community members can share project ideas, gather support through voting, and follow the progress of projects from inception to completion.

This feature addresses the need for a structured way to manage community initiatives, ensuring transparency in the project lifecycle and enabling democratic decision-making through the voting mechanism. By providing a centralized hub for projects, the platform fosters collaboration, encourages innovation, and helps prioritize community efforts based on member interest.

## User Stories

### For Project Creators
- As a project creator, I want to submit new project proposals, so that I can share my ideas with the community and gather support.
- As a project creator, I want to edit my project details, so that I can keep information accurate and up-to-date.
- As a project creator, I want to track the number of votes my project receives, so that I can gauge community interest.

### For Community Members
- As a community member, I want to browse all available projects, so that I can discover initiatives that interest me.
- As a community member, I want to filter projects by different criteria, so that I can find relevant projects more easily.
- As a community member, I want to vote for projects I support, so that I can influence which projects move forward.
- As a community member, I want to view detailed information about specific projects, so that I can understand their purpose and progress.

### For Administrators
- As an administrator, I want to manage project statuses, so that I can reflect the current stage of each project.
- As an administrator, I want to moderate project content, so that I can ensure quality and appropriateness.

## Functionality Overview

### Project Listing
1. Users access the projects list page, which displays all available projects in a card format.
2. Each project card shows key information: name, short description, creator, image, and vote count.
3. Users can filter projects using the following criteria:
   - My Projects Only: Shows only projects created by the current user
   - Supported Only: Shows only projects the user has voted for
4. Filter selections are reflected in the URL query parameters to allow for sharing filtered views.

### Project Creation
1. Authenticated users can create new projects by clicking the "New Project" button.
2. The creation form collects the following information:
   - Project name (required, min 3 characters)
   - Short description (required, max 250 characters)
   - Detailed description (required, min 50 characters, rich text editor)
   - GitHub repository link (optional)
3. The system automatically generates a URL-friendly slug from the project name.
4. Upon submission, the project is created with "Pending" status and the user is redirected to the project details page.

### Project Editing
1. Project creators can edit their projects by accessing the edit page.
2. The edit form is pre-populated with the project's current information.
3. Users can update all fields and change the project status (if authorized).
4. Changes are saved to the database and immediately reflected in the UI.

### Project Details
1. Users can view detailed information about a project on its dedicated page.
2. The details page displays:
   - Project name, image, and short description
   - Creator information
   - Full rich-text description
   - GitHub repository link (if available)
   - Current status
   - Vote count and voting button
3. Authenticated users who haven't already voted for the project can cast a vote.
4. Project creators see additional options to edit their projects.

### Project Meeting Notes (Planned)
1. A dedicated section for project meeting notes is planned but not yet implemented.
2. This will allow project stakeholders to document and share meeting outcomes.

### Project Lifecycle
Projects progress through the following statuses:
1. Pending: Newly created projects awaiting review
2. Voting: Projects open for community voting
3. In Progress: Projects that are actively being developed
4. Maintenance: Completed projects that are being maintained
5. Closed: Projects that are no longer active
6. Declined: Projects that were rejected

## UX Notes / Wireframe Ideas

### Projects List Page
- Layout: Grid of project cards with 3-4 cards per row (responsive)
- Header: Title, filter controls, and "New Project" button
- Project Card:
  - Prominent project image
  - Project name as card title
  - Short description (truncated if necessary)
  - Creator avatar and name
  - Vote count indicator
  - Status badge
- Filtering:
  - Filter controls in a collapsible panel
  - Visual indicators for active filters
  - "Clear Filters" option

### Project Creation/Edit Page
- Layout: Single-column form with sections
- Form Fields:
  - Text inputs for name, slug, and short description
  - Rich text editor for detailed description
  - URL input for GitHub repository
  - Status dropdown (for editing)
- Preview: Live preview of how the project card will appear
- Buttons: "Save" and "Cancel" (returns to previous page)

### Project Details Page
- Layout: Two-column layout (on desktop)
  - Main content: Project description and details
  - Sidebar: Creator info, voting button, status, metadata
- Header: Project name, image, and short description
- Content: Rich text description with proper formatting
- Sidebar:
  - Vote button (prominent, disabled if already voted)
  - Vote count and statistics
  - Creator information with avatar
  - Project status with appropriate styling
  - GitHub link (if available)
  - Creation and update timestamps
- Actions: Edit button (for creators), Back to list button

## Technical Notes (High-Level)

### Data Model
- Project Entity:
  - Basic info: id, name, slug, image, shortDescription, description
  - Metadata: createdAt, updatedAt, github (optional)
  - Status: status enum, isBanned flag, banNote (optional)
  - Voting: totalVoters, totalVotes
  - Creator: id, fullName, imageUrl

- Vote Entity:
  - Relationships: userId, projectId
  - Metadata: weight, createdAt

### State Management
- Uses Angular's Signal API for reactive state management
- ProjectStoreService maintains the state of projects
- VoteStoreService maintains the state of user votes
- Both services support server-side rendering with TransferState

### API Integration
- RESTful API endpoints for CRUD operations:
  - GET /projects - List all projects
  - POST /projects - Create a new project
  - GET /projects/:id - Get project details
  - PATCH /projects/:id - Update a project
  - DELETE /projects/:id - Delete a project
  - POST /votes - Create a vote for a project
  - GET /votes/my - Get current user's votes

### Authentication Integration
- Project creation and voting require authentication
- Project editing is restricted to the creator
- Some status changes may require admin privileges

### Performance Considerations
- Lazy loading of project components
- Optimistic UI updates for voting
- Server-side rendering support for improved SEO and initial load performance

## Acceptance Criteria

### Project Listing
- [ ] All projects are displayed in a responsive grid layout
- [ ] Each project card shows name, image, short description, creator, and vote count
- [ ] Filtering by "My Projects Only" shows only the current user's projects
- [ ] Filtering by "Supported Only" shows only projects the user has voted for
- [ ] Filter state is reflected in URL query parameters
- [ ] Unauthenticated users can view projects but see prompts to log in for voting

### Project Creation
- [ ] Only authenticated users can access the project creation form
- [ ] Form validates all required fields with appropriate error messages
- [ ] Slug is automatically generated from the project name
- [ ] Rich text editor allows formatting of the detailed description
- [ ] Successful submission creates a new project and redirects to its details page

### Project Editing
- [ ] Only project creators can edit their projects
- [ ] Form is pre-populated with existing project data
- [ ] All validations apply to edited fields
- [ ] Changes are saved and immediately reflected in the UI

### Project Details
- [ ] Project details page displays all project information
- [ ] Rich text description is properly rendered with formatting
- [ ] Voting button is disabled for users who have already voted
- [ ] Vote count updates immediately after voting
- [ ] Edit button is only visible to project creators
- [ ] Project status is clearly indicated

### General
- [ ] All pages are responsive and work on mobile devices
- [ ] Loading states are shown during data fetching
- [ ] Error states are handled gracefully with user feedback
- [ ] Navigation between project pages is intuitive

## Edge Cases & Constraints

### Authentication Edge Cases
- If a user attempts to vote while not logged in, they should be prompted to log in first
- If a user's session expires while editing a project, their changes should be preserved if possible, and they should be prompted to log in again

### Data Validation Edge Cases
- Project names must be unique; the system should check for duplicates
- If a generated slug conflicts with an existing one, a numeric suffix should be added
- Very long project names should be truncated in the UI but preserved in the database
- Rich text content should be sanitized to prevent XSS attacks

### Performance Constraints
- The project list should handle pagination or infinite scrolling for large numbers of projects
- Image uploads should be optimized for size and quality

### Moderation Scenarios
- If a project is banned, it should not appear in regular listings but should be accessible to administrators
- If a project's status changes, notifications should be sent to relevant stakeholders

### Browser Compatibility
- The feature should work on all modern browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation for older browsers should be implemented where possible

### Offline Capabilities
- Basic offline viewing of previously loaded projects should be supported where feasible
- Clear error messages should be shown when network operations fail
