"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Sidebar from "@/components/PageLayout/Sidebar";
import Header from "@/components/PageLayout/Header";
import { getLocalStorage } from "@/utils/helperFunctions";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = getLocalStorage();

  const router = useRouter()
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push('/', { scroll: false })
    }
  }, [])
  const [isOpen, setIsOpen] = useState(false); ``

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-100 overflow-hidden">
      <div className="flex h-screen md:pl-3">
        <Sidebar isOpen={isOpen} toggleDrawer={toggleDrawer} />
        <div className="flex flex-col flex-grow overflow-x-auto ">
          <Header toggleDrawer={toggleDrawer} />
          <div className="h-full overflow-y-scroll overflow-x-hidden">
            <main className="flex-grow p-6 ">  {user?.roleId === 2 ? children : <></>}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;