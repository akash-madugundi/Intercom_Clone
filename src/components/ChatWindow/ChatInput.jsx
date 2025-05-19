import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Send,
  Zap,
  Paperclip,
  Smile,
  Mic,
  Sparkles,
  Bold,
  Italic,
  Underline,
  Wand2,
  ChevronDown,
} from "lucide-react";

const ChatInput = ({
  inputValue,
  onInputChange,
  onSendMessage,
  onAISuggest,
  onAISummarizeConversation,
  isTyping,
  aiDraft,
}) => {
  const [composerFormatting, setComposerFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
  });
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.fontWeight = composerFormatting.bold
        ? "bold"
        : "normal";
      textareaRef.current.style.fontStyle = composerFormatting.italic
        ? "italic"
        : "normal";
      textareaRef.current.style.textDecoration = composerFormatting.underline
        ? "underline"
        : "none";
    }
  }, [composerFormatting]);

  const handleFormatComposer = (format) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = inputValue.substring(start, end);
    const before = inputValue.substring(0, start);
    const after = inputValue.substring(end);

    let prefix = "";
    let suffix = "";
    let newFormattedState = { ...composerFormatting };

    switch (format) {
      case "bold":
        newFormattedState.bold = !composerFormatting.bold;
        break;
      case "italic":
        newFormattedState.italic = !composerFormatting.italic;
        break;
      case "underline":
        newFormattedState.underline = !composerFormatting.underline;
        break;
      default:
        return;
    }

    let newText;
    let newCursorPos;

    if (selectedText) {
      newText = `${before}${prefix}${selectedText}${suffix}${after}`;
      newCursorPos =
        start + prefix.length + selectedText.length + suffix.length;
    } else {
      newText = `${before}${prefix}${suffix}${after}`;
      newCursorPos = start + prefix.length;
    }

    onInputChange({ target: { value: newText } });
    setComposerFormatting(newFormattedState);

    textarea.focus();
    setTimeout(() => {
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleQuickPersonalize = (option) => {
    onAISuggest(option);
  };

  return (
    <div className="border-t border-border p-4 bg-card/80 dark:bg-slate-800/70 backdrop-blur-sm">
      {aiDraft && !isTyping && (
        <motion.div
          initial={{ opacity: 0, height: 0, marginBottom: 0 }}
          animate={{ opacity: 1, height: "auto", marginBottom: "0.75rem" }}
          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
          className="p-3 bg-accent dark:bg-accent/20 border border-primary/30 dark:border-primary/40 rounded-lg text-sm text-accent-foreground dark:text-indigo-300 flex items-start shadow-sm"
        >
          <Sparkles className="h-5 w-5 mr-2.5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-primary dark:text-indigo-200">
              AI Suggestion:
            </p>
            <p>{aiDraft}</p>
          </div>
        </motion.div>
      )}
      <div className="flex items-center space-x-2 mb-2.5 flex-wrap gap-y-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-muted-foreground hover:text-primary dark:hover:text-primary border-border hover:border-primary/50"
            >
              <Wand2 className="h-4 w-4 mr-1.5 text-purple-500" /> Quickly
              Personalize{" "}
              <ChevronDown className="h-3.5 w-3.5 ml-1 opacity-70" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60 p-1 bg-card shadow-xl border-border">
            {[
              "My Tone of Voice",
              "Make it More Friendly",
              "Make it More Formal",
              "Fix Grammar & Spelling",
              "Translate to Spanish",
            ].map((opt) => (
              <Button
                key={opt}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs font-normal text-foreground hover:bg-accent dark:hover:bg-accent/30"
                onClick={() =>
                  handleQuickPersonalize(
                    opt.toLowerCase().replace(/ & /g, "").replace(/ /g, "")
                  )
                }
              >
                {opt}
              </Button>
            ))}
          </PopoverContent>
        </Popover>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleFormatComposer("bold")}
            className={`text-muted-foreground hover:text-primary dark:hover:text-primary h-8 w-8 ${
              composerFormatting.bold
                ? "bg-accent dark:bg-accent/30 text-primary"
                : ""
            }`}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleFormatComposer("italic")}
            className={`text-muted-foreground hover:text-primary dark:hover:text-primary h-8 w-8 ${
              composerFormatting.italic
                ? "bg-accent dark:bg-accent/30 text-primary"
                : ""
            }`}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleFormatComposer("underline")}
            className={`text-muted-foreground hover:text-primary dark:hover:text-primary h-8 w-8 ${
              composerFormatting.underline
                ? "bg-accent dark:bg-accent/30 text-primary"
                : ""
            }`}
          >
            <Underline className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <Textarea
          id="chat-window-textarea"
          ref={textareaRef}
          placeholder="Type your message or use / for AI commands..."
          value={inputValue}
          onChange={onInputChange}
          onKeyPress={(e) =>
            e.key === "Enter" &&
            !e.shiftKey &&
            (e.preventDefault(), onSendMessage())
          }
          className="flex-1 resize-none bg-background dark:bg-slate-700/50 dark:text-slate-50 focus:ring-2 focus:ring-primary dark:focus:ring-primary border-input shadow-sm rounded-lg text-sm"
          rows={Math.max(2, Math.min(inputValue.split("\n").length, 5))}
        />
        <Button
          onClick={onSendMessage}
          size="lg"
          className="h-auto aspect-square p-3 bg-gradient-to-br from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-500 text-white shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-primary focus:ring-offset-2"
          disabled={isTyping}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex items-center justify-between mt-3 flex-wrap gap-y-2">
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAISuggest()}
            disabled={isTyping}
            className="text-muted-foreground hover:text-primary dark:hover:text-primary"
          >
            <Zap className="h-4 w-4 mr-1.5" /> AI Suggest
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAISummarizeConversation()}
            disabled={isTyping}
            className="text-muted-foreground hover:text-primary dark:hover:text-primary"
          >
            <Sparkles className="h-4 w-4 mr-1.5" /> Summarize Chat
          </Button>
        </div>
        <div className="flex items-center space-x-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary dark:hover:text-primary h-9 w-9"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary dark:hover:text-primary h-9 w-9"
          >
            <Smile className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary dark:hover:text-primary h-9 w-9"
          >
            <Mic className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
