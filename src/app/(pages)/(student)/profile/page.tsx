"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import DDMenuSemester from "@/app/components/DDMenuSemester";
import { BsCalendar4Range, BsGlobe2 } from "react-icons/bs";
import Link from "next/link";
import { SiGithub } from "react-icons/si";
import { useAuth } from "@/app/context/AuthContext";
import { getCurrStudentProject } from "./actions";

const page = () => {
  const { userData } = useAuth();
  const { scrollYProgress } = useScroll();
  const prevScrollY = useRef(0);
  const [expand, setExpand] = useState(true);
  const [studentProjects, setStudentProjects] = useState<any>();

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
    const resultProjectStudent = await getCurrStudentProject(
      userData?.nim ? userData.nim : ""
    );
    setStudentProjects(resultProjectStudent?.data);
    console.log(resultProjectStudent?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <motion.div className="relative min-h-screen flex flex-col justify-start items-center px-[6.25rem] ">
      <div className="h-fit w-full pt-24 flex flex-col justify-start items-center">
        <div className="w-[45rem] flex justify-start items-center gap-3">
          <img
            src="https://www.shutterstock.com/image-vector/smiling-crazy-face-bright-funny-260nw-2019181259.jpg"
            className="border w-32 h-32 object-cover p-2"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold capitalize">
              Hi<span className="text-primary-orange">,</span> I'm{" "}
              {userData?.name.toLowerCase()}
              <span className="text-primary-orange">.</span>
            </h1>
            <span className="text-sm">{userData?.email}</span>
            <span className="text-sm">{userData?.nim}</span>
          </div>
        </div>
      </div>
      <div className="w-[45rem] flex flex-col justify-start items-start gap-3 my-9 border-t pt-9 mb-24">
        <h1 className="text-2xl font-semibold">
          <span className="text-primary-orange">~</span> Portofolio
        </h1>
        {studentProjects?.map((project: any, index: number) => (
          <div
            className={`flex flex-col justify-start ${
              index % 2 == 0 ? "items-end" : "items-start"
            } w-full my-5 gap-2`}
          >
            <h1 className="text-xl font-semibold text-primary-orange relative after:absolute after:bottom-px after:left-0 after:w-full after:h-px after:bg-primary-binus">
              {project?.projectDetail?.title}
            </h1>
            <h3 className="text-justify">
              {project?.projectDetail?.description}
            </h3>
            <img
              src={project?.projectDetail?.thumbnail}
              className="border w-full max-h-[30rem] object-cover p-5 my-3"
            />
            <div className="h-px w-full bg-gray-300"></div>
            <div className="w-full grid grid-cols-2 justify-start items-center gap-5">
              {project?.galleries.map((gallery: any) => (
                <img
                  src={gallery?.image}
                  className="border w-full h-80 object-cover p-5 my-3"
                />
              ))}
            </div>
            <div className="h-px w-full bg-gray-300"></div>
            <div className="w-full flex justify-between items-center">
              <Link
                href={project?.projectDetail?.github_link}
                className="flex justify-start items-center gap-2 text-sm my-1 text-primary-binus"
              >
                <SiGithub fill="#EB9327" />
                {project?.projectDetail?.github_link}
              </Link>
              <Link
                href={project?.projectDetail?.project_link}
                className="flex justify-start items-center gap-2 text-sm my-1 text-primary-binus"
              >
                <BsGlobe2 fill="#EB9327" />{" "}
                {project?.projectDetail?.project_link}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default page;
