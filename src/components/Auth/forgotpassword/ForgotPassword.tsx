"use client";
import CommonButton from "@/components/Common/CommonButton";
import Input from "@/components/Common/Input";
import { validateEmail } from "@/helper/FormHelper";
import { loginApi } from "@/utils/api";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logoImg from "../../../assets/images/logo.png";

interface VerifyProps {
  setEmail: (email: string) => void; // Add the proper type for setIEmail
  setMode: (email: boolean) => void; // Add the proper type for setIEmail
  email: string;
}

const ForgotePassword = ({ setEmail, email, setMode }: VerifyProps) => {
  const router = useRouter();
  // const [email, setEmail] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/dashboard", { scroll: false });
    }
  }, [router]);

  const sendOtp = async (email: string) => {
    const result = await loginApi({ email: email });
    if (result.status === 200) {
      console.log("result", result);
      toast.success("OTP Send Successfully");
      setEmail(email);
      setDisabled(false);
      setMode(false);
    } else {
      toast.error(result.error);
      setDisabled(false);
    }
  };

  const submit = async () => {
    if (validateEmail(email)) {
      setDisabled(true);
      setError(false);
      sendOtp(email);
    } else {
      setError(true);
    }
  };

  return (
    <div className="mx-6 sm:mx-0 bg-white px-7 pb-8 md:pb-10 md:px-10 lg:pb-8 2xl:pt-4 xl:pb-12 xl:px-16 rounded-lg shadow-lg w-[360px]  md:w-[75%] lg:w-[460px] 2xl:w-[500px]">
      <div className="flex justify-center xl:mb-2 ">
        <Image
          src={logoImg}
          alt="The Box Cycle Logo"
          className="!w-[50%] md:max-w-[100%]"
        />
      </div>
      {/* <div className="w-1/2"> */}
      <h1 className="text-[20px] md:text-[24px] xl:text-[32px] font-medium text-center ">
        Forgot Password
      </h1>
      <p className="text-center mb-6 lg:mb-2 xl:mb-10 font-normal text-[11px] sm:text-[14px] xl:text-[16px]">
        Enter your email address and we’ll send you a code to reset your
        password
      </p>
      {/* </div> */}
      <div className="mb-2 xl:mb-10 sm:h-20 h-16">
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
        className="w-full flex justify-center items-center p-2 bg-green-800 text-white rounded-[10px] hover:bg-green-700 mb-3 lg:mb-2 xl:mb-4"
        onClick={submit}
        disabled={disabled}
      >
        {disabled ? (
          <CircularProgress size={23} className="!text-white" />
        ) : (
          "Send OTP"
        )}
      </CommonButton>
    </div>
  );
};

export default ForgotePassword;
