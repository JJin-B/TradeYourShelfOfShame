import React from "react";

interface Props {
  title: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const PostTitle: React.FC<Props> = ({ title, onChange }) => {
  return (
    <div className="flex flex-wrap items-center mb-2">
      <label
        htmlFor="title"
        className="mr-2 font-medium text-gray-900 dark:text-white"
      >
        Title
      </label>
      <input
        id="title"
        name="title"
        type="text"
        className="w-full px-2 py-1 bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={onChange}
        value={title}
        required
      />
    </div>
  );
};

export default PostTitle;
