"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import {
  getAllMajor,
  getAllProjects,
  getAllSemester,
  getCurrentSemester,
} from "./actions";
import DashboardSccComponent from "@/app/components/dashboard-scc/DashboardSccComponent";
import ProjectDetailScc from "@/app/components/dashboard-scc/ProjectDetailScc";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { BsCalendar4Range } from "react-icons/bs";
import DDMenuSemester from "@/app/components/DDMenuSemester";
import DDMenu from "@/app/components/DDMenu";
import { IoBookOutline } from "react-icons/io5";

const page = () => {
  const { scrollYProgress } = useScroll();
  const { toast } = useToast();
  const prevScrollY = useRef(0);
  const [expand, setExpand] = useState(true);
  const [showDevelopers, setShowDevelopers] = useState(false);
  const [selectedDetailProject, setSelectedDetailProject] = useState<any>();
  const [listSemester, setListSemester] = useState<any>([]);
  const [currentSemester, setCurrentSemester] = useState<any>();
  const [search, setSearch] = useState("");
  const [project, setProject] = useState<any>([]);
  const [majors, setMajors] = useState<{ id: number; name: string }[]>([]);
  const [selectedMajorFilter, setSelectedMajorFilter] = useState("");

  const fetchData = async () => {
    const resultListSemester = await getAllSemester();
    setListSemester(resultListSemester);

    const resultMajor = await getAllMajor();
    if (resultMajor?.success) setMajors(resultMajor.data);

    const resultCurrentSemester = await getCurrentSemester();
    setCurrentSemester(resultCurrentSemester);
    console.log(resultCurrentSemester);
  };

  const fetchProjectData = async () => {
    const resultProject = await getAllProjects(
      search,
      selectedMajorFilter,
      currentSemester?.data?.SemesterId
    );

    if (resultProject?.success) {
      console.log();
      setProject(resultProject?.data);
    }
    console.log(resultProject);
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
  }, [search, currentSemester, selectedMajorFilter]);

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
      {!showDevelopers && (
        <div
          className={`sticky top-7 z-10 w-full flex justify-between items-center gap-5 px-9 h-[5.25rem] transition-all ease-in-out duration-300 bg-gray-50 pb-7`}
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
          <div className="relative w-fit flex justify-end items-center h-full gap-5">
            <DDMenu
              options={majors}
              filter="Major Project"
              setSelectedValue={setSelectedMajorFilter}
              icon={<IoBookOutline className="w-4 h-4" />}
            />
            <DDMenuSemester
              className="h-full w-64"
              options={listSemester}
              filter="Semester"
              icon={<BsCalendar4Range className="w-4 h-4" />}
              currentSemester={currentSemester}
              setCurrentSemester={setCurrentSemester}
            />
          </div>
        </div>
      )}
      <Toaster />
      {showDevelopers ? (
        <ProjectDetailScc
          setShowDevelopers={setShowDevelopers}
          showDevelopers={showDevelopers}
          selectedDetailProject={selectedDetailProject}
          toast={toast}
          expand={expand}
          fetchProjectData={fetchProjectData}
        />
      ) : (
        <DashboardSccComponent
          setShowDevelopers={setShowDevelopers}
          setSelectedDetailProject={setSelectedDetailProject}
          showDevelopers={showDevelopers}
          expand={expand}
          handleScrollToTop={handleScrollToTop}
          projects={project}
        />
      )}
    </motion.div>
  );
};

export default page;
