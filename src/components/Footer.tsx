import React from "react";
import LinkedLi from "./parts/LinkedLi";

const Footer: React.FC = () => {
  return (
    <footer className="max-w-6xl flex flex-wrap items-center justify-between mx-auto p-1 bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            TYSS
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <LinkedLi link="#" text="Contact" className="hover:underline" />
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
