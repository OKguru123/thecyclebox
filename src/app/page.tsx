"use client";
import Login from "@/components/Auth/Login";
import Otp from "@/components/Auth/SignUp/Otp";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import leftImg from "../assets/images/left.png";
import Image from "next/image";
import { getLocalStorage } from "@/utils/helperFunctions";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const user = getLocalStorage();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log(user.roleId);

      if (user.roleId == 1) {
        router.push("/dashboard", { scroll: false });
      } else {
        router.push("/admin/dashboard", { scroll: false });
      }
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
          {mode ? (
            <Login setEmail={setEmail} setMode={setMode} email={email} />
          ) : (
            <Otp email={email} />
          )}
        </div>
      </div>
    </div>
  );
}
