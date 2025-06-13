import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import { useSectionStore, Section } from "@/lib/sectionStore";
import { useRouter, usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

interface ChatAppLayoutProps {
  children: ReactNode;
  chatHistoryScreen?: ReactNode;
}

const ChatAppLayout = ({ children, chatHistoryScreen }: ChatAppLayoutProps) => {
  const section = useSectionStore((s) => s.section);
  const setSection = useSectionStore((s) => s.setSection);
  const router = useRouter();
  const pathname = usePathname();
  const [newChatKey, setNewChatKey] = React.useState(0);

  const handleNewChat = () => {
    const newChatId = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    localStorage.removeItem("currentChatId"); // Ensure old chat ID is cleared
    localStorage.removeItem("initialNewChatQuestion"); // Ensure no old initial question interferes
    localStorage.setItem("currentChatId", newChatId); // Set the new current chat ID

    // If on a chat page, move to history first
    if (/^\/[0-9]+$/.test(pathname)) {
      setSection("history");
      router.push("/history");
      setTimeout(() => {
        setSection("home");
        router.push(`/${newChatId}`); // Navigate to the new chat ID
        setNewChatKey(prev => prev + 1); // Increment key to force remount
      }, 100); // Small delay to allow history UI to show
    } else {
      setSection("home");
      router.push(`/${newChatId}`); // Navigate to the new chat ID
      setNewChatKey(prev => prev + 1); // Increment key to force remount
    }
  };

  const handleNewChatClick = () => {
    setSection("home"); // Ensure active section is set to home
    router.push("/");
  };

  return (
    <div className="min-h-screen h-screen bg-background text-foreground flex flex-row overflow-hidden">
      <Sidebar
        activeSection={section}
        onSectionChange={setSection}
        onNewChatClick={handleNewChatClick}
      />
      <div className="flex-1 flex flex-col min-h-0 h-full sm:ml-[75px]">
        {/* This div handles the main content scrolling */}
        <div className="flex-1 overflow-y-auto relative pb-14 sm:pb-0">
          {/* Main content area which will be scrollable internally */}
          <div className="h-full">
            {section === "home" && <div key={newChatKey}>{children}</div>}
            {section === "history" && chatHistoryScreen}
            {section === "discover" && (
              <div className="flex-1 flex items-center justify-center text-2xl text-[#A3A3A3]">
                Discover (Coming Soon)
              </div>
            )}
          </div>
        </div>
        <BottomNav activeSection={section} onSectionChange={setSection} />        
      </div>

      <div className="fixed bottom-0 left-0 right-0 sm:hidden z-30">
      <BottomNav activeSection={section} onSectionChange={setSection} />

      </div>
    </div>
  );
};

export default ChatAppLayout; 