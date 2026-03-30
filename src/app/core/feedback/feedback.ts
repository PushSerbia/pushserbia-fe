import { FeedbackCategory } from './feedback-category';

export interface Feedback {
  id: string;
  userId: string;
  rating: number;
  category: FeedbackCategory;
  message: string;
  createdAt: Date;
}
