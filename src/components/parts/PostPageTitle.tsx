import React from "react";

interface Props {}
const PostPageTitle: React.FC<Props> = () => {
  return (
    <div className="text-2xl text-gray-900 dark:text-white font-bold flex justify-center items-center h-full">
      Post Your Board Game!
    </div>
  );
};

export default PostPageTitle;
