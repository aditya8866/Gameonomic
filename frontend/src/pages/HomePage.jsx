import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Spline from "../components/Spline";
import WhiteSpline from "../components/WhiteSpline";
import Aboutus from "./Aboutus";

const HomePage = () => {
  const [theme, setTheme] = useState("light");
  const [showOverlay, setShowOverlay] = useState(false);
  const aboutRef = useRef(null);

  // Track theme (light/dark)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Initial check
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );

    return () => observer.disconnect();
  }, []);
  return (
    <div className="min-h-screen  bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-100 overflow-x-hidden">
      {/* Sticky Header */}
      <header className="sticky top-0 z-[1555]">
        <Header />
      </header>

      {/* Scrollable Main Content */}
      <main className="w-full">
        {/* Hero / Landing section */}
        <div className="h-screen w-full   dark:bg-black">
          {theme === "dark" ? <Spline /> : <WhiteSpline />}
        </div>

        {/* About Section with ref */}
        <div ref={aboutRef}>
          <Aboutus />
        </div>
      </main>

      {/* Fixed Centered Text only when Aboutus is visible */}
    </div>
  );
};

export default HomePage;
