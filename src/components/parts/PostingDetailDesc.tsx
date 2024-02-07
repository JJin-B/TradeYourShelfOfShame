import React from "react";

interface Props {
  desc: string;
}

const PostingDetailDesc: React.FC<Props> = ({ desc }) => {
  return (
    <div className="mx-auto h-64 p-3 min-h-fit max-w-6xl m-10 dark:border dark:border-grey-700 rounded-md">
      <h1 className="text-2xl">Description</h1>
      <p className="mt-5">{desc}</p>
    </div>
  );
};

export default PostingDetailDesc;
