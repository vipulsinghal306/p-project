import React from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

type Section = "home" | "history" | "discover";

const navItems = [
  { icon: "fluent:home-32-regular", label: "Home", section: "home", route: "/" },
  { icon: "mingcute:sandglass-line", label: "History", section: "history", route: "/history" },
  { icon: "fluent:globe-16-regular", label: "Discover", section: "discover", route: "/discover", disabled: true },
];

const BottomNav = ({ activeSection, onSectionChange }: { activeSection: Section; onSectionChange: (section: Section) => void }) => {
  const router = useRouter();
  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-background border-t flex justify-around items-center h-16 sm:hidden z-30">
      {navItems.map(item => (
        <button
          key={item.icon}
          disabled={item.disabled}
          className={`flex flex-col items-center text-xs font-medium transition-colors ${
            activeSection === item.section ? "text-black" : "text-[#A3A3A3]"
          } ${item.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          onClick={() => {
            if (!item.disabled) {
              onSectionChange(item.section as Section);
              router.push(item.route);
            }
          }}
        >
          <Icon icon={item.icon} width={28} height={28} />
          <span className="mt-1">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav; 