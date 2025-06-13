"use client";
import React, { useRef, useEffect } from "react";
// import BackButton from "../layout/BackButton"; // Remove BackButton
import UserProfile from "../common/UserProfile";
import MessageInput from "./MessageInput";
import { Answer, AnswerBlock } from "./Answer";
import { Icon } from "@iconify/react"; // Import Icon for logo

export interface ChatPair {
  question: { id: number; text: string; isUser: boolean };
  answer: { id: number; blocks: AnswerBlock[] };
}

const defaultAnswerBlocksForFirstQuestion: AnswerBlock[] = [
  { type: "paragraph", content: "Sentient refers to the ability to experience feelings or sensations. It means being capable of sensing or feeling, conscious of or responsive to the sensations of seeing, hearing, feeling, tasting, or smelling." },
  { type: "heading", content: "Key Points:" },
  { type: "bullets", content: [
    "Sentient beings are able to feel things or sense them.",
    "The term is often used in phrases like \"sentient beings\" and \"sentient creatures,\" emphasizing that things that don't have life don't have feelings.",
    "Sentient is a formal adjective that can be used in different contexts and languages.",
    "The word has its roots in Latin, with the earliest known use dating back to the early 1600s."
  ]},
  { type: "subheading", content: "Examples and Usage:" },
  { type: "bullets", content: [
    "Man is a sentient being.",
    "There was no sign of any sentient life or activity.",
    "Sentient is used nouns like \"being\" to describe entities that possess consciousness or the ability to feel."
  ]},
  { type: "subheading", content: "Related Concepts:" },
  { type: "bullets", content: [
    "Sentience is an important concept in ethics, particularly in utilitarianism, as it forms a basis for determining which entities deserve moral consideration.",
    "In Asian religions, the word \"sentience\" has been used to translate various concepts.",
    "In science fiction, the word \"sentience\" is often used to describe the ability of artificial intelligence or other non-human entities to experience consciousness or emotions."
  ]},
  { type: "copy" }
];

