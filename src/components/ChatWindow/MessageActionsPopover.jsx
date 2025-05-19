import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FileText, Edit, Gift } from "lucide-react";

const MessageActionsPopover = ({
  onSummarize,
  onWriteNote,
  onInsertGif,
  children,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-56 p-2 bg-card dark:bg-slate-800 shadow-xl rounded-xl border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-sm mb-1 text-foreground hover:bg-accent dark:hover:bg-accent/30"
          onClick={onSummarize}
        >
          <FileText className="mr-2 h-4 w-4 text-primary" /> Summarize
          conversation
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-sm mb-1 text-foreground hover:bg-accent dark:hover:bg-accent/30"
          onClick={onWriteNote}
        >
          <Edit className="mr-2 h-4 w-4 text-green-500" /> Write a note
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-sm text-foreground hover:bg-accent dark:hover:bg-accent/30"
          onClick={onInsertGif}
        >
          <Gift className="mr-2 h-4 w-4 text-orange-500" /> Insert GIF
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default MessageActionsPopover;
