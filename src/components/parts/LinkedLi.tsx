import React from "react";

interface Props {
  link: string;
  text: string;
  className: string;
}

const LinkedLi: React.FC<Props> = ({ link, text, className = "" }) => {
  return (
    <li>
      <a href={link} className={className}>
        {text}
      </a>
    </li>
  );
};

export default LinkedLi;
