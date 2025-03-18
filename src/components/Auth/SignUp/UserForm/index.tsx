import React, { useEffect, useState } from "react";
import Input from "@/components/Common/Input";
import PasswordInput from "@/components/Common/PasswordInput"; // Ensure the correct import path
import { validateEmail, validatePassword } from "@/helper/FormHelper";
import { signupApi } from "@/utils/api";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logoImg from "../../../../assets/images/logo.png";
import Image from "next/image";
import CommonButton from "@/components/Common/CommonButton";
import { CircularProgress } from "@mui/material";

const UserForm = ({ changeMode }: { changeMode: (email: string) => void }) => {
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const validatePassword = (password: any) => {
    if (!password) {
      return 'Password is required';
    } else if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    } else if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Password must contain at least one special character';
    } else if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    return ''; // No errors
  };

  const submit = async () => {
    const passwordError = validatePassword(formData.password);

    if (formData.firstName === "") {
      setFormError({ ...formError, firstName: "Please enter first name" });
    } else if (formData.lastName === "") {
      setFormError({ ...formError, lastName: "Please enter last name" });
    } else if (!validateEmail(formData.email)) {
      setFormError({ ...formError, email: "Please enter valid email" });
    } else if (passwordError) {
      setFormError({
        ...formError,
        password: passwordError,
      });
    } else if (formData.confirmPassword === "") {
      setFormError({
        ...formError,
        confirmPassword: "Please enter confirm password",
      });
    } else if (formData.password !== formData.confirmPassword) {
      setFormError({
        ...formError,
        confirmPassword: "Password and confirm password not match",
      });
    } else {
      try {
        setDisabled(true);
        const result = await signupApi(formData);
        if (result.status === 200) {
          setDisabled(false);
          changeMode(formData.email);
        } else {
          setDisabled(false);
          toast.error(result.error);
        }
      } catch (err) {
        console.log("Err", err);
      }
    }
  };

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        const activeElement = document.activeElement as HTMLElement;
        if (
          activeElement &&
          (activeElement.tagName === "INPUT" || activeElement.tagName === "PASSWORD")
        ) {
          submit();
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [formData]);

  return (
    <div className="mx-6 sm:mx-0 bg-white px-7 pb-8 md:pb-10 md:px-10 lg:pb-8 2xl:pt-4 xl:pb-12 xl:px-16 rounded-lg shadow-lg w-[360px]  md:w-[75%] lg:w-[460px] 2xl:w-[500px]">
      <div className="flex justify-center xl:mb-2">
        <Image
          src={logoImg}
          alt="The Box Cycle Logo"
          className="!w-[50%] md:max-w-[100%]"
        />
      </div>
      <div className="sm:h-20 h-16 mb-[3px]">
        <Input
          name="firstName"
          value={formData.firstName}
          onChange={(e) => {
            setFormError({ ...formError, firstName: "" });
            setFormData({
              ...formData,
              firstName: (e.target as HTMLInputElement).value,
            });
          }}
          error={formError.firstName}
          label="First Name"
          className={
            formError.firstName
              ? "border-[red] border-[1px] sm:h-auto h-[40px]"
              : "sm:h-auto h-[40px]"
          }
        />
      </div>
      <div className=" sm:h-20 h-16 mb-[3px]">
        <Input
          name="lastName"
          value={formData.lastName}
          onChange={(e) => {
            setFormError({ ...formError, lastName: "" });
            setFormData({
              ...formData,
              lastName: (e.target as HTMLInputElement).value,
            });
          }}
          error={formError.lastName}
          label="Last Name"
          className={
            formError.lastName
              ? "border-[red] border-[1px] sm:h-auto h-[40px]"
              : "sm:h-auto h-[40px]"
          }
        />
      </div>
      <div className="sm:h-20 h-16 mb-[3px]">
        <Input
          name="email"
          value={formData.email}
          onChange={(e) => {
            setFormError({ ...formError, email: "" });
            setFormData({
              ...formData,
              email: (e.target as HTMLInputElement).value,
            });
          }}
          error={formError.email}
          label="Email"
          className={
            formError.email
              ? "border-[red] border-[1px] sm:h-auto h-[40px]"
              : "sm:h-auto h-[40px]"
          }
        />
      </div>
      <div className="h-16 sm:h-20 mb-[3px]">
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={(e) => {
            setFormError({ ...formError, password: "", confirmPassword: "" });
            setFormData({
              ...formData,
              password: (e.target as HTMLInputElement).value,
            });
          }}
          error={formError.password}
          label="Password"
          className={
            formError.password
              ? "border-[red] border-[1px] sm:h-auto h-[40px]"
              : "sm:h-auto h-[40px]"
          }
        />
      </div>
      <div className=" sm:h-20 h-16 mb-[3px]">
        <PasswordInput
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => {
            setFormError({ ...formError, password: "", confirmPassword: "" });
            setFormData({
              ...formData,
              confirmPassword: (e.target as HTMLInputElement).value,
            });
          }}
          error={formError.confirmPassword}
          label="Confirm Password"
          className={
            formError.confirmPassword
              ? "border-[red] border-[1px] sm:h-auto h-[40px]"
              : "sm:h-auto h-[40px]"
          }
        />
      </div>
      <CommonButton
        type="submit"
        className="w-full p-2 bg-green-800 text-white rounded-[10px] hover:bg-green-700 mb-3 lg:mb-2 xl:mb-4"
        onClick={submit}
        disabled={disabled}
      >
        {disabled ? <CircularProgress size={23} className="!text-white" /> : "Sign Up"}
      </CommonButton>
      <p className="text-center text-[12px] sm:text-[15px] xl:text-[17px]">
        Already have an account?{" "}
        <Link href={"/"} className="text-[#000000] font-semibold">
          Login
        </Link>
      </p>
      <ToastContainer />
    </div>
  );
};

export default UserForm;
