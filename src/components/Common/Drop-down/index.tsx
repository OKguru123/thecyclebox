import React, { useEffect, useRef, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface DropdownProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  width?: string;
  height?: string;
  divClasses?: string; // Wrapper div classes
  buttonClasses?: string; // Button classes
  menuClasses?: string; // Dropdown menu classes
  optionClasses?: string; // Option classes
  error?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selected,
  onChange,
  width = "auto",
  height = "auto",
  divClasses = "",
  buttonClasses = "",
  menuClasses = "",
  optionClasses = "",
  error = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`relative ${divClasses}`}
      style={{ width }}
    >
      <button
        type="button"
        onClick={handleButtonClick}
        className={`flex items-center justify-between w-full px-4 py-2 border rounded-lg focus:outline-none ${buttonClasses} ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-black focus:border-green-500"
        }`}
        style={{ height }}
      >
        <span>{selected}</span>
        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </button>
      {isOpen && (
        <ul
          className={`absolute left-0 mt-1 w-full border rounded-lg bg-white z-10 ${menuClasses}`}
        >
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`px-4 py-2 cursor-pointer ${
                selected === option ? "bg-green-400" : ""
              } ${optionClasses}`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      {error && (
        <span className="block text-red-500 text-sm mt-1">{error}</span>
      )}
    </div>
  );
};

export default Dropdown;
