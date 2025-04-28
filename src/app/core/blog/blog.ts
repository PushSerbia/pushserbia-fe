export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  content: string;
  excerpt: string;
  image?: string;
  tags?: string[];
}
