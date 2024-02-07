import React, { ChangeEvent } from "react";

interface Props {
  name: string;
  handleOnChange: (
    inputType: "email" | "password" | "name" | "confirmPassword",
    e: ChangeEvent<HTMLInputElement>
  ) => void;
}
const RegisterNameInput: React.FC<Props> = ({ name, handleOnChange }) => {
  return (
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
  );
};

export default RegisterNameInput;
