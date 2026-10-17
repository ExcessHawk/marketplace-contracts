import { z } from 'zod';
import { MoneyCentsSchema } from './common';

export const ShippingZoneEnum = z.enum(['nacional', 'local']);
export type ShippingZone = z.infer<typeof ShippingZoneEnum>;

export const ZONE_LABELS: Record<ShippingZone, string> = {
  nacional: 'Todo el país',
  local: 'Misma ciudad',
};

export const ShippingRateInputSchema = z.object({
  zone: ShippingZoneEnum,
  baseCents: MoneyCentsSchema,
  perKgCents: MoneyCentsSchema.default(0),
  freeOverCents: MoneyCentsSchema.nullable().optional(),
});
export type ShippingRateInputDto = z.infer<typeof ShippingRateInputSchema>;

export const ReplaceShippingRatesSchema = z.object({
  rates: z
    .array(ShippingRateInputSchema)
    .max(2)
    .refine(
      (rates) => new Set(rates.map((r) => r.zone)).size === rates.length,
      'No puede haber dos tarifas para la misma zona',
    )
    .refine(
      (rates) => rates.length === 0 || rates.some((r) => r.zone === 'nacional'),
      'Necesitas una tarifa nacional antes de agregar una local',
    ),
});
export type ReplaceShippingRatesDto = z.infer<typeof ReplaceShippingRatesSchema>;
export type ReplaceShippingRatesInput = z.input<typeof ReplaceShippingRatesSchema>;

export interface ShippingRateView {
  id: string;
  zone: ShippingZone;
  baseCents: number;
  perKgCents: number;
  freeOverCents: number | null;
}
