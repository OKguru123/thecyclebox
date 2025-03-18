"use client";
import React, { useEffect, useState, useRef } from "react";
import Logo from "../../assets/images/the-box-cycle-logo.png";
import Dashboard from "../../assets/images/dashboard.png";
import Gift from "../../assets/images/gift.png";
import Map from "../../assets/images/map.png";
import Profile from "../../assets/images/profile.png";
import Setting from "../../assets/images/settings.png";
import Logout from "../../assets/images/logout.png";
import giftSvg from "../../assets/images/giftSvg.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RecycleLoader from "../Common/Loader";

interface SidebarProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleDrawer }) => {
  const sidebarRef = useRef<HTMLElement | null>(null);
  const [role, setRole] = useState<number | undefined>();
  const router = useRouter();
  const [isSettingsRotated, setIsSettingsRotated] = useState(false);
  const [isGiftOpen, setIsGiftOpen] = useState(false);

  const handleNavigation = (href: string) => {

    if (href === "/gift" || href === "/admin/gift") {
      setIsGiftOpen(true);
    } else {
      setIsGiftOpen(false);
    }
    if (href === "/settings" || href === "/admin/machines") {
      setIsSettingsRotated(true);
    } else {
      setIsSettingsRotated(false);
    }
    router.push(href);
    toggleDrawer();
  };

  // const toggleOpen = () => {
  //   setIsGiftOpen(!isGiftOpen);
  // };

  // const toggleRotation = () => {
  //   setIsSettingsRotated(!isSettingsRotated);
  // };

  const user = [
    {
      href: "/dashboard",
      src: Dashboard,
      label: "Dashboard",
      alt: "Dashboard",
      className: "w-4",
    },
    { href: "/gift", src: Gift, label: "Gift", alt: "Gift", className: "w-4" },
    {
      href: "/profile",
      src: Profile,
      label: "Profile",
      alt: "Profile",
      className: "w-4",
    },
    {
      href: "/settings",
      src: Setting,
      label: "Settings",
      alt: "Settings",
      className: "w-5",
    },
  ];

  const admin = [
    {
      href: "/admin/dashboard",
      src: Dashboard,
      label: "Dashboard",
      alt: "Dashboard",
      className: "w-4",
    },
    {
      href: "/admin/users",
      src: Profile,
      label: "Users",
      alt: "Users",
      className: "w-4",
    },
    {
      href: "/admin/gift",
      src: Gift,
      label: "Gift",
      alt: "Machines",
      className: "w-4",
    },
    {
      href: "/admin/machines",
      src: Setting,
      label: "Machines",
      alt: "Machines",
      className: "w-4",
    },
  ];
  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      const user = JSON.parse(String(localStorage.getItem("userInfo")));
      setRole(user.roleId);
    }
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        toggleDrawer();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleDrawer]);


  if (role === undefined) {
    return <RecycleLoader />;
  }

  const logout = () => {
    localStorage.clear();
    router.push("/", { scroll: false });
  };

  return (
    <div className="flex h-full items-center justify-center">
      <aside
        ref={sidebarRef}
        style={{
          background:
            "linear-gradient(176.18deg, #006838 -8.46%, #8CC63F 135.03%)",

        }}
        className={`min-w-40 lg:w-48 h-[97vh] z-10 md:z-0 fixed top-[10px] left-[10px] md:top-0 md:left-0 flex flex-col p-4 rounded-2xl items-center transform ${isOpen
          ? "translate-x-0"
          : "-translate-x-[111%]"
          } transition-transform duration-300 ease-in-out md:transform-none md:static`}
      >
        <p
          className="absolute top-4 right-4 cursor-pointer md:hidden text-white"
          onClick={toggleDrawer}
        >
          X
        </p>
        <Image src={Logo} alt="Logo" className="w-26 2xl:w-32 mb-10" />

        <nav className="flex flex-col space-y-1 flex-grow relative w-full">
          {role &&
            (role === 2 ? admin : user).map((item, index) => (
              <div
                onClick={() => {
                  if (item.label === "Settings" || item.label === "Machines") {
                    handleNavigation(item.href); // Ensure navigation happens
                  } else if (item.label === "Gift") {
                    handleNavigation(item.href); // Ensure navigation happens
                  } else {
                    handleNavigation(item.href); // For all other items
                  }
                }}
                key={index}
                className="text-white flex items-center space-x-2 text-[13px] cursor-pointer hover:bg-[#bfc5dd75] bg-transparent peer-active:bg-[#bfc5dd75] peer-focus:bg-[#bfc5dd75] p-[9px] rounded-lg"
              >
                {item.label === "Settings" || item.label === "Machines" ? (
                  <div
                    className={`transition-transform duration-300 ease-in-out ${isSettingsRotated ? 'rotate-180' : 'rotate-0'}`}
                  >
                    <Image src={item.src} alt={item.alt} className="w-4 2xl:w-6" />
                  </div>
                ) : item.label === "Gift" ? (
                  <div className={``}>
                    <Image
                      src={isGiftOpen ? giftSvg : Gift}
                      alt="Gift"
                      className="w-4 2xl:w-[1.4rem]"
                    />
                  </div>
                ) : (
                  <Image src={item.src} alt={item.alt} className="w-4 2xl:w-6" />
                )}
                <span className="xl:text-[15px] 2xl:text-[16px]">
                  {item.label}
                </span>
              </div>
            ))}

          <a
            href="#"
            className="text-white flex items-center space-x-2 mt-auto text-[13px] absolute bottom-2"
            onClick={logout}
          >
            <Image src={Logout} alt="Logout" className="w-4 2xl:w-6" />
            <span className="xl:text-[15px] 2xl:text-[16px]">Logout</span>
          </a>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;