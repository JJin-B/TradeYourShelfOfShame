import React, { useState } from "react";

import LinkedLi from "./LinkedLi";

interface Props {
  name: string;
}

const NavBarUserMenu: React.FC<Props> = ({ name }) => {
  const buttonClass: string =
    "flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent";

  const userMenuItemClass: string =
    "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white";

  const [isDropdownOn, setIsDropdownOn] = useState(false);

  const handleDropdown = (mouseEvent: "enter" | "leave") => {
    if (mouseEvent === "enter") {
      setIsDropdownOn(true);
    } else if (mouseEvent === "leave") {
      setIsDropdownOn(false);
    }
  };

  return (
    <li className="relative">
      <button
        id="dropdownNavbarLink"
        onMouseEnter={() => handleDropdown("enter")}
        onMouseLeave={() => handleDropdown("leave")}
        data-dropdown-toggle="dropdownNavbar"
        className={buttonClass}
      >
        {name} ▼{/* {isDropdownOn ? "▲" : "▼"} */}
      </button>
      {/* Dropdown menu */}
      {isDropdownOn && (
        <div
          id="dropdownNavbar"
          className="absolute z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          onMouseEnter={() => handleDropdown("enter")}
          onMouseLeave={() => handleDropdown("leave")}
        >
          {/* prettier-ignore */}
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
            <LinkedLi link="#" className={userMenuItemClass} text="Dashboard" />
            <LinkedLi link="#" className={userMenuItemClass} text="Setting" />
            {/* prettier-ignore */}
            <LinkedLi link="#" className={userMenuItemClass} text="My Postings"/>
          </ul>
          <ul className="text-sm text-gray-700 dark:text-gray-200 ">
            <LinkedLi link="#" className={userMenuItemClass} text="Sign out" />
          </ul>
        </div>
      )}
    </li>
  );
};

export default NavBarUserMenu;
