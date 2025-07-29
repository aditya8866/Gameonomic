import React, { useState, useEffect } from "react";
import "remixicon/fonts/remixicon.css";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Apply theme to <html> and save to localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className=" rounded-full cursor-pointer w-[60px] h-[40px] border-2 dark:border-gray-300 dark:border-3 border-gray-900 bg-white/80 dark:bg-black/40 backdrop-blur-sm text-gray-800 dark:text-gray-100 hover:scale-105 transition-transform active:dark:border-3 active:dark:border-white active:scale-110"
      title="Toggle theme"
    >
      <span>
        <i
          className={
            theme === "dark" ? "ri-sun-fill text-xl" : "ri-moon-fill text-xl"
          }
        />
      </span>
    </button>
  );
};

export default ThemeToggle;
