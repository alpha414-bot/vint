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
  disabled,
  ...props
}) => (
  <button
    {...props}
    disabled={disabled}
    className={`${className} ${
      custom
        ? className + " bg-rose-700 hover:bg-rose-800"
        : `inline-flex items-center px-4 py-0.5 text-base font-medium text-center rounded-lg ${
            disabled
              ? "cursor-not-allowed bg-gray-400"
              : "bg-rose-700 hover:bg-rose-800 hover:border-gray-800 hover:ring-2 hover:outline-none hover:ring-rose-600"
          }  border-4 border-transparent`
    }`}
  >
    {text || children}
  </button>
);

export default Button;
