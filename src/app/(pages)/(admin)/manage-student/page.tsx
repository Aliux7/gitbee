"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { deleteAllStudents, getAllStudents } from "./actions";
import Loading from "@/app/components/Loading";
import ImportExcel from "@/app/components/manage-student/ImportExcel";
import PopUpConfirmation from "@/app/components/manage-student/PopUpConfirmation";

const page = () => {
  const { scrollYProgress } = useScroll();
  const prevScrollY = useRef(0);
  const [expand, setExpand] = useState(true);
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState<any>([]);
  const [openImportExcel, setOpenImportExcel] = useState(false);
  const [openPopUpConfirmation, setOpenPopUpConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const resultStudents = await getAllStudents(search);
    console.log(resultStudents?.data);
    setStudents(resultStudents?.data);
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
    fetchData();
  }, [search]);

  const handleDeleteAllStudents = async () => {
    setLoading(true);
    const resultDeleteAllStudents = await deleteAllStudents();
    console.log(resultDeleteAllStudents?.data);
    setOpenPopUpConfirmation(false);
    fetchData();
    setLoading(false);
  };

  return (
    <motion.div className="relative min-h-screen flex flex-col pt-28 px-16 bg-gray-50 pb-10">
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
          <button
            className="w-full whitespace-nowrap cursor-pointer py-2 px-4 relative text-primary-binus rounded-sm"
            onClick={() => setOpenImportExcel(true)}
          >
            Import Excel
          </button>
        </div>
      </div>

      <div className="mx-9 text-end mb-2">
        <span
          onClick={() => setOpenPopUpConfirmation(true)}
          className="text-red-500 cursor-pointer"
        >
          Delete All Students
        </span>
      </div>
      <div className="w-auto bg-white shadow-md rounded-md mx-9">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-start">No.</TableHead>
              <TableHead className="text-center">Nim</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Course Code</TableHead>
              <TableHead className="text-center">Class</TableHead>
              <TableHead className="text-center">Semester Id</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students?.map((student: any, index: number) => (
              <TableRow>
                <TableCell className="text-start font-medium">
                  {index + 1}.
                </TableCell>
                <TableCell className="text-center">
                  {student?.student_id}
                </TableCell>
                <TableCell className="text-center">
                  {student?.student_name}
                </TableCell>
                <TableCell className="text-center">
                  {student?.course_code}
                </TableCell>
                <TableCell className="text-center">{student?.class}</TableCell>
                <TableCell className="text-center">
                  {student?.semester_id}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {openImportExcel && (
        <ImportExcel
          setOpenImportExcel={setOpenImportExcel}
          fetchData={fetchData}
        />
      )}
      {openPopUpConfirmation && (
        <PopUpConfirmation
          setOpenPopUpConfirmation={setOpenPopUpConfirmation}
          handleDeleteAllStudents={handleDeleteAllStudents}
        />
      )}
      {loading && <Loading />}
    </motion.div>
  );
};

export default page;
