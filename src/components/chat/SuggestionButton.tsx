import React, { memo } from 'react';

interface SuggestionButtonProps {
  suggestion: string;
  onClick: (suggestion: string) => void;
}

const SuggestionButton = memo(({ suggestion, onClick }: SuggestionButtonProps) => {
  return (
    <button
      className="flex flex-1 justify-center flex-wrap border-1 border-[#E5E5E5] bg-[#F4F4F4] rounded-md px-4 py-3 text-md text-[#808080] font-medium hover:bg-[#E0E0E0] transition w-auto max-w-xs min-w-3xs whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer"
      onClick={() => onClick(suggestion)}
    >
      {suggestion}
    </button>
  );
});

SuggestionButton.displayName = 'SuggestionButton';

export default SuggestionButton; 