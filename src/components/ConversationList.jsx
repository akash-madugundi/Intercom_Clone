import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Inbox, Star, Edit3, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const conversations = [
  {
    id: 1,
    name: "Elena Rodriguez",
    company: "TechSolutions Inc.",
    lastMessage: "Thanks for the update on the shipment tracking!",
    unread: 2,
    avatarText: "ER",
    avatarColor: "bg-pink-500",
    priority: true,
    tags: ["Support", "Urgent"],
    status: "Online",
    time: "10:32 AM",
  },
  {
    id: 2,
    name: "Marcus Chen",
    company: "Innovate Hub",
    lastMessage: "Can you help with this bug? It crashes the app.",
    unread: 0,
    avatarText: "MC",
    avatarColor: "bg-blue-500",
    tags: ["Bug Report", "High"],
    status: "Offline",
    time: "9:15 AM",
  },
  {
    id: 3,
    name: "Sophie Dubois",
    company: "CreativeMinds LLC",
    lastMessage: "Great, let's proceed with the Enterprise plan.",
    unread: 0,
    avatarText: "SD",
    avatarColor: "bg-green-500",
    tags: ["Sales", "New Lead"],
    status: "Online",
    time: "Yesterday",
  },
  {
    id: 4,
    name: "Liam O'Connell",
    company: "Global Exports",
    lastMessage: "Meeting reminder for tomorrow at 2 PM to discuss Q3.",
    unread: 1,
    avatarText: "LO",
    avatarColor: "bg-purple-500",
    priority: false,
    tags: ["Follow Up"],
    status: "Away",
    time: "2 days ago",
  },
  {
    id: 5,
    name: "Aisha Khan",
    company: "BrightFuture Edu",
    lastMessage: "Inquiring about course details for AI.",
    unread: 0,
    avatarText: "AK",
    avatarColor: "bg-yellow-500",
    tags: ["Inquiry"],
    status: "Online",
    time: "3 days ago",
  },
];

