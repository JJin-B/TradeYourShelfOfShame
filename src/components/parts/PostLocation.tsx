interface PostLocationProps {
  location: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const PostLocation: React.FC<PostLocationProps> = ({ location, onChange }) => {
  return (
    <div className="flex flex-col flex-wrap mb-2">
      <label
        htmlFor="location"
        className="mr-2 font-medium text-gray-900 dark:text-white"
      >
        Location
      </label>
      <input
        id="location"
        name="location"
        type="text"
        className="w-full px-2 py-1 bg-gray-100 border-2 border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={location}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default PostLocation;
