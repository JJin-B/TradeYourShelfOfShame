interface CopyRightProps {}
const Copyright: React.FC<CopyRightProps> = () => {
  return (
    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-100">
      © 2024{" "}
      <a href="#" className="hover:underline">
        TYSS
      </a>
      . All Rights Reserved.
    </span>
  );
};

export default Copyright;
