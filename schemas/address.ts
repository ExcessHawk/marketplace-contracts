import { z } from 'zod';

const MEXICAN_STATES = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'Ciudad de México',
  'Coahuila',
  'Colima',
  'Durango',
  'Estado de México',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'Michoacán',
  'Morelos',
  'Nayarit',
  'Nuevo León',
  'Oaxaca',
  'Puebla',
  'Querétaro',
  'Quintana Roo',
  'San Luis Potosí',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz',
  'Yucatán',
  'Zacatecas',
] as const;

export const MexicanStateEnum = z.enum(MEXICAN_STATES);
export type MexicanState = z.infer<typeof MexicanStateEnum>;
export const MEXICAN_STATE_LIST: readonly string[] = MEXICAN_STATES;

export const CreateAddressSchema = z.object({
  label: z.string().trim().max(40).optional(),
  recipient: z.string().trim().min(3).max(120),
  phone: z.string().trim().regex(/^\d{10}$/, 'Diez dígitos, sin espacios ni guiones'),
  street: z.string().trim().min(3).max(200),
  interior: z.string().trim().max(40).optional(),
  neighborhood: z.string().trim().min(2).max(120),
  city: z.string().trim().min(2).max(120),
  state: MexicanStateEnum,
  postalCode: z.string().trim().regex(/^\d{5}$/, 'Cinco dígitos'),
  notes: z.string().trim().max(300).optional(),
  isDefault: z.boolean().default(false),
});
export type CreateAddressDto = z.infer<typeof CreateAddressSchema>;
export type CreateAddressInput = z.input<typeof CreateAddressSchema>;

export const UpdateAddressSchema = CreateAddressSchema.partial();
export type UpdateAddressDto = z.infer<typeof UpdateAddressSchema>;

export interface AddressView {
  id: string;
  label: string | null;
  recipient: string;
  phone: string;
  street: string;
  interior: string | null;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  notes: string | null;
  isDefault: boolean;
}

export function formatAddress(address: AddressView): string {
  const line = [address.street, address.interior].filter(Boolean).join(' int. ');
  return [line, address.neighborhood, `${address.city}, ${address.state}`, `C.P. ${address.postalCode}`].join(
    ' · ',
  );
}
