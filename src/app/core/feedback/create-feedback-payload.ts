import { FeedbackCategory } from './feedback-category';

export interface CreateFeedbackPayload {
  rating: number;
  category: FeedbackCategory;
  message: string;
}
