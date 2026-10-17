import { z } from 'zod';
import { PaginationSchema, UuidSchema } from './common';
import type { AddressView } from './address';

export const OrderStatusEnum = z.enum(['pending_payment', 'paid', 'cancelled', 'refunded']);
export type OrderStatus = z.infer<typeof OrderStatusEnum>;

export const SuborderStatusEnum = z.enum([
  'pending_payment',
  'pending_shipment',
  'shipped',
  'delivered',
  'cancelled',
  'refunded',
]);
export type SuborderStatus = z.infer<typeof SuborderStatusEnum>;

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending_payment: 'Esperando pago',
  paid: 'Pagado',
  cancelled: 'Cancelado',
  refunded: 'Reembolsado',
};

export const SUBORDER_STATUS_LABELS: Record<SuborderStatus, string> = {
  pending_payment: 'Esperando pago',
  pending_shipment: 'Por enviar',
  shipped: 'En camino',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
  refunded: 'Reembolsado',
};

export const CheckoutSchema = z.object({
  addressId: UuidSchema,
});
export type CheckoutDto = z.infer<typeof CheckoutSchema>;

export const ShipSuborderSchema = z.object({
  carrier: z.string().trim().min(2).max(60),
  trackingNumber: z.string().trim().min(4).max(60),
});
export type ShipSuborderDto = z.infer<typeof ShipSuborderSchema>;

export const ListOrdersSchema = PaginationSchema.extend({
  status: OrderStatusEnum.optional(),
});
export type ListOrdersDto = z.infer<typeof ListOrdersSchema>;

export const ListSalesSchema = PaginationSchema.extend({
  status: SuborderStatusEnum.optional(),
});
export type ListSalesDto = z.infer<typeof ListSalesSchema>;

export interface SuborderItemView {
  id: string;
  productTitle: string;
  productSlug: string;
  variantName: string;
  sku: string | null;
  imageKey: string | null;
  quantity: number;
  unitPriceCents: number;
  lineTotalCents: number;
}

export interface SuborderView {
  id: string;
  seller: { id: string; slug: string; storeName: string };
  items: SuborderItemView[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  status: SuborderStatus;
  trackingCarrier: string | null;
  trackingNumber: string | null;
  shippedAt: string | null;
  deliveredAt: string | null;
}

export interface OrderView {
  id: string;
  number: string;
  status: OrderStatus;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  shippingSnapshot: Record<string, string>;
  suborders: SuborderView[];
  createdAt: string;
  paidAt: string | null;
}

export interface OrderListItem {
  id: string;
  number: string;
  status: OrderStatus;
  totalCents: number;
  itemCount: number;
  storeNames: string[];
  createdAt: string;
}

export interface CheckoutResponse {
  order: OrderView;
  payment: { provider: string; intentId: string; clientSecret: string };
}

export interface SaleView extends SuborderView {
  orderId: string;
  orderNumber: string;
  orderStatus: OrderStatus;
  buyer: { fullName: string; phone: string | null };
  shippingSnapshot: Record<string, string>;
  commissionCents: number;
  payoutCents: number;
  createdAt: string;
}

export interface CheckoutBlocker {
  lineId: string;
  productTitle: string;
  variantName: string;
  reason: 'unavailable' | 'out_of_stock' | 'low_stock' | 'store_closed' | 'no_shipping';
  availableStock: number;
}

export interface CheckoutPriceChange {
  productTitle: string;
  variantName: string;
  pricedAtCents: number;
  chargedCents: number;
}

export type { AddressView };
