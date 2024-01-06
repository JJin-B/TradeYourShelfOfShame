import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../Wrapper/AuthContext";
import { apiAddress } from "../Wrapper/AuthContext";

interface Props {}
const LoginPage: React.FC<Props> = () => {
  const navigate = useNavigate();

  const { signin } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleOnChange = (
    inputType: "email" | "password",
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (inputType === "email") {
      setEmail(e.target.value);
    } else if (inputType === "password") {
      setPassword(e.target.value);
    }
  };

  const registerButtonOnClick = () => {
    navigate("/register");
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter your email address and password", {
        autoClose: 5000,
      });
      return;
    }

    try {
      const fetchUrl = apiAddress + "/user/signin";
      await axios
        .post(fetchUrl, { email: email, password: password })
        .then((res: AxiosResponse) => {
          const data = res.data;
          console.log(data);
          if (data && data === "Not valid User") {
            toast.error("Either email or password is wrong", {
              autoClose: 5000,
            });
            return;
          }

          signin(data);
          navigate("/");
        });
    } catch (e) {
      if (e instanceof Error) {
        const errorMessage = e.message || "An unexpected error occurred.";
        toast.error(
          `${errorMessage}. Please try again. If the issue persists, contact support.`,
          { autoClose: 5000 }
        );
      } else {
        toast.error(
          "An unexpected error occurred. Please try again. If the issue persists, contact support.",
          { autoClose: 5000 }
        );
      }

      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto my-2">
      <div className="bg-gray-100 dark:bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => handleOnChange("email", e)}
            />
            {!email && (
              <p className="text-red-500 text-xs italic">
                Please enter your email address.
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => handleOnChange("password", e)}
            />
            {!password && (
              <p className="text-red-500 text-xs italic">
                Please enter your password.
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={email && password ? false : true}
            >
              Sign In
            </button>
            <Link
              to="#"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
        <div className="my-1 text-center border border-t-2 border-0 border-gray-400 py-1">
          <button
            onClick={registerButtonOnClick}
            className="w-36 mx-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
