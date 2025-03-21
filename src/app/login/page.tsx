"use client";
import PasswordInput from "@/components/Common/PasswordInput";
import CommonButton from "@/components/Common/CommonButton";
import Input from "@/components/Common/Input";
import { validateEmail } from "@/helper/FormHelper";
import { loginWithPasswordApi } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import leftImg from "../../assets/images/left.png";
import logoImg from "../../assets/images/logo.png";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/dashboard", { scroll: false });
    }
  }, [router]);

  const submit = async () => {
    if (!validateEmail(email)) {
      setError({ ...error, email: "Please enter valid email" });
    } else if (password === "") {
      setError({ ...error, password: "Please enter valid password" });
    } else {
      setDisabled(true);
      const result = await loginWithPasswordApi({
        email: email,
        password: password,
      });
      if (result.status === 200) {
        localStorage.setItem("token", result.body.token);
        localStorage.setItem("userInfo", JSON.stringify(result.body.user));
        if (result.body.user.roleId === 2) {
          router.push("/admin/dashboard", { scroll: false });
        } else {
          router.push("/dashboard", { scroll: false });
        }
        setDisabled(false);
      } else {
        toast.error(result.error);
        setDisabled(false);
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
          (activeElement.tagName === "INPUT" ||
            activeElement.tagName === "PASSWORD")
        ) {
          submit();
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [email, password]);

  return (
    <div className="h-screen bg-gradient">
      <div className="flex h-full items-center justify-center">
        <div className=" w-[40%] hidden md:block">
          <Image src={leftImg} className="object-cover" alt="Globe side" />
        </div>
        <div className="flex-1 flex items-center justify-center md:w-82% w-[100%]">
          <div className="mx-6 sm:mx-0 bg-white px-7 pb-8 md:pb-10 md:px-10 lg:pb-8 2xl:pt-4 xl:pb-12 xl:px-16 rounded-lg shadow-lg w-[360px]  md:w-[75%] lg:w-[460px] 2xl:w-[500px]">
            <div className="flex justify-center xl:mb-2">
              <Image
                src={logoImg}
                alt="The Box Cycle Logo"
                className="!w-[50%] md:max-w-[100%]"
              />
            </div>
            <h1 className="text-[24px] md:text-[28px] xl:text-[32px] font-medium text-center  w-full text-[#089448]">
              Login
            </h1>
            <p className="text-center mb-6 lg:mb-2 xl:mb-10 font-inter text-[14px] xl:text-[16px]">
              Please login to continue to your account
            </p>
            <div className="h-16 mb-[1.2rem]">
              <Input
                name="email"
                value={email}
                onChange={(e) => {
                  if (validateEmail((e.target as HTMLInputElement).value)) {
                    setError({ ...error, email: "" });
                  }
                  setEmail((e.target as HTMLInputElement).value);
                }}
                error={error.email}
                label="Email"
                className={""}
              />
            </div>
            <div className="mb-4 h-16 mb-[2.5rem]">
              <PasswordInput
                name="password"
                value={password}
                onChange={(e) => {
                  setError({ ...error, password: "" });
                  setPassword((e.target as HTMLInputElement).value);
                }}
                error={error.password}
                label="Password"
                className={""}
              />
              <div className="flex justify-end xl:text-sm text-xs mr-1 font-semibold">
                <Link href={"/forgotpassword"}>Forgot Password?</Link>
              </div>
            </div>
            <CommonButton
              type="submit"
              className="w-full p-2 bg-green-800 text-white rounded-[10px] hover:bg-green-700 mb-2 lg:mb-2 xl:mb-4"
              onClick={submit}
              disabled={disabled}
            >
              {disabled ? (
                <CircularProgress size={23} className="!text-white" />
              ) : (
                "Login"
              )}
            </CommonButton>
            <div className="flex items-center justify-center xl:mb-4 mb-2">
              <span className="border-t border-gray-300 flex-grow mr-2"></span>
              <span className="text-gray-500">or</span>
              <span className="border-t border-gray-300 flex-grow ml-2"></span>
            </div>

            <CommonButton
              className="w-full p-2 border-2 border-green-800 text-green-800 rounded-[10px] hover:bg-gray-100 mb-4"
              onClick={() => {
                router.push("/");
              }}
            >
              Login with OTP
            </CommonButton>
            <p className="text-center text-[11px] sm:text-[15px] xl:text-[17px] font-inter">
              {" Don't have an account yet? "}
              <Link href={"/signup"} className="text-[#000000] font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
