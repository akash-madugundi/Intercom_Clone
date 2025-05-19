import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sparkles, Wand2 } from "lucide-react";

const MessageBubble = ({ message, onMessageClick }) => {
  const isUser = message.type === "user";
  const isAgent = message.type === "agent";
  const isAI = message.type === "ai" || message.type === "summary";

  const bubbleClass = isUser
    ? "bg-gradient-to-br from-primary to-indigo-600 text-primary-foreground self-end rounded-l-2xl rounded-tr-2xl shadow-lg"
    : isAgent
    ? "bg-card dark:bg-slate-700 text-foreground dark:text-slate-100 self-start rounded-r-2xl rounded-tl-2xl shadow-md border border-border/50"
    : "bg-gradient-to-br from-orange-300 via-pink-300 to-purple-300 text-slate-800 self-start rounded-r-2xl rounded-tl-2xl shadow-lg relative pl-10";

  const avatarText = isUser
    ? message.sender?.charAt(0).toUpperCase() || "U"
    : isAgent
    ? message.sender?.charAt(0).toUpperCase() || "A"
    : "AI";
  const avatarColor = isUser
    ? "bg-slate-400 dark:bg-slate-500"
    : isAgent
    ? "bg-primary/80 dark:bg-primary"
    : "bg-purple-400";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.35,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className={`flex items-end mb-5 max-w-lg xl:max-w-xl ${
        isUser ? "justify-end ml-auto" : "justify-start mr-auto"
      } w-full group cursor-pointer`}
      onClick={() => onMessageClick(message)}
    >
      {!isUser && (
        <Avatar className="h-9 w-9 mr-2.5 flex-shrink-0 self-start mt-1 shadow-sm">
          <AvatarFallback
            className={`${avatarColor} text-white text-xs font-medium`}
          >
            {avatarText}
          </AvatarFallback>
        </Avatar>
      )}
      <div className={`p-4 ${bubbleClass} text-sm`}>
        {isAI && !isUser && !isAgent && (
          <Sparkles className="h-5 w-5 absolute left-2.5 top-3 text-purple-500" />
        )}
        <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>
        <span
          className={`text-xs mt-2 block opacity-60 ${
            isUser
              ? "text-indigo-100"
              : isAgent
              ? "text-muted-foreground dark:text-slate-400"
              : isAI
              ? "text-slate-700"
              : "text-purple-100"
          }`}
        >
          {message.timestamp}
        </span>
        {message.type === "summary" && (
          <div className="mt-2.5 p-2.5 bg-yellow-50 dark:bg-yellow-600/20 border border-yellow-300 dark:border-yellow-500/30 rounded-lg text-yellow-700 dark:text-yellow-200 text-xs">
            <p className="font-semibold mb-0.5">Conversation Summary:</p>
            <p className="italic">{message.summaryText}</p>
          </div>
        )}
        {message.type === "aiCopilotReply" && (
          <Button
            variant="outline"
            size="sm"
            className="mt-2.5 text-xs bg-white/30 hover:bg-white/50 text-slate-700 border-slate-400/50 backdrop-blur-sm transition-all"
          >
            Ask Fin Copilot <Wand2 className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        )}
      </div>
      {isUser && (
        <Avatar className="h-9 w-9 ml-2.5 flex-shrink-0 self-start mt-1 shadow-sm">
          <AvatarFallback
            className={`${avatarColor} text-white text-xs font-medium`}
          >
            {avatarText}
          </AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  );
};

export default MessageBubble;
