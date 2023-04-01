import React from "react";

interface Props {
  children: string;
  onClick?: () => void;
}

function Button({ children, onClick }: Props) {
  return (
    <div className="px-10 py-2 box-border relative h-12">
      <button
        onClick={onClick}
        className="bg-white font-semibold absolute top-0 left-0 px-10 py-2 mb-2 rounded-lg box-border outline-4 border-2 border-sky-400 text-sky-400 border-b-sky-600 border-l-sky-600 active:bg-sky-300 hover:border-b-4 hover:border-l-4 hover:bg-sky-400 hover:text-white hover:border-b-sky-600 hover:border-l-sky-600 transition-all duration-75 ease-in-out hover:translate-x-0.5 hover:-translate-y-0.5"
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
