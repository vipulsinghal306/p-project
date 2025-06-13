import React, { memo, useCallback } from 'react';
import { Icon } from "@iconify/react";
import { 
  CHAT_INPUT_PLACEHOLDER,
  ATTACH_BUTTON_TEXT,
  MODEL_VERSION,
  PREVIEW_VERSION
} from "@/constants/chat";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ChatInput = memo(({ value, onChange, onSubmit }: ChatInputProps) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-4">
      <div className="w-full bg-white rounded-3xl border-8 border-[#F1F1F1] flex flex-col">
        <div className="w-full bg-white rounded-2xl border-1 border-[#D7D7D7] p-4 flex flex-col gap-6">
          <div className="flex justify-start items-center">
            <button
              className="flex items-center justify-center w-10 h-10 pr-3 rounded-full text-[#A3A3A3] hover:bg-[#E0E0E0] cursor-pointer sm:hidden"
              onClick={() => alert("Add attachment functionality here")}
              aria-label="Add attachment"
            >
              <Icon icon="mdi:plus-circle-outline" width={60} height={60}/>
            </button>
            <input
              className="w-full bg-transparent outline-none text-xl placeholder:text-[#A3A3A3] font-normal"
              placeholder={CHAT_INPUT_PLACEHOLDER}
              value={value}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-3 mt-2">
            <button 
              type="button" 
              className="flex items-center gap-1 text-[#A3A3A3] text-base font-medium py-1 rounded hover:bg-[#F4F4F4] cursor-pointer hidden sm:flex"
            >
              <Icon icon="mdi:plus" width={22} height={22} /> {ATTACH_BUTTON_TEXT}
            </button>
            <div className="flex items-center bg-[#F6F6F6] rounded-full border-4 border-[#f6f6f6]">
              <span className="px-4 rounded-full bg-white text-base font-semibold text-[#171717] border-2 border-[#EBEBEB]">
                {MODEL_VERSION}
              </span>
              <span className="ml-1 px-3 rounded-full text-base font-medium text-[#AEAEAE]">
                {PREVIEW_VERSION}
              </span>
            </div>
            <button
              type="submit"
              className="ml-auto flex items-center justify-center w-10 h-10 rounded-full bg-[#F4F4F4] hover:bg-[#E0E0E0] cursor-pointer"
              aria-label="Send"
            >
              <Icon icon="fluent:arrow-right-24-regular" width={28} height={28} className="text-[#A3A3A3]" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
});

ChatInput.displayName = 'ChatInput';

export default ChatInput; 