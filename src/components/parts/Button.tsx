import React from "react";

interface Props {
  text?: string;
  className?: string;
}

const Button: React.FC<Props> = ({ text = "Submit", className }) => {
  if (className) {
    className +=
      " inline-block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700";
  } else {
    className =
      "inline-block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700";
  }
  
  return (
    <button
      type="button"
      className={className}
    >
      {text}
    </button>
  );
};

export default Button;
