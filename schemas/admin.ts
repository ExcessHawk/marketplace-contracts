import { z } from 'zod';
import { PaginationSchema, UuidSchema } from './common';
import { SellerStatusEnum } from './catalog';
import type { Role } from './auth';

export const ListSellersSchema = PaginationSchema.extend({
  status: SellerStatusEnum.optional(),
  q: z.string().trim().max(120).optional(),
});
export type ListSellersDto = z.infer<typeof ListSellersSchema>;

export const SuspendSellerSchema = z.object({
  reason: z.string().trim().min(10).max(500),
});
export type SuspendSellerDto = z.infer<typeof SuspendSellerSchema>;

export const ApproveSellerSchema = z.object({
  note: z.string().trim().max(500).optional(),
});
export type ApproveSellerDto = z.infer<typeof ApproveSellerSchema>;

export const ListAuditSchema = PaginationSchema.extend({
  recordId: UuidSchema.optional(),
});
export type ListAuditDto = z.infer<typeof ListAuditSchema>;

export interface AdminSellerRow {
  id: string;
  slug: string;
  storeName: string;
  description: string | null;
  status: 'pending' | 'active' | 'suspended';
  statusReason: string | null;
  commissionBps: number;
  createdAt: string;
  updatedAt: string;
  owner: {
    id: string;
    email: string;
    fullName: string;
    phone: string | null;
    isPlatformAdmin: boolean;
  };
  productCount: number;
  publishedCount: number;
}

export interface AuditEntry {
  id: string;
  action: string;
  tableName: string | null;
  recordId: string | null;
  oldValues: unknown;
  newValues: unknown;
  createdAt: string;
  actor: { id: string; email: string; fullName: string } | null;
}

export interface AdminStats {
  sellers: { pending: number; active: number; suspended: number };
  products: { draft: number; published: number; archived: number };
  users: number;
}

export interface AdminUserSummary {
  id: string;
  email: string;
  fullName: string;
  roles: Role[];
}