const ConversationItem = ({ conv, selected, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.3,
      delay: conv.id * 0.03,
      type: "spring",
      stiffness: 120,
      damping: 18,
    }}
    onClick={onClick}
    className={`flex items-start p-3.5 hover:bg-secondary dark:hover:bg-slate-700/70 cursor-pointer border-b border-border/70 dark:border-slate-700/70 transition-all duration-200 ease-in-out 
                    ${
                      selected
                        ? "bg-gradient-to-r from-accent to-primary/10 dark:from-slate-700 dark:to-slate-700/50 border-l-4 border-primary dark:border-primary"
                        : "border-l-4 border-transparent"
                    }`}
  >
    <div className="relative mr-3.5 flex-shrink-0">
      <Avatar className="h-11 w-11 shadow-sm">
        <AvatarFallback
          className={`${conv.avatarColor} text-white font-semibold text-sm`}
        >
          {conv.avatarText}
        </AvatarFallback>
      </Avatar>
      {conv.status === "Online" && (
        <span
          className={`absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-400 border-2 
                                                          ${
                                                            selected
                                                              ? "border-primary/10 dark:border-slate-700"
                                                              : "border-background dark:border-slate-800"
                                                          }`}
        />
      )}
    </div>
    <div className="flex-grow min-w-0">
      <div className="flex justify-between items-center mb-0.5">
        <h3
          className={`font-semibold text-sm truncate ${
            selected
              ? "text-primary dark:text-sky-300"
              : "text-foreground dark:text-slate-100"
          }`}
        >
          {conv.name}
        </h3>
        <span
          className={`text-xs ${
            selected
              ? "text-primary/80 dark:text-sky-400"
              : "text-muted-foreground dark:text-slate-400"
          }`}
        >
          {conv.time}
        </span>
      </div>
      <p className="text-xs text-muted-foreground dark:text-slate-400 truncate">
        {conv.company}
      </p>
      <p
        className={`text-sm ${
          selected
            ? "text-foreground/90 dark:text-slate-200"
            : "text-muted-foreground dark:text-slate-300"
        } truncate mt-1`}
      >
        {conv.lastMessage}
      </p>
      <div className="flex items-center mt-2 space-x-1.5">
        {conv.priority && (
          <Star
            className={`h-4 w-4 ${
              selected ? "text-yellow-400" : "text-yellow-400/80"
            }`}
            fill="currentColor"
          />
        )}
        {conv.tags.map((tag) => (
          <Badge
            key={tag}
            variant={selected ? "default" : "secondary"}
            className={`text-xs px-2 py-0.5 rounded-full font-medium
                                  ${
                                    selected
                                      ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary"
                                      : "bg-muted/70 text-muted-foreground dark:bg-slate-600/50 dark:text-slate-300"
                                  }`}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
    {conv.unread > 0 && (
      <div className="ml-2 flex-shrink-0 self-center">
        <Badge
          variant="default"
          className="h-5 w-5 min-w-[1.25rem] flex items-center justify-center text-xs rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
        >
          {conv.unread}
        </Badge>
      </div>
    )}
  </motion.div>
);

const ConversationList = ({ onSelectConversation, selectedConversationId }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState("All Inboxes");
  const filterOptions = [
    "All Inboxes",
    "Unread",
    "Priority Support",
    "Sales Leads",
    "Bug Reports",
  ];

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeFilter === "Unread" && conv.unread === 0) return false;
    if (
      activeFilter === "Priority Support" &&
      (!conv.priority || !conv.tags.includes("Support"))
    )
      return false;
    if (activeFilter === "Sales Leads" && !conv.tags.includes("Sales"))
      return false;
    if (activeFilter === "Bug Reports" && !conv.tags.includes("Bug Report"))
      return false;

    return matchesSearch;
  });

  return (
    <motion.div
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      transition={{ duration: 0.4, ease: "circOut" }}
      className="w-full md:max-w-sm bg-card dark:bg-slate-800/90 border-r border-border dark:border-slate-700/80 flex flex-col h-full shadow-2xl"
    >
      <div className="p-4 border-b border-border dark:border-slate-700/80 sticky top-0 bg-card/80 dark:bg-slate-800/70 backdrop-blur-md z-10">
        <div className="flex items-center justify-between mb-3.5">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="text-xl font-bold text-foreground dark:text-slate-50 p-0 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                {activeFilter}{" "}
                <ChevronDown className="ml-2 h-5 w-5 opacity-60" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-1 bg-card shadow-xl rounded-lg border-border">
              {filterOptions.map((option) => (
                <Button
                  key={option}
                  variant={activeFilter === option ? "secondary" : "ghost"}
                  className="w-full justify-start text-sm font-normal text-foreground hover:bg-accent dark:hover:bg-accent/30"
                  onClick={() => setActiveFilter(option)}
                >
                  {option}
                </Button>
              ))}
            </PopoverContent>
          </Popover>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary dark:hover:text-primary"
          >
            <Edit3 className="h-5 w-5" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
          <Input
            type="text"
            placeholder="Search conversations..."
            className="pl-11 pr-4 py-2.5 bg-background dark:bg-slate-700/60 border-border focus:ring-2 focus:ring-primary dark:focus:ring-primary text-foreground dark:text-slate-100 rounded-lg shadow-sm transition-shadow focus:shadow-md placeholder:text-muted-foreground/80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-grow overflow-y-auto custom-scrollbar">
        <AnimatePresence>
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conv) => (
              <ConversationItem
                key={conv.id}
                conv={conv}
                selected={selectedConversationId === conv.id}
                onClick={() => onSelectConversation(conv)}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 py-10 text-center text-muted-foreground flex flex-col items-center justify-center h-full"
            >
              <Inbox className="h-20 w-20 text-muted-foreground/30 mb-5 opacity-60" />
              <p className="font-semibold text-lg text-foreground/80">
                No conversations found.
              </p>
              <p className="text-sm">
                Try adjusting your search or filter criteria.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ConversationList;
