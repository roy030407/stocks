import * as React from "react";
import { cva } from "clsx";

const buttonVariants = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-300 text-gray-900 bg-white hover:bg-gray-100",
  secondary: "bg-gray-700 text-white hover:bg-gray-800",
  ghost: "bg-transparent hover:bg-gray-100 text-gray-900",
};

const Button = React.forwardRef(
  (
    { className = "", variant = "default", size = "md", ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${buttonVariants[variant] || buttonVariants.default} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
export { Button }; 