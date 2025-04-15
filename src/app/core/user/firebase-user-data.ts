import { UserRole } from './user-role';

export interface FirebaseUserData {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: UserRole;
  imageUrl?: string;
}
