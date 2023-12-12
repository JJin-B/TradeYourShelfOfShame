import React, { useState } from "react";

import User from "./classes/User";

import NavBarLogo from "./parts/NavBarLogo";
import NavBarHamburgerButton from "./parts/NavBarHamburgerButton";
import LinkedLi from "./parts/LinkedLi";
import NavBarUserMenu from "./parts/NavBarUserMenu";

interface Props {
  user: User;
  isDarkMode: boolean;
}

const Navbar: React.FC<Props> = ({ user, isDarkMode }) => {
  const [isHamburgerDropdownOpen, setisHamburgerDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setisHamburgerDropdownOpen((prev) => !prev);
  };

  const menuClass: string =
    "flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700";

  const menuItemClass: string =
    "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";

  return (
    <nav className="bg-white border-gay-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavBarLogo isDarkMode={isDarkMode} />
        <NavBarHamburgerButton
          isDropdownOpen={isHamburgerDropdownOpen}
          onToggle={() => toggleDropdown()}
        />

        <div
          className={`w-full md:block md:w-auto 
          ${isHamburgerDropdownOpen ? "block" : "hidden"}`}
          id="navbar-dropdown"
        >
          <ul className={menuClass}>
            <LinkedLi link="#" text="All Postings" className={menuItemClass} />
            <li className="relative">
              <NavBarUserMenu name={user.name} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
