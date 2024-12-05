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
          <DDMenu
            options={techs}
            filter="Technology"
            setSelectedValue={setSelectedTechnologyFilter}
            icon={<FaCode className="w-5 h-5" />}
          />
        </div>
      </div>
      <div className="w-auto bg-white shadow-md rounded-md mx-9 mb-7 flex justify-around items-center py-7">
        <div className="flex flex-col justify-center items-center text-lg gap-3 hover:bg-gray-50 px-7 py-3 rounded-lg cursor-pointer">
          <img src="/icons/submit.png" className="w-24 h-24" />
          <div className="flex justify-center items-center gap-2">
            Submitted{" "}
            <span className="bg-primary-binus text-white px-1 text-sm rounded-sm">
              10
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center text-lg gap-3 hover:bg-gray-50 px-7 py-3 rounded-lg cursor-pointer">
          <img src="/icons/reviews.png" className="w-24 h-24" />
          <div className="flex justify-center items-center gap-2">
            Graded{" "}
            <span className="bg-primary-binus text-white px-1 text-sm rounded-sm">
              10
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center text-lg gap-3 hover:bg-gray-50 px-7 py-3 rounded-lg cursor-pointer">
          <img src="/icons/recommendation.png" className="w-24 h-24" />
          <div className="flex justify-center items-center gap-2">
            Reviewed{" "}
            <span className="bg-primary-binus text-white px-1 text-sm rounded-sm">
              10
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
            <TableRow>
              <TableCell className="text-start font-medium">01</TableCell>
              <TableCell className="text-center">The Spotify</TableCell>
              <TableCell className="text-center">
                <Link href={"/"}>Project Link</Link>
              </TableCell>
              <TableCell className="text-center">
                <Link href={"/"}>Project Link</Link>
              </TableCell>
              <TableCell className="text-center">
                <div>
                  1. Kelson Edbert Susilo <br />
                  2. Kelson Edbert Susilo <br />
                  3. Kelson Edbert Susilo
                </div>
              </TableCell>
              <TableCell className="text-center">Mark By Lecturer</TableCell>
              <TableCell className="text-center">
                <Link
                  href="/detail-admin-project"
                  className="bg-primary-binus px-2 py-1 text-white rounded-md"
                >
                  Detail
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-start font-medium">01</TableCell>
              <TableCell className="text-center">The Spotify</TableCell>
              <TableCell className="text-center">
                <Link href={"/"}>Project Link</Link>
              </TableCell>
              <TableCell className="text-center">
                <Link href={"/"}>Project Link</Link>
              </TableCell>
              <TableCell className="text-center">
                <div>
                  1. Kelson Edbert Susilo <br />
                  2. Kelson Edbert Susilo <br />
                  3. Kelson Edbert Susilo
                </div>
              </TableCell>
              <TableCell className="text-center">Recommeded By HOP</TableCell>
              <TableCell className="text-center">
                <Link
                  href="/detail-admin-project"
                  className="bg-primary-binus px-2 py-1 text-white rounded-md"
                >
                  Detail
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-start font-medium">01</TableCell>
              <TableCell className="text-center">The Spotify</TableCell>
              <TableCell className="text-center">
                <Link href={"/"}>Project Link</Link>
              </TableCell>
              <TableCell className="text-center">
                <Link href={"/"}>Project Link</Link>
              </TableCell>
              <TableCell className="text-center">
                <div>
                  1. Kelson Edbert Susilo <br />
                  2. Kelson Edbert Susilo <br />
                  3. Kelson Edbert Susilo
                </div>
              </TableCell>
              <TableCell className="text-center">Mark By Lecturer</TableCell>
              <TableCell className="text-center">
                <Link
                  href="/detail-admin-project"
                  className="bg-primary-binus px-2 py-1 text-white rounded-md"
                >
                  Detail
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default page;
