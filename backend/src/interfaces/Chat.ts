export interface ChatMessage {
  sessionId: string;
  message: string;
}

export interface ChatResponse {
  watson: any[];
  intent?: string;
  data?: any;
}