"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import ChatAppLayout from "@/components/layout/ChatAppLayout";
import ChatConversationScreen, { ChatPair } from "@/components/chat/ChatConversationScreen";
import ChatHistoryScreen from "@/components/chat/ChatHistoryScreen";
import { useSectionStore } from "@/lib/sectionStore";

interface ChatHistoryItem {
  chatId: string;
  title: string;
  preview: string;
  timestamp: string;
}

export default function ChatPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const setSection = useSectionStore((s) => s.setSection);
  const chatId = params?.chatId as string;
  const [chatPairs, setChatPairs] = useState<ChatPair[]>([]);
  const [historyChats, setHistoryChats] = useState<ChatHistoryItem[]>([]);

  useEffect(() => {
    setSection("home");
    const initialQuestionFromUrl = searchParams.get("initialQuestion");

    let loadedSuccessfully = false;
    if (chatId) {
      localStorage.setItem("currentChatId", chatId); // Always set currentChatId when entering a chat page
      const storedChat = localStorage.getItem(`chat_${chatId}`);
      if (storedChat) {
        try {
          const parsedChat = JSON.parse(storedChat);
          setChatPairs(parsedChat);
          loadedSuccessfully = true;
        } catch (e) {
          console.error("Error parsing chat data from localStorage for chatId:", chatId, e);
        }
      }
    }

    if (!loadedSuccessfully && initialQuestionFromUrl) {
      // If no stored chat data but an initial question from URL, create the first chat pair
      const initialPair: ChatPair = {
        question: { id: 1, text: decodeURIComponent(initialQuestionFromUrl), isUser: true },
        answer: { id: 0, blocks: [] }, // Answer is initially empty for animation
      };
      setChatPairs([initialPair]);
      localStorage.setItem(`chat_${chatId}`, JSON.stringify([initialPair])); // Save this initial chat
      loadedSuccessfully = true;
    }

    // If still not loaded, it means it's a brand new chat initiated from sidebar or direct URL without initial question
    if (!loadedSuccessfully) {
      setChatPairs([]); // Start with an empty chat
      // Ensure an empty chat entry exists in localStorage so ChatConversationScreen can append to it
      localStorage.setItem(`chat_${chatId}`, JSON.stringify([])); 
    }

    const loadedChats: ChatHistoryItem[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("chat_")) {
        const currentChatIdFromStorage = key.replace("chat_", "");
        try {
          const chatData: ChatPair[] = JSON.parse(localStorage.getItem(key) || "[]");
          if (chatData.length > 0) {
            const firstQuestion = chatData[0].question.text;
            const firstAnswerBlock = chatData[0].answer.blocks.find(block => block.type === "paragraph");
            const preview = firstAnswerBlock ? firstAnswerBlock.content : "No answer yet...";
            
            const timestampPart = currentChatIdFromStorage.split("_")[0];
            const date = new Date(parseInt(timestampPart));
            const formattedTimestamp = isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString();

            loadedChats.push({
              chatId: currentChatIdFromStorage,
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

  }, [chatId, setSection, searchParams]); // Add searchParams to dependencies

  const handleSelectChat = (selectedChatId: string) => {
    setSection("home");
    // Using router.push will trigger a re-render and re-fetch of data for the new chatId
    window.location.href = `/${selectedChatId}`;
  };

  const handleNewChatClick = () => {
    setSection("home"); // Ensure active section is set to home
    window.location.href = "/"; // Navigate to the root for a new chat
  };

  return (
    <ChatAppLayout chatHistoryScreen={<ChatHistoryScreen onSelectChat={handleSelectChat} chats={historyChats} />}>
      <ChatConversationScreen chatPairs={chatPairs} onNewChatClick={handleNewChatClick} />
    </ChatAppLayout>
  );
}
