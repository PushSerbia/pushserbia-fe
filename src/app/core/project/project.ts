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
