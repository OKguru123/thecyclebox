import React from "react";

interface CustomButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const CommonButton: React.FC<CustomButtonProps> = ({
  type = "button",
  onClick,
  children,
  className = "",
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-3  ${className}`}
    >
      {children}
    </button>
  );
};

export default CommonButton;
