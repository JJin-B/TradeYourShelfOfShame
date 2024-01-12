import React from "react";

interface Props {
    price: number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const PostPrice: React.FC<Props> = ({price,onChange}) => {
  return (
    <div className="flex flex-col flex-wrap mb-2">
      <label
        htmlFor="price"
        className="mr-2 font-medium text-gray-900 dark:text-white"
      >
        Price
      </label>
      <input
        id="price"
        name="price"
        type="number"
        aria-describedby="helper-text-explanation"
        className="w-36 px-3 py-2 bg-gray-100 border-2 border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        min={0}
        step={0.01}
        pattern="\d+(\.\d{0,2})?"
        inputMode="numeric"
        onKeyDown={(e) => {
          if (e.key === "-" || e.key === "e") {
            e.preventDefault();
          }
        }}
        value={price}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default PostPrice;
