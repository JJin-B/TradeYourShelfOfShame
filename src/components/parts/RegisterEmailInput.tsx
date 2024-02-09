import { ChangeEvent } from "react";

interface RegisterEmailInputProps {
  email: string;
  handleOnChange: (
    inputType: "email" | "password" | "name" | "confirmPassword",
    e: ChangeEvent<HTMLInputElement>
  ) => void;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterEmailInput: React.FC<RegisterEmailInputProps> = ({
  email,
  handleOnChange,
}) => {
  return (
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
  );
};

export default RegisterEmailInput;
