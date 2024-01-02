import React from "react";

interface Props {
  input: string;
  onChange: (input: string) => void;
}

const SearchInputBar: React.FC<Props> = ({ input, onChange }) => {
  return (
    <>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <input
          type="text"
          id="search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search ..."
          value={input}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </>
  );
};

export default SearchInputBar;
