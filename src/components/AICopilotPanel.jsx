import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sparkles,
  Send,
  CornerDownLeft,
  Brain,
  MessageSquareDashed,
} from "lucide-react";

const TypingIndicator = () => (
  <motion.div
    className="flex items-center space-x-1.5 p-2 self-start my-2"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
  >
    <motion.div
      className="h-2.5 w-2.5 bg-muted-foreground/60 rounded-full"
      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="h-2.5 w-2.5 bg-muted-foreground/60 rounded-full"
      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
      transition={{
        duration: 0.9,
        repeat: Infinity,
        delay: 0.25,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="h-2.5 w-2.5 bg-muted-foreground/60 rounded-full"
      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
      transition={{
        duration: 0.9,
        repeat: Infinity,
        delay: 0.5,
        ease: "easeInOut",
      }}
    />
  </motion.div>
);

const AICopilotPanel = ({
  onQuerySubmit,
  aiResponse,
  isTyping,
  addResponseToComposer,
}) => {
  const [copilotInput, setCopilotInput] = useState("");
  const [conversationHistory, setConversationHistory] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (
      aiResponse &&
      (!conversationHistory.length ||
        conversationHistory[conversationHistory.length - 1]?.id !==
          aiResponse.id)
    ) {
      setConversationHistory((prev) => [
        ...prev,
        { ...aiResponse, sender: "ai" },
      ]);
    }
  }, [aiResponse, conversationHistory]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationHistory, isTyping]);

  const handleCopilotSubmit = (e) => {
    e.preventDefault();
    if (copilotInput.trim() === "") return;
    const userMessage = {
      id: Date.now(),
      text: copilotInput,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setConversationHistory((prev) => [...prev, userMessage]);
    onQuerySubmit(copilotInput);
    setCopilotInput("");
  };

  const quickPrompts = [
    "Explain quantum computing",
    "Draft a polite decline",
    "Summarize this article URL",
    "Translate 'Hello World' to Japanese",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "circOut" }}
      className="flex flex-col h-full bg-card dark:bg-slate-800/90 border-l border-border dark:border-slate-700/80 shadow-2xl"
    >
      <div className="p-4 border-b border-border dark:border-slate-700/80 flex items-center space-x-3 bg-gradient-to-r from-card to-secondary/30 dark:from-slate-800 dark:to-slate-700/50 sticky top-0 z-10 backdrop-blur-md">
        <Sparkles className="h-6 w-6 text-orange-400 dark:text-orange-300" />
        <h2 className="text-lg font-semibold text-foreground dark:text-slate-100">
          AI Copilot
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        <AnimatePresence>
          {conversationHistory.length === 0 && !isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-muted-foreground mt-8 flex flex-col items-center px-2"
            >
              <MessageSquareDashed className="h-16 w-16 opacity-40 mb-4" />
              <p className="font-medium text-lg mb-1 text-foreground/90 dark:text-slate-200">
                Ask me anything!
              </p>
              <p className="text-sm">
                I can help you draft replies, explain concepts, or summarize
                text.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
                {quickPrompts.map((prompt) => (
                  <Button
                    key={prompt}
                    variant="outline"
                    size="sm"
                    className="text-xs text-left justify-start h-auto py-2 border-border hover:bg-accent dark:hover:bg-accent/30 hover:border-primary/50 text-foreground"
                    onClick={() => {
                      const userMessage = {
                        id: Date.now(),
                        text: prompt,
                        sender: "user",
                        timestamp: new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        }),
                      };
                      setConversationHistory((prev) => [...prev, userMessage]);
                      onQuerySubmit(prompt);
                      setCopilotInput("");
                    }}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
          {conversationHistory.map((msg) => (
            <motion.div
              layout
              key={msg.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`p-3.5 rounded-2xl shadow-md max-w-xs md:max-w-sm text-sm
                    ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-gradient-to-br from-orange-300 via-pink-300 to-purple-300 text-slate-800 rounded-bl-none relative"
                    }`}
              >
                {msg.sender === "ai" && (
                  <Sparkles className="h-4.5 w-4.5 absolute -left-2 -top-2 text-purple-500 bg-pink-200 rounded-full p-0.5 shadow-lg" />
                )}
                <p className="leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </p>
                <span
                  className={`text-xs mt-2 block opacity-70 ${
                    msg.sender === "user" ? "text-indigo-100" : "text-slate-700"
                  }`}
                >
                  {msg.timestamp}
                </span>
                {msg.sender === "ai" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addResponseToComposer(msg.text)}
                    className="mt-3 w-full bg-white/40 hover:bg-white/60 text-slate-700 border-slate-400/50 backdrop-blur-sm transition-all duration-200 hover:shadow-lg focus:ring-slate-500/50"
                  >
                    <CornerDownLeft className="h-4 w-4 mr-2" /> Add to Composer
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && <TypingIndicator />}
        <div ref={chatEndRef} />
      </div>

      <form
        onSubmit={handleCopilotSubmit}
        className="p-3 border-t border-border dark:border-slate-700/80 bg-card/80 dark:bg-slate-800/70 sticky bottom-0 backdrop-blur-md"
      >
        <div className="flex items-start space-x-2.5">
          <Textarea
            placeholder="Ask Fin Copilot..."
            value={copilotInput}
            onChange={(e) => setCopilotInput(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" &&
              !e.shiftKey &&
              (e.preventDefault(), handleCopilotSubmit(e))
            }
            className="flex-1 resize-none bg-background dark:bg-slate-700/50 dark:text-slate-50 focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-300 border-input shadow-sm rounded-lg text-sm placeholder:text-muted-foreground/80"
            rows={Math.max(1, Math.min(copilotInput.split("\n").length, 4))}
          />
          <Button
            type="submit"
            size="icon"
            className="h-auto aspect-square p-2.5 bg-gradient-to-br from-orange-400 to-red-400 hover:from-orange-400/90 hover:to-red-400/90 text-white shadow-lg hover:shadow-orange-400/30 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
            disabled={isTyping}
          >
            <Send className="h-4.5 w-4.5" />
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AICopilotPanel;
