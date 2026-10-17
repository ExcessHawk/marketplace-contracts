import { z } from 'zod';

export const DemoRoleSchema = z.enum(['comprador', 'vendedor', 'admin']);

export const DemoSessionSchema = z.object({
  role: DemoRoleSchema,
});

export type DemoRoleDto = z.infer<typeof DemoRoleSchema>;
export type DemoSessionDto = z.infer<typeof DemoSessionSchema>;
