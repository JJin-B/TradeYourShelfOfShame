import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  link: string;
  text: string;
  className?: string;
  onClick?: () => void;
}
const LinkedLi: React.FC<Props> = ({ link, text, className, onClick }) => {
  const navigator = useNavigate();
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    navigator(link);
  };
  return <li className={className} onClick={handleClick}>{`${text}`}</li>;
};

export default LinkedLi;
