"use client";
import React, { useEffect, useRef, useState } from "react";
import { Hero } from "../components/home/Hero";
import Card from "../components/Card";
import { motion, useScroll } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import DDMenu from "../components/DDMenu";

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
        (currentScrollY - prevScrollY.current > 0.1 &&
          currentScrollY - prevScrollY.current > 0.15) ||
        (currentScrollY - prevScrollY.current < -0.1 &&
          currentScrollY - prevScrollY.current < -0.15)
      ) {
        prevScrollY.current = currentScrollY;
      }
    });
  }, [scrollYProgress]);

  return (
    <motion.div className="relative min-h-screen flex flex-col gap-10 pt-28 px-16">
      <div
        className={`sticky ${
          expand ? "top-28" : "top-7"
        } w-full flex justify-between items-center gap-5 px-9 h-14 transition-all ease-in-out duration-300 bg-gray-50`}
      >
        <div className="relative w-full flex justify-start items-center h-full">
          <CiSearch
            className="absolute ml-3 w-7 h-7 pr-2 border-r"
            fill="#6B7280"
          />
          <input
            type="text"
            placeholder="Search"
            className={`border ${
              expand ? "w-full" : "w-[35.5rem]"
            } h-full p-3 px-12 rounded-md`}
          />
        </div>
        <div className="relative w-fit flex justify-end items-center h-full gap-5">
          <DDMenu
            options={["Category 1", "Category 2", "Category 3"]}
            filter="Category"
          />
          <DDMenu
            options={["Computer Science", "Sistem Information"]}
            filter="Major"
          />
          <DDMenu
            options={["2024", "2023", "2022", "2021", "2020"]}
            filter="Year"
          />
        </div>
      </div>
      <div className="h-screen">1</div>
      <div className="h-screen">2</div>
      <div className="h-screen">3</div>
    </motion.div>
  );
};

export default page;
