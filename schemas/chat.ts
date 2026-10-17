import { z } from 'zod';
import { PaginationSchema } from './common';

export const SendMessageSchema = z.object({
  body: z.string().trim().min(1).max(2000),
});
export type SendMessageDto = z.infer<typeof SendMessageSchema>;

export const ListMessagesSchema = PaginationSchema.extend({
  limit: z.coerce.number().int().min(1).max(100).default(50),
});
export type ListMessagesDto = z.infer<typeof ListMessagesSchema>;

export const SocketMessageSchema = z.object({
  type: z.literal('message'),
  body: z.string().trim().min(1).max(2000),
});
export type SocketMessageDto = z.infer<typeof SocketMessageSchema>;

export type ChatRole = 'buyer' | 'seller';

export interface ChatMessageView {
  id: string;
  senderRole: ChatRole;
  senderName: string | null;
  body: string;
  readAt: string | null;
  createdAt: string;
  isMine: boolean;
}

export interface ConversationView {
  id: string;
  suborderId: string;
  orderNumber: string;
  myRole: ChatRole;
  counterpartName: string;
  storeName: string;
  storeSlug: string;
  lastMessageAt: string | null;
  unreadCount: number;
  messages: ChatMessageView[];
}

export interface ConversationSummary {
  id: string;
  suborderId: string;
  orderNumber: string;
  counterpartName: string;
  storeName: string;
  lastMessageAt: string | null;
  lastMessageBody: string | null;
  unreadCount: number;
}

export interface ChatTicket {
  ticket: string;
  expiresInSeconds: number;
  url: string;
}

export type SocketEvent =
  | { type: 'ready'; conversationId: string }
  | { type: 'message'; message: ChatMessageView }
  | { type: 'error'; error: string };
