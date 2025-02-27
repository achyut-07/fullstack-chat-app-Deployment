import { createContext, useContext, useState, useEffect } from "react";
import Notification from "../components/Notification";
import { useNotificationPermission } from "../hooks/useNotificationPermission";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
    sender: "",
  });

  const { sendBrowserNotification, requestPermission } = useNotificationPermission();

  const showNotification = (message, sender) => {
    // Show in-app notification
    setNotification({
      isVisible: true,
      message,
      sender,
    });

    // Show browser notification
    sendBrowserNotification(`New message from ${sender}`, {
      body: message,
      // You can add more options like icon, badge, etc.
    });

    setTimeout(() => {
      setNotification(prev => ({ ...prev, isVisible: false }));
    }, 5000);
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  // Request notification permission when the app loads
  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification
        isVisible={notification.isVisible}
        message={notification.message}
        sender={notification.sender}
        onClose={hideNotification}
      />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}; 