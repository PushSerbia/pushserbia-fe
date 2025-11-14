# Administration Panel

## Description / Business Context
The Administration Panel is a crucial component of the Push Serbia platform, providing authorized administrators with tools to manage users, projects, and overall platform governance. This feature ensures the platform maintains quality content, adheres to community guidelines, and provides a safe environment for all users.

The admin functionality enables administrators to monitor and moderate user-generated content, manage user accounts, and ensure the platform operates according to its intended purpose of fostering open-source projects with positive social impact.

The administration panel is accessible only to users with administrator privileges and provides a comprehensive set of tools for platform management divided into two main sections: Projects Management and Users Management.

## User Stories

### As an Administrator
- As an administrator, I want to view a list of all projects on the platform, so I can monitor content and ensure it aligns with community guidelines.
- As an administrator, I want to view detailed information about any project, so I can make informed decisions about its appropriateness.
- As an administrator, I want to ban inappropriate projects, so I can maintain the quality and integrity of the platform.
- As an administrator, I want to add notes to banned projects, so I can document the reasons for the ban.
- As an administrator, I want to view a list of all users on the platform, so I can monitor user activity and identify potential issues.
- As an administrator, I want to view detailed information about any user, so I can understand their activity and contributions.
- As an administrator, I want to block users who violate community guidelines, so I can prevent them from accessing the platform.
- As an administrator, I want to unblock previously blocked users, so I can restore access when appropriate.

### As a Platform Owner
- As a platform owner, I want administrators to have tools to moderate content, so the platform maintains its focus on positive social impact.
- As a platform owner, I want to ensure administrators can effectively manage user accounts, so the platform remains secure and trustworthy.
- As a platform owner, I want to track administrative actions, so there is accountability and transparency in platform governance.

## Functionality Overview

### Projects Management
1. **Projects List Page** (`/admin/projekti`)
   - Displays a comprehensive list of all projects on the platform
   - Includes key information for each project: title, creator, status, creation date, vote count
   - Provides filtering options: by status, by date range, by creator, by vote count
   - Allows sorting by various criteria: newest first, most votes, etc.
   - Includes search functionality to find specific projects
   - Provides direct links to view project details

2. **Project Details Page** (`/admin/projects/:id`)
   - Displays comprehensive information about a specific project
   - Shows all project details: title, description, goals, technologies, GitHub repository link, etc.
   - Displays project status and allows changing it (pending, voting, in progress, maintenance, closed, declined)
   - Shows voting statistics and user engagement metrics
   - Provides option to ban the project with a required note explaining the reason
   - For banned projects, displays the ban reason and allows unbanning if necessary
   - Shows project history and administrative actions taken

### Users Management
1. **Users List Page** (`/admin/korisnici`)
   - Displays a comprehensive list of all users registered on the platform
   - Includes key information for each user: name, email, registration date, activity level
   - Provides filtering options: by registration date, by activity level, by contribution status
   - Allows sorting by various criteria: newest first, most active, etc.
   - Includes search functionality to find specific users
   - Provides direct links to view user details
   - Shows user status (active/blocked) with visual indicators

2. **User Details Page** (`/admin/users/:id`)
   - Displays comprehensive information about a specific user
   - Shows profile information: name, email, LinkedIn profile, registration date
   - Displays user's activity: projects created, votes cast, meetings attended
   - Shows user level and membership status
   - Provides option to block/unblock the user with a required note explaining the reason
   - For blocked users, displays the block reason and date
   - Shows history of administrative actions taken on this user

## UX Notes / Wireframe Ideas

### General Admin Interface
- Clean, functional design prioritizing clarity and efficiency over aesthetics
- Consistent layout across all admin pages with a persistent sidebar navigation
- Clear visual hierarchy with important actions and information prominently displayed
- Responsive design that works well on desktop (primary use case) but also functions on tablets
- Color-coded status indicators for quick visual assessment
- Confirmation dialogs for all critical actions (banning projects, blocking users)

### Projects List Page
- Tabular layout with sortable columns
- Status filters displayed as tabs above the table
- Search bar prominently positioned at the top
- Pagination controls at the bottom
- Quick action buttons for viewing details
- Color-coded status indicators

### Project Details Page
- Two-column layout with project information on the left and administrative actions on the right
- Tabbed interface for different categories of project information
- Prominent status indicator with dropdown for status changes
- Ban action in a separate, visually distinct section
- Required text area for ban reasons when banning a project
- Confirmation dialog for ban action

### Users List Page
- Similar tabular layout to Projects List
- Status indicators showing active/blocked state
- Quick filters for viewing all users, active users, or blocked users
- Search functionality optimized for finding users by name or email

### User Details Page
- User profile information in a card at the top
- Activity statistics in visual charts
- List of user's projects with links
- Block/unblock action in a separate, visually distinct section
- Required text area for block reasons when blocking a user
- Confirmation dialog for block action

