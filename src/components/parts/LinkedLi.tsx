import React from "react";
import { Link } from "react-router-dom";

interface Props {
  link?: string;
  text: string;
  className?: string;
  onClick?: () => void;
}

const LinkedLi: React.FC<Props> = ({ link, text, className, onClick }) => {
  if (link) {
    return (
      <li>
        <Link to={link} className={className} onClick={onClick}>
          {text}
        </Link>
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
