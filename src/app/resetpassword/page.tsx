"use client";
import ResetPassword from "@/components/Auth/resetpassword/ResetPassword";
import { loginApi } from "@/utils/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import leftImg from "../../assets/images/left.png";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/dashboard", { scroll: false });
    }
  });
  const [mode, setMode] = useState(true);
  const sendOtp = async (email: string) => {
    const result = await loginApi({ email: email });
    if (result.status === 200) {
      setEmail(email);
      setMode(false);
    } else {
      toast.error(result.error);
    }
  };
  return (
    <div className="h-screen bg-gradient">
      <div className="flex h-full items-center justify-center">
        <div className=" w-[40%] hidden md:block">
          <Image src={leftImg} className="object-cover" alt="Globe side" />
        </div>
        <div className="flex-1 flex items-center justify-center md:w-82% w-[100%]">
          {/* {mode ? <ForgotePassword sendOtp={sendOtp} /> : <Otp email={email} />} */}
          <ResetPassword />
        </div>
      </div>
    </div>
  );
}
