import React from "react";
import { motion } from "framer-motion";

const TypingIndicator = () => (
  <motion.div
    className="flex items-center space-x-1.5 p-2 self-start my-2"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.3 }}
  >
    <motion.div
      className="h-2.5 w-2.5 bg-muted-foreground/70 rounded-full"
      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="h-2.5 w-2.5 bg-muted-foreground/70 rounded-full"
      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
      transition={{
        duration: 0.9,
        repeat: Infinity,
        delay: 0.25,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="h-2.5 w-2.5 bg-muted-foreground/70 rounded-full"
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

export default TypingIndicator;
