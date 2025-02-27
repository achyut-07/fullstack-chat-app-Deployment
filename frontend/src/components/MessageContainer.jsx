import { useNotification } from "../context/NotificationContext";

const MessageContainer = () => {
  const { showNotification } = useNotification();

  // In your socket message handler or wherever you receive new messages
  useEffect(() => {
    socket.on("newMessage", (data) => {
      // Check if the user is not currently viewing this chat
      if (!isCurrentChat(data.chatId)) {
        showNotification(data.message, data.sender.fullName);
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 md:p-4 border-b border-base-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Chitti Chat
          </h2>
        </div>
        {/* ... other header content ... */}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Messages go here */}
      </div>

      {/* Message Input */}
      <div className="p-3 md:p-4 border-t border-base-300">
        <div className="flex gap-2">
          <input
            type="text"
            className="input input-bordered flex-1 text-sm md:text-base"
            placeholder="Type a message..."
          />
          <button className="btn btn-primary px-4">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}; 