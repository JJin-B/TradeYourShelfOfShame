import React from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { apiAddress } from "../../Wrapper/AuthContext";

interface UserParams {
  name: string;
  email: string;
  password: string;
}

interface Props {
  name: string;
  email: string;
  password: string;
  isValidInputs: boolean;
}

const RegisterSubmitButton: React.FC<Props> = ({
  name,
  email,
  password,
  isValidInputs,
}) => {
  const navigate = useNavigate();
  const fetchUrl = apiAddress + "/user/register";

  const userParams: UserParams = {
    name: name,
    email: email,
    password: password,
  };

  const onSubmit = async (): Promise<void> => {
    if (!isValidInputs) {
      toast.error("Invalid Inputs!", {
        autoClose: 5000,
      });
      return;
    }

    try {
      await axios.post(fetchUrl, userParams).then((res: AxiosResponse) => {
        const data = res.data;
        if (!data) {
          toast.error("Unknow error occured! Please try again.", {
            autoClose: 5000,
          });
          navigate("/");
          return;
        }
        if (data === "Existing User") {
          toast.error("The email address has an existing account", {
            autoClose: 5000,
          });
          return;
        } else {
          toast.success("The signup has been successful! Please sign in.", {
            autoClose: 5000,
          });
          navigate("/");
        }
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
    <div className="flex items-center justify-between">
      <button
        className={`${
          !isValidInputs && "opacity-50 cursor-not-allowed"
        } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        type="button"
        disabled={!isValidInputs}
        onClick={onSubmit}
      >
        Register
      </button>
    </div>
  );
};

export default RegisterSubmitButton;
