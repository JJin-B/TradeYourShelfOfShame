import React, { useState, ChangeEvent } from "react";

import TopNavigation from "@cloudscape-design/components/top-navigation";
import Input from "@cloudscape-design/components/input";
import SearchBar from "./parts/SearchBar";

import User from "./class/User";

interface MyProps {
  //   isLoggedIn?: Boolean;
  user: User;
}

const NavBar: React.FC<MyProps> = ({ user }) => {
  const [searchItem, setSearchItem] = useState<string>("d");

  const handleSearchItemChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);
  };

  const utility_userInfo = {
    type: "menu-dropdown",
    text: user.name,
    description: user.email,
    iconName: "user-profile",
    items: [
      { id: "mypostings", text: "My Postings" },
      { id: "profile", text: "Profile" },
      { id: "usersetting", text: "User Setting" },
      { id: "signout", text: "Sign out" },
    ],
  };

  const utilities = [utility_userInfo];

  return (
    <TopNavigation
      identity={{
        href: "#",
        title: "Trade Your Shelf of Shame",
        logo: {
          src: "../../public/logo-TYSS-dark-removebg-preview.png",
          alt: "Service",
        },
      }}
      utilities={utilities}
      search={
        <Input
          value={searchItem}
          type="search"
          placeholder="Search"
          ariaLabel="Search"
          onChange={handleSearchItemChange}
        />
      }
    />
  );
};

export default NavBar;
