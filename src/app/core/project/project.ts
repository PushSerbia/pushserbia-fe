export interface Project {
  id: string;
  name: string;
  slug: string;
  image: string;
  shortDescription: string;
  description: string;
  voteCounter: number;
  creatorId: string;
  creatorName: string;
  creatorImage: string;
  createdAt: Date;
  updatedAt: Date;
}

// export enum ProjectStatus {
//   Pending = 'pending',
//   Active = 'active',
//   Declined = 'declined'
// }
// export interface Project {
//   id: string;
//   title: string;
//   description: string;
//   shareableLink: string;
//   githubLink: string | null;
//   status: ProjectStatus;
//   isBanned: boolean;
//   banNote: string | null;
//   creator: unknown | null;
//   createdAt: Date;
//   updatedAt: Date;
// }
