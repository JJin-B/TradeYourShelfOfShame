import React from "react";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Props {
  user: User | null;
}

const UserSettingPage: React.FC<Props> = ({ user }) => {
  return <div>{user?.name}</div>;
};

export default UserSettingPage;
