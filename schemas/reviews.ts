import { z } from 'zod';
import { PaginationSchema, UuidSchema } from './common';

export const RatingSchema = z.number().int().min(1).max(5);

export const CreateReviewSchema = z.object({
  productId: UuidSchema,
  rating: RatingSchema,
  body: z.string().trim().max(2000).optional(),
});
export type CreateReviewDto = z.infer<typeof CreateReviewSchema>;

export const UpdateReviewSchema = z.object({
  rating: RatingSchema,
  body: z.string().trim().max(2000).optional(),
});
export type UpdateReviewDto = z.infer<typeof UpdateReviewSchema>;

export const ReplyReviewSchema = z.object({
  reply: z.string().trim().min(2).max(1000),
});
export type ReplyReviewDto = z.infer<typeof ReplyReviewSchema>;

export const ListReviewsSchema = PaginationSchema.extend({
  rating: RatingSchema.optional(),
});
export type ListReviewsDto = z.infer<typeof ListReviewsSchema>;

export interface ReviewView {
  id: string;
  rating: number;
  body: string | null;
  authorName: string;
  createdAt: string;
  sellerReply: string | null;
  repliedAt: string | null;
  product: { id: string; slug: string; title: string };
  isMine: boolean;
}

export interface RatingSummary {
  average: number | null;
  count: number;
  breakdown: Record<'1' | '2' | '3' | '4' | '5', number>;
}

export interface ReviewableItem {
  productId: string;
  productSlug: string;
  productTitle: string;
  imageKey: string | null;
  review: { id: string; rating: number; body: string | null } | null;
}

export function ratingFromHundredths(value: number | null): number | null {
  return value === null ? null : value / 100;
}
