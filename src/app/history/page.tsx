"use client";
import React, { useEffect, useState } from "react";
import ChatAppLayout from "@/components/layout/ChatAppLayout";
import ChatHistoryScreen from "@/components/chat/ChatHistoryScreen";
import { useSectionStore } from "@/lib/sectionStore";
import { useRouter } from "next/navigation";
import { ChatPair } from "@/components/chat/ChatConversationScreen";

interface ChatHistoryItem {
  chatId: string;
  title: string;
  preview: string;
  timestamp: string;
}

export default function HistoryPage() {
  const setSection = useSectionStore((s) => s.setSection);
  const router = useRouter();
  const [historyChats, setHistoryChats] = useState<ChatHistoryItem[]>([]);

  useEffect(() => {
    setSection("history");
    const loadedChats: ChatHistoryItem[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("chat_")) {
        const chatId = key.replace("chat_", "");
        try {
          const chatData: ChatPair[] = JSON.parse(localStorage.getItem(key) || "[]");
          if (chatData.length > 0) {
            const firstQuestion = chatData[0].question.text;
            const firstAnswerBlock = chatData[0].answer.blocks.find(block => block.type === "paragraph");
            const preview = firstAnswerBlock ? firstAnswerBlock.content : "No answer yet...";
            
            // Extract timestamp from chatId (e.g., chat_1678886400000_123 -> 1678886400000)
            const timestampPart = chatId.split("_")[0];
            const date = new Date(parseInt(timestampPart));
            const formattedTimestamp = isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString(); // Robust date handling

            loadedChats.push({
              chatId: chatId,
              title: firstQuestion,
              preview: preview,
              timestamp: formattedTimestamp,
            });
          }
        } catch (e) {
          console.error("Error parsing chat data from localStorage:", e);
        }
      }
    }
    // Sort by timestamp descending (most recent first)
    loadedChats.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setHistoryChats(loadedChats);
  }, [setSection]);

  const handleSelectChat = (chatId: string) => {
    setSection("home");
    router.push(`/${chatId}`);
  };

  return (
    <ChatAppLayout chatHistoryScreen={<ChatHistoryScreen onSelectChat={handleSelectChat} chats={historyChats} />}>
      <></>
    </ChatAppLayout>
  );
}
