"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Input from "../Common/Input";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/helper/FormHelper";
import logoImg from "../../assets/images/logo.png";
import Image from "next/image";
import CommonButton from "../Common/CommonButton";
import { loginApi } from "@/utils/api";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

interface VerifyProps {
  setEmail: (email: string) => void; // Add the proper type for setIEmail
  setMode: (email: boolean) => void; // Add the proper type for setIEmail
  email: string;
}

const Login = ({ setEmail, email, setMode }: VerifyProps) => {
  // const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const sendOtp = async (email: string) => {
    const result = await loginApi({ email: email });
    if (result.status === 200) {
      toast.success("OTP Send Successfully");
      setEmail(email);
      setDisabled(false);
      setMode(false);
    } else {
      toast.error(result.error);
      setDisabled(false);
    }
  };

  const submit = () => {
    if (validateEmail(email)) {
      setDisabled(true);
      setError(false);
      sendOtp(email);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        const activeElement = document.activeElement as HTMLElement;
        if (
          activeElement &&
          activeElement.tagName === "INPUT" &&
          activeElement.getAttribute("name") === "email"
        ) {
          submit();
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [email]);

  return (
    <div className="mx-6 sm:mx-0 bg-white px-7 pb-8 md:pb-10 md:px-10 lg:pb-8 2xl:pt-4 xl:pb-12 xl:px-16 rounded-lg shadow-lg w-[360px]  md:w-[75%] lg:w-[460px] 2xl:w-[500px]">
      <div className="flex justify-center xl:mb-2 ">
        <Image
          src={logoImg}
          alt="The Box Cycle Logo"
          className="!w-[50%] md:max-w-[100%]"
        />
      </div>
      <h1 className="text-[24px] md:text-[28px] xl:text-[35px] font-medium text-center text-[#089448]">
        Login
      </h1>
      <p className="text-center mb-5 lg:mb-6 xl:mb-10  text-[15px] xl:text-[16px] font-inter ">
        Please login to continue to your account
      </p>
      <div className="mb-1 xl:mb-3 sm:h-20 h-16">
        <Input
          name="email"
          value={email}
          onChange={(e) => {
            if (validateEmail((e.target as HTMLInputElement).value)) {
              setError(false);
            }
            setEmail((e.target as HTMLInputElement).value);
          }}
          error={error ? "Please enter valid email address" : ""}
          label="Email"
          className={
            error
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
        {disabled ? (
          <CircularProgress size={23} className="!text-white" />
        ) : (
          "Send OTP"
        )}
      </CommonButton>
      <div className="flex items-center justify-center mb-4 lg:mb-2 xl:mb-4">
        <span className="border-t border-gray-300 flex-grow mr-2"></span>
        <span className="text-gray-500">or</span>
        <span className="border-t border-gray-300 flex-grow ml-2"></span>
      </div>
      <CommonButton
        className="w-full p-2 border-2 border-green-800 text-green-800 rounded-[10px] hover:bg-gray-100 mb-4 text-xs md:text-sm xl:text-base 2xl:text-lg"
        onClick={() => {
          router.push("/login");
        }}
      >
        {"Login with Email and Password"}
      </CommonButton>
      <p className="text-center text-[12px] sm:text-[15px] xl:text-[17px] font-inter">
        {" Don't have an account yet? "}
        <Link href={"/signup"} className="text-[#000000] font-semibold">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
