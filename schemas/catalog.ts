import { z } from 'zod';
import { MoneyCentsSchema, PaginationSchema, SlugSchema, UuidSchema } from './common';

export const ProductStatusEnum = z.enum(['draft', 'published', 'archived']);
export type ProductStatus = z.infer<typeof ProductStatusEnum>;

export const SellerStatusEnum = z.enum(['pending', 'active', 'suspended']);

export const ProductSortEnum = z.enum(['relevance', 'newest', 'price_asc', 'price_desc']);

export const SearchProductsSchema = PaginationSchema.extend({
  q: z.string().trim().max(120).optional(),
  category: SlugSchema.optional(),
  seller: SlugSchema.optional(),
  minPrice: z.coerce.number().int().min(0).optional(),
  maxPrice: z.coerce.number().int().min(0).optional(),
  sort: ProductSortEnum.default('relevance'),
});
export type SearchProductsDto = z.infer<typeof SearchProductsSchema>;

export const CreateSellerSchema = z.object({
  storeName: z.string().min(2).max(120).trim(),
  slug: SlugSchema,
  description: z.string().max(2000).trim().optional(),
});
export type CreateSellerDto = z.infer<typeof CreateSellerSchema>;

export const UpdateSellerSchema = CreateSellerSchema.partial().omit({ slug: true });
export type UpdateSellerDto = z.infer<typeof UpdateSellerSchema>;

export const VariantInputSchema = z.object({
  name: z.string().min(1).max(120).trim(),
  sku: z.string().max(64).trim().optional(),
  priceCents: MoneyCentsSchema,
  compareAtCents: MoneyCentsSchema.optional(),
  stock: z.number().int().min(0).max(1_000_000).default(0),
  weightGrams: z.number().int().min(0).max(1_000_000).optional(),
  imageKeys: z.array(z.string().max(500)).max(10).default([]),
});
export type VariantInputDto = z.infer<typeof VariantInputSchema>;

export const CreateProductSchema = z.object({
  title: z.string().min(3).max(200).trim(),
  slug: SlugSchema,
  description: z.string().max(10_000).trim().optional(),
  categoryId: UuidSchema.optional(),
  variants: z.array(VariantInputSchema).min(1).max(50),
});
export type CreateProductDto = z.infer<typeof CreateProductSchema>;

export const UpdateProductSchema = CreateProductSchema.partial().omit({ variants: true });
export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;

export interface VariantView {
  id: string;
  name: string;
  sku: string | null;
  priceCents: number;
  compareAtCents: number | null;
  stock: number;
  imageKeys: string[];
}

export interface ProductListItem {
  id: string;
  slug: string;
  title: string;
  status: ProductStatus;
  priceFromCents: number;
  imageKey: string | null;
  ratingAvg: number | null;
  ratingCount: number;
  seller: { id: string; slug: string; storeName: string };
}

export interface ProductDetail extends ProductListItem {
  description: string | null;
  categoryId: string | null;
  publishedAt: string | null;
  variants: VariantView[];
}

export const ReplaceVariantsSchema = z.object({
  variants: z
    .array(VariantInputSchema.extend({ id: UuidSchema.optional() }))
    .min(1, 'Un producto necesita al menos una variante')
    .max(50),
});
export type ReplaceVariantsDto = z.infer<typeof ReplaceVariantsSchema>;

export interface SellerProductDetail {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  categoryId: string | null;
  status: ProductStatus;
  publishedAt: string | null;
  updatedAt: string;
  variants: VariantView[];
}

export type CreateProductInput = z.input<typeof CreateProductSchema>;
export type ReplaceVariantsInput = z.input<typeof ReplaceVariantsSchema>;
export type VariantInput = z.input<typeof VariantInputSchema>;
