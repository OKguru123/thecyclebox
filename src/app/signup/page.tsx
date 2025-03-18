"use client";
import Otp from "@/components/Auth/SignUp/Otp";
import UserForm from "@/components/Auth/SignUp/UserForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import leftImg from "../../assets/images/left.png";
import Image from "next/image";

export default function Signup() {
  const [formMode,setFormMode] = useState(false);
  const [email,setEmail] = useState("");
  const router = useRouter()
  useEffect(()=>{
    if(localStorage.getItem("token")) {
      router.push('/dashboard', { scroll: false })
    }
  })
  return (<div className="h-screen bg-gradient">
  <div className="flex h-full items-center justify-center">
    <div className=" w-[40%] hidden md:block">
      <Image src={leftImg} className="object-cover" alt="Globe side" />
    </div>
    <div className="flex-1 flex items-center justify-center md:w-82% w-[100%]">
        {formMode ? 
        <Otp email={email} /> : 
        <UserForm changeMode={(email:string)=>{
            setEmail(email); 
            setFormMode(true)
            }} 
        />}
    </div>
  </div>
</div>);
}
