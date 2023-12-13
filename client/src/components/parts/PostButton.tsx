import React from "react";

const PostButton: React.FC = () => {
  return (
    <form>
      <button
        type="button"
        className="inline-block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        Post
      </button>
    </form>
  );
};

export default PostButton;
