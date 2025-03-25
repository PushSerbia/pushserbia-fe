import { UserRole } from './user-role';

export interface User {
  id: string;
  firebaseUid: string;
  fullName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}
