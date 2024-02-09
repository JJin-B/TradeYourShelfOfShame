import { useState, ChangeEvent } from "react";
import RegisterPasswordInput from "../components/parts/RegisterPasswordInput";
import RegisterSubmitButton from "../components/parts/RegisterSubmitButton";
import RegisterEmailInput from "../components/parts/RegisterEmailInput";
import RegisterNameInput from "../components/parts/RegisterNameInput";

interface passwordCriteria {
  charCount: boolean;
  specialChar: boolean;
  upperChar: boolean;
  lowerChar: boolean;
  number: boolean;
}

const symbolRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
const upperCharacterRegex = /[A-Z]/;
const lowerCharacterRegex = /[a-z]/;
const numberRegex = /[0-9]/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterPage: React.FC = () => {
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
    <form
      action="POST"
      className="w-full mx-auto my-2 max-w-6xl bg-gray-100 border border-gray-300 dark:bg-gray-100 shadow-2xl rounded px-8 pt-6 pb-8 mb-4"
    >
      <RegisterEmailInput email={email} handleOnChange={handleOnChange} />

      <RegisterNameInput name={name} handleOnChange={handleOnChange} />

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
  );
};

export default RegisterPage;
