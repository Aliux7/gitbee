"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useMsal } from "@azure/msal-react";
import { useScroll } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";

const Header = () => {
  const { userData } = useAuth();
  const { instance, inProgress, accounts } = useMsal();
  const { scrollYProgress } = useScroll();
  const prevScrollY = useRef(0);
  const [expand, setExpand] = useState(true);
  const [onTop, setOnTop] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    scrollYProgress.onChange((currentScrollY) => {
      if (currentScrollY == 0) setOnTop(true);
      else if (currentScrollY != 0) setOnTop(false);

      if (currentScrollY < 0.1) setExpand(true);
      else if (currentScrollY > prevScrollY.current) setExpand(false);
      else if (currentScrollY < prevScrollY.current) setExpand(true);

      if (
        currentScrollY - prevScrollY.current > 0.15 ||
        currentScrollY - prevScrollY.current < -0.15
      ) {
        prevScrollY.current = currentScrollY;
      }
    });
  }, [scrollYProgress]);

  const loginMicrosoft = async () => {
    const loginRequest = {
      scopes: ["user.read"],
      prompt: "select_account",
    };

    instance.loginRedirect(loginRequest).catch((error: any) => {
      console.error(error);
    });
  };

  const logoutMircosoft = async () => {
    instance.logoutRedirect();
    Cookies.remove("token");
  };

  return (
    <div
      className={`${
        onTop ? "bg-gray-50" : "bg-transparent"
      } fixed top-0 left-0 w-screen h-20 flex justify-center items-center xl:px-16 transition-all ease-in-out duration-700 z-50 pointer-events-none`}
    >
      <div
        className={`${
          expand ? "w-full px-10" : "w-40 px-3"
        } transition-all ease-in-out duration-700 flex justify-between items-center ${
          onTop ? "shadow-none" : "shadow-lg"
        } py-3 rounded-md bg-gray-50 overflow-hidden z-50 -translate-x-1 pointer-events-auto`}
        onMouseEnter={() => setExpand(true)}
      >
        <div
          className={`${
            expand ? "w-40" : "w-full"
          } flex justify-center items-center transition-all ease-in-out duration-700`}
        >
          <h1
            className={`font-montserrat font-bold text-2xl text-gray-800 ${
              expand ? "text-start" : "text-center"
            } w-40`}
          >
            <Link href="/" className="text-primary-binus">
              <span className="bg-primary-binus text-white px-2 rounded-md mr-1">
                Git
              </span>
              Bee
            </Link>
          </h1>
        </div>
        <div
          className={`${
            expand ? "w-auto" : "w-0 overflow-x-hidden"
          } lg:block hidden`}
        >
          <ul className="flex justify-center items-center gap-5">
            {!userData && (
              <ul className="flex justify-center items-center gap-5">
                <Link href="/">
                  <li className="w-20 cursor-pointer py-2 px-1 relative after:absolute after:w-0 hover:after:w-full after:h-[2px] after:bottom-0 after:left-0 after:bg-primary-binus flex justify-center items-center after:transition-all after:ease-in-out after:duration-300">
                    Home
                  </li>
                </Link>
                <Link href="/explore">
                  <li className="w-20 cursor-pointer py-2 px-1 relative after:absolute after:w-0 hover:after:w-full after:h-[2px] after:bottom-0 after:left-0 after:bg-primary-binus flex justify-center items-center after:transition-all after:ease-in-out after:duration-300">
                    Explore
                  </li>
                </Link>
              </ul>
            )}
            {userData && userData.role === "Student" && (
              <ul className="flex justify-center items-center gap-5">
                <Link href="/dashboard">
                  <li className="w-28 cursor-pointer py-2 px-1 relative after:absolute after:w-0 hover:after:w-full after:h-[2px] after:bottom-0 after:left-0 after:bg-primary-binus flex justify-center items-center after:transition-all after:ease-in-out after:duration-300">
                    Dashboard
                  </li>
                </Link>
                <Link href="/explore">
                  <li className="w-20 cursor-pointer py-2 px-1 relative after:absolute after:w-0 hover:after:w-full after:h-[2px] after:bottom-0 after:left-0 after:bg-primary-binus flex justify-center items-center after:transition-all after:ease-in-out after:duration-300">
                    Explore
                  </li>
                </Link>
              </ul>
            )}
            {userData && userData.role === "Lecturer" && (
              <ul className="flex justify-center items-center gap-5">
                <Link href="/dashboard-lecturer">
                  <li className="w-28 cursor-pointer py-2 px-1 relative after:absolute after:w-0 hover:after:w-full after:h-[2px] after:bottom-0 after:left-0 after:bg-primary-binus flex justify-center items-center after:transition-all after:ease-in-out after:duration-300">
                    Dashboard
                  </li>
                </Link>
                <Link href="/history-lecturer">
                  <li className="w-20 cursor-pointer py-2 px-1 relative after:absolute after:w-0 hover:after:w-full after:h-[2px] after:bottom-0 after:left-0 after:bg-primary-binus flex justify-center items-center after:transition-all after:ease-in-out after:duration-300">
                    History
                  </li>
                </Link>
              </ul>
            )}
            {userData && userData.role === "Scc" && (
              <ul className="flex justify-center items-center gap-5">
                <Link href="/dashboard-scc">
                  <li className="w-28 cursor-pointer py-2 px-1 relative after:absolute after:w-0 hover:after:w-full after:h-[2px] after:bottom-0 after:left-0 after:bg-primary-binus flex justify-center items-center after:transition-all after:ease-in-out after:duration-300">
                    Dashboard
                  </li>
                </Link>
                <Link href="/explore">
                  <li className="w-20 cursor-pointer py-2 px-1 relative after:absolute after:w-0 hover:after:w-full after:h-[2px] after:bottom-0 after:left-0 after:bg-primary-binus flex justify-center items-center after:transition-all after:ease-in-out after:duration-300">
                    Explore
                  </li>
                </Link>
              </ul>
            )}
            {userData && userData.role === "HOP" && (
              <ul className="flex justify-center items-center gap-5">
                <Link href="/dashboard-lecturer">
                  <li className="w-28 cursor-pointer py-2 px-1 relative after:absolute after:w-0 hover:after:w-full after:h-[2px] after:bottom-0 after:left-0 after:bg-primary-binus flex justify-center items-center after:transition-all after:ease-in-out after:duration-300">
                    Unreview
                  </li>
                </Link>
                <Link href="/history-lecturer">
                  <li className="w-20 cursor-pointer py-2 px-1 relative after:absolute after:w-0 hover:after:w-full after:h-[2px] after:bottom-0 after:left-0 after:bg-primary-binus flex justify-center items-center after:transition-all after:ease-in-out after:duration-300">
                    Reviewed
                  </li>
                </Link>
              </ul>
            )}
            {!userData ? (
              <button
                onClick={() => loginMicrosoft()}
                className="relative border border-primary-orange bg-transparent ml-1 px-5 py-2.5 text-primary-orange transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-bottom-right before:scale-y-0 before:scale-x-0 before:bg-primary-orange before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-y-100 before:hover:scale-x-100 rounded-md before:rounded-sm overflow-hidden"
              >
                Login
              </button>
            ) : (
              <Popover>
                <PopoverTrigger className="relative border border-primary-orange p-[0.1rem] rounded-full before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-bottom-right before:scale-y-0 before:scale-x-0 before:bg-primary-orange before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-y-100 before:hover:scale-x-100 before:rounded-sm overflow-hidden">
                  <div className="bg-white rounded-full p-0.5">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                  </div>
                </PopoverTrigger>
                {expand && (
                  <PopoverContent className="flex flex-col">
                    <div className="flex justify-between items-center border-b pb-3 px-1">
                      <div className="border border-primary-orange rounded-full p-1">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                        </Avatar>
                      </div>
                      <div className="text-end">
                        <h1 className="truncate w-32 capitalize">
                          {userData.name.toLowerCase()}
                        </h1>
                        <h3 className="truncate w-32 text-sm text-primary-orange">
                          {userData.nim}
                        </h3>
                      </div>
                    </div>
                    <div className="bg-gray-50 py-2 px-2 rounded-md my-3">
                      <ul className="flex flex-col justify-center items-center gap-1">
                        <Link href="/profile" className="w-full">
                          <li className="hover:bg-white/90 rounded-md w-full cursor-pointer py-2 flex justify-between items-center px-3 hover:text-primary-orange group ">
                            <FaUser className="group-hover:fill-primary-orange" />
                            Profile
                          </li>
                        </Link>
                        <li
                          className="hover:bg-white/90 rounded-md w-full cursor-pointer py-2 flex justify-between items-center px-3 hover:text-primary-orange group "
                          onClick={() => logoutMircosoft()}
                        >
                          <IoLogOut className="w-5 h-5 group-hover:fill-primary-orange" />
                          Logout
                        </li>
                      </ul>
                    </div>
                  </PopoverContent>
                )}
              </Popover>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
