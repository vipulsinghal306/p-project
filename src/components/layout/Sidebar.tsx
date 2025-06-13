import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

const navItems = [
  { icon: "fluent:home-32-regular", section: "home", route: "/" },
  { icon: "mingcute:sandglass-line", section: "history", route: "/history" },
  { icon: "fluent:globe-16-regular", section: "discover", route: "/discover", disabled: true },
];

type Section = "home" | "history" | "discover";

const Sidebar = ({ activeSection, onSectionChange, onNewChatClick }: { activeSection: Section; onSectionChange: (section: Section) => void; onNewChatClick: () => void }) => {
  const router = useRouter();
  return (
    <aside className="fixed left-0 top-0 bottom-0 hidden sm:flex flex-col items-center w-[75px] h-full bg-[#F4F4F4] border-r border-[#E0E0E0] py-6 z-40 transition-all duration-300">
      <img src="/logo.png" alt="Logo" className="w-10 h-10 mb-2 transition-transform hover:scale-105" />
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="flex flex-col gap-2 items-center w-full">
          {navItems.map((item) => (
            <button
              key={item.icon}
              disabled={item.disabled}
              className={`group flex items-center w-full h-12 px-0 relative focus:outline-none transition-all duration-200 ${
                item.disabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={() => {
                if (!item.disabled) {
                  onSectionChange(item.section as Section);
                  router.push(item.route);
                }
              }}
            >
              {activeSection === item.section && (
                <span className="absolute top-1/2 -translate-y-1/2 h-10 w-1.5 rounded-l-full bg-black z-10 transition-all duration-300" style={{ right: '-18px' }} />
              )}
              <span
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
                  activeSection === item.section
                    ? "text-black scale-110"
                    : item.disabled
                    ? "text-[#A3A3A3] opacity-50"
                    : "text-[#A3A3A3] hover:bg-[#E0E0E0] hover:scale-105"
                }`}
              >
                <Icon icon={item.icon} width={28} height={28} />
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 mb-2">
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E0E0E0] bg-white hover:bg-[#F4F4F4] text-black transition-all duration-200 hover:scale-105 cursor-pointer"
          onClick={onNewChatClick}
          aria-label="New Chat"
        >
          <Icon icon="mdi:plus" width={24} height={24} />
        </button>
        <Avatar className="w-10 h-10 border border-[#E0E0E0] transition-transform hover:scale-105 cursor-pointer">
          <AvatarFallback>S</AvatarFallback>
        </Avatar>
      </div>
    </aside>
  );
};

export default Sidebar; 