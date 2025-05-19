import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const EmptyChatPlaceholder = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="flex-1 flex flex-col items-center justify-center h-full bg-gradient-to-br from-background via-slate-50 to-accent/30 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800/50 p-6 text-center"
  >
    <MessageCircle className="h-28 w-28 text-slate-300 dark:text-slate-600 mb-8 opacity-60" />
    <h1 className="text-3xl font-bold text-foreground/80 dark:text-slate-200">
      Welcome to Your Inbox
    </h1>
    <p className="text-muted-foreground dark:text-slate-400 mt-3 text-lg max-w-md">
      Select a conversation from the list to start chatting, or use the AI
      Copilot on the right for assistance.
    </p>
  </motion.div>
);

export default EmptyChatPlaceholder;
