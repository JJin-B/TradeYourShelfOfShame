import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import SearchButton from "./SearchButton";
import SearchInputBar from "./SearchInputBar";
import SearchOption from "./SearchOption";

interface SearchParams {
  type: "" | "Buy" | "Sell";
  input: string;
}

const SearchBar: React.FC = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useState<SearchParams>({
    type: "",
    input: "",
  });
  const [isDropdownOpen, setisDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setisDropdownOpen(!isDropdownOpen);
  };

  const handleSearchInput = (input: string) => {
    setSearchParams((prevParams) => ({ ...prevParams, input }));
  };

  const selectOption = (type: "" | "Buy" | "Sell") => {
    setSearchParams((prevParams) => ({ ...prevParams, type }));
    setisDropdownOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const typeParam = searchParams.type ? `type=${searchParams.type.toLowerCase()}`: ""; //prettier-ignore
    const inputParam = searchParams.input ? `q=${searchParams.input}` : "";

    const queryParams = [inputParam, typeParam].filter(Boolean).join("&");
    
    navigate(`/search${queryParams ? `?${queryParams}` : ""}`, {
      replace: true,
    });
  };

  const liClasses: string =
    "inline-flex w-full px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white";
  const categoryClasses: string =
    "flex-shrink-0 justify-between z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 w-36";

  const dropdownClasses: string =
    "absolute flex-shrink-0 z-10 inline-flex py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 w-36";

  return (
    <form
      className="flex items-center px-5 max-w-6xl justify-between mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex">
        <button
          id="dropdown-button"
          className={categoryClasses}
          type="button"
          onClick={toggleDropdown}
        >
          {searchParams.type ? searchParams.type : "All Postings"} <span>▼</span>
        </button>
        {isDropdownOpen && (
          <div id="dropdown" className={dropdownClasses}>
            <ul className="text-gray-700 rounded-lg dark:text-gray-200">
              <SearchOption
                text="All Postings"
                liClasses={liClasses}
                onClickEvent={() => selectOption("")}
              />
              <SearchOption
                text="Buy"
                liClasses={liClasses}
                onClickEvent={() => selectOption("Buy")}
              />
              <SearchOption
                text="Sell"
                liClasses={liClasses}
                onClickEvent={() => selectOption("Sell")}
              />
            </ul>
          </div>
        )}
      </div>
      <SearchInputBar input={searchParams.input} onChange={handleSearchInput} />
      <SearchButton />
    </form>
  );
};

export default SearchBar;
