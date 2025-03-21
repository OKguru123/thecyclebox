"use client";
import React, { useEffect, useState, useRef } from "react";
import Logo from "../../assets/images/the-box-cycle-logo.png";
import Dashboard from "../../assets/images/dashboard.png";
import Gift from "../../assets/images/gift.png";
import Profile from "../../assets/images/profile.png";
import Setting from "../../assets/images/settings.png";
import Logout from "../../assets/images/logout.png";
import giftSvg from "../../assets/images/giftSvg.svg";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import RecycleLoader from "../Common/Loader";

interface SidebarProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleDrawer }) => {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarRef = useRef<HTMLElement | null>(null);
  const [role, setRole] = useState<number | undefined>();
  const [isSettingsRotated, setIsSettingsRotated] = useState(false);
  const [isGiftOpen, setIsGiftOpen] = useState(false);

  // Navigation arrays
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
      alt: "Gift",
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

  // Normalize pathname: remove trailing slash if present
  const normalizedPathname =
    pathname !== "/" && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  // Set default route based on role
  const defaultRoute = role === 2 ? "/admin/dashboard" : "/dashboard";

  // Automatic redirection only when path is "/"
  useEffect(() => {
    if (role !== undefined && normalizedPathname === "/dashboard") {
      router.replace(defaultRoute);
    }
  }, [normalizedPathname, defaultRoute, role, router]);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      setRole(userObj.roleId);
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

  // Choose nav items based on role
  const navItems = role === 2 ? admin : user;

  return (
    <div className="flex h-full items-center justify-center">
      <aside
        ref={sidebarRef}
        style={{
          background:
            "linear-gradient(176.18deg, #006838 -8.46%, #8CC63F 135.03%)",
        }}
        className={`min-w-40 lg:w-48 h-[97vh] z-10 md:z-0 fixed top-[10px] left-[10px] md:top-0 md:left-0 flex flex-col p-4 rounded-2xl items-center transform ${
          isOpen ? "translate-x-0" : "-translate-x-[111%]"
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
          {navItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleNavigation(item.href)}
              className={`text-white flex items-center space-x-2 text-[13px] cursor-pointer p-[9px] rounded-lg ${
                normalizedPathname === item.href
                  ? "bg-[#7bf09c75]"
                  : "bg-transparent hover:bg-[#bfc5dd75]"
              }`}
            >
              {item.label === "Settings" || item.label === "Machines" ? (
                <div
                  className={`transition-transform duration-300 ease-in-out ${
                    isSettingsRotated ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    className="w-4 2xl:w-6"
                  />
                </div>
              ) : item.label === "Gift" ? (
                <div>
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
            onClick={logout}
            className="text-white flex items-center space-x-2 mt-auto text-[13px] absolute bottom-2 bg-transparent hover:bg-[#656f8a75] p-[9px] rounded-lg"
          >
            <Image src={Logout} alt="Logout" className="w-4 2xl:w-6" />
            <span className="xl:text-[15px] 2xl:text-[16px] w-24">Logout</span>
          </a>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
