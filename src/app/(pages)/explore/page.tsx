"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import DDMenu from "../../components/DDMenu";
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
  const [selectedProjectId, setSelectedProjectId] = useState("");

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
    const handleScroll = (currentScrollY: number) => {
      if (currentScrollY < 0.1) setExpand(true);
      else if (currentScrollY > prevScrollY.current) setExpand(false);
      else if (currentScrollY < prevScrollY.current) setExpand(true);

      if (
        currentScrollY - prevScrollY.current > 0.15 ||
        currentScrollY - prevScrollY.current < -0.15
      ) {
        prevScrollY.current = currentScrollY;
      }
    };

    const mediaQuery = window.matchMedia("(max-width: 1535px)");

    const scrollListener = () => {
      console.log(mediaQuery);
      if (!mediaQuery.matches) {
        console.log("MASUK");
        scrollYProgress.onChange(handleScroll);
      }
    };

    scrollListener();

    const resizeListener = () => {
      scrollListener();
    };
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
      scrollYProgress.clearListeners();
    };
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
    <motion.div className="relative min-h-screen flex flex-col pt-28 xl:px-16 bg-gray-50">
      <div
        className={`bg-gray-50 fixed top-0 ${
          expand ? "h-[21rem] sm:h-60 lg:h-[12.25rem]" : "h-[7rem]"
        } w-full left-0 z-10`}
      ></div>
      <div
        className={`sticky ${
          expand ? "top-28" : "top-7"
        } z-10 w-full flex flex-col lg:flex-row justify-between items-end lg:items-center gap-3 sm:gap-5 px-9 h-[5.25rem] transition-all ease-in-out duration-300 bg-gray-50 pb-7`}
      >
        <div className="relative w-full flex justify-start items-center h-full">
          <CiSearch
            className="absolute ml-3 w-7 h-7 pr-2 border-r"
            fill="#6B7280"
          />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`border ${
              expand ? "w-full" : "w-[35.5rem]"
            } h-full p-3 px-12 rounded-md`}
          />
        </div>
        <div className="relative w-fit flex flex-wrap sm:flex-nowrap justify-end items-center h-full gap-2 sm:gap-5">
          <DDMenu
            options={categories}
            filter="Category Project"
            setSelectedValue={setSelectedCategoryFilter}
            icon={<TbCategory2 className="w-4 h-4" />}
          />
          <DDMenu
            options={majors}
            filter="Major Project"
            setSelectedValue={setSelectedMajorFilter}
            icon={<IoBookOutline className="w-4 h-4" />}
          />
          <DDMenu
            options={techs}
            filter="Technology Project"
            setSelectedValue={setSelectedTechnologyFilter}
            icon={<FaCode className="w-5 h-5" />}
          />
        </div>
      </div>
      {showDevelopers && selectedProjectId != "" ? (
        <ProjectDetailComponent
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
          setShowDevelopers={setShowDevelopers}
          showDevelopers={showDevelopers}
          expand={expand}
        />
      ) : (
        <ExploreComponent
          setSelectedProjectId={setSelectedProjectId}
          setShowDevelopers={setShowDevelopers}
          showDevelopers={showDevelopers}
          expand={expand}
          handleScrollToTop={handleScrollToTop}
          projects={projects}
        />
      )}
    </motion.div>
  );
};

export default page;
