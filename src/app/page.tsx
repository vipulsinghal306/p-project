"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChatAppLayout from "@/components/layout/ChatAppLayout";
import NewChatScreen from "@/components/chat/NewChatScreen";
import ChatHistoryScreen from "@/components/chat/ChatHistoryScreen";
import { useSectionStore } from "@/lib/sectionStore";
import { ChatPair } from "@/components/chat/ChatConversationScreen";

interface ChatHistoryItem {
  chatId: string;
  title: string;
  preview: string;
  timestamp: string;
}

export default function Home() {
  const router = useRouter();
  const setSection = useSectionStore((s) => s.setSection);
  const [historyChats, setHistoryChats] = useState<ChatHistoryItem[]>([]);

  useEffect(() => {
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
            
            const timestampPart = chatId.split("_")[0];
            const date = new Date(parseInt(timestampPart));
            const formattedTimestamp = isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString();

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
    loadedChats.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setHistoryChats(loadedChats);
  }, []);

  const handleStartChat = (chatId: string, initialQuestionText: string) => {
    setSection("home");
    router.push(`/${chatId}?initialQuestion=${encodeURIComponent(initialQuestionText)}`);
  };
  const handleSelectChat = (chatId: string) => {
    setSection("home");
    router.push(`/${chatId}`);
  };
  return (
    <ChatAppLayout chatHistoryScreen={<ChatHistoryScreen onSelectChat={handleSelectChat} chats={historyChats} />}>
      <NewChatScreen onStartChat={handleStartChat} onNewChatClick={() => router.push('/')} />
    </ChatAppLayout>
  );
}
