import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const logoDarkSrc = "/images/logo-TYSS-dark.webp";

const logoLightSrc = "/images/logo-TYSS.png";

const getLogoSrc = (isDarkMode: boolean) => {
  return isDarkMode ? logoDarkSrc : logoLightSrc;
};

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

  const logoSrc = getLogoSrc(isDarkMode);

  return (
    <Link to={"/"}>
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logoSrc} className="h-8" alt="TYSS Logo" />
        <span className="self-center break-words text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-semibold whitespace-nowrap dark:text-white">
          {window.innerWidth > 360 && "Trade Your Shelf of Shame"}
        </span>
      </div>
    </Link>
  );
};

export default NavBarLogo;
