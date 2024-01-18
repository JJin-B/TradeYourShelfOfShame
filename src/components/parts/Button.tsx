import React from "react";

interface Props {
  text?: string;
  className?: string;
  onClick?: () => void;
  type?: "submit" | "button" | "reset" | undefined;
}

const Button: React.FC<Props> = ({
  text = "Submit",
  type = "button",
  className,
  onClick,
}) => {
  const defaultClassName = "inline-block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5";
  className = defaultClassName +" " + className;


  return (
    <button type={type} className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
