"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useRouter } from "next/navigation";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push('/', { scroll: false })
    }
  }, [])
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-100 overflow-hidden">
      <div className="flex h-screen">
        <Sidebar isOpen={isOpen} toggleDrawer={toggleDrawer} />
        <div className="flex flex-col flex-grow ">
          <Header toggleDrawer={toggleDrawer} />
          <div className="h-full overflow-y-scroll overflow-x-hidden">
            <main className="flex-grow p-6 ">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;