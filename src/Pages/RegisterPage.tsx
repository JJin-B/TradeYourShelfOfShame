import React, { useState, ChangeEvent } from "react";
import RegisterPasswordInput from "../components/parts/RegisterPasswordInput";
import RegisterSubmitButton from "../components/parts/RegisterSubmitButton";

interface passwordCriteria {
  charCount: boolean;
  specialChar: boolean;
  upperChar: boolean;
  lowerChar: boolean;
  number: boolean;
}

interface Props {}

const RegisterPage: React.FC<Props> = () => {
  const symbolRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
  const upperCharacterRegex = /[A-Z]/;
  const lowerCharacterRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordCriteria, setPasswordCriteria] = useState<passwordCriteria>({
    charCount: false,
    specialChar: false,
    upperChar: false,
    lowerChar: false,
    number: false,
  });

  const checkPasswordCriteria = (password: string) => {
    const includeMinChar = password.length > 7;
    const includeSymbol = Boolean(password.match(symbolRegex));
    const includeUpper = Boolean(password.match(upperCharacterRegex));
    const includeLower = Boolean(password.match(lowerCharacterRegex));
    const includeNumber = Boolean(password.match(numberRegex));

    setPasswordCriteria({
      charCount: includeMinChar,
      specialChar: includeSymbol,
      upperChar: includeUpper,
      lowerChar: includeLower,
      number: includeNumber,
    });
  };

  const handleOnChange = (
    inputType: "email" | "password" | "name" | "confirmPassword",
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (inputType === "email") {
      setEmail(e.target.value);
    } else if (inputType === "password") {
      setPassword(e.target.value);
      checkPasswordCriteria(e.target.value);
    } else if (inputType === "name") {
      setName(e.target.value);
    } else if (inputType === "confirmPassword") {
      setConfirmPassword(e.target.value);
    }
  };

  const isValidInputs = () => {
    const isValidEmail = Boolean(email.match(emailRegex));
    const isValidPassword = Object.values(passwordCriteria).every(
      (value) => value
    );
    const isValidName = name.length > 0;

    if (
      isValidEmail &&
      isValidPassword &&
      isValidName &&
      password == confirmPassword
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="w-full mx-auto my-2 max-w-6xl">
      <div className="bg-gray-100 border border-gray-300 dark:bg-gray-100 shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
        <form action="POST">
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
              required
            />
            {!Boolean(email.match(emailRegex)) && (
              <p className="text-red-500 text-xs italic">
                Please enter a valid email format.
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => handleOnChange("name", e)}
              required
            />
            {name.length == 0 && (
              <p className="text-red-500 text-xs italic">
                Please enter a your full name.
              </p>
            )}
          </div>
          <RegisterPasswordInput
            password={password}
            confirmPassword={confirmPassword}
            passwordCriteria={passwordCriteria}
            handleOnChange={handleOnChange}
          />
          <RegisterSubmitButton
            name={name}
            email={email}
            password={password}
            isValidInputs={isValidInputs()}
          />
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
