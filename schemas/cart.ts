import { z } from 'zod';
import { UuidSchema } from './common';

export const MAX_LINE_QUANTITY = 99;

export const AddCartItemSchema = z.object({
  variantId: UuidSchema,
  quantity: z.number().int().min(1).max(MAX_LINE_QUANTITY).default(1),
});
export type AddCartItemDto = z.infer<typeof AddCartItemSchema>;
export type AddCartItemInput = z.input<typeof AddCartItemSchema>;

export const UpdateCartItemSchema = z.object({
  quantity: z.number().int().min(1).max(MAX_LINE_QUANTITY),
});
export type UpdateCartItemDto = z.infer<typeof UpdateCartItemSchema>;

export type CartLineIssue =
  | 'unavailable'
  | 'out_of_stock'
  | 'low_stock'
  | 'store_closed';

export interface CartLine {
  id: string;
  variantId: string;
  quantity: number;
  priceCentsAtAdd: number;
  currentPriceCents: number;
  priceDeltaCents: number;
  lineTotalCents: number;
  availableStock: number;
  issue: CartLineIssue | null;
  product: { id: string; slug: string; title: string; imageKey: string | null };
  variant: { name: string; sku: string | null };
  addedAt: string;
}

export interface CartGroup {
  seller: { id: string; slug: string; storeName: string };
  lines: CartLine[];
  subtotalCents: number;
  weightGrams: number;
  shippingCents: number | null;
  freeOverCents: number | null;
  missingForFreeCents: number | null;
}

export interface CartView {
  id: string;
  groups: CartGroup[];
  itemCount: number;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  hasPriceChanges: boolean;
  hasBlockers: boolean;
  hasUnconfiguredShipping: boolean;
  updatedAt: string;
}

export interface CartSummary {
  itemCount: number;
  subtotalCents: number;
}
