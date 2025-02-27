import { useState } from "react";

export const useNotificationPermission = () => {
  const [permission, setPermission] = useState(Notification.permission);

  const requestPermission = async () => {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      return "denied";
    }
  };

  const sendBrowserNotification = (title, options = {}) => {
    if (permission === "granted") {
      new Notification(title, {
        icon: "/path-to-your-icon.png", // Add your app icon
        ...options,
      });
    }
  };

  return { permission, requestPermission, sendBrowserNotification };
}; 