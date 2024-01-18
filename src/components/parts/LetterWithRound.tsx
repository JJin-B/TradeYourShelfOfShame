import React from "react";

interface Props {
  letter: string;
  color?: string;
  className?: string;
}

const LetterWithRound: React.FC<Props> = ({
  letter,
  color = "red-500",
  className = "w-6 h-6 mx-3 sm:w-14 sm:h-14 sm:flex hidden",
}) => {
  return (
    <span
      className={`items-center justify-center rounded-full text-lg text-white m-1 p-2 bg-${color} ${className}`}
    >
      {letter}
    </span>
  );
};

export default LetterWithRound;
