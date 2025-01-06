"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { CiSearch } from "react-icons/ci";
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
    console.log(resultCategory?.data);

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
        <div
          className={`relative  flex justify-end items-center h-full ${
            expand ? "w-full" : "w-[35.5rem]"
          }`}
        >
          <CiSearch
            className="absolute ml-3 w-7 h-7 pr-2 border-r"
            fill="#6B7280"
          />
          <input
            type="text"
            placeholder="Input New Category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`border ${
              expand ? "w-full" : "w-[35.5rem]"
            } h-full p-3 px-12 rounded-md`}
          />
          <button className="absolute bg-primary-binus text-white px-3 py-1 rounded-sm right-3">
            Add Category
          </button>
        </div>
        <div
          className={`relative  flex justify-end items-center h-full ${
            expand ? "w-full" : "w-[35.5rem]"
          }`}
        >
          <CiSearch
            className="absolute ml-3 w-7 h-7 pr-2 border-r left-1"
            fill="#6B7280"
          />
          <input
            type="text"
            placeholder="Input New Technology"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`border ${
              expand ? "w-full" : "w-[35.5rem]"
            } h-full p-3 px-12 rounded-md`}
          />
          <button className="absolute bg-primary-binus text-white px-3 py-1 rounded-sm right-3">
            Add Tech
          </button>
        </div>
      </div>
      <div className="flex gap-5 mx-9">
        <div className="w-full bg-white shadow-md rounded-md h-fit">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-start">Category ID</TableHead>
                <TableHead className="text-start">Category Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories?.map((category, index) => (
                <TableRow>
                  <TableCell className="text-start font-medium w-40">
                    {index + 1}
                  </TableCell>
                  <TableCell className="text-start">{category?.name}</TableCell>
                  <TableCell className="text-end text-yellow-500 cursor-pointer">
                    Update
                  </TableCell>
                </TableRow>
              ))} 
            </TableBody>
          </Table>
        </div>
        <div className="w-full bg-white shadow-md rounded-md h-fit">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-start">Tech ID</TableHead>
                <TableHead className="text-start">Tech Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {techs.map((tech, index) => (
              <TableRow>
                <TableCell className="text-start font-medium w-40">
                  {index + 1}
                </TableCell>
                <TableCell className="text-start">{tech?.name}</TableCell>
                <TableCell className="text-end text-yellow-500 cursor-pointer">
                  Update
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  );
};

export default page;
