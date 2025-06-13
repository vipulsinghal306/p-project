# Chat Application

A modern, responsive chat application built with Next.js, TypeScript, and Tailwind CSS. The application features a clean UI, real-time chat functionality, and optimized performance.

## Features

- 💬 Real-time chat interface
- 📱 Responsive design for mobile and desktop
- 🔄 Optimized performance with React.memo and useCallback
- 🎨 Modern UI with Tailwind CSS
- 📝 Chat history management
- 🔍 Search functionality
- 📦 Modular and maintainable code structure

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── [chatId]/          # Dynamic chat route
│   ├── history/           # Chat history page
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── chat/             # Chat-related components
│   │   ├── ChatInput.tsx
│   │   ├── ChatHistoryScreen.tsx
│   │   ├── ChatListScreen.tsx
│   │   ├── NewChatScreen.tsx
│   │   └── SuggestionButton.tsx
│   ├── common/           # Shared components
│   │   └── UserProfile.tsx
│   └── layout/           # Layout components
│       ├── ChatAppLayout.tsx
│       ├── Sidebar.tsx
│       └── BottomNav.tsx
├── constants/            # Application constants
│   └── chat.ts          # Chat-related constants
├── types/               # TypeScript type definitions
│   └── chat.ts         # Chat-related types
└── utils/              # Utility functions
    └── chat.ts         # Chat-related utilities
```

## Component Details

### Chat Components

#### `ChatInput.tsx`
- Memoized input component for chat messages
- Handles message input and submission
- Includes attachment functionality
- Optimized with React.memo and useCallback

#### `ChatHistoryScreen.tsx`
- Displays chat history
- Memoized list items for performance
- Handles chat selection
- Responsive design for mobile and desktop

#### `NewChatScreen.tsx`
- Main chat interface
- Handles new chat creation
- Includes suggestion buttons
- Optimized with component composition

#### `SuggestionButton.tsx`
- Memoized button component for chat suggestions
- Handles suggestion selection
- Optimized rendering

### Layout Components

#### `ChatAppLayout.tsx`
- Main application layout
- Handles responsive navigation
- Manages sidebar and bottom navigation

#### `Sidebar.tsx`
- Desktop navigation sidebar
- Handles section navigation
- User profile display

#### `BottomNav.tsx`
- Mobile navigation bar
- Quick access to main features
- Responsive design

### Common Components

#### `UserProfile.tsx`
- Displays user information
- Handles avatar display
- Responsive design for mobile and desktop

## Type Definitions

### `types/chat.ts`
```typescript
interface ChatPair {
  question: { id: number; text: string; isUser: boolean };
  answer: { id: number; blocks: AnswerBlock[] };
}

interface ChatHistoryItem {
  chatId: string;
  title: string;
  preview: string;
  timestamp: string;
}
```

## Constants

### `constants/chat.ts`
```typescript
export const SUGGESTIONS = [
  "What's the meaning of life?",
  "How do you define love?",
  "What's the meaning of AI?",
];

export const DEFAULT_USER_NAME = "Alice Johnson";
```

## Utilities

### `utils/chat.ts`
```typescript
export const generateChatId = (): string => {
  return `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
};

export const saveChatToLocalStorage = (chatId: string, chatPairs: ChatPair[]): void => {
  localStorage.setItem(`chat_${chatId}`, JSON.stringify(chatPairs));
};
```

## Performance Optimizations

1. **Component Memoization**
   - Used React.memo for pure components
   - Prevents unnecessary re-renders
   - Optimizes list rendering

2. **Callback Optimization**
   - Used useCallback for event handlers
   - Prevents function recreation
   - Optimizes child component updates

3. **Component Composition**
   - Split complex components into smaller ones
   - Better code organization
   - Improved maintainability

4. **Type Safety**
   - Comprehensive TypeScript types
   - Better development experience
   - Reduced runtime errors

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

- Built with Next.js 13+
- TypeScript for type safety
- Tailwind CSS for styling
- React 18+ features
- Optimized for performance

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

