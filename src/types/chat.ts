export interface ChatPair {
  question: { id: number; text: string; isUser: boolean };
  answer: { id: number; blocks: AnswerBlock[] };
}

export interface AnswerBlock {
  type: 'text' | 'code' | 'image';
  content: string;
  language?: string;
}

export interface ChatHistoryItem {
  chatId: string;
  title: string;
  preview: string;
  timestamp: string;
}

export interface ChatInputProps {
  onSend: (message: string) => void;
  isGeneratingAnswer: boolean;
  placeholder?: string;
}

export interface UserProfileProps {
  name: string;
  avatarUrl?: string;
  hideNameOnMobile?: boolean;
} 