# Intercom AI Copilot UI Clone
This project is a React-based web application that replicates the "AI Copilot for Teams" user interface from Intercom's demo. It's built using Vite, React, TailwindCSS, Framer Motion, and shadcn/ui components.
*   **Live Demo:** [Click Here](https://intercom-clone-self.vercel.app/)

## Project Overview
The application provides a modern, responsive interface designed for customer support or sales agents to collaborate with an AI assistant during live chats.

### Key Features:
*   **Two-Panel Layout**:
    *   **Left Panel**: Displays a list of active conversations. Includes mock filters for priority, tags, unread messages, etc.
    *   **Right Panel**: Shows the currently selected chat window.
*   **Chat Window**:
    *   **Header**: Displays user information (name, company, status) and quick action buttons (placeholders).
    *   **Conversation Stream**: Alternating messages from user, agent, and AI assistant, with distinct styling.
    *   **Input Area**:
        *   Textarea for composing messages.
        *   "AI Suggest Reply" button (simulates AI suggestion).
        *   "Summarize conversation" button (simulates AI summary).
        *   Editable AI-generated drafts (mocked).
        *   Support for slash commands (e.g., `/suggest`, `/summarize`).
*   **Design & UX**:
    *   Clean, modern aesthetic inspired by Intercom.
    *   Soft color palette (blues, grays, whites) with dark mode support.
    *   Smooth transitions and subtle animations using Framer Motion.
    *   Responsive design for desktop and mobile-like viewing.
    *   Placeholder avatars, timestamps, and AI typing indicators for realism.
*   **Dark Mode**: Toggle between light and dark themes.

## Technologies Used
*   **Vite**: Frontend build tool and development server.
*   **React**: JavaScript library for building user interfaces.
*   **TailwindCSS**: Utility-first CSS framework for styling.
*   **shadcn/ui**: Re-usable components built with Radix UI and Tailwind CSS.
    *   Button
    *   Input
    *   Textarea
    *   Avatar
    *   Badge
    *   Toast (for notifications, though not explicitly used in main UI yet)
*   **Lucide React**: Icon library.
*   **Framer Motion**: Animation library for React.
*   **JavaScript (.jsx)**: Primary programming language.

## Getting Started
### Prerequisites
*   Node.js (version 20.x or higher)
*   npm (comes with Node.js)

### Installation & Running
#### Clone the Repository
```bash
git clone <repository-url>
cd Intercom_Clone
```
#### Install dependencies and Run:
```
npm install
npm run dev
```

## Functionality Details
*   **Conversation List**:
    *   Displays a static list of sample conversations.
    *   Includes a search bar to filter conversations by name, company, or message content.
    *   Filter buttons (All, Unread, Priority) provide basic filtering logic (mocked).
    *   Clicking a conversation selects it and displays it in the Chat Window.
*   **Chat Window**:
    *   Shows messages from the selected conversation.
    *   Message input allows typing and sending new messages (agent's perspective).
    *   **AI Features (Simulated)**:
        *   **AI Suggest Reply**: Clicking this button or typing `/suggest` simulates an AI generating a reply suggestion, which then populates the input field.
        *   **Summarize Conversation**: Clicking this button or typing `/summarize` simulates AI generating a summary, which is then posted as an "AI" message in the chat.
        *   **Typing Indicator**: A "typing dots" animation appears when AI is "thinking".
*   **Responsiveness**:
    *   On smaller screens (mobile-like), the conversation list can be toggled open/closed.
    *   When a conversation is selected on mobile, the list hides to give more space to the chat window.
*   **Dark Mode**:
    *   A toggle button allows switching between light and dark themes.
    *   The UI adapts its color scheme accordingly.

## Best Practices Implemented
*   **Component-Based Architecture**: UI is broken down into reusable React components.
*   **Utility-First CSS**: TailwindCSS for efficient and consistent styling.
*   **Absolute Imports**: Using `@/` prefix for cleaner import paths.
*   **Accessibility**: Basic semantic HTML and ARIA attributes are used where appropriate (though full WCAG compliance would require more thorough auditing).
*   **Code Readability**: Code is formatted and structured for clarity.
*   **Animations**: Framer Motion is used for purposeful and smooth UI animations enhancing user experience.

## PFA-
- ![image](https://github.com/user-attachments/assets/7e9dcc98-5358-463c-b087-6bd12954c12c)
- ![image](https://github.com/user-attachments/assets/53ac720b-3b49-4ffc-996c-c617271e48d0)
- ![image](https://github.com/user-attachments/assets/cf1f727b-4d8c-4134-9146-0abaa188445f)
- ![image](https://github.com/user-attachments/assets/cb8de02c-01b6-4144-aa81-4034140016ce)
- ![image](https://github.com/user-attachments/assets/68e0aece-1bed-43d7-986b-9d17456b35de)
- ![image](https://github.com/user-attachments/assets/80a65a8e-5d28-496c-8694-dd2edac8883a)
