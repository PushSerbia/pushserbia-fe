# Authentication Feature Specification

## Feature Title
Streamlined LinkedIn Authentication for Push Serbia Platform

## Description / Business Context
The authentication feature provides a seamless and secure way for users to access the Push Serbia platform using their LinkedIn accounts. This approach eliminates the need for users to create and remember yet another set of credentials, while leveraging their professional LinkedIn profiles to establish their identity within our developer community.

By implementing LinkedIn OAuth authentication, we:
- Reduce friction in the user onboarding process
- Gain access to verified professional information
- Establish a higher level of trust in user identities
- Align with modern authentication best practices
- Provide a consistent and professional user experience

The feature is designed to be simple, secure, and aligned with GDPR requirements, ensuring user privacy while enabling the necessary functionality for the platform.

## User Stories

### Authentication
- As a new user, I want to sign up using my LinkedIn account, so that I don't have to create and remember another set of credentials.
- As a returning user, I want to log in with my LinkedIn account, so that I can quickly access the platform.
- As a user, I want to be automatically redirected after authentication, so that I can continue using the platform without interruption.
- As a user, I want to log out of the platform, so that I can secure my account when using shared devices.

### Account Management
- As a user, I want my basic profile information to be imported from LinkedIn, so that I don't have to manually enter it.
- As a user, I want to view and update my profile information, so that I can keep my details current.
- As a user, I want to link my GitHub account, so that I can showcase my development work.

### Security
- As a user, I want my authentication to be secure, so that my account cannot be compromised.
- As a user, I want to know that my data is handled in compliance with GDPR, so that I can trust the platform with my information.

## Functionality Overview

### Authentication Flow
1. **Login Initiation**: User navigates to the login page (/prijava) and clicks on the LinkedIn login button.
2. **OAuth Redirection**: User is redirected to LinkedIn's authentication page with the appropriate OAuth parameters.
3. **LinkedIn Authentication**: User authenticates with LinkedIn and grants permission to access their basic profile information.
4. **Callback Processing**: LinkedIn redirects back to our platform with an authorization code.
5. **Token Exchange**: Our backend exchanges the authorization code for an access token.
6. **User Creation/Retrieval**: 
   - If the user is new, a new account is created using their LinkedIn profile information.
   - If the user already exists, their existing account is retrieved.
7. **Custom Token Generation**: A Firebase custom token is generated for the user.
8. **Client-side Authentication**: The client uses the custom token to authenticate with Firebase.
9. **Session Establishment**: Authentication cookies are set, and the user's session is established.
10. **Redirection**: User is redirected to the home page or their intended destination.

### Logout Flow
1. User clicks the logout button in the user widget.
2. The client calls the signOut method in the AuthService.
3. Firebase authentication state is cleared.
4. Authentication cookies are removed.
5. User is redirected to the login page.

### User Data Management
1. Basic user data (name, email, profile picture) is obtained from LinkedIn during authentication.
2. Extended user data (level, projects, GitHub URL) is stored in the application's backend.
3. User data is accessible through the AuthService's signals and observables.
4. Users can update their profile information through the profile page.

## UX Notes / Wireframe Ideas

### Login Page
- Clean, minimalist design with the Push Serbia branding
- Brief explanation of the login process
- Prominent LinkedIn login button
- Reference to privacy policy
- Visual indication that no form filling is required

### Loading/Redirect Page
- Full-screen loading spinner
- No user interaction required
- Automatically processes the authentication and redirects

### User Widget
- Displays user's profile picture and name
- Dropdown menu with logout option
- Links to profile management

### Profile Management
- Form for updating user information
- Fields for GitHub and LinkedIn URLs
- Visual feedback for successful updates

## Technical Notes (High-Level)

### Authentication Backend
- Firebase Authentication for identity management
- Custom token generation for secure authentication
- Cookie-based session management for API requests

### Frontend Authentication Components
- AuthService: Central service for authentication state and operations
- Auth Guard: Protects routes from unauthorized access
- Auth Interceptor: Adds authentication cookies to API requests
- Account Component: Handles OAuth callback and token processing

### Data Models
- FirebaseUserData: Basic user information from Firebase
- User: Extended user information from the backend
- UserRole: Enum defining user roles (Participant, Developer, Admin)

### API Integration
- LinkedIn OAuth API for authentication
- Firebase Admin SDK for custom token generation
- RESTful API for user data management

## Acceptance Criteria

### Authentication
- Users can successfully log in using their LinkedIn accounts
- New users are automatically registered on first login
- Users remain logged in across sessions until they explicitly log out
- Users are redirected to the appropriate page after authentication

### Security
- Authentication tokens are securely stored and transmitted
- API requests include proper authentication
- Protected routes are only accessible to authenticated users
- User sessions expire appropriately

### User Experience
- Login process takes less than 5 seconds in typical conditions
- Error messages are clear and actionable
- Loading states are visually indicated
- Responsive design works on all device sizes

### Data Management
- User profile data is correctly imported from LinkedIn
- Users can update their profile information
- Changes to user data are persisted and reflected immediately

## Edge Cases & Constraints

### Authentication Edge Cases
- LinkedIn authentication fails or is canceled by the user
  - User is redirected back to login page with appropriate error message
- User revokes LinkedIn permissions
  - Next login attempt will request permissions again
- Authentication token expires
  - User is automatically redirected to login page

### Network & Performance Constraints
- Slow network connections
  - Loading spinner provides feedback during authentication
  - Timeout handling after 30 seconds
- API rate limiting
  - Exponential backoff for retry attempts

### User Data Constraints
- Missing LinkedIn profile information
  - Default values are used where appropriate
  - User is prompted to complete their profile
- Invalid or malformed data from LinkedIn
  - Data validation before storage
  - Fallback to default values

### Security Constraints
- CSRF protection for authentication endpoints
- XSS prevention in user data display
- Rate limiting for authentication attempts
- GDPR compliance for user data storage and processing