const ChatConversationScreen = ({ chatPairs, onNewChatClick }: { chatPairs?: ChatPair[], onNewChatClick: () => void }) => {
  const [currentChatId, setCurrentChatId] = React.useState<string | null>(null);
  const [pairs, setPairs] = React.useState<ChatPair[]>([]);
  const [isGeneratingAnswer, setIsGeneratingAnswer] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isBrowsing, setIsBrowsing] = React.useState(false);
  const [typingText, setTypingText] = React.useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize pairs based on chatPairs prop and handle first answer animation
  useEffect(() => {
    if (chatPairs) {
      setPairs(chatPairs);
      const storedChatIdFromLS = localStorage.getItem("currentChatId");
      if (storedChatIdFromLS) {
        setCurrentChatId(storedChatIdFromLS);
      }

      // If it's the very first question of a new chat and the answer is empty, trigger animation
      if (chatPairs.length === 1 && chatPairs[0].answer.blocks.length === 0) {
        setIsGeneratingAnswer(true);
        setIsSearching(true);
        setTypingText(null); // Clear any previous typing text

        setTimeout(() => {
          setIsSearching(false);
          setIsBrowsing(true);

          setTimeout(() => {
            setIsBrowsing(false);
            const fullAnswerContent = defaultAnswerBlocksForFirstQuestion;
            const wordsToType: string[] = [];
            fullAnswerContent.forEach(block => {
              switch (block.type) {
                case "paragraph":
                case "heading":
                case "subheading":
                  wordsToType.push(...(block.content as string).split(" "));
                  break;
                case "bullets":
                  block.content.forEach(item => wordsToType.push(...item.split(" ")));
                  break;
                case "copy": // Copy block doesn't contribute to typing text
                  break;
                default:
                  // Fallback for any unhandled block types, though ideally AnswerBlock covers all cases
                  break;
              }
            });
            
            let currentTypedText = "";
            let wordIndex = 0;

            const typingInterval = setInterval(() => {
              if (wordIndex < wordsToType.length) {
                currentTypedText += (wordIndex > 0 ? " " : "") + wordsToType[wordIndex];
                setTypingText(currentTypedText);
                wordIndex++;
              } else {
                clearInterval(typingInterval);
                setIsGeneratingAnswer(false);
                setTypingText(null); // Clear typing text once full answer is set

                // Update the actual pairs state with the full answer
                setPairs(prev => prev.map((pair, index) => 
                  index === prev.length - 1 ? { ...pair, answer: { id: chatPairs[0].answer.id, blocks: defaultAnswerBlocksForFirstQuestion } } : pair
                ));
              }
            }, 50); // Adjust typing speed here (milliseconds per word)
          }, 1000); // 1 second for browsing
        }, 1000); // 1 second for searching
      }
      else if (chatPairs && chatPairs.length === 0) {
        setPairs([]);
      }
    } else {
      setPairs([]);
    }
  }, [chatPairs]);

  // Save chat to local storage whenever pairs change
  useEffect(() => {
    if (currentChatId && pairs.length > 0) {
      localStorage.setItem(`chat_${currentChatId}`, JSON.stringify(pairs));
    }
  }, [pairs, currentChatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [pairs.length]);

  const handleSend = (msg: string) => {
    if (!msg.trim()) return;
    setIsGeneratingAnswer(true);
    setIsSearching(true);
    setTypingText(null); // Clear typing text for new answer

    const newQuestion: ChatPair["question"] = {
      id: pairs.length + 1,
      text: msg,
      isUser: true,
    };

    // If it's the first message in a truly new (empty) chat, generate a currentChatId
    let tempChatId = currentChatId;
    if (!currentChatId) {
        tempChatId = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        setCurrentChatId(tempChatId);
        localStorage.setItem("currentChatId", tempChatId);
    }

    const updatedPairs = [...pairs, { question: newQuestion, answer: { id: 0, blocks: [] } }];
    setPairs(updatedPairs); // Add user question immediately

    // Simulate API call for answer generation
    setTimeout(() => {
      setIsSearching(false);
      setIsBrowsing(true);

      setTimeout(() => {
        setIsBrowsing(false);
        // Full answer content for follow-up questions
        const fullAnswerContent = `This is a dummy answer for: "${msg}". In a real application, this would be replaced with an actual API call to get the response.`;
        const words = fullAnswerContent.split(" ");
        let currentTypedText = "";
        let wordIndex = 0;

        const typingInterval = setInterval(() => {
          if (wordIndex < words.length) {
            currentTypedText += (wordIndex > 0 ? " " : "") + words[wordIndex];
            setTypingText(currentTypedText);
            wordIndex++;
          } else {
            clearInterval(typingInterval);
            setIsGeneratingAnswer(false);
            // Once typing is complete, update the actual pairs state
            const newAnswer: ChatPair["answer"] = {
              id: updatedPairs.length + 1,
              blocks: [
                { type: "paragraph", content: fullAnswerContent },
                { type: "copy" }
              ]
            };
            setPairs(prev => prev.map((pair, index) => 
              index === prev.length - 1 ? { ...pair, answer: newAnswer } : pair
            ));
            setTypingText(null); // Clear typing text once full answer is set
          }
        }, 50); // Adjust typing speed here (milliseconds per word)
      }, 1000); // 1 second for browsing
    }, 1000); // 1 second for searching
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen w-full">
      {/* Header */}
      <header className="sticky top-0 bg-background z-10 flex items-center justify-between px-4 py-3 border-b sm:px-8 sm:py-4 sm:hidden">
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E0E0E0] bg-white hover:bg-[#F4F4F4] text-black transition-all duration-200 hover:scale-105 cursor-pointer"
          onClick={onNewChatClick}
          aria-label="New Chat"
        >
          <Icon icon="mdi:plus" width={24} height={24} />
        </button>
        <UserProfile name="Alice Johnson" hideNameOnMobile={true} />
      </header>
      {/* Messages */}
      <main className="flex-1 flex flex-col gap-12 px-2 py-8 sm:px-8 max-w-4xl w-full mx-auto pb-36 sm:pb-10 overflow-y-auto items-center justify-center">
        {pairs.map((pair, idx) => (
          <div key={pair.question.id} className="flex flex-col gap-8 items-center">
            {/* User question as card, center-aligned */}
            <div className="flex justify-start w-full">
              <div className="border border-[#E5E7EB] bg-white rounded-2xl px-8 py-5 max-w-2xl w-full text-lg font-medium">
                {pair.question.text}
              </div>
            </div>
            {/* System answer, center-aligned, no border */}
            {pair.answer.blocks.length > 0 && <Answer blocks={pair.answer.blocks} />}
          </div>
        ))}
        {(isSearching || isBrowsing || typingText !== null) && (
          <div className="flex flex-col gap-8 items-start w-full">
            <div className="flex justify-start w-full">
              <div className="bg-white rounded-2xl px-8 py-5 max-w-2xl w-full text-lg font-medium animate-pulse">
                {/* Placeholder for animated content */}
                {isSearching && (
                  <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Logo" className="w-6 h-6 animate-spin" />
                    <span>Searching for "{pairs[pairs.length -1]?.question.text}"...</span>
                  </div>
                )}
                {isBrowsing && (
                  <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Logo" className="w-6 h-6 animate-spin" />
                    <span>Browsing the web...</span>
                  </div>
                )}
                {typingText !== null && (
                  <div className="flex items-start gap-2">
                    {/* No logo for typing text, as it's part of the answer flow */}
                    <span>{typingText}<span className="animate-pulse">|</span></span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>
      {/* Message Input - sticky at bottom */}
      <div className="w-full flex justify-center bg-background pb-20 sm:pb-6 z-20 fixed bottom-0 left-0 right-0">
        <div className="w-full max-w-3xl px-4">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-md p-2">
            <MessageInput onSend={handleSend} isGeneratingAnswer={isGeneratingAnswer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatConversationScreen; 