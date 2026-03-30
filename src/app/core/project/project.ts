import { ProjectStatus } from './project-status';

export interface ProjectMember {
  id: string;
  userId: string;
  assignedAt: Date;
  user: {
    id: string;
    fullName: string;
    imageUrl: string;
    gravatar: string;
  };
}

export interface ProjectVoter {
  id: string;
  fullName: string;
  imageUrl: string;
  gravatar: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  image: string;
  shortDescription: string;
  description: string;
  totalVoters: number;
  totalVotes: number;
  creator: {
    id: string;
    fullName: string;
    imageUrl: string;
    gravatar: string;
  };
  status: ProjectStatus;
  isBanned: boolean;
  createdAt: Date;
  updatedAt: Date;
  banNote?: string;
  github?: string;
}
