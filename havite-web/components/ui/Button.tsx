import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "warning"
    | "success"
    | "info"
    | "error"
    | "transparent";
  size?: "small" | "medium" | "large";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "secondary",
  size = "medium",
  className,
  ...props
}) => {
  const sizeClasses = {
    small: "p-1 text-sm",
    medium: "p-2 text-sm",
    large: "p-3 text-base",
  }[size];

  const baseClasses =
    "flex flex-row items-center justify-center rounded cursor-pointer gap-1 transition-colors font-bold" +
    (props.disabled ? " opacity-50 cursor-not-allowed" : "");

  const variantClasses = {
    primary: "bg-primary-300 text-gray-100 hover:bg-primary-200",
    secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
    warning: "bg-status-warning text-gray-800 hover:bg-status-warning/80",
    success: "bg-status-success text-gray-100 hover:bg-status-success/80",
    info: "bg-status-info text-gray-100 hover:bg-status-info/80",
    error: "bg-status-error text-gray-100 hover:bg-status-error/80",
    transparent: "bg-transparent text-gray-800 hover:bg-gray-300",
  }[variant];

  const buttonStyle = sizeClasses + " " + variantClasses;

  return (
    <button {...props}>
      <div className={`${baseClasses} ${className || buttonStyle} `}>
        {children}
      </div>
    </button>
  );
};

export default Button;
