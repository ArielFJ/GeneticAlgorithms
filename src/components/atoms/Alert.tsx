import React from "react";

interface Props {
  children: React.ReactNode;
  status?: "success" | "error" | "warning" | "info";
}

const colorClass = {
  success: "bg-green-300",
  error: "bg-red-300",
  warning: "bg-yellow-200",
  info: "bg-blue-300",
};

const borderClass = {
  success: "border-b-green-400 border-l-green-400",
  error: "border-b-red-400 border-l-red-400",
  warning: "border-b-yellow-400 border-l-yellow-400",
  info: "border-b-blue-400 border-l-blue-400",
};

function Alert({ children, status = "success" }: Props) {
  return (
    <div
      className={`rounded px-20 py-4 ${colorClass[status]} border-b-4 border-l-4 ${borderClass[status]}`}
    >
      {children}
    </div>
  );
}

export default Alert;
