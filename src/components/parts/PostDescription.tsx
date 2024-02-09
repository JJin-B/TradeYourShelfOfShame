interface PostDescProps {
  desc: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}
const PostDescription: React.FC<PostDescProps> = ({ desc, onChange }) => {
  return (
    <div className="flex flex-wrap items-center mb-2">
      <label
        htmlFor="description"
        className="block text-sm font-medium text-gray-900 dark:text-white"
      >
        Description
      </label>
      <textarea
        id="description"
        rows={4}
        value={desc}
        onChange={onChange}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border-2 border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      ></textarea>
    </div>
  );
};

export default PostDescription;
