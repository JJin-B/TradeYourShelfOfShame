import { useNavigate } from "react-router-dom";

const classes =
  "block py-2 px-3 rounded md:border-0 md:p-0 text-gray-700 dark:text-gray-300";
const btnClasses =
  "text-gray-900 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white  md:dark:hover:bg-transparent";

const NavBarLoginRegisterBtn: React.FC = () => {
  const navigate = useNavigate();

  const loginBtnOnClick = () => {
    navigate("/signin");
  };
  const registerBtnOnClick = () => {
    navigate("/signup");
  };
  return (
    <div className={classes}>
      <button className={btnClasses} onClick={loginBtnOnClick}>
        Sign In
      </button>{" "}
      or{" "}
      <button className={btnClasses} onClick={registerBtnOnClick}>
        Register
      </button>
    </div>
  );
};

export default NavBarLoginRegisterBtn;
