import React from "react";

interface Props {
  bggToggle: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const PostBggSearchInput: React.FC<Props> = ({ bggToggle, onChange }) => {
  return (
    <div className="flex flex-wrap items-center mb-2">
      <div className="mr-3 py-1 font-medium text-gray-900 dark:text-white">
        Link to BoardGameGeek Game List
      </div>
      <label className="relative inline-flex cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={bggToggle}
          onChange={onChange}
        />
        <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
};

export default PostBggSearchInput;
