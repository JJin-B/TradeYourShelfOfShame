import { useNavigate } from "react-router-dom";

const LoginPageRegisterBtn: React.FC = () => {
  const navigate = useNavigate();

  const registerButtonOnClick = () => {
    navigate("/signup");
  };

  return (
    <div className="my-1 text-center border border-t-2 border-0 border-gray-400 py-1">
      <button
        onClick={registerButtonOnClick}
        className="w-36 mx-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
      >
        Register
      </button>
    </div>
  );
};

export default LoginPageRegisterBtn;
