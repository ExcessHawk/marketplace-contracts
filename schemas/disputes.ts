import { z } from 'zod';
import { PaginationSchema } from './common';

export const DisputeStatusEnum = z.enum([
  'open',
  'resolved_buyer',
  'resolved_seller',
  'withdrawn',
]);
export type DisputeStatus = z.infer<typeof DisputeStatusEnum>;

export const DisputeReasonEnum = z.enum([
  'not_received',
  'damaged',
  'not_as_described',
  'wrong_item',
  'other',
]);
export type DisputeReason = z.infer<typeof DisputeReasonEnum>;

export const DISPUTE_REASON_LABELS: Record<DisputeReason, string> = {
  not_received: 'No me llegó',
  damaged: 'Llegó dañado',
  not_as_described: 'No es como lo describían',
  wrong_item: 'Me mandaron otra cosa',
  other: 'Otra cosa',
};

export const DISPUTE_STATUS_LABELS: Record<DisputeStatus, string> = {
  open: 'Abierta',
  resolved_buyer: 'A favor del comprador',
  resolved_seller: 'A favor del vendedor',
  withdrawn: 'Retirada',
};

export const DISPUTE_WINDOW_DAYS = 14;

export const OpenDisputeSchema = z.object({
  reason: DisputeReasonEnum,
  description: z.string().trim().min(20).max(2000),
});
export type OpenDisputeDto = z.infer<typeof OpenDisputeSchema>;

export const DisputeMessageSchema = z.object({
  body: z.string().trim().min(1).max(2000),
});
export type DisputeMessageDto = z.infer<typeof DisputeMessageSchema>;

export const ResolveDisputeSchema = z.object({
  inFavorOf: z.enum(['buyer', 'seller']),
  resolution: z.string().trim().min(20).max(2000),
});
export type ResolveDisputeDto = z.infer<typeof ResolveDisputeSchema>;

export const ListDisputesSchema = PaginationSchema.extend({
  status: DisputeStatusEnum.optional(),
});
export type ListDisputesDto = z.infer<typeof ListDisputesSchema>;

export interface DisputeMessageView {
  id: string;
  senderRole: 'buyer' | 'seller' | 'platform';
  senderName: string | null;
  body: string;
  createdAt: string;
}

export interface DisputeView {
  id: string;
  suborderId: string;
  orderNumber: string;
  reason: DisputeReason;
  description: string;
  status: DisputeStatus;
  resolution: string | null;
  resolvedAt: string | null;
  createdAt: string;
  amountCents: number;
  seller: { id: string; slug: string; storeName: string };
  buyer: { id: string; fullName: string };
  openedByRole: 'buyer' | 'seller' | 'platform';
  messages: DisputeMessageView[];
}
