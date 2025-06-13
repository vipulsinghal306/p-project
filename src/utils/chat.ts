import { ChatPair } from "@/types/chat";

export const generateChatId = (): string => {
  return `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
};

export const saveChatToLocalStorage = (chatId: string, chatPairs: ChatPair[]): void => {
  localStorage.setItem(`chat_${chatId}`, JSON.stringify(chatPairs));
};

export const getChatFromLocalStorage = (chatId: string): ChatPair[] | null => {
  const chat = localStorage.getItem(`chat_${chatId}`);
  return chat ? JSON.parse(chat) : null;
};

export const createInitialChatPair = (question: string): ChatPair => {
  return {
    question: { id: 1, text: question.trim(), isUser: true },
    answer: { id: 0, blocks: [] }
  };
};

export const formatTimestamp = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
}; 