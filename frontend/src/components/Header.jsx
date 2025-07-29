import React, { useRef, useState, useEffect } from "react";
import logo from "../assets/logo.png";
import whiteLogo from "../assets/whitethemeLogo.png";
import ThemeToggle from "./ThemeToggle";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";

const Header = () => {
  const menuRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Sync theme with localStorage and listen for changes
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

  useGSAP(() => {
    gsap.set(menuRef.current, { right: "-50%" });
  }, []);

  const toggleMenu = () => {
    const targetRight = isMenuOpen ? "-50%" : "0";
    gsap.to(menuRef.current, {
      right: targetRight,
      duration: 0.4,
      ease: "power2.out",
    });
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className=" fixed top-0 left-0 w-full bg-white/0 dark:bg-black/20 backdrop-blur-xl shadow-xl dark:shadow-[0_4px_10px_0_rgba(255,255,255,0.3)] items-center">
        <div className="h-16 flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <div className="flex items-center ">
            <img
              src={theme === "dark" ? logo : whiteLogo}
              alt="Logo"
              className="
               h-[60px] w-[60px] ml-[25px]
               transition-transform duration-300 ease-in-out
              scale-120  hover:scale-150 hover:rotate-3

                 p-1

                drop-shadow-[0_5px_25px_rgba(0,0,0,0.25)]
                dark:drop-shadow-[0_5px_25px_rgba(255,255,255,0.1)]
              "
            />
          </div>
          <span className="orbitron ml-3 text-3xl font-medium  text-gray-900 dark:text-white">
            Gameonomics
          </span>
          {/* Theme Toggle & Menu */}
          <div className="flex justify-between items-center gap-12">
            <ThemeToggle />
            <span
              onClick={toggleMenu}
              className="text-4xl cursor-pointer active:scale-110 hover:scale-105 transition-transform"
            >
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </header>

      {/* Slide-out menu panel */}
      <div
        ref={menuRef}
        className="fixed rounded-l-4xl top-0 right-[-50%] z-[60] h-screen w-1/2 dark:text-white text-black dark:bg-black/20 bg-white/20 backdrop-blur-2xl p-6"
      >
        <div className="flex justify-end">
          <span
            onClick={toggleMenu}
            className="text-3xl cursor-pointer hover:scale-110 transition-transform"
            title="Close menu"
          >
            <i className="ri-close-large-fill"></i>
          </span>
        </div>

        <div className="mt-10 text-4xl font-semibold ">
          <Link to="/">
            <p
              className="mb-4 border-b-2 border-zinc-800 dark:border-zinc-400 cursor-pointer leading-[1.5] 
          hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500 ease-in-out  px-2 py-1 rounded"
            >
              Home
            </p>
          </Link>
          <a href="/#aboutus">
            <p
              className="mb-4 border-b-2 border-zinc-800 dark:border-zinc-400 cursor-pointer leading-[1.5] transition-all duration-500 ease-in-out
          hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black  px-2 py-1 rounded"
            >
              About Us
            </p>
          </a>
          <Link to="/login">
            <p
              className="mb-4 border-b-2 border-zinc-800 dark:border-zinc-400 cursor-pointer leading-[1.5]  transition-all duration-500 ease-in-out
          hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black  px-2 py-1 rounded"
            >
              Login
            </p>
          </Link>
          <Link to="/signup">
            <p
              className="mb-4 border-b-2 border-zinc-800 dark:border-zinc-400 cursor-pointer leading-[1.5]  transition-all duration-500 ease-in-out
          hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black  px-2 py-1 rounded"
            >
              Sign Up
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
