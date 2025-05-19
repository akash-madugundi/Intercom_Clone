import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, Video, Info, Maximize, MoreVertical } from "lucide-react";

const ChatHeader = ({ conversation }) => {
  if (!conversation) return null;

  const userStatusColor =
    conversation.status === "Online"
      ? "bg-green-500"
      : conversation.status === "Away"
      ? "bg-yellow-500"
      : "bg-slate-400";

  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-card dark:bg-slate-800/80 sticky top-0 z-20 backdrop-blur-lg">
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-3 shadow-md">
          <AvatarFallback
            className={`${conversation.avatarColor} text-white font-semibold`}
          >
            {conversation.avatarText}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold text-foreground dark:text-slate-100 text-lg">
            {conversation.name}
          </h2>
          <div className="flex items-center text-xs text-muted-foreground dark:text-slate-400">
            <span
              className={`h-2.5 w-2.5 rounded-full mr-1.5 border-2 border-card dark:border-slate-800 ${userStatusColor}`}
            ></span>
            {conversation.status} &middot; {conversation.company}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-primary dark:hover:text-primary"
        >
          <Phone className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-primary dark:hover:text-primary"
        >
          <Video className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-primary dark:hover:text-primary"
        >
          <Info className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-primary dark:hover:text-primary hidden md:inline-flex"
        >
          <Maximize className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-primary dark:hover:text-primary"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
