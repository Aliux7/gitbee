"use client";
import { useScroll } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const Header = () => {
  const { scrollYProgress } = useScroll();
  const prevScrollY = useRef(0);
  const [expand, setExpand] = useState(true);
  const [onTop, setOnTop] = useState(true);

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

  return (
    <div
      className={`${
        onTop ? "bg-gray-50 " : "bg-transparent"
      } fixed top-0 left-0 w-screen h-20 flex justify-center items-center xl:px-16 transition-all ease-in-out duration-700 z-50`}
    >
      <div
        className={`${
          expand ? "w-full px-10" : "w-40 px-3"
        } transition-all ease-in-out duration-700 flex justify-between items-center ${
          onTop ? "shadow-none" : "shadow-lg"
        } py-3 rounded-md bg-gray-50 overflow-hidden z-50 -translate-x-1`}
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
            <Link href="/">
              <span className="bg-gray-800 text-white px-2 rounded-md mr-1">
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
            <li className="w-20 cursor-pointer py-2 px-1 relative after:absolute after:w-0 hover:after:w-full after:h-[2px] after:bottom-0 after:left-0 after:bg-gray-800 flex justify-center items-center after:transition-all after:ease-in-out after:duration-300">
              <Link href="/">Home</Link>
            </li>
            <li className="w-20 cursor-pointer py-2 px-1 relative after:absolute after:w-0 hover:after:w-full after:h-[2px] after:bottom-0 after:left-0 after:bg-gray-800 flex justify-center items-center after:transition-all after:ease-in-out after:duration-300">
              <Link href="/explore">Explore</Link>
            </li>
            <li className="w-20 cursor-pointer py-2 px-1 relative after:absolute after:w-0 hover:after:w-full after:h-[2px] after:bottom-0 after:left-0 after:bg-gray-800 flex justify-center items-center after:transition-all after:ease-in-out after:duration-300">
              <Link href="/support">Support</Link>
            </li>
            <button className="relative border border-gray-800 bg-transparent ml-1 px-5 py-2.5 text-gray-800 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-bottom-right before:scale-y-0 before:scale-x-0 before:bg-gray-800 before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-y-100 before:hover:scale-x-100 rounded-md before:rounded-sm overflow-hidden">
              Login
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
