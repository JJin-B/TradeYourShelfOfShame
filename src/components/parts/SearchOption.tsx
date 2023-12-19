import React from "react";

interface Props {
  text: string;
  liClasses: string;
  onClickEvent: () => void;
}

const SearchOption: React.FC<Props> = ({ text, liClasses, onClickEvent }) => {
  return (
    <li>
      <button type="button" className={liClasses} onClick={onClickEvent}>
        {text}
      </button>
    </li>
  );
};

export default SearchOption;
