import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";

const Notification = ({ message, sender, isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, x: "-50%" }}
          animate={{ opacity: 1, y: 20 }}
          exit={{ opacity: 0, y: -100 }}
          className="fixed left-1/2 z-50"
        >
          <div className="bg-base-100 shadow-lg rounded-lg p-4 flex items-center gap-3 border border-base-300 min-w-[300px]">
            <div className="bg-primary/10 p-2 rounded-full">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base">{sender}</h3>
              <p className="text-sm text-base-content/70">{message}</p>
            </div>
            <button 
              onClick={onClose} 
              className="btn btn-ghost btn-sm btn-circle self-start"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification; 