## Technical Notes (High-Level)

### Components
- **AdminProjectsListPageComponent** - Displays and manages the list of all projects
- **AdminProjectDetailsPageComponent** - Displays and manages details for a specific project
- **AdminUsersListPageComponent** - Displays and manages the list of all users
- **AdminUserDetailsPageComponent** - Displays and manages details for a specific user
- **Shared Components**:
  - **AdminTableComponent** - Reusable table component with sorting and filtering
  - **AdminFilterComponent** - Reusable filter component for lists
  - **AdminSearchComponent** - Reusable search component
  - **AdminPaginationComponent** - Reusable pagination component
  - **AdminConfirmDialogComponent** - Reusable confirmation dialog for critical actions

### Services
- **AdminProjectsService** - Handles API calls related to project management
- **AdminUsersService** - Handles API calls related to user management
- **AdminAuthService** - Handles admin authentication and authorization
- **AdminLoggingService** - Logs administrative actions for accountability

### Models
- **AdminProject** - Extended project model with administrative properties
- **AdminUser** - Extended user model with administrative properties
- **AdminAction** - Model for logging administrative actions
- **BanRecord** - Model for storing ban information
- **BlockRecord** - Model for storing block information

### API Endpoints
- `GET /api/admin/projects` - Get list of all projects with admin details
- `GET /api/admin/projects/:id` - Get detailed project information
- `PATCH /api/admin/projects/:id/status` - Update project status
- `POST /api/admin/projects/:id/ban` - Ban a project
- `DELETE /api/admin/projects/:id/ban` - Unban a project
- `GET /api/admin/users` - Get list of all users with admin details
- `GET /api/admin/users/:id` - Get detailed user information
- `POST /api/admin/users/:id/block` - Block a user
- `DELETE /api/admin/users/:id/block` - Unblock a user

### Guards and Interceptors
- **AdminAuthGuard** - Prevents unauthorized access to admin routes
- **AdminLoggingInterceptor** - Logs all administrative API calls

## Acceptance Criteria

### Projects Management
1. Administrators can view a complete list of all projects on the platform
2. The projects list can be filtered by status, date range, creator, and vote count
3. Administrators can search for specific projects by title or description
4. Administrators can view detailed information about any project
5. Administrators can change the status of any project
6. Administrators can ban inappropriate projects with a required explanation
7. Banned projects are only visible to administrators and the project creator
8. Administrators can unban previously banned projects

### Users Management
1. Administrators can view a complete list of all users on the platform
2. The users list can be filtered by registration date, activity level, and contribution status
3. Administrators can search for specific users by name or email
4. Administrators can view detailed information about any user
5. Administrators can block users who violate community guidelines with a required explanation
6. Blocked users cannot authenticate or access the platform
7. Administrators can unblock previously blocked users

### General Admin Functionality
1. Only authorized administrators can access the admin panel
2. All administrative actions are logged for accountability
3. Critical actions (banning projects, blocking users) require confirmation
4. The admin interface is responsive and works on desktop and tablet devices
5. All admin pages load efficiently, even with large datasets

## Edge Cases & Constraints

### Edge Cases
1. **Self-Administration** - Administrators should not be able to block themselves or other administrators
2. **Last Administrator** - The system should prevent blocking the last administrator to ensure continued platform management
3. **Mass Actions** - The system should handle bulk operations efficiently (e.g., banning multiple projects)
4. **Data Volume** - The admin interface should handle large numbers of users and projects without performance degradation
5. **Concurrent Administration** - Multiple administrators may be working simultaneously; the system should handle concurrent changes appropriately

### Constraints
1. **Access Control** - Admin functionality is strictly limited to users with administrator privileges
2. **Audit Requirements** - All administrative actions must be logged for accountability and transparency
3. **Performance** - Admin pages must load quickly even when displaying large datasets
4. **Browser Compatibility** - Admin interface must work on all modern browsers (Chrome, Firefox, Safari, Edge)
5. **Responsive Design** - While primarily designed for desktop use, the admin interface should be usable on tablets

### Future Enhancements
1. **Advanced Analytics Dashboard** - Provide comprehensive platform statistics and trends
2. **Role-Based Administration** - Implement more granular admin roles (e.g., content moderator, user manager)
3. **Automated Moderation Tools** - Implement AI-assisted content moderation for flagging potentially inappropriate projects
4. **Audit Log Viewer** - Dedicated interface for reviewing administrative actions
5. **Customizable Admin Dashboard** - Allow administrators to customize their view based on their responsibilities
6. **Two-Factor Authentication** - Enhanced security for admin accounts
7. **Scheduled Administrative Actions** - Ability to schedule status changes or other actions
8. **Export Functionality** - Allow exporting user and project data for offline analysis
