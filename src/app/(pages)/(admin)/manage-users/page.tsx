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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DDMenuCourses from "@/app/components/DDMenuCourses";
import { BsCalendar4Range } from "react-icons/bs";
import Link from "next/link";

const page = () => {
  const listStatus = ["submitted", "graded", "reviewed", "outstanding"];
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
  const [projects, setProjects] = useState<any>([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");
  const [selectedMajorFilter, setSelectedMajorFilter] = useState("");
  const [selectedTechnologyFilter, setSelectedTechnologyFilter] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedSemesterId, setSelectedSemesterId] = useState("");
  const [selectedStatus, setSelectedStats] = useState(1);

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
      selectedSemesterId
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`border ${
              expand ? "w-full" : "w-[35.5rem]"
            } h-full p-3 px-12 rounded-md`}
          />
        </div>
        <div className="relative min-w-fit flex justify-end items-center h-full bg-white border rounded-md px-2 gap-2">
          <button className="w-full whitespace-nowrap cursor-pointer py-2 px-4 relative bg-primary-binus text-white rounded-sm">
            User HOP
          </button>
          <button className="w-full whitespace-nowrap cursor-pointer py-2 px-4 relative bg-white text-primary-binus rounded-sm">
            User SCC
          </button>
        </div>
      </div>
      <div className="w-auto bg-white shadow-md rounded-md mx-9">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-start">User ID</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Role</TableHead>
              <TableHead className="text-center">Major</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects?.[listStatus[selectedStatus - 1]]?.map(
              (project: any, index: number) => (
                <TableRow>
                  <TableCell className="text-start font-medium">
                    {index + 1}.
                  </TableCell>
                  <TableCell className="text-center">
                    {project?.projectDetail?.title}
                  </TableCell>
                  <TableCell className="text-center">
                    <div>
                      {project?.projectGroups?.map(
                        (member: any, index: number) => (
                          <span>
                            {index + 1}. {member?.student_name} <br />
                          </span>
                        )
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {project?.is_disable ? (
                      <span className="text-red-500">Hidden</span>
                    ) : (
                      <span className="text-green-500">Display</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Link
                      href={`/detail-admin-project/${project?.id}`}
                      className="bg-primary-binus px-2 py-1 text-white rounded-md"
                    >
                      Detail
                    </Link>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default page;
