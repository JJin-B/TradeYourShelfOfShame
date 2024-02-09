interface PostTypeProps {
  type: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}
const PostType: React.FC<PostTypeProps> = ({ type, onChange }) => {
  return (
    <div className="flex flex-wrap items-center mb-2">
      <label
        htmlFor="type"
        className="mr-3 py-1 font-medium text-gray-900 dark:text-white"
      >
        Post Type
      </label>
      <select
        id="type"
        className="w-36 px-2 py-1 bg-gray-50 border-2 border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        defaultValue={type}
        onChange={onChange}
      >
        <option value="sell">Sell</option>
        <option value="buy">Buy</option>
      </select>
    </div>
  );
};

export default PostType;
