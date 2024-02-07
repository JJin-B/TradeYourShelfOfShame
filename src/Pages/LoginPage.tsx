import React from "react";
import LoginPageRegisterBtn from "../components/parts/LoginPageRegisterBtn";
import LoginPageForm from "../components/parts/LoginPageForm";

interface Props {}
const LoginPage: React.FC<Props> = () => {
  return (
    <div className="w-full max-w-xs mx-auto my-2 bg-gray-100 dark:bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <LoginPageForm />

      <LoginPageRegisterBtn />
    </div>
  );
};

export default LoginPage;
