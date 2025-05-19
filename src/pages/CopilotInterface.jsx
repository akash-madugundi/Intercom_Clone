import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConversationList from "@/components/ConversationList";
import ChatWindow from "@/components/ChatWindow";
import AICopilotPanel from "@/components/AICopilotPanel";
import {
  PanelLeftClose,
  PanelRightClose,
  Moon,
  Sun,
  Zap,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CopilotInterface = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showConversationList, setShowConversationList] = useState(
    window.innerWidth >= 768
  );
  const [showAICopilotPanel, setShowAICopilotPanel] = useState(
    window.innerWidth >= 1024
  );

  const [aiCopilotQuery, setAiCopilotQuery] = useState("");
  const [aiCopilotResponse, setAiCopilotResponse] = useState(null);
  const [isAiCopilotTyping, setIsAiCopilotTyping] = useState(false);
  const [textToAddToComposer, setTextToAddToComposer] = useState("");

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setAiCopilotResponse(null);
    setTextToAddToComposer("");
    if (window.innerWidth < 768) {
      setShowConversationList(false);
    }
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("darkMode", newMode ? "enabled" : "disabled");
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "enabled") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const handleResize = () => {
      setShowConversationList(window.innerWidth >= 768);
      setShowAICopilotPanel(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleConversationList = () => {
    setShowConversationList(!showConversationList);
  };

  const toggleAICopilotPanel = () => {
    setShowAICopilotPanel(!showAICopilotPanel);
  };

  const handleAICopilotQuery = (query) => {
    setAiCopilotQuery(query);
    setIsAiCopilotTyping(true);
    setAiCopilotResponse(null);
    setTimeout(() => {
      setAiCopilotResponse({
        id: Date.now(),
        text: `This is a highly accurate AI response regarding "${query}". It provides detailed insights and actionable steps. For instance, if you asked about improving customer satisfaction, the AI might suggest personalizing communication, proactively addressing issues, and gathering feedback regularly. It could also offer templates for polite and effective responses.`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      setIsAiCopilotTyping(false);
    }, 2000);
  };

  const addAiResponseToComposer = (text) => {
    setTextToAddToComposer(text);
    setAiCopilotResponse(null);
  };

  const handleComposerTextChanged = () => {
    if (textToAddToComposer) {
      setTextToAddToComposer("");
    }
  };

  return (
    <div
      className={`flex h-screen antialiased text-foreground bg-gradient-to-br from-background via-slate-50 to-accent/20 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900/30 overflow-hidden`}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleConversationList}
        className="md:hidden fixed top-3 left-3 z-50 bg-card/80 dark:bg-slate-700/80 backdrop-blur-md shadow-lg hover:bg-accent dark:hover:bg-slate-600"
        aria-label="Toggle Conversation List"
      >
        {showConversationList ? (
          <PanelLeftClose className="h-5 w-5" />
        ) : (
          <PanelRightClose className="h-5 w-5" />
        )}
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={toggleDarkMode}
        className="fixed top-3 right-3 z-50 bg-card/80 dark:bg-slate-700/80 backdrop-blur-md shadow-lg hover:bg-accent dark:hover:bg-slate-600"
        aria-label="Toggle Dark Mode"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isDarkMode ? "moon" : "sun"}
            initial={{ y: -20, opacity: 0, rotate: -30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-primary" />
            )}
          </motion.div>
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {showConversationList && (
          <motion.div
            key="conversation-list-panel"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed md:static z-40 md:z-auto inset-y-0 left-0 w-full md:w-80 lg:w-96 md:max-w-sm"
          >
            <ConversationList
              onSelectConversation={handleSelectConversation}
              selectedConversationId={selectedConversation?.id}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <ChatWindow
          conversation={selectedConversation}
          initialTextForComposer={textToAddToComposer}
          onComposerTextChanged={handleComposerTextChanged}
        />
      </div>

      <Button
        variant="default"
        size="icon"
        onClick={toggleAICopilotPanel}
        className="lg:hidden fixed bottom-3 right-3 z-50 bg-gradient-to-tr from-purple-400 to-orange-400 text-white shadow-xl p-3 h-12 w-12 rounded-full hover:scale-105 active:scale-95 transition-transform duration-200"
        aria-label="Toggle AI Copilot"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={showAICopilotPanel ? "close-ai" : "open-ai"}
            initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            {showAICopilotPanel ? (
              <X className="h-6 w-6" />
            ) : (
              <Zap className="h-6 w-6" />
            )}
          </motion.div>
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {showAICopilotPanel && (
          <motion.div
            key="ai-copilot-panel"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed md:static z-30 md:z-auto inset-y-0 right-0 w-full md:w-80 lg:w-96 md:max-w-sm h-full"
          >
            <AICopilotPanel
              onQuerySubmit={handleAICopilotQuery}
              aiResponse={aiCopilotResponse}
              isTyping={isAiCopilotTyping}
              addResponseToComposer={addAiResponseToComposer}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CopilotInterface;
