import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ThemesPage = () => {
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const themes = [
    { name: "light", color: "#ffffff" },
    { name: "dark", color: "#1d232a" },
    { name: "cupcake", color: "#faf7f5" },
    { name: "bumblebee", color: "#fff9c4" },
    { name: "emerald", color: "#e6fff3" },
    { name: "corporate", color: "#f8fafc" },
    { name: "synthwave", color: "#2d1b69" },
    { name: "retro", color: "#e4d8b4" },
    { name: "cyberpunk", color: "#fff600" },
    { name: "valentine", color: "#ffd6e8" },
    { name: "halloween", color: "#212121" },
    { name: "garden", color: "#e9f5db" },
    { name: "forest", color: "#171212" },
    { name: "aqua", color: "#e0f7ff" },
    { name: "pastel", color: "#fff5f5" },
  ];

  const handleThemeChange = (themeName) => {
    // Update state
    setCurrentTheme(themeName);
    
    // Save to localStorage
    localStorage.setItem("theme", themeName);
    
    // Apply theme to HTML element
    document.querySelector('html').setAttribute('data-theme', themeName);
  };

  // Apply theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.querySelector('html').setAttribute('data-theme', savedTheme);
    setCurrentTheme(savedTheme);
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-base-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Choose Your Theme
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {themes.map((theme) => (
            <motion.div
              key={theme.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`cursor-pointer p-4 rounded-lg border-2 ${
                currentTheme === theme.name
                  ? "border-primary"
                  : "border-base-300"
              }`}
              onClick={() => handleThemeChange(theme.name)}
            >
              <div
                className="w-full h-24 rounded-md mb-2"
                style={{ backgroundColor: theme.color }}
              />
              <div className="flex items-center justify-between">
                <span className="capitalize font-medium">
                  {theme.name}
                </span>
                {currentTheme === theme.name && (
                  <div className="w-3 h-3 rounded-full bg-primary" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ThemesPage; 