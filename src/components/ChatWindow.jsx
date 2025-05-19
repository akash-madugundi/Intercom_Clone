import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MessageBubble from "@/components/ChatWindow/MessageBubble";
import ChatHeader from "@/components/ChatWindow/ChatHeader";
import ChatInput from "@/components/ChatWindow/ChatInput";
import TypingIndicator from "@/components/ChatWindow/TypingIndicator";
import MessageActionsPopover from "@/components/ChatWindow/MessageActionsPopover";
import EmptyChatPlaceholder from "@/components/ChatWindow/EmptyChatPlaceholder";

const ChatWindow = ({
  conversation,
  initialTextForComposer,
  onComposerTextChanged,
}) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [aiDraft, setAiDraft] = useState("");
  const messagesEndRef = useRef(null);
  const [selectedMessageForActions, setSelectedMessageForActions] =
    useState(null);

  useEffect(() => {
    if (initialTextForComposer && initialTextForComposer !== inputValue) {
      setInputValue(initialTextForComposer);
      if (onComposerTextChanged) {
        onComposerTextChanged();
      }
    }
  }, [initialTextForComposer, inputValue, onComposerTextChanged]);

  useEffect(() => {
    if (conversation) {
      setMessages([
        {
          id: 1,
          text: "Hello! I'm having an issue with my recent order. The product arrived damaged and I'd like to request a replacement or refund.",
          sender: "user",
          timestamp: "10:30 AM",
          type: "user",
        },
        {
          id: 2,
          text: "Hi Elena, I'm very sorry to hear about the damaged product. I can definitely help you with that. Could you please provide your order number and perhaps a photo of the damage?",
          sender: "agent",
          timestamp: "10:31 AM",
          type: "agent",
        },
        {
          id: 3,
          text: "My order number is #12345XYZ. I'll send a photo shortly.",
          sender: "user",
          timestamp: "10:31 AM",
          type: "user",
        },
      ]);
      setAiDraft("");
      if (!initialTextForComposer) {
        setInputValue("");
      }
    } else {
      setMessages([]);
    }
  }, [conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAgentTyping]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "agent",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "agent",
    };
    setMessages([...messages, newMessage]);
    setInputValue("");
    setAiDraft("");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.endsWith("/suggest")) {
      setInputValue(value.replace("/suggest", ""));
      handleAISuggest();
    } else if (value.endsWith("/summarize")) {
      setInputValue(value.replace("/summarize", ""));
      handleAISummarizeConversation();
    }
  };

  const handleAISuggest = (personalizeOption = null) => {
    setIsAgentTyping(true);
    setAiDraft("");
    setTimeout(() => {
      let suggestion =
        "To resolve this quickly, we can offer a full refund or send a replacement. Which would you prefer?";
      if (personalizeOption) {
        if (personalizeOption === "makeitmorefriendly")
          suggestion = `Hey there! 😊 So sorry about that! ${suggestion} Hope that works for you!`;
        else if (personalizeOption === "makeitmoreformal")
          suggestion = `We understand your concern. ${suggestion} Please let us know your preference.`;
        else if (personalizeOption === "fixgrammar&spelling")
          suggestion = `${suggestion} (Checked for grammar)`;
        else if (personalizeOption === "translatetospanish")
          suggestion = `Para resolver esto rápidamente, podemos ofrecer un reembolso completo o enviar un reemplazo. ¿Cuál preferiría usted?`;
        setAiDraft(
          `Applied: ${personalizeOption.replace(/([A-Z])/g, " $1").trim()}`
        );
      } else {
        setAiDraft(suggestion);
      }
      setInputValue(suggestion);
      setIsAgentTyping(false);
    }, 1500);
  };

  const handleAISummarizeConversation = (messageIdToSummarize) => {
    setIsAgentTyping(true);
    setTimeout(() => {
      const summary =
        "User Elena Rodriguez (Order #12345XYZ) reported a damaged product. Agent is assisting with refund/replacement options. User will provide a photo.";
      const summaryMessage = {
        id: messages.length + 1,
        text: `Conversation summarized ${
          messageIdToSummarize
            ? `up to message ID ${messageIdToSummarize}`
            : "globally"
        }.`,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "summary",
        summaryText: summary,
      };
      setMessages((prev) => [...prev, summaryMessage]);
      setIsAgentTyping(false);
    }, 2000);
  };

  const handleMessageClick = (message) => {
    setSelectedMessageForActions(message);
  };

  if (!conversation) {
    return <EmptyChatPlaceholder />;
  }

  return (
    <motion.div
      key={conversation ? conversation.id : "no-conversation"}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex-1 flex flex-col bg-background dark:bg-slate-900 h-full shadow-xl"
    >
      <ChatHeader conversation={conversation} />

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-2 bg-secondary/30 dark:bg-background/30 custom-scrollbar">
        <AnimatePresence>
          {messages.map((msg) => (
            <MessageActionsPopover
              key={msg.id}
              onSummarize={() => handleAISummarizeConversation(msg.id)}
              onWriteNote={() => console.log("Write note for message:", msg.id)}
              onInsertGif={() => console.log("Insert GIF for message:", msg.id)}
            >
              <div>
                <MessageBubble
                  message={msg}
                  onMessageClick={handleMessageClick}
                />
              </div>
            </MessageActionsPopover>
          ))}
        </AnimatePresence>
        {isAgentTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onSendMessage={handleSendMessage}
        onAISuggest={handleAISuggest}
        onAISummarizeConversation={handleAISummarizeConversation}
        isTyping={isAgentTyping}
        aiDraft={aiDraft}
      />
    </motion.div>
  );
};

export default ChatWindow;
