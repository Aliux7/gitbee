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
  getAllSemester,
  getCurrentSemester,
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
import DDMenuSemester from "@/app/components/DDMenuSemester";

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
  const [projects, setProjects] = useState<any>([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");
  const [selectedMajorFilter, setSelectedMajorFilter] = useState("");
  const [selectedTechnologyFilter, setSelectedTechnologyFilter] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedSemesterId, setSelectedSemesterId] = useState("");
  const [selectedStatus, setSelectedStats] = useState(1);
  const [listSemester, setListSemester] = useState<any>([]);
  const [currentSemester, setCurrentSemester] = useState<any>();

  const fetchData = async () => {
    const resultCategory = await getAllCategory();
    if (resultCategory?.success) setCategories(resultCategory.data);

    const resultMajor = await getAllMajor();
    if (resultMajor?.success) setMajors(resultMajor.data);

    const resultListSemester = await getAllSemester();
    setListSemester(resultListSemester);

    const resultCurrentSemester = await getCurrentSemester();
    setCurrentSemester(resultCurrentSemester);
  };

  const fetchProjectData = async () => {
    console.log(currentSemester?.data?.SemesterId)
    const resultProject = await getAllProjects(
      search,
      selectedCategoryFilter,
      selectedMajorFilter,
      currentSemester?.data?.SemesterId
    );
    if (resultProject?.success) setProjects(resultProject.data);
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
    currentSemester
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
        <div className="relative w-fit flex justify-end items-center h-full gap-5">
          <DDMenu
            options={categories}
            filter="Category"
            setSelectedValue={setSelectedCategoryFilter}
            icon={<TbCategory2 className="w-4 h-4" />}
          />
          <DDMenu
            options={majors}
            filter="Major"
            setSelectedValue={setSelectedMajorFilter}
            icon={<IoBookOutline className="w-4 h-4" />}
          />
          <DDMenuSemester
            className="h-full max-w-44"
            options={listSemester}
            filter="Semester"
            icon={<BsCalendar4Range className="w-4 h-4" />}
            currentSemester={currentSemester}
            setCurrentSemester={setCurrentSemester}
          />
        </div>
      </div>
      <div className="w-auto bg-white shadow-md rounded-md mx-9 mb-7 flex justify-around items-center py-7">
        <div
          onClick={() => setSelectedStats(1)}
          className={`flex flex-col justify-center items-center text-lg gap-3 hover:bg-gray-50 px-7 py-3 rounded-lg cursor-pointer ${
            selectedStatus == 1 && "border border-primary-binus"
          } `}
        >
          <img src="/icons/submit.png" className="w-24 h-24" />
          <div className="flex justify-center items-center gap-2">
            Submitted By Student{" "}
            <span className="bg-primary-binus text-white px-1 text-sm rounded-sm">
              {projects?.["count submitted"]}
            </span>
          </div>
        </div>
        <div
          onClick={() => setSelectedStats(2)}
          className={`flex flex-col justify-center items-center text-lg gap-3 hover:bg-gray-50 px-7 py-3 rounded-lg cursor-pointer ${
            selectedStatus == 2 && "border border-primary-binus"
          } `}
        >
          <img src="/icons/reviews.png" className="w-24 h-24" />
          <div className="flex justify-center items-center gap-2">
            Graded By Lecturer{" "}
            <span className="bg-primary-binus text-white px-1 text-sm rounded-sm">
              {projects?.["count graded"]}
            </span>
          </div>
        </div>
        <div
          onClick={() => setSelectedStats(3)}
          className={`flex flex-col justify-center items-center text-lg gap-3 hover:bg-gray-50 px-7 py-3 rounded-lg cursor-pointer ${
            selectedStatus == 3 && "border border-primary-binus"
          } `}
        >
          <img src="/icons/recommendation.png" className="w-24 h-24" />
          <div className="flex justify-center items-center gap-2">
            Reviewed By SCC{" "}
            <span className="bg-primary-binus text-white px-1 text-sm rounded-sm">
              {projects?.["count reviewed"]}
            </span>
          </div>
        </div>
        <div
          onClick={() => setSelectedStats(4)}
          className={`flex flex-col justify-center items-center text-lg gap-3 hover:bg-gray-50 px-7 py-3 rounded-lg cursor-pointer ${
            selectedStatus == 4 && "border border-primary-binus"
          } `}
        >
          <img src="/icons/outstanding.png" className="w-24 h-24" />
          <div className="flex justify-center items-center gap-2">
            Reviewed By HOP{" "}
            <span className="bg-primary-binus text-white px-1 text-sm rounded-sm">
              {projects?.["count outstanding"]}
            </span>
          </div>
        </div>
      </div>
      <div className="w-auto bg-white shadow-md rounded-md mx-9">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-start">Project ID</TableHead>
              <TableHead className="text-center">Project Title</TableHead>
              <TableHead className="text-center">Project Link</TableHead>
              <TableHead className="text-center">Project Github</TableHead>
              <TableHead className="text-center">Total Members</TableHead>
              <TableHead className="text-center">Status</TableHead>
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
                    <Link href={project?.projectDetail?.project_link}>
                      {project?.projectDetail?.project_link}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">
                    <Link href={project?.projectDetail?.github_link}>
                      {project?.projectDetail?.github_link}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">
                    <div>
                      {project?.projectGroups?.map(
                        (member: any, index: number) => (
                          <span>
                            {index + 1}. <span className="capitalize">{member?.student_name?.toLowerCase()}</span> <br />
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
          {projects?.[listStatus[selectedStatus - 1]].length < 1 && (
            <div className="w-full text-center py-5 text-gray-500">
              No Data . . .
            </div>
          )}
      </div>
    </motion.div>
  );
};

export default page;
