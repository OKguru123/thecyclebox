"use client";

import { useState } from "react";
import eyeHide from "../../../assets/images/eye-hide.png";
import eyeShow from "../../../assets/images/eye-show.png";
import Image from "next/image";

interface IInput {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | false;
  label: string;
  className?: string;
  name: string;
}

const PasswordInput = (props: IInput) => {
  const { value, onChange, error, label, className, name } = props;
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="input-group relative !mb-1">
        <input
          type={showPassword ? "text" : "password"}
          autoComplete="off"
          placeholder=""
          value={value}
          onChange={onChange}
          className={`w-full p-[12px] outline-none border border-black mt-1 rounded-[10px] h-auto  ${className}`}
          name={name} // Ensure the name attribute is passed
        />
        <label className="absolute left-3 top-2 transform -translate-y-1/2 bg-white px-1 text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-700 font-light text-[14px] sm:text-base">
          {label}
        </label>
        <button
          type="button"
          onClick={handleTogglePassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {!showPassword ? (
            <Image src={eyeHide} alt="img" />
          ) : (
            <Image src={eyeShow} alt="img" />
          )}
        </button>
      </div>
      {error && <p className="text-[red] ml-1 text-[9px] sm:text-[12px]">{error}</p>}
    </>
  );
};

export default PasswordInput;