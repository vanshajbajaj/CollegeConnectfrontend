import { useEffect, useState } from "react";

const Input = ({
  id,
  label,
  value,
  onChange,
  isValid = false,
  type = "text",
  className = "",
  hasLabel = true,
}) => {
  const [isTouched, setIsTouched] = useState(false);

  const blurHandler = () => {
    setIsTouched(true);
  };

  const changeHandler = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className={className}>
      {hasLabel && (
        <label htmlFor={id} className="text-lg font-bold text-gray-300">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
        className={`py-1 px-2 w-full bg-[#1b1b1b7c] text-white border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${
          !isValid && isTouched && "border-red-500"
        }`}
      />
      {/* {!isValid && isTouched && (
        <p className="text-red-500 text-sm">
          Please enter a valid {label.toLowerCase()}.
        </p>
      )} */}
    </div>
  );
};

export default Input;
