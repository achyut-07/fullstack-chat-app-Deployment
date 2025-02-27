import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";
import { formatMessageTime } from "../lib/utils";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";

const FloatingElement = ({ emoji, initialX }) => (
  <motion.div
    initial={{ x: initialX, y: "100vh", opacity: 0 }}
    animate={{
      y: "-20vh",
      opacity: [0, 1, 0],
      rotate: [0, 360],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "linear",
      delay: Math.random() * 5,
    }}
    className="absolute text-3xl pointer-events-none select-none z-0"
    style={{ left: initialX }}
  >
    {emoji}
  </motion.div>
);

const ChatContainer = () => {
  const { theme } = useThemeStore();
  const { messages, isMessagesLoading, selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  const floatingElements = [
    { emoji: "🍂", initialX: "10%" },
    { emoji: "🍁", initialX: "30%" },
    { emoji: "✨", initialX: "50%" },
    { emoji: "💫", initialX: "70%" },
    { emoji: "🌸", initialX: "90%" },
    { emoji: "🍃", initialX: "20%" },
    { emoji: "⭐", initialX: "40%" },
    { emoji: "🌟", initialX: "60%" },
    { emoji: "🍂", initialX: "80%" },
    { emoji: "✨", initialX: "95%" },
  ];

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) return <MessageSkeleton />;

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.2 }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    exit: { 
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 }
    },
    hover: { 
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col h-full relative z-10"
      >
        <ChatHeader />
        
        <div className="absolute inset-0 z-20 pointer-events-none">
          {floatingElements.map((element, index) => (
            <FloatingElement
              key={index}
              emoji={element.emoji}
              initialX={element.initialX}
            />
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-100/90 backdrop-blur-sm z-30">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => {
              const isSentByMe = message.senderId === authUser._id;

              return (
                <motion.div
                  key={message._id}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover="hover"
                  className={`chat ${isSentByMe ? "chat-end" : "chat-start"}`}
                >
                  <div className="chat-image avatar">
                    <motion.div 
                      className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <img
                        src={
                          isSentByMe
                            ? authUser.profilePic || "/avatar.png"
                            : selectedUser.profilePic || "/avatar.png"
                        }
                        alt="avatar"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    className={`chat-bubble ${
                      isSentByMe ? "bg-primary text-primary-content" : ""
                    }`}
                    whileHover={{ scale: 1.01 }}
                    layout
                  >
                    {message.text}
                    {message.image && (
                      <motion.img
                        src={message.image}
                        alt="message image"
                        className="max-w-xs rounded-lg mt-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      />
                    )}
                  </motion.div>

                  <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
                    {formatMessageTime(message.createdAt)}
                    {isSentByMe && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-primary"
                      >
                        ✓
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
        <MessageInput />
      </motion.div>
    </div>
  );
};

export default ChatContainer;
