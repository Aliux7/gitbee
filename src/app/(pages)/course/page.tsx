"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import DDMenu from "@/app/components/DDMenu";
import { BsCalendar4Range } from "react-icons/bs";
import DDMenuSemester from "@/app/components/DDMenuSemester";
import Card from "@/app/components/Card";
import Link from "next/link";

const page = () => {
  const { scrollYProgress } = useScroll();
  const prevScrollY = useRef(0);
  const [expand, setExpand] = useState(true);

  useEffect(() => {
    scrollYProgress.onChange((currentScrollY) => {
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
    <motion.div className="relative min-h-screen flex flex-col justify-start items-center px-[6.25rem] ">
      <div
        className={`fixed top-0 w-full flex justify-center items-center transition-all ease-in-out duration-300 px-24 ${
          expand ? "pt-24" : "pt-10"
        } bg-gray-50`}
      >
        <div className="w-full border-b flex justify-between items-center pb-3">
          <div className={` ${expand ? "w-1/2" : "w-[calc(50%-5rem)]"}`}>
            <h1 className="font-montserrat text-xl text-primary-binus font-semibold">
              <span className="text-primary-orange text-lg">COMP6100001</span> -
              Software Engineering
            </h1>
          </div>
          <div
            className={`${
              expand ? "w-0" : "w-40"
            } transition-all ease-in-out duration-700 bg-transparent h-2 mx-2`}
          ></div>
          <div
            className={` ${
              expand ? "w-1/2" : "w-[calc(50%-5rem)]"
            } flex justify-end items-center`}
          >
            <div className="bg-secondary-binus text-xl font-semibold rounded-lg px-2 ">
              BG01
            </div>
          </div>
        </div>
      </div>

      <div className="h-screen"></div>
      <div className="h-screen"></div>
    </motion.div>
  );
};

export default page;
