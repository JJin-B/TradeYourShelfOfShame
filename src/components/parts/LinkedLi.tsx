import React from "react";

interface Props {
  link?: string;
  text: string;
  className?: string;
  onClick?: () => void;
}

const LinkedLi: React.FC<Props> = ({ link, text, className = "", onClick }) => {
  if (link) {
    return (
      <li>
        <a href={link} className={className} onClick={onClick}>
          {text}
        </a>
      </li>
    );
  } else {
    return (
      <li className={className} onClick={onClick}>
        {text}
      </li>
    );
  }
};

export default LinkedLi;
