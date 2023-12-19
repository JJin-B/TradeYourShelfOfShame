import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logoDark from "/images/logo-TYSS-dark.png";
import logoLight from "/images/logo-TYSS.png";

const NavBarLogo: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    darkModeMediaQuery.addEventListener("change", handleDarkModeChange);

    // Cleanup the event listener on component unmount
    return () => {
      darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
    };
  }, []);

  const logoSrc = isDarkMode ? logoDark : logoLight;

  return (
    <Link to={"/"}>
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logoSrc} className="h-8" alt="TYSS Logo" />
        <span className="self-center text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-semibold whitespace-nowrap dark:text-white">
          Trade Your Shelf of Shame
        </span>
      </div>
    </Link>
  );
};

export default NavBarLogo;
