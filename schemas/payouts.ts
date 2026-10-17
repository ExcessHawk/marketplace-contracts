import { z } from 'zod';
import { PaginationSchema } from './common';

export const PayoutStatusEnum = z.enum(['pending', 'paid', 'failed']);
export type PayoutStatus = z.infer<typeof PayoutStatusEnum>;

export const PAYOUT_STATUS_LABELS: Record<PayoutStatus, string> = {
  pending: 'En camino',
  paid: 'Depositado',
  failed: 'Falló',
};

export const ListPayoutsSchema = PaginationSchema.extend({
  status: PayoutStatusEnum.optional(),
});
export type ListPayoutsDto = z.infer<typeof ListPayoutsSchema>;

export interface PayoutView {
  id: string;
  amountCents: number;
  commissionCents: number;
  suborderCount: number;
  periodStart: string;
  periodEnd: string;
  status: PayoutStatus;
  transferId: string | null;
  failureReason: string | null;
  createdAt: string;
  paidAt: string | null;
  seller?: { id: string; slug: string; storeName: string };
}

export interface PayoutLine {
  suborderId: string;
  orderNumber: string;
  subtotalCents: number;
  shippingCents: number;
  commissionCents: number;
  payoutCents: number;
  deliveredAt: string | null;
  releasesAt: string | null;
  held: boolean;
}

export interface SellerEarnings {
  holdDays: number;
  pending: { amountCents: number; count: number };
  held: { amountCents: number; count: number; nextReleaseAt: string | null };
  paidTotalCents: number;
  lines: PayoutLine[];
  payouts: PayoutView[];
}

export interface PayoutRunResult {
  created: number;
  totalCents: number;
  sellers: number;
  skippedHeld: number;
}
