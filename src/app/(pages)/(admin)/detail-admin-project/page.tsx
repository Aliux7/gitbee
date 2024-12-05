"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import DDMenu from "../../../components/DDMenu";
import { TbCategory2 } from "react-icons/tb";
import { IoBookOutline } from "react-icons/io5";
import { FaCode } from "react-icons/fa";
import ProjectDetailComponent from "@/app/components/explore/ProjectDetailComponent";
import ExploreComponent from "@/app/components/explore/ExploreComponent";
import {
  getAllCategory,
  getAllMajor,
  getAllProjects,
  getAllTech,
} from "./actions";
import DashboardHopComponent from "@/app/components/dashboard-hop/DashboardHopComponent";
import DDMenuSemester from "@/app/components/DDMenuSemester";
import { BsCalendar4Range, BsGlobe2 } from "react-icons/bs";
import ProjectDetailHop from "@/app/components/dashboard-hop/ProjectDetailHop";
import Link from "next/link";
import { SiGithub } from "react-icons/si";
import { IoIosArrowRoundBack } from "react-icons/io";

const page = () => {
  const { scrollYProgress } = useScroll();
  const prevScrollY = useRef(0);
  const [expand, setExpand] = useState(true);
  const [showDevelopers, setShowDevelopers] = useState(false);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [search, setSearch] = useState("");
  const [majors, setMajors] = useState<{ id: number; name: string }[]>([]);
  const [techs, setTechs] = useState<{ id: number; name: string }[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");
  const [selectedMajorFilter, setSelectedMajorFilter] = useState("");
  const [selectedTechnologyFilter, setSelectedTechnologyFilter] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const fetchData = async () => {
    const resultCategory = await getAllCategory();
    if (resultCategory?.success) setCategories(resultCategory.data);

    const resultMajor = await getAllMajor();
    if (resultMajor?.success) setMajors(resultMajor.data);

    const resultTech = await getAllTech();
    if (resultTech?.success) setTechs(resultTech.data);
  };

  const fetchProjectData = async () => {
    const resultProject = await getAllProjects(
      search,
      selectedCategoryFilter,
      selectedMajorFilter,
      selectedTechnologyFilter
    );
    if (resultProject?.success) setProjects(resultProject.data);
    console.log(resultProject?.data);
  };

  useEffect(() => {
    scrollYProgress.onChange((currentScrollY) => {
      if (currentScrollY < 0.1) setExpand(true);
      else if (currentScrollY > prevScrollY.current) setExpand(false);
      else if (currentScrollY < prevScrollY.current) setExpand(false);

      if (
        currentScrollY - prevScrollY.current > 0.15 ||
        currentScrollY - prevScrollY.current < -0.15
      ) {
        prevScrollY.current = currentScrollY;
      }
    });
  }, [scrollYProgress]);

  useEffect(() => {
    fetchProjectData();
  }, [
    search,
    selectedCategoryFilter,
    selectedMajorFilter,
    selectedTechnologyFilter,
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.div className="relative min-h-screen flex flex-col pt-28 px-16 bg-gray-50">
      <div
        className={`bg-gray-50 fixed top-0 h-[7rem] w-full left-0 z-10`}
      ></div>

      {/* Jangan pakai HOP nnti di ganti jadi admin component sendiri */}
      <motion.div
        className="relative flex justify-center items-start w-auto bg-white h-full mx-9 rounded-md px-5 mb-14 pb-7 pt-3"
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div
          className={`sticky top-32 w-[30rem] h-full py-2 opacity-100 flex flex-col gap-5 transition-all ease-in-out duration-500 overflow-hidden`}
          variants={containerVariants}
        >
          {/* <h1 className="text-center py-10 text-gray-500">No Project Selected</h1> */}

          <Link
            href={"/dashboard-admin"}
            className="hover:bg-gray-100 p-1.5 cursor-pointer rounded-md flex justify-start items-center w-fit "
          >
            <IoIosArrowRoundBack className="w-7 h-7" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl border-t pt-5 mr-4">List Developers</h1>
          <Link
            href={"/portofolio/123"}
            className="flex justify-start items-center gap-5 border-b pb-5 mr-4 cursor-pointer"
          >
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
          </Link>
          <Link
            href={"/portofolio/123"}
            className="flex justify-start items-center gap-5 border-b pb-5 mr-4 cursor-pointer"
          >
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
          </Link>
        </motion.div>
        <motion.div
          className="relative w-full border-l pl-3 flex flex-col h-fit py-3 justify-start items-start transition-all ease-in-out duration-500"
          variants={containerVariants}
        >
          <div className="w-full flex flex-col pr-5">
            <div className="w-full flex justify-start items-start border-b pb-5">
              <div className="mx-3 flex flex-col gap-1 w-2/3">
                <h1 className="text-3xl font-bold">The Spotify</h1>
                <h3 className="text-sm text-gray-500">
                  By Kelson Edbert S, Timothy Darren, Nicholas Chandra
                </h3>
                <div className="h-fit flex-grow my-3 pr-10">
                  <h1 className="text-balance text-gray-700">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. At
                    molestias possimus ipsum? Fuga architecto, ipsum nulla
                    explicabo quas corrupti quia labore eum dolor ipsam
                    obcaecati facere odio aliquam aspernatur perferendis. Lorem
                    ipsum, dolor sit amet consectetur adipisicing elit. Veniam
                    corrupti quod eos nulla vero debitis corporis ullam, earum
                    laudantium praesentium asperiores ipsum ab voluptatem
                    molestias atque mollitia quidem sint in!
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
                <img src="/images/3.jpg" className="w-full rounded-md border" />
              </div>
            </div>
            <div className="w-full h-96 my-3 flex overflow-auto gap-3">
              <img src="/images/1.jpg" className="h-full rounded-md border" />
              <img src="/images/2.jpg" className="h-full rounded-md border" />
              <img src="/images/3.jpg" className="h-full rounded-md border" />
              <img src="/images/4.jpg" className="h-full rounded-md border" />
            </div>
          </div>
          <div className="w-full h-auto flex justify-end items-center gap-5 mt-10">
            <div className="flex justify-center items-center gap-1 bg-white rounded-md border p-1">
              <div className="px-5 py-1 hover:bg-gray-100 bg-green-500 text-white cursor-pointer rounded-sm text-lg active:text-green-500">
                Show Project
              </div>
              <div className="px-5 py-1 hover:bg-gray-100 active:bg-red-500 active:text-white cursor-pointer rounded-sm text-lg text-red-500">
                Hide Project
              </div>
            </div>
            <button className="bg-primary-binus text-white px-10 py-2 rounded-md">
              Update
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default page;
