import SearchIcon from "./icons/SearchIcon";

interface BggSearchBarProps {
  input: string;
  bggToggle: boolean;
  onClick: React.MouseEventHandler;
  onChangeInput: React.ChangeEventHandler;
  classNamesToAdd?: string;
}

const PostBggSearchBar: React.FC<BggSearchBarProps> = ({
  input,
  bggToggle,
  onChangeInput,
  onClick,
  classNamesToAdd,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const button = document.getElementById("bggSearchBtn");
      if (button) {
        button.click();
      }
    }
  };

  return (
    <div
      className={`w-60 sm:w-96 items-center mb-2 ${
        !bggToggle && "hidden"
      } ${classNamesToAdd}`}
    >
      <div className="relative">
        <input
          type="search"
          id="bggSearchInput"
          className="block w-full p-3 text-sm text-gray-900 border border-2 border-gray-600 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Your Game Name ..."
          value={input}
          onKeyDown={handleKeyDown}
          onChange={onChangeInput}
        />
        <div
          id="bggSearchBtn"
          className="button text-white absolute end-2 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={onClick}
        >
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default PostBggSearchBar;
