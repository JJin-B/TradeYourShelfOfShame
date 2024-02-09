import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth, apiAddress } from "../../Wrapper/AuthContext";
import { toast } from "react-toastify";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginPageForm: React.FC = () => {
  const navigate = useNavigate();
  const { signin } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isValidEmail, setIsValidEmail] = useState<boolean>(
    Boolean(email.match(emailRegex))
  );

  const handleOnChange = (
    inputType: "email" | "password",
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (inputType === "email") {
      const emailInput = e.target.value;
      setEmail(emailInput);
      setIsValidEmail(Boolean(emailInput.match(emailRegex)));
    } else if (inputType === "password") {
      setPassword(e.target.value);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter your email address and password", {
        autoClose: 5000,
      });
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    try {
      const fetchUrl = apiAddress + "/user/signin";

      axios
        .post(fetchUrl, data)
        .then((res: AxiosResponse) => {
          const data = res.data;
          signin(data.userInfo._doc);
          toast.success("You have successfully signed in!", {
            autoClose: 5000,
          });
          if (document.referrer) {
            navigate(-1);
          } else {
            navigate("/");
          }
        })
        .catch((e) => {
          const message = e.response.data.message;
          if (message) {
            toast.error(message, { autoClose: 5000 });
          }
        });
    } catch (e) {
      // console.log(e);
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

      // console.error(e);
    }
  };

  return (
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
        {email && !isValidEmail && (
          <p className="text-red-500 text-xs italic">
            Please enter a valid email address.
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
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            !isValidEmail || !password
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          type="submit"
          disabled={!isValidEmail || !password ? true : false}
        >
          Sign In
        </button>
        {/* <Link
          to="#"
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        >
          Forgot Password?
        </Link> */}
      </div>
    </form>
  );
};

export default LoginPageForm;
