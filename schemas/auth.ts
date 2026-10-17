import { z } from 'zod';

export const RoleEnum = z.enum(['admin', 'seller', 'buyer']);
export type Role = z.infer<typeof RoleEnum>;

const email = z.string().email().max(254).toLowerCase().trim();

const password = z.string().min(12).max(200);

export const RegisterSchema = z.object({
  email,
  password,
  fullName: z.string().min(2).max(120).trim(),
  phone: z.string().max(25).trim().optional(),
});
export type RegisterDto = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email,
  password: z.string().min(1).max(200),
});
export type LoginDto = z.infer<typeof LoginSchema>;

export const RefreshSchema = z.object({
  refreshToken: z.string().min(10),
});
export type RefreshDto = z.infer<typeof RefreshSchema>;

export const UpdateProfileSchema = z.object({
  fullName: z.string().min(2).max(120).trim().optional(),
  phone: z.string().max(25).trim().nullable().optional(),
  avatarUrl: z.string().url().max(500).nullable().optional(),
});
export type UpdateProfileDto = z.infer<typeof UpdateProfileSchema>;

export const UpdatePasswordSchema = z.object({
  currentPassword: z.string().min(1).max(200),
  newPassword: password,
});
export type UpdatePasswordDto = z.infer<typeof UpdatePasswordSchema>;

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  phone: string | null;
  roles: Role[];
  sellerId: string | null;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: AuthUser;
  tokens: AuthTokens;
}
