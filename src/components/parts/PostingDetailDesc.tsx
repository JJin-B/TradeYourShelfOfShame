interface PostingDetailDescProps {
  desc: string;
}

const PostingDetailDesc: React.FC<PostingDetailDescProps> = ({ desc }) => {
  return (
    <div className="mx-auto h-64 p-3 min-h-fit max-w-6xl m-10 dark:border dark:border-grey-700 rounded-md">
      <h1 className="text-2xl">Description</h1>
      <p className="mt-5">{desc}</p>
    </div>
  );
};

export default PostingDetailDesc;
