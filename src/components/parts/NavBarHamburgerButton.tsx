import React from "react";

interface Props {
  isDropdownOpen: boolean;
  onToggle: () => void;
}

const NavBarHamburgerButton: React.FC<Props> = ({
  isDropdownOpen,
  onToggle,
}) => {
  const navHamburgerButton: string =
    "inline-flex items-center p-2 w-10 h-10 justify-end text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the default behavior of the button click
    onToggle();
  };

  return (
    <button
      data-collapse-toggle="navbar-dropdown"
      type="button"
      className={navHamburgerButton}
      aria-expanded={isDropdownOpen}
      onClick={handleClick}
    >
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>
  );
};

export default NavBarHamburgerButton;
