import { UserInfo } from "../components/classes/interfaces";

interface Props {
  user: UserInfo | null;
}

const UserSettingPage: React.FC<Props> = ({ user }) => {
  return <div>{user?.name}</div>;
};

export default UserSettingPage;
