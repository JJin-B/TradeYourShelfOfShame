import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import User from "./classes/User";

import NavBarLogo from "./parts/NavBarLogo";
import NavBarHamburgerButton from "./parts/NavBarHamburgerButton";
import NavBarLoginRegisterBtn from "./parts/NavBarLoginRegisterBtn";
import NavBarUserMenu from "./parts/NavBarUserMenu";
import Button from "./parts/Button";
import SearchBar from "./parts/SearchBar";
import NavBarNotifications from "./parts/icons/NavBarNotifications";
import MailboxIcon from "./parts/icons/MailboxIcon";

import { UserWithNotification } from "./classes/interfaces";

const menuClass: string =
  "flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700";

const menuItemClass: string =
  "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer";

interface NavBarProps {
  user: UserWithNotification | null;
}

const Navbar: React.FC<NavBarProps> = ({ user }) => {
  const navigator = useNavigate();
  const [isHamburgerDropdownOpen, setisHamburgerDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setisHamburgerDropdownOpen((prev) => !prev);
  };

  const postOnClick = () => {
    if (user) {
      navigator("/post");
    } else {
      navigator("/signin");
    }
  };

  return (
    <nav className="w-full z-50 p-3 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-6xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavBarLogo />
        <NavBarHamburgerButton
          isDropdownOpen={isHamburgerDropdownOpen}
          onToggle={() => toggleDropdown()}
        />

        {/* prettier-ignore */}
        <div className={`${isHamburgerDropdownOpen ? "block" : "hidden"} w-full md:block md:w-auto`} id="navbar-dropdown">
          <ul className={menuClass}>
            <li onClick={()=>navigator('/')} className={menuItemClass}>Home</li>
            <li onClick={()=>navigator('/search')} className={menuItemClass}>All Postings</li>
            <li onClick={()=>navigator('/search?type=buy')} className={menuItemClass}>Buy</li>
            <li onClick={()=>navigator('/search?type=sell')} className={menuItemClass}>Sell</li>


            {user? <NavBarUserMenu user={user} /> : <NavBarLoginRegisterBtn/>}
          </ul>
        </div>
        {user && (
          <div className="flex justify-between w-20 mx-2">
            <NavBarNotifications
              userId={user._id}
              notifications={user.notifications}
            />

            <MailboxIcon />
          </div>
        )}
        <li>
          <Button text="Post" onClick={postOnClick} />
        </li>
      </div>

      <SearchBar />
    </nav>
  );
};

export default Navbar;
