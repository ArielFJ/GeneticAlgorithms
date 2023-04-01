import React from "react";
import Input from "./Input";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

function Slider(props: Props) {
  return (
    <Input
      type="range"
      className="mt-4 pl-0 transparent h-1.5 cursor-pointer appearance-none rounded-lg border-transparent bg-sky-300"
      {...props}
    />
  );
}

export default Slider;
