export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

export interface WhatsAppPayload {
  to: string;
  message: string;
  template?: {
    name: string;
    parameters: Record<string, string>;
  };
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  channel: string;
  subject: string;
  content: string;
  status: string;
  sentAt?: Date;
  readAt?: Date;
  createdAt: Date;
}
