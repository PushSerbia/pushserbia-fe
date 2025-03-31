import { ProjectStatus } from './project-status';

export interface Project {
  id: string;
  name: string;
  slug: string;
  image: string;
  shortDescription: string;
  description: string;
  voteCounter: number;
  creator: {
    id: string;
    name: string;
    image: string;
  };
  status: ProjectStatus;
  isBanned: boolean;
  createdAt: Date;
  updatedAt: Date;
  banNote?: string;
  github?: string;
}
