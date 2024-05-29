import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  custom?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  text,
  children,
  className,
  custom,
  ...props
}) => (
  <button
    {...props}
    className={`${className} ${
      custom
        ? className + " bg-rose-700 hover:bg-rose-800"
        : "inline-flex items-center px-4 py-0.5 text-base font-medium text-center rounded-lg bg-rose-700 hover:bg-rose-800 border-4 border-transparent hover:border-gray-800 hover:ring-2 hover:outline-none hover:ring-rose-600"
    }`}
  >
    {text || children}
  </button>
);

export default Button;
