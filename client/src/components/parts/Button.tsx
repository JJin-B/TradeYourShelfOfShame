import React from "react";

interface Props {
  text?: string;
}

const Button: React.FC<Props> = ({ text = "Submit" }) => {
  return (
    <button
      type="button"
      className="inline-block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700"
    >
      {text}
    </button>
  );
};

export default Button;
