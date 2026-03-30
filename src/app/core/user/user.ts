import { UserRole } from './user-role';

export interface User {
  id: string;
  firebaseUid: string;
  fullName: string;
  email: string;
  gravatar: string;
  imageUrl: string;
  role: UserRole;
  isBlocked: boolean;
  level: number;
  projectsProposed: number;
  projectsSupported: number;
  membershipStatus: 'free' | 'member' | 'angel';
  gitHubUrl?: string;
  linkedInUrl?: string;
}
