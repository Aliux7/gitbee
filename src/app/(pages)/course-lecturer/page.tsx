"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { FaEye } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import { RiStarSFill } from "react-icons/ri";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { RiStarSLine } from "react-icons/ri";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PopUpInsert from "@/app/components/course/PopUpInsert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiGithub } from "react-icons/si";
import { BsGlobe2 } from "react-icons/bs";
import PreviewDetailComponent from "@/app/components/course-lecturer/PreviewDetailComponent";

const page = () => {
  const { scrollYProgress } = useScroll();
  const prevScrollY = useRef(0);
  const [expand, setExpand] = useState(true);
  const looping = [1, 2, 3, 4];
  const [showPreviewDetailProject, setShowPreviewDetailProject] =
    useState(false);

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

  return (
    <motion.div className="relative min-h-screen flex flex-col justify-start items-center px-[6.25rem] ">
      <div
        className={`fixed top-0 w-full flex justify-center items-center transition-all ease-in-out duration-300 px-24 z-10 pb-5 ${
          expand ? "pt-24" : "pt-10"
        } bg-gray-50`}
      >
        <div className="w-full border-b flex justify-between items-center pb-3">
          <div className={`px-1 ${expand ? "w-1/2" : "w-[calc(50%-5rem)]"}`}>
            {/* <h1 className="font-montserrat text-xl text-primary-binus font-semibold">
              <span className="text-primary-orange text-xl">COMP6100001</span> -
              Software Engineering
            </h1> */}

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/dashboard-lecturer"
                    className="relative text-primary-binus hover:text-primary-binus after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-primary-orange after:transition-all after:duration-300"
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage
                    className={`${
                      showPreviewDetailProject
                        ? "text-primary-binus"
                        : "text-primary-orange"
                    }`}
                  >
                    B601 - Software Engineering
                  </BreadcrumbPage>
                </BreadcrumbItem>
                {showPreviewDetailProject && <BreadcrumbSeparator />}
                {showPreviewDetailProject && (
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-primary-orange">
                      Preview Group 1
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </BreadcrumbList>
            </Breadcrumb>
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
            <div className="bg-secondary-binus text-sm font-semibold rounded-md px-2 ">
              COMP6100001
            </div>
          </div>
        </div>
      </div>
      {!showPreviewDetailProject && (
        <div className="h-fit w-full pt-36 pb-10 flex flex-col gap-5">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="">
                <span className="text-primary-binus font-semibold">Class:</span>{" "}
                BG01
              </h1>
              <h1 className="">
                <span className="text-primary-binus font-semibold">
                  Course:
                </span>{" "}
                COMP6100001 - Software Engineering
              </h1>
              <h1 className="">
                <span className="text-primary-binus font-semibold">
                  Start Date Correction:
                </span>{" "}
                20 Sept 2024
              </h1>
              <h1 className="">
                <span className="text-primary-binus font-semibold">
                  End Date Correction:
                </span>{" "}
                20 Sept 2024
              </h1>
              <h1 className="">
                <span className="text-primary-binus font-semibold">
                  Status:
                </span>{" "}
                <span className="text-red-500 ">Not Yet Graded</span>
              </h1>
            </div>
            <div>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md flex justify-center items-center gap-2">
                <FaCheck fill="white" /> Finalized
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5 justify-center items-start w-full place-items-stretch">
            {looping.map((index) => (
              <div className="w-full h-fit overflow-y-auto shadow-xl border rounded-xl p-5">
                <div className="w-full flex justify-between items-center">
                  <h1 className="text-xl">Group {index}</h1>
                  <button
                    className="bg-primary-binus text-white px-2 py-1 rounded-md flex justify-center items-center gap-1"
                    onClick={() => setShowPreviewDetailProject(true)}
                  >
                    <FaEye fill="white" /> Preview
                  </button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">NO</TableHead>
                      <TableHead className="">NIM</TableHead>
                      <TableHead className="">NAME</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium text-center">
                        1
                      </TableCell>
                      <TableCell className="">2540115465</TableCell>
                      <TableCell className=" truncate">
                        Kelson Edbert Susilo
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-center">
                        2
                      </TableCell>
                      <TableCell className="">2540115465</TableCell>
                      <TableCell>
                        <h1 className=" truncate">Kelson Edbert Susilo</h1>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-center">
                        3
                      </TableCell>
                      <TableCell className="">2540115465</TableCell>
                      <TableCell>
                        <h1 className=" truncate">Kelson Edbert Susilo</h1>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-center">
                        4
                      </TableCell>
                      <TableCell className="">2540115465</TableCell>
                      <TableCell>
                        <h1 className=" truncate">Kelson Edbert Susilo</h1>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="w-full flex justify-between items-end gap-5 border-t pt-3">
                  <div className="w-1/2">
                    <Label className="text-lg">Score:</Label>
                    <Input
                      type="number"
                      max={100}
                      min={0}
                      className="w-auto"
                      placeholder="0 - 100"
                    />
                  </div>
                  {/* <div className="w-1/2 flex justify-end items-center text-gray-500 gap-2">
                    <RiStarSFill
                      fill="white"
                      stroke="#6b7280"
                      style={{ strokeWidth: "2" }}
                    />
                    Not Recommended
                  </div> */}
                  <div className="w-1/2 flex justify-end items-center text-yellow-500 gap-2 cursor-pointer">
                    <RiStarSFill
                      fill="#eab308"
                      stroke="#eab308"
                      style={{ strokeWidth: "2" }}
                    />
                    Recommended
                  </div>
                </div>
              </div>
            ))}
            {looping.map((index) => (
              <div className="w-full h-fit overflow-y-auto shadow-xl border rounded-xl p-5">
                <div className="w-full flex justify-between items-center">
                  <h1 className="text-xl">Group {index}</h1>
                  <button className="bg-primary-binus text-white px-2 py-1 rounded-md flex justify-center items-center gap-1">
                    <FaEye fill="white" /> Preview
                  </button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">NO</TableHead>
                      <TableHead className="">NIM</TableHead>
                      <TableHead className="">NAME</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium text-center">
                        1
                      </TableCell>
                      <TableCell className="">2540115465</TableCell>
                      <TableCell className=" truncate">
                        Kelson Edbert Susilo
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-center">
                        2
                      </TableCell>
                      <TableCell className="">2540115465</TableCell>
                      <TableCell>
                        <h1 className=" truncate">Kelson Edbert Susilo</h1>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-center">
                        3
                      </TableCell>
                      <TableCell className="">2540115465</TableCell>
                      <TableCell>
                        <h1 className=" truncate">Kelson Edbert Susilo</h1>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="w-full flex justify-end items-center gap-5 border-t pt-3">
                  <Label className="text-lg">Score:</Label>
                  <Input type="number" max={100} min={0} className="w-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {showPreviewDetailProject && (
        <div className="h-fit w-full pt-40 pb-10 flex flex-col gap-5">
          <PreviewDetailComponent
            setShowPreviewDetailProject={setShowPreviewDetailProject}
            expand={expand}
          />
        </div>
      )}
    </motion.div>
  );
};

export default page;
