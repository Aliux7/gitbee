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
  const [showDevelopers, setShowDevelopers] = useState(false);

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
    <motion.div className="relative min-h-screen flex flex-col pt-28 px-16 bg-gray-50">
      <div
        className={`bg-gray-50 fixed top-0 ${
          expand ? "h-[12.25rem]" : "h-[7rem]"
        } w-full left-0 z-10`}
      ></div>
      <div
        className={`sticky ${
          expand ? "top-28" : "top-7"
        } z-10 w-full flex justify-between items-center gap-5 px-9 h-[5.25rem] transition-all ease-in-out duration-300 bg-gray-50 pb-7`}
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
      <div className="relative h-[200vh] bg-white mx-9 rounded-md px-5 flex flex-col mb-14">
        <div
          className={`w-full h-auto bg-white sticky ${
            expand ? "top-[12.25rem]" : "top-28"
          }`}
        >
          <div className="p-2 rounded-md my-4 border text-gray-500">
            1705 Results Found
          </div>
        </div>
        <div className="flex w-full h-fit mt-3">
          <div
            className={`${
              showDevelopers ? "w-80 mr-4 border-r" : "w-0"
            } transition-all ease-in-out duration-300 h-full`}
          ></div>
          <motion.div
            className={`grid ${
              showDevelopers ? "grid-cols-3" : "grid-cols-4"
            } flex-grow h-fit gap-10 justify-center items-start`}
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.5 }}
            onClick={() => setShowDevelopers(!showDevelopers)}
          >
            <motion.div
              transition={{ duration: 0.5, delay: 0 }}
              variants={{ hidden: { opacity: 0 }, reveal: { opacity: 1 } }}
              className="w-72  bg-white border rounded-lg shadow-sm hover:shadow-lg flex flex-col justify-center gap-4 overflow-hidden p-4 cursor-pointer hover:-translate-y-3 transition-transform duration-300 ease-in-out"
            >
              <img
                src="/images/1.jpg"
                className="w-auto h-72 object-cover rounded-lg"
              />
            </motion.div>
            <motion.div
              transition={{ duration: 0.5, delay: 0 }}
              variants={{ hidden: { opacity: 0 }, reveal: { opacity: 1 } }}
              className="w-72  bg-white border rounded-lg shadow-sm hover:shadow-lg flex flex-col justify-center gap-4 overflow-hidden p-4 cursor-pointer hover:-translate-y-3 transition-transform duration-300 ease-in-out"
            >
              <img
                src="/images/2.jpg"
                className="w-auto h-72 object-cover rounded-lg"
              />
            </motion.div>
            <motion.div
              transition={{ duration: 0.5, delay: 0 }}
              variants={{ hidden: { opacity: 0 }, reveal: { opacity: 1 } }}
              className="w-72  bg-white border rounded-lg shadow-sm hover:shadow-lg flex flex-col justify-center gap-4 overflow-hidden p-4 cursor-pointer hover:-translate-y-3 transition-transform duration-300 ease-in-out"
            >
              <img
                src="/images/3.jpg"
                className="w-auto h-72 object-cover rounded-lg"
              />
            </motion.div>
            <motion.div
              transition={{ duration: 0.5, delay: 0 }}
              variants={{ hidden: { opacity: 0 }, reveal: { opacity: 1 } }}
              className="w-72  bg-white border rounded-lg shadow-sm hover:shadow-lg flex flex-col justify-center gap-4 overflow-hidden p-4 cursor-pointer hover:-translate-y-3 transition-transform duration-300 ease-in-out"
            >
              <img
                src="/images/4.jpg"
                className="w-auto h-72 object-cover rounded-lg"
              />
            </motion.div>
            <motion.div
              transition={{ duration: 0.5, delay: 0 }}
              variants={{ hidden: { opacity: 0 }, reveal: { opacity: 1 } }}
              className="w-72  bg-white border rounded-lg shadow-sm hover:shadow-lg flex flex-col justify-center gap-4 overflow-hidden p-4 cursor-pointer hover:-translate-y-3 transition-transform duration-300 ease-in-out"
            >
              <img
                src="/images/5.jpg"
                className="w-auto h-72 object-cover rounded-lg"
              />
            </motion.div>
            <motion.div
              transition={{ duration: 0.5, delay: 0 }}
              variants={{ hidden: { opacity: 0 }, reveal: { opacity: 1 } }}
              className="w-72  bg-white border rounded-lg shadow-sm hover:shadow-lg flex flex-col justify-center gap-4 overflow-hidden p-4 cursor-pointer hover:-translate-y-3 transition-transform duration-300 ease-in-out"
            >
              <img
                src="/images/6.jpg"
                className="w-auto h-72 object-cover rounded-lg"
              />
            </motion.div>
            <motion.div
              transition={{ duration: 0.5, delay: 0 }}
              variants={{ hidden: { opacity: 0 }, reveal: { opacity: 1 } }}
              className="w-72  bg-white border rounded-lg shadow-sm hover:shadow-lg flex flex-col justify-center gap-4 overflow-hidden p-4 cursor-pointer hover:-translate-y-3 transition-transform duration-300 ease-in-out"
            >
              <img
                src="/images/7.jpg"
                className="w-auto h-72 object-cover rounded-lg"
              />
            </motion.div>
            <motion.div
              transition={{ duration: 0.5, delay: 0 }}
              variants={{ hidden: { opacity: 0 }, reveal: { opacity: 1 } }}
              className="w-72  bg-white border rounded-lg shadow-sm hover:shadow-lg flex flex-col justify-center gap-4 overflow-hidden p-4 cursor-pointer hover:-translate-y-3 transition-transform duration-300 ease-in-out"
            >
              <img
                src="/images/8.jpg"
                className="w-auto h-72 object-cover rounded-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default page;
