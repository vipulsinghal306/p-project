import React, { useState, useCallback, memo } from "react";
import { Icon } from "@iconify/react";
import UserProfile from "../common/UserProfile";
import { 
  SUGGESTIONS, 
  DEFAULT_USER_NAME,
  CHAT_INPUT_PLACEHOLDER,
  ATTACH_BUTTON_TEXT,
  MODEL_VERSION,
  PREVIEW_VERSION
} from "@/constants/chat";
import { generateChatId, saveChatToLocalStorage, createInitialChatPair } from "@/utils/chat";
import ChatInput from "./ChatInput";
import SuggestionButton from "./SuggestionButton";

interface NewChatScreenProps {
  onStartChat: (chatId: string, initialQuestionText: string) => void;
  onNewChatClick: () => void;
}

const NewChatScreen: React.FC<NewChatScreenProps> = ({ onStartChat, onNewChatClick }) => {
  const [question, setQuestion] = useState("");

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      const newChatId = generateChatId();
      localStorage.setItem("currentChatId", newChatId);

      const initialPair = createInitialChatPair(question);
      saveChatToLocalStorage(newChatId, [initialPair]);

      onStartChat(newChatId, question.trim());
    }
  }, [question, onStartChat]);

  const handleQuestionChange = useCallback((value: string) => {
    setQuestion(value);
  }, []);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setQuestion(suggestion);
  }, []);

  return (
    <div className="flex flex-col flex-1 min-h-screen w-full">
      {/* Header */}
      <header className="sticky top-0 bg-background z-10 flex items-center justify-between px-4 py-3 border-b sm:px-8 sm:py-4 sm:hidden">
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E0E0E0] bg-white hover:bg-[#F4F4F4] text-black transition-all duration-200 hover:scale-105 cursor-pointer"
          onClick={onNewChatClick}
          aria-label="New Chat"
        >
          <Icon icon="mdi:plus" width={24} height={24} />
        </button>
        <UserProfile name={DEFAULT_USER_NAME} hideNameOnMobile={true} />
      </header>
      <div className="flex flex-col items-center justify-end min-h-[93vh] w-full px-4 pr-4
        sm:justify-center sm:translate-y-[10%]
        sm:min-h-[80vh]
        justify-end pb-24 sm:pb-0">
        <div className="mb-12">
          <img src="/logo.png" alt="Logo" className="w-20 h-20 mx-auto" />
        </div>
        <div className="w-full max-w-4xl mx-auto">
          <ChatInput
            value={question}
            onChange={handleQuestionChange}
            onSubmit={handleSubmit}
          />
          <div className="flex flex-row flex-wrap gap-2 mt-5 justify-start w-full">
            {SUGGESTIONS.map(suggestion => (
              <SuggestionButton
                key={suggestion}
                suggestion={suggestion}
                onClick={handleSuggestionClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(NewChatScreen); 