"use client";

import Otp from "@/components/Auth/SignUp/Otp";
import { loginApi } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import leftImg from "../../assets/images/left.png";
import Image from "next/image";
import ForgotePassword from "@/components/Auth/forgotpassword/ForgotPassword";
import OtpVerify from "@/components/Auth/otpverify/OtpVeryfy";

export default function Home() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    useEffect(() => {
        if (localStorage.getItem("token")) {
            router.push("/dashboard", { scroll: false });
        }
    });
    const [mode, setMode] = useState(true);

    return (
        <div className="h-screen bg-gradient">
            <div className="flex h-full items-center justify-center">
                <div className=" w-[40%] hidden md:block">
                    <Image src={leftImg} className="object-cover" alt="Globe side" />
                </div>
                <div className="flex-1 flex items-center justify-center md:w-82% w-[100%]">
                    {mode ? <ForgotePassword setEmail={setEmail} setMode={setMode} email={email} /> : <OtpVerify email={email} />}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
