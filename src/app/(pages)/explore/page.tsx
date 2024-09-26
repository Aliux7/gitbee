"use client";
import React, { useEffect, useRef, useState } from "react";
import Card from "../../components/Card";
import { motion, useScroll } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import DDMenu from "../../components/DDMenu";
import { TbCategory2 } from "react-icons/tb";
import { IoBookOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { IoIosArrowRoundBack } from "react-icons/io";
import { SiGithub } from "react-icons/si";
import { BsGlobe2 } from "react-icons/bs";
import Link from "next/link";

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

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
            options={["Website App", "Mobile App", "Desktop App"]}
            filter="Category"
            icon={<TbCategory2 className="w-4 h-4" />}
          />
          <DDMenu
            options={["Computer Science", "Sistem Information"]}
            filter="Major"
            icon={<IoBookOutline className="w-4 h-4" />}
          />
          <DDMenu
            options={["70", "69", "68", "67", "66"]}
            filter="Graduation"
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
        <div className="relative flex justify-center items-start w-full min-h-[80vh] h-full mt-3 px-5">
          <div
            className={`sticky ${expand ? "top-52" : "top-32"} ${
              showDevelopers
                ? "w-[30rem] h-full py-2 opacity-100"
                : "w-0 opacity-0"
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
          </div>

          {showDevelopers ? (
            <div className="relative w-full border-l pl-3 flex h-fit py-3 justify-start items-start transition-all ease-in-out duration-500">
              <div
                className="hover:bg-gray-100 p-1.5 cursor-pointer rounded-full"
                onClick={() => setShowDevelopers(false)}
              >
                <IoIosArrowRoundBack className="w-7 h-7" />
              </div>
              <div className="w-full flex flex-col pr-5">
                <div className="w-full flex justify-start items-start border-b pb-5">
                  <div className="mx-3 flex flex-col gap-1 w-2/3">
                    <h1 className="text-3xl font-bold">The Spotify</h1>
                    <h3 className="text-sm text-gray-500">
                      By Kelson Edbert S, Timothy Darren, Nicholas Chandra
                    </h3>
                    <div className="h-fit flex-grow my-3 pr-10">
                      <h1 className="text-balance text-gray-700">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. At molestias possimus ipsum? Fuga architecto,
                        ipsum nulla explicabo quas corrupti quia labore eum
                        dolor ipsam obcaecati facere odio aliquam aspernatur
                        perferendis. Lorem ipsum, dolor sit amet consectetur
                        adipisicing elit. Veniam corrupti quod eos nulla vero
                        debitis corporis ullam, earum laudantium praesentium
                        asperiores ipsum ab voluptatem molestias atque mollitia
                        quidem sint in!
                      </h1>
                    </div>
                    <Link
                      href="https://github.com/Aliux7/gitbee"
                      className="flex justify-start items-center gap-2 text-sm my-1 text-primary-binus"
                    >
                      <SiGithub fill="#EB9327" />
                      https://github.com/Aliux7/gitbee
                    </Link>
                    <Link
                      href="https://binusmaya.binus.ac.id/"
                      className="flex justify-start items-center gap-2 text-sm my-1 text-primary-binus"
                    >
                      <BsGlobe2 fill="#EB9327" /> https://binusmaya.binus.ac.id/
                    </Link>
                  </div>
                  <div className="w-1/3">
                    {/* <img
                    src="/images/image-1.webp"
                    className="w-full rounded-md"
                  /> */}
                    <img
                      src="/images/3.jpg"
                      className="w-full rounded-md border"
                    />
                  </div>
                </div>
                <div className="w-full h-96 my-3 flex overflow-auto gap-3">
                  <img
                    src="/images/1.jpg"
                    className="h-full rounded-md border"
                  />
                  <img
                    src="/images/2.jpg"
                    className="h-full rounded-md border"
                  />
                  <img
                    src="/images/3.jpg"
                    className="h-full rounded-md border"
                  />
                  <img
                    src="/images/4.jpg"
                    className="h-full rounded-md border"
                  />
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              className={`grid grid-cols-3 flex-grow h-fit gap-7 justify-center items-start transition-all ease-in-out duration-500`}
              initial="hidden"
              whileInView="reveal"
              transition={{ staggerChildren: 0.5 }}
            >
              <div
                className="flex justify-center items-center"
                onClick={() => {
                  setShowDevelopers(!showDevelopers);
                  handleScrollToTop();
                }}
              >
                <Card
                  image="/images/1.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div
                className="flex justify-center items-center"
                onClick={() => {
                  setShowDevelopers(!showDevelopers);
                  handleScrollToTop();
                }}
              >
                <Card
                  image="/images/2.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div
                className="flex justify-center items-center"
                onClick={() => {
                  setShowDevelopers(!showDevelopers);
                  handleScrollToTop();
                }}
              >
                <Card
                  image="/images/3.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div
                className="flex justify-center items-center"
                onClick={() => {
                  setShowDevelopers(!showDevelopers);
                  handleScrollToTop();
                }}
              >
                <Card
                  image="/images/4.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div
                className="flex justify-center items-center"
                onClick={() => {
                  setShowDevelopers(!showDevelopers);
                  handleScrollToTop();
                }}
              >
                <Card
                  image="/images/5.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div
                className="flex justify-center items-center"
                onClick={() => {
                  setShowDevelopers(!showDevelopers);
                  handleScrollToTop();
                }}
              >
                <Card
                  image="/images/6.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div
                className="flex justify-center items-center"
                onClick={() => {
                  setShowDevelopers(!showDevelopers);
                  handleScrollToTop();
                }}
              >
                <Card
                  image="/images/7.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div
                className="flex justify-center items-center"
                onClick={() => {
                  setShowDevelopers(!showDevelopers);
                  handleScrollToTop();
                }}
              >
                <Card
                  image="/images/8.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div
                className="flex justify-center items-center"
                onClick={() => {
                  setShowDevelopers(!showDevelopers);
                  handleScrollToTop();
                }}
              >
                <Card
                  image="/images/9.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div
                className="flex justify-center items-center"
                onClick={() => {
                  setShowDevelopers(!showDevelopers);
                  handleScrollToTop();
                }}
              >
                <Card
                  image="/images/10.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div
                className="flex justify-center items-center"
                onClick={() => {
                  setShowDevelopers(!showDevelopers);
                  handleScrollToTop();
                }}
              >
                <Card
                  image="/images/11.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div
                className="flex justify-center items-center"
                onClick={() => {
                  setShowDevelopers(!showDevelopers);
                  handleScrollToTop();
                }}
              >
                <Card
                  image="/images/12.jpg"
                  delay={0}
                  title="This Co"
                  developers={["Kelson Edbert Susilo"]}
                />
              </div>
              <div
                className="flex justify-center items-center"
                onClick={() => {
                  setShowDevelopers(!showDevelopers);
                  handleScrollToTop();
                }}
              >
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
