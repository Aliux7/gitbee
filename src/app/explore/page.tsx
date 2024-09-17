"use client";
import React, { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import { motion, useScroll } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import DDMenu from "../components/DDMenu";
import { TbCategory2 } from "react-icons/tb";
import { IoBookOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { IoIosArrowRoundBack } from "react-icons/io";

const page = () => {
  const { scrollYProgress } = useScroll();
  const prevScrollY = useRef(0);
  const [expand, setExpand] = useState(true);
  const [showDevelopers, setShowDevelopers] = useState(true);

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
            icon={<TbCategory2 className="w-4 h-4" />}
          />
          <DDMenu
            options={["Computer Science", "Sistem Information"]}
            filter="Major"
            icon={<IoBookOutline className="w-4 h-4" />}
          />
          <DDMenu
            options={["2024", "2023", "2022", "2021", "2020"]}
            filter="Year"
            icon={<CiCalendarDate className="w-5 h-5" />}
          />
        </div>
      </div>
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1 },
        }}
        initial="hidden"
        animate="show"
        className="relative h-full bg-white mx-9 rounded-md flex flex-col mb-14 pb-7"
      >
        <div
          className={`w-full h-auto bg-white sticky z-10 px-5 transition-all ease-in-out duration-300 ${
            expand ? "top-[12.25rem]" : "top-28"
          } ${showDevelopers ? "hidden" : "visible"}`}
        >
          <div className="p-2 rounded-md my-4 border text-gray-500">
            1705 Results Found
          </div>
        </div>
        <div className="relative flex w-full h-fit mt-3 px-5">
          <div
            className={`${
              showDevelopers
                ? "w-80 mr-4 border-r h-96 py-2 opacity-100"
                : "w-0 opacity-0"
            } sticky ${
              expand ? "top-[16.75rem]" : "top-[11.25rem]"
            } flex flex-col gap-5 transition-all ease-in-out duration-500 overflow-hidden`}
          >
            {/* <h1 className="text-center py-10 text-gray-500">No Project Selected</h1> */}
            <div className="flex justify-start items-center gap-5 border-b pb-5 mr-4">
              <img
                src="/images/1.jpg"
                className="rounded-full h-20 w-20 p-1 border object-cover"
              />
              <div className="w-48">
                <h1 className="truncate font-semibold">Kelson Edbert S</h1>
                <h1 className="truncate text-sm text-gray-500">2540115465</h1>
                <h1 className="truncate text-sm text-gray-500">
                  Computer Science
                </h1>
              </div>
            </div>
            <div className="flex justify-start items-center gap-5 border-b pb-5 mr-4">
              <img
                src="/images/3.jpg"
                className="rounded-full h-20 w-20 p-1 border object-cover"
              />
              <div className="w-48">
                <h1 className="truncate font-semibold">Timothy Darren</h1>
                <h1 className="truncate text-sm text-gray-500">2540115465</h1>
                <h1 className="truncate text-sm text-gray-500">
                  Computer Science
                </h1>
              </div>
            </div>
            <div className="flex justify-start items-center gap-5 border-b pb-5 mr-4">
              <img
                src="/images/5.jpg"
                className="rounded-full h-20 w-20 p-1 border object-cover"
              />
              <div className="w-48">
                <h1 className="truncate font-semibold">Nicholas Chandra</h1>
                <h1 className="truncate text-sm text-gray-500">2540115465</h1>
                <h1 className="truncate text-sm text-gray-500">
                  Computer Science
                </h1>
              </div>
            </div>
          </div>
          {showDevelopers ? (
            <div className="relative flex-grow h-fit gap-7 py-3 justify-center items-start transition-all ease-in-out duration-500">
              <div className="w-full h-full flex justify-start items-start">
                <div
                  className="hover:bg-gray-100 p-1.5 cursor-pointer rounded-full"
                  onClick={() => setShowDevelopers(false)}
                >
                  <IoIosArrowRoundBack className="w-7 h-7" />
                </div>
                <div className="mx-3 flex flex-col gap-1 w-full">
                  <h1 className="text-3xl font-bold">The Spotify</h1>
                  <h3 className="text-sm text-gray-500">
                    By Kelson Edbert S, Timothy Darren, Nicholas Chandra
                  </h3>
                  <div className="h-20 w-full">
                    <h1>GitHub</h1>
                    <h1>Website</h1>
                    <h1>Foto Thumbnail</h1>
                    <h1>Description</h1>
                    <h1>Dokumentasi</h1>
                  </div>
                </div>
              </div>
              {/* <h1>Selected Project</h1> */}
            </div>
          ) : (
            <motion.div
              className={`grid ${
                showDevelopers ? "grid-cols-3" : "grid-cols-4"
              } flex-grow h-fit gap-7 justify-center items-start transition-all ease-in-out duration-500`}
              initial="hidden"
              whileInView="reveal"
              transition={{ staggerChildren: 0.5 }}
            >
              <div onClick={() => setShowDevelopers(!showDevelopers)}>
                <Card
                  image="/images/1.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div onClick={() => setShowDevelopers(!showDevelopers)}>
                <Card
                  image="/images/1.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div onClick={() => setShowDevelopers(!showDevelopers)}>
                <Card
                  image="/images/1.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div onClick={() => setShowDevelopers(!showDevelopers)}>
                <Card
                  image="/images/1.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div onClick={() => setShowDevelopers(!showDevelopers)}>
                <Card
                  image="/images/1.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div onClick={() => setShowDevelopers(!showDevelopers)}>
                <Card
                  image="/images/1.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div onClick={() => setShowDevelopers(!showDevelopers)}>
                <Card
                  image="/images/1.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div onClick={() => setShowDevelopers(!showDevelopers)}>
                <Card
                  image="/images/1.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div onClick={() => setShowDevelopers(!showDevelopers)}>
                <Card
                  image="/images/1.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div onClick={() => setShowDevelopers(!showDevelopers)}>
                <Card
                  image="/images/1.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div onClick={() => setShowDevelopers(!showDevelopers)}>
                <Card
                  image="/images/1.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div onClick={() => setShowDevelopers(!showDevelopers)}>
                <Card
                  image="/images/1.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div onClick={() => setShowDevelopers(!showDevelopers)}>
                <Card
                  image="/images/1.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default page;
