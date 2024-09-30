"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import DDMenuSemester from "@/app/components/DDMenuSemester";
import { BsCalendar4Range, BsGlobe2 } from "react-icons/bs";
import Link from "next/link";
import { SiGithub } from "react-icons/si";

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
      {/* <div
        className={`fixed top-0 w-full flex justify-center items-center transition-all ease-in-out duration-300 px-24 z-20 ${
          expand ? "pt-24" : "pt-10"
        } bg-gray-50`}
      >
        <div className="w-full border-b flex justify-between items-center pb-3">
          <div className={` ${expand ? "w-1/2" : "w-[calc(50%-5rem)]"}`}>
            <h1 className="font-montserrat text-3xl font-semibold text-primary-binus">
              My Courses
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
            <DDMenuSemester
              options={[
                "Even Semester 2023/2024",
                "Odd Semester 2023/2024",
                "Even Semester 2022/2023",
                "Odd Semester 2022/2023",
                "Even Semester 2021/2022",
              ]}
              filter="Semester"
              icon={<BsCalendar4Range className="w-4 h-4" />}
            />
          </div>
        </div>
      </div> */}
      <div className="h-fit w-full pt-24 flex flex-col justify-start items-center">
        <div className="w-[45rem] flex flex-col justify-start items-start gap-3">
          <img
            src="https://www.shutterstock.com/image-vector/smiling-crazy-face-bright-funny-260nw-2019181259.jpg"
            className="border   w-32 h-32 object-cover p-2"
          />
          <h1 className="text-2xl font-semibold">
            Hi<span className="text-primary-orange">,</span> I'm Kelson Edbert
            Susilo
            <span className="text-primary-orange">.</span>
          </h1>
          <p className="">
            I'm a software and design consultant. This is my lil corner of the
            web where I share my work with y'all. Let's work together Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
            numquam eveniet voluptates? Expedita quibusdam non sunt nulla
            tenetur! Assumenda blanditiis asperiores nihil sapiente quos
            doloremque nisi, tempore minus odio ipsam.
          </p>
        </div>
      </div>
      <div className="w-[45rem] flex flex-col justify-start items-start gap-3 my-9 border-t pt-9 mb-24">
        <h1 className="text-2xl font-semibold">
          <span className="text-primary-orange">~</span> Portofolio
        </h1>
        <div className="flex flex-col justify-start items-end w-full my-5 gap-2">
          <h1 className="text-xl font-semibold text-primary-orange relative after:absolute after:bottom-px after:left-0 after:w-full after:h-px after:bg-primary-binus">
            Arc Tabs
          </h1>
          <h3 className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit
            ex rem iusto enim, ratione quia. Cupiditate recusandae cum voluptas
            explicabo qui hic? Nihil veniam exercitationem, rerum ipsum ab sit
            harum.
          </h3>
          <img
            src="https://www.shutterstock.com/image-vector/smiling-crazy-face-bright-funny-260nw-2019181259.jpg"
            className="border w-full max-h-[30rem] object-cover p-5 my-3"
          />
          <div className="h-px w-full bg-gray-300"></div>
          <div className="w-full flex justify-between items-center">
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
        </div>
        <div className="flex flex-col justify-start items-start w-full my-5 gap-2">
          <h1 className="text-xl font-semibold text-primary-orange relative after:absolute after:bottom-px after:left-0 after:w-full after:h-px after:bg-primary-binus">
            Arc Tabs 2
          </h1>
          <h3 className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit
            ex rem iusto enim, ratione quia. Cupiditate recusandae cum voluptas
            explicabo qui hic? Nihil veniam exercitationem, rerum ipsum ab sit
            harum.
          </h3>
          <img
            src="https://www.shutterstock.com/image-vector/smiling-crazy-face-bright-funny-260nw-2019181259.jpg"
            className="border w-full max-h-[30rem] object-cover p-5 my-3"
          />
          <div className="h-px w-full bg-gray-300"></div>
          <div className="w-full flex justify-between items-center">
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
        </div>
      </div>
    </motion.div>
  );
};

export default page;
