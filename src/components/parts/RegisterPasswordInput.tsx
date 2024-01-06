import React, { ChangeEvent } from "react";

interface passwrodCriteria {
  charCount: boolean;
  specialChar: boolean;
  upperChar: boolean;
  lowerChar: boolean;
  number: boolean;
}
interface Props {
  password: string;
  confirmPassword: string;
  handleOnChange: (
    inputType: "email" | "password" | "name" | "confirmPassword",
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  passwordCriteria: passwrodCriteria;
}

const RegisterPasswordInput: React.FC<Props> = ({
  password,
  confirmPassword,
  handleOnChange,
  passwordCriteria: { charCount, specialChar, upperChar, lowerChar, number },
}) => {
  const conditionMet = (condition: boolean) => {
    if (condition) {
      return "blue-500";
    } else {
      return "red-500";
    }
  };
  const isValidPassword =
    charCount && specialChar && upperChar && lowerChar && number;

  return (
    <div className="flex mb-6">
      <div className="w-1/2">
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
          required
        />
        {!password && (
          <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p>
        )}
        {password && !isValidPassword && (
          <p className="text-red-500 text-xs italic">
            Please ensure your password is valid.
          </p>
        )}

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="confirmPassword"
          type="password"
          placeholder="******************"
          value={confirmPassword}
          onChange={(e) => handleOnChange("confirmPassword", e)}
          required
        />
        {password != confirmPassword && (
          <p className="text-red-500 text-xs italic">
            Your passwords do not match.
          </p>
        )}
      </div>
      <div className="mx-auto flex items-center">
        <ul>
          <li className={`font-bold text-${conditionMet(charCount)}`}>
            at least 8 characters
          </li>
          <li className={`font-bold text-${conditionMet(specialChar)}`}>
            at least 1 special character <br />({"!@#$%^&*()_+{}[]:;<>,.?~\\/-"}
            )
          </li>
          <li className={`font-bold text-${conditionMet(upperChar)}`}>
            at least 1 upper character
          </li>
          <li className={`font-bold text-${conditionMet(lowerChar)}`}>
            at least 1 lower character
          </li>
          <li className={`font-bold text-${conditionMet(number)}`}>
            at least 1 number
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RegisterPasswordInput;
