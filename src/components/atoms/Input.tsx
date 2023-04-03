import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

function Input({
  type = "text",
  placeholder,
  className,
  value,
  onChange,
  ...rest
}: Props) {
  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={`border-b-2 outline-none ${className ? className : "pl-2"}`}
      {...rest}
    />
  );
}

export default Input;
