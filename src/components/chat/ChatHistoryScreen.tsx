import React, { memo, useCallback } from "react";
import { CHAT_HISTORY_TITLE, CHAT_HISTORY_EMPTY_MESSAGE } from "@/constants/chat";
import type { ChatHistoryItem as ChatHistoryItemType } from "@/types/chat";

interface ChatHistoryScreenProps {
  onSelectChat: (chatId: string) => void;
  chats: ChatHistoryItemType[];
}

const ChatHistoryItem = memo(({ chat, onSelect }: { chat: ChatHistoryItemType; onSelect: (chatId: string) => void }) => {
  const handleClick = useCallback(() => {
    onSelect(chat.chatId);
  }, [chat.chatId, onSelect]);

  return (
    <button
      onClick={handleClick}
      className="w-full text-left bg-white border border-[#E5E7EB] rounded-2xl px-4 sm:px-6 py-4 shadow-sm hover:bg-[#F4F4F4] transition flex flex-col gap-1 cursor-pointer"
    >
      <span className="font-medium text-base text-[#171717] break-words">{chat.title}</span>
      <span className="text-sm text-[#71717A] break-words">{chat.preview}</span>
      <span className="text-xs text-[#A3A3A3] mt-1">{chat.timestamp}</span>
    </button>
  );
});

ChatHistoryItem.displayName = 'ChatHistoryItem';

const ChatHistoryScreen: React.FC<ChatHistoryScreenProps> = ({ onSelectChat, chats }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto py-4 px-4 sm:py-8 sm:px-2 gap-4">
      <h2 className="text-xl font-bold mb-4 self-start w-full">{CHAT_HISTORY_TITLE}</h2>
      {chats.map(chat => (
        <ChatHistoryItem
          key={chat.chatId}
          chat={chat}
          onSelect={onSelectChat}
        />
      ))}
      {chats.length === 0 && (
        <div className="text-[#A3A3A3] text-center mt-8">{CHAT_HISTORY_EMPTY_MESSAGE}</div>
      )}
    </div>
  );
};

export default memo(ChatHistoryScreen); 