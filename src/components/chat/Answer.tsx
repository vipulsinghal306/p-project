import React from "react";
import { Icon } from "@iconify/react";

export type AnswerBlock =
  | { type: "heading"; content: string }
  | { type: "paragraph"; content: string }
  | { type: "bullets"; content: string[] }
  | { type: "subheading"; content: string }
  | { type: "copy"; content?: string };

export const Answer = ({ blocks }: { blocks: AnswerBlock[] }) => {
  const renderBlock = (block: AnswerBlock, i: number) => {
    switch (block.type) {
      case "heading":
        return (
          <h2 key={i} className="text-2xl font-bold text-left mb-2 mt-2">
            {block.content}
          </h2>
        );
      case "subheading":
        return (
          <div key={i} className="font-semibold text-base text-left w-full mt-4 mb-1">
            {block.content}
          </div>
        );
      case "paragraph":
        return (
          <div key={i} className="text-base text-[#171717] text-left w-full mb-2">
            {block.content}
          </div>
        );
      case "bullets":
        return (
          <ul key={i} className="list-disc pl-6 text-base text-[#171717] mb-2 text-left w-full">
            {block.content.map((item, j) => (
              <li key={j} className="mb-1">{item}</li>
            ))}
          </ul>
        );
      case "copy":
        return (
          <div key={i} className="flex justify-between items-center w-full mt-2">
            <button className="flex items-center gap-1 text-[#A3A3A3] text-sm px-3 py-1 rounded hover:bg-[#F4F4F4] border border-[#E5E7EB] cursor-pointer">
              <Icon icon="tabler:copy" width={16} height={16} />
              Copy
            </button>
            <div className="flex gap-2">
              <button className="text-[#A3A3A3] hover:text-[#171717] cursor-pointer">
                <Icon icon="ph:thumbs-up" width={20} height={20} />
              </button>
              <button className="text-[#A3A3A3] hover:text-[#171717] cursor-pointer">
                <Icon icon="ph:thumbs-down" width={20} height={20} />
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col items-start gap-2">
      <div className="flex flex-col items-start gap-2 max-w-3xl w-full px-4">
        {blocks.map(renderBlock)}
      </div>
    </div>
  );
}; 