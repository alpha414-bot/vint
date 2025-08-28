import classNames from "classnames";
import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";


interface ButtonProps extends HTMLMotionProps<"button"> {
  text?: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children?: any;
}

const Button: React.FC<ButtonProps> = ({
  text,
  children,
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl focus:ring-red-500",
    secondary: "bg-red-100 hover:bg-red-200 text-red-700 shadow-md hover:shadow-lg focus:ring-red-300",
    outline: "border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white shadow-md hover:shadow-lg focus:ring-red-500",
    ghost: "text-red-600 hover:bg-red-50 focus:ring-red-300"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={classNames(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      // disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
        />
      )}
      {text || children}
    </motion.button>
  );
};

export default Button;
