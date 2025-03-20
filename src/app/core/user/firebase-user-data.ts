import { UserRole } from './user-role';

export interface FirebaseUserData {
  name: string;
  email: string;
  emailVerified: boolean;
  role: UserRole;
  accountCreated: boolean;
  photoUrl?: string;
  signInProvider?: string;
}
