"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import DDMenu from "@/app/components/DDMenu";
import { BsCalendar4Range } from "react-icons/bs";
import DDMenuSemester from "@/app/components/DDMenuSemester";
import Card from "@/app/components/Card";
import Link from "next/link";
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
import {
  getAllSemester,
  getCoursesByLecturer,
  getCurrentSemester,
  getTranscationByLecturer,
} from "./action";
import { useAuth } from "@/app/context/AuthContext";
import Loading from "@/app/components/Loading";

const page = () => {
  const { userData } = useAuth();
  const { scrollYProgress } = useScroll();
  const prevScrollY = useRef(0);
  const [expand, setExpand] = useState(true);
  const [listSemester, setListSemester] = useState<any>([]);
  const [transactions, setTransactions] = useState<any>([]);
  const [currentSemester, setCurrentSemester] = useState<any>();
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<
    { course_code: string; course_name: string }[]
  >([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");

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
    const resultListSemester = await getAllSemester();
    setListSemester(resultListSemester);

    const resultCurrentSemester = await getCurrentSemester();
    setCurrentSemester(resultCurrentSemester);
  };

  const fetchTransactionData = async () => {
    setLoading(true);
    console.log(userData);
    const resultTransactions = await getTranscationByLecturer(
      currentSemester?.data?.SemesterId,
      userData?.nim ? userData?.nim : "",
      selectedCategoryFilter
    );
    console.log(resultTransactions?.data);
    setTransactions(resultTransactions?.data);

    const resultCourses = await getCoursesByLecturer(
      currentSemester?.data?.SemesterId,
      userData?.nim ? userData?.nim : ""
    );
    console.log(resultCourses?.data);
    setCategories(resultCourses?.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchTransactionData();
  }, [currentSemester, selectedCategoryFilter]);

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
              My Classes
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
            {" "}
            <DDMenuSemester
              options={listSemester}
              filter="Semester"
              icon={<BsCalendar4Range className="w-4 h-4" />}
              currentSemester={currentSemester}
              setCurrentSemester={setCurrentSemester}
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-44 flex flex-col justify-start items-start gap-3">
        <DDMenuCourses
          options={categories}
          filter="All Courses"
          setSelectedValue={setSelectedCategoryFilter}
          icon={<BsCalendar4Range className="w-4 h-4" />}
        />
        <div className="w-full bg-white shadow-md rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-start">Class ID</TableHead>
                <TableHead className="text-center">Course ID</TableHead>
                <TableHead className="text-center">Course Name</TableHead>
                <TableHead className="text-center">Start Correction</TableHead>
                <TableHead className="text-center">End Correction</TableHead>
                <TableHead className="text-center">Student</TableHead>
                <TableHead className="text-center">Submit</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.map((transaction: any) => (
                <TableRow>
                  <TableCell className="text-start font-medium">
                    {transaction?.class}
                  </TableCell>
                  <TableCell className="text-center">
                    {transaction?.course_code}
                  </TableCell>
                  <TableCell className="text-center">
                    {transaction?.course_name}
                  </TableCell>
                  <TableCell className="text-center"> - </TableCell>
                  <TableCell className="text-center"> - </TableCell>
                  <TableCell className="text-center"> - </TableCell>
                  <TableCell className="text-center"> - </TableCell>
                  <TableCell className="text-center">
                    <Link
                      href={{
                        pathname: `/course-lecturer`,
                        query: {
                          course_code: transaction?.course_code,
                          course_name: transaction?.course_name,
                          semester_id: currentSemester?.data?.SemesterId,
                          class_id: transaction?.class,
                        },
                      }}
                      className="bg-primary-binus px-2 py-1 text-white rounded-md"
                    >
                      Detail
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {loading && <Loading />}
    </motion.div>
  );
};

export default page;
