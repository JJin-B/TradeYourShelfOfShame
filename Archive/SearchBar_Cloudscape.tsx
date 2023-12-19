import React from "react";

interface MyProps {
  //   isLoggedIn?: Boolean;
  input?: string;
}

const SearchBar: React.FC<MyProps> = ({ input = "" }) => {
  return <input value={input} />;
};
export default SearchBar;
