import React from "react";
import UserProfile from "../common/UserProfile";
import { Card } from "../ui/card";

const chats = [
  {
    id: 1,
    name: "Alice Johnson",
    avatarUrl: undefined,
    lastMessage: "What is Sentient?",
    lastMessageTime: "9:41",
  },
  {
    id: 2,
    name: "Bob Smith",
    avatarUrl: undefined,
    lastMessage: "How do you define love?",
    lastMessageTime: "8:30",
  },
];

const ChatListScreen = () => {
  return (
    <main className="flex-1 flex flex-col gap-2 px-2 py-4 sm:px-8 sm:py-8 max-w-2xl w-full mx-auto">
      {chats.map(chat => (
        <Card
          key={chat.id}
          className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-muted transition-colors"
        >
          <div className="flex items-center gap-4">
            <UserProfile name={chat.name} avatarUrl={chat.avatarUrl} />
            <div className="flex flex-col ml-2">
              <span className="font-medium text-base leading-tight">{chat.name}</span>
              <span className="text-xs text-muted-foreground truncate max-w-[120px] sm:max-w-xs">{chat.lastMessage}</span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">{chat.lastMessageTime}</span>
        </Card>
      ))}
    </main>
  );
};

export default ChatListScreen; 