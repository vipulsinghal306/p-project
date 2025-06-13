import React, { useState } from "react";
import { Input } from "../ui/input";
import { Icon } from "@iconify/react";

const MessageInput = ({ onSend, isGeneratingAnswer }: { onSend: (msg: string) => void; isGeneratingAnswer: boolean }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col flex-1 w-auto">
    <div className="flex flex-1 items-center gap-2">
      <button
        className="flex items-center justify-center w-8 h-8 rounded-full text-[#A3A3A3] hover:bg-[#E0E0E0] cursor-pointer"
        onClick={() => alert("Add attachment functionality here")}
        aria-label="Add attachment"
      >
        <Icon icon="mdi:plus-circle-outline" width={24} height={24} />
      </button>
      <Input
        className="flex-1 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-lg placeholder:text-[#A3A3A3] cursor-pointer"
        placeholder="Ask a follow up..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") handleSend();
        }}
      />
      <div className="flex items-center bg-[#F6F6F6] rounded-full border-4 border-[#f6f6f6] hidden sm:flex">
        <span className="px-4 rounded-full bg-white text-base font-semibold text-[#171717] border-2 border-[#EBEBEB]">4s – mini</span>
        <span className="ml-1 px-3 rounded-full text-base font-medium text-[#AEAEAE]">s1 – preview</span>
      </div>
      {isGeneratingAnswer ? (
        <button
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E0E0E0] text-[#7A7A7A] hover:bg-[#D0D0D0] cursor-pointer"
          onClick={() => alert("Stop generation functionality here")}
          aria-label="Stop"
        >
          <Icon icon="mdi:stop" width={20} height={20} />
        </button>
      ) : (
        <button
          type="submit"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F4F4F4] hover:bg-[#E0E0E0] cursor-pointer"
          aria-label="Send"
          onClick={handleSend}
        >
          <Icon icon="fluent:arrow-right-24-regular" width={28} height={28} className="text-[#A3A3A3]" />
        </button>
      )}
    </div>
      <div className="bg-[#F6F6F6] rounded-full border-4 border-[#f6f6f6] sm:hidden mt-3 w-fit">
        <span className="px-4 rounded-full bg-white text-base font-semibold text-[#171717] border-2 border-[#EBEBEB]">4s – mini</span>
        <span className="ml-1 px-3 rounded-full text-base font-medium text-[#AEAEAE]">s1 – preview</span>
      </div>
    </div>
  );
};

export default MessageInput; 