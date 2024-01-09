import React from "react";
import LinkedLi from "./parts/LinkedLi";
import Copyright from "./parts/Copyright";

const Footer: React.FC = () => {
  return (
    <footer className="inset-x-0 bottom-0 max-w-6xl flex flex-wrap items-center justify-between mx-auto p-1 bg-white rounded-lg shadow m-4 my-1 dark:bg-gray-800 border border-gray-100 dark:border-gray-600">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <Copyright />
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <LinkedLi link="#" text="Contact" className="hover:underline" />
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
