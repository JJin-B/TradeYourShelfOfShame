import React from "react";

interface Props {
  location: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>
}
const PostLocation: React.FC<Props> = ({location, onChange}) => {
  return (
    <div className="flex flex-wrap items-center mb-2">
      <label
        htmlFor="location"
        className="mr-2 font-medium text-gray-900 dark:text-white"
      >
        Location
      </label>
      <input
        name="location"
        type="text"
        className="w-4/5 px-2 py-1 bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={location}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default PostLocation;
