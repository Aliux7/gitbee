"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import DDMenu from "@/app/components/DDMenu";
import { BsCalendar4Range } from "react-icons/bs";
import DDMenuSemester from "@/app/components/DDMenuSemester";
import Card from "@/app/components/Card";
import Link from "next/link";
import { getAllSemester, getCurrentSemester } from "./action";
import Loading from "@/app/components/Loading";

const page = () => {
  const { scrollYProgress } = useScroll();
  const prevScrollY = useRef(0);
  const [expand, setExpand] = useState(true);
  const [listSemester, setListSemester] = useState<any>([]);
  const [currentSemester, setCurrentSemester] = useState<any>();
  const [loading, setLoading] = useState(false);

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

  const fetchData = async () => {
    setLoading(true);
    const resultListSemester = await getAllSemester();
    setListSemester(resultListSemester);
    
    const resultCurrentSemester = await getCurrentSemester();
    setCurrentSemester(resultCurrentSemester);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <motion.div className="relative min-h-screen flex flex-col justify-start items-center px-[6.25rem] ">
      <div
        className={`fixed top-0 w-full flex justify-center items-center transition-all ease-in-out duration-300 px-24 z-20 ${
          expand ? "pt-24" : "pt-10"
        } bg-gray-50`}
      >
        <div className="w-full border-b flex justify-between items-center pb-3">
          <div className={`px-1 ${expand ? "w-1/2" : "w-[calc(50%-5rem)]"}`}>
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
              options={listSemester}
              filter="Semester"
              icon={<BsCalendar4Range className="w-4 h-4" />}
              currentSemester={currentSemester}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 h-fit pt-44 w-full gap-5">
        <Link
          href={"/course/BA01"}
          className="h-fit bg-white shadow-md hover:shadow-xl rounded-md p-5 cursor-pointer"
        >
          <div className="flex justify-between w-full">
            <div className="flex flex-col w-9/12">
              <h3 className="text-sm truncate text-primary-orange">
                COMP6100001
              </h3>
              <h1 className="text-xl font-semibold truncate">
                Software Engineering
              </h1>
            </div>
            <h1 className="text-lg font-semibold truncate max-w-2/12 w-auto min-w-14 text-center bg-secondary-binus rounded-lg h-fit px-2">
              BA01
            </h1>
          </div>
          <div className="text-primary-binus text-sm my-3">
            Nearest Deadline:{" "}
            <span className="relative after:absolute after:w-full after:h-px after:bg-primary-orange after:bottom-0 after:left-0">
              20 Sept 2024
            </span>
          </div>
          <div>
            <span className="text-md">Lecturer:</span>{" "}
            <span className="text-sm bg-secondary-binus text-primary-binus rounded-md px-1 mx-0.5">
              KS23-1
            </span>{" "}
            <span className="text-sm bg-secondary-binus text-primary-binus rounded-md px-1 mx-0.5">
              KS23-1
            </span>
          </div>
        </Link>
        <Link
          href={"/course/BB01"}
          className="h-fit bg-white shadow-md hover:shadow-xl rounded-md p-5 cursor-pointer"
        >
          <div className="flex justify-between w-full">
            <div className="flex flex-col w-9/12">
              <h3 className="text-sm truncate text-primary-orange">
                COMP6100001
              </h3>
              <h1 className="text-xl font-semibold truncate">
                Software Engineering
              </h1>
            </div>
            <h1 className="text-lg font-semibold truncate max-w-2/12 w-auto min-w-14 text-center bg-secondary-binus rounded-lg h-fit px-2">
              BB01
            </h1>
          </div>
          <div className="text-primary-binus text-sm my-3">
            Nearest Deadline:{" "}
            <span className="relative after:absolute after:w-full after:h-px after:bg-primary-orange after:bottom-0 after:left-0">
              20 Sept 2024
            </span>
          </div>
          <div>
            <span className="text-md">Lecturer:</span>{" "}
            <span className="text-sm bg-secondary-binus text-primary-binus rounded-md px-1 mx-0.5">
              KS23-1
            </span>{" "}
            <span className="text-sm bg-secondary-binus text-primary-binus rounded-md px-1 mx-0.5">
              KS23-1
            </span>
          </div>
        </Link>
        <Link
          href={"/course/BC01"}
          className="h-fit bg-white shadow-md hover:shadow-xl rounded-md p-5 cursor-pointer"
        >
          <div className="flex justify-between w-full">
            <div className="flex flex-col w-9/12">
              <h3 className="text-sm truncate text-primary-orange">
                COMP6100001
              </h3>
              <h1 className="text-xl font-semibold truncate">
                Software Engineering
              </h1>
            </div>
            <h1 className="text-lg font-semibold truncate max-w-2/12 w-auto min-w-14 text-center bg-secondary-binus rounded-lg h-fit px-2">
              BC01
            </h1>
          </div>
          <div className="text-primary-binus text-sm my-3">
            Nearest Deadline:{" "}
            <span className="relative after:absolute after:w-full after:h-px after:bg-primary-orange after:bottom-0 after:left-0">
              20 Sept 2024
            </span>
          </div>
          <div>
            <span className="text-md">Lecturer:</span>{" "}
            <span className="text-sm bg-secondary-binus text-primary-binus rounded-md px-1 mx-0.5">
              KS23-1
            </span>{" "}
            <span className="text-sm bg-secondary-binus text-primary-binus rounded-md px-1 mx-0.5">
              KS23-1
            </span>
          </div>
        </Link>
        <Link
          href={"/course/BD01"}
          className="h-fit bg-white shadow-md hover:shadow-xl rounded-md p-5 cursor-pointer"
        >
          <div className="flex justify-between w-full">
            <div className="flex flex-col w-9/12">
              <h3 className="text-sm truncate text-primary-orange">
                COMP6100001
              </h3>
              <h1 className="text-xl font-semibold truncate">
                Software Engineering
              </h1>
            </div>
            <h1 className="text-lg font-semibold truncate max-w-2/12 w-auto min-w-14 text-center bg-secondary-binus rounded-lg h-fit px-2">
              BD01
            </h1>
          </div>
          <div className="text-primary-binus text-sm my-3">
            Nearest Deadline:{" "}
            <span className="relative after:absolute after:w-full after:h-px after:bg-primary-orange after:bottom-0 after:left-0">
              20 Sept 2024
            </span>
          </div>
          <div>
            <span className="text-md">Lecturer:</span>{" "}
            <span className="text-sm bg-secondary-binus text-primary-binus rounded-md px-1 mx-0.5">
              KS23-1
            </span>{" "}
            <span className="text-sm bg-secondary-binus text-primary-binus rounded-md px-1 mx-0.5">
              KS23-1
            </span>
          </div>
        </Link>
      </div>

      {loading && <Loading />}
    </motion.div>
  );
};

export default page;
