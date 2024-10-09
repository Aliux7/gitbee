"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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

const page = () => {
  const { scrollYProgress } = useScroll();
  const prevScrollY = useRef(0);
  const [expand, setExpand] = useState(true);
  const [showInsertForm, setShowInsertForm] = useState(false);

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
        className={`fixed top-0 w-full flex justify-center items-center transition-all ease-in-out duration-300 px-24 z-10 ${
          expand ? "pt-24" : "pt-10"
        } bg-gray-50`}
      >
        <div className="w-full border-b flex justify-between items-center pb-3">
          <div className={`px-1 ${expand ? "w-1/2" : "w-[calc(50%-5rem)]"}`}>
            <h1 className="font-montserrat text-xl text-primary-binus font-semibold">
              <span className="text-primary-orange text-xl">COMP6100001</span> -
              Software Engineering
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
            <div className="bg-secondary-binus text-xl font-semibold rounded-lg px-2 ">
              BG01
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 w-full h-fit flex justify-start items-center transition-all ease-in-out duration-300 px-24 pb-3 z-[5] ${
          expand ? "pt-36" : "pt-[5.5rem]"
        } bg-gray-50`}
      >
        <Breadcrumb className="px-1">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/dashboard"
                className="relative text-primary-binus hover:text-primary-binus after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-primary-orange after:transition-all after:duration-300"
              >
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary-orange">
                COMP6100001 - Software Engineering
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="h-fit w-full pt-48 pb-10 flex flex-col gap-5">
        <div className="flex-grow max-h-[21rem] h-fit overflow-y-auto shadow-xl border rounded-xl p-5">
          <h1 className="text-xl">Submitted Answer</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">TYPE</TableHead>
                <TableHead className="text-center">DEADLINE</TableHead>
                <TableHead className="text-center">UPLOADED BY</TableHead>
                <TableHead className="text-center">UPLOADED DATE</TableHead>
                <TableHead className="text-center">STATUS</TableHead>
                <TableHead className="text-center">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* <TableRow>
                <TableCell className="font-medium text-center">
                  Assignment-1
                </TableCell>
                <TableCell className="text-center">
                  Kelson Edbert Susilo
                </TableCell>
                <TableCell className="text-center">
                  10 October 2023, 18:17:12
                </TableCell>
                <TableCell className="font-medium text-center">
                  <span>Submitted</span>
                </TableCell>
                <TableCell className="font-medium text-center">
                  <button
                    className="bg-primary-binus text-white px-2 py-1 rounded-md hover:bg-primary-orange"
                    onClick={() => setShowInsertForm(true)}
                  >
                    Upload
                  </button>
                </TableCell>
              </TableRow> */}
              <TableRow>
                <TableCell className="font-medium text-center">
                  Project-1
                </TableCell>
                <TableCell className="text-center">
                  10 October 2023, 18:17:12
                </TableCell>
                <TableCell className="text-center">
                  Kelson Edbert Susilo
                </TableCell>
                <TableCell className="text-center">
                  10 October 2023, 18:17:12
                </TableCell>
                <TableCell className="font-medium text-center">
                  <span className="bg-purple-300 text-purple-700 px-2 py-0.5 rounded-md">
                    Submitted
                  </span>
                </TableCell>
                <TableCell className="font-medium text-center">
                  <button
                    className="bg-primary-binus text-white px-2 py-1 rounded-md hover:bg-primary-orange"
                    onClick={() => setShowInsertForm(true)}
                  >
                    Upload
                  </button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-center">
                  Project-1
                </TableCell>
                <TableCell className="text-center">
                  10 October 2023, 18:17:12
                </TableCell>
                <TableCell className="text-center">
                  Kelson Edbert Susilo
                </TableCell>
                <TableCell className="text-center">
                  10 October 2023, 18:17:12
                </TableCell>
                <TableCell className="font-medium text-center">
                  <span className="bg-green-300 text-green-700 px-2 py-0.5 rounded-md">
                    Graded
                  </span>
                </TableCell>
                <TableCell className="font-medium text-center">
                  <button
                    className="bg-primary-binus text-white px-2 py-1 rounded-md hover:bg-primary-orange"
                    onClick={() => setShowInsertForm(true)}
                  >
                    Upload
                  </button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-center">
                  Project-1
                </TableCell>
                <TableCell className="text-center">
                  10 October 2023, 18:17:12
                </TableCell>
                <TableCell className="text-center">
                  Kelson Edbert Susilo
                </TableCell>
                <TableCell className="text-center">
                  10 October 2023, 18:17:12
                </TableCell>
                <TableCell className="font-medium text-center">
                  <span className="bg-blue-300 text-blue-700 px-2 py-0.5 rounded-md">
                    Review
                  </span>
                </TableCell>
                <TableCell className="font-medium text-center">
                  <button
                    className="bg-primary-binus text-white px-2 py-1 rounded-md hover:bg-primary-orange"
                    onClick={() => setShowInsertForm(true)}
                  >
                    Upload
                  </button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="w-[31rem] max-h-[21rem] h-fit overflow-y-auto shadow-xl border rounded-xl p-5">
          <h1 className="text-xl">Group Forming</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[35px]">NO</TableHead>
                <TableHead className="w-32">NIM</TableHead>
                <TableHead className="w-96">NAME</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-center">1</TableCell>
                <TableCell className="w-32">2540115465</TableCell>
                <TableCell className="w-96 truncate">
                  Kelson Edbert Susilo
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-center">2</TableCell>
                <TableCell className="w-32">2540115465</TableCell>
                <TableCell>
                  <h1 className="w-64 truncate">Kelson Edbert Susilo</h1>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-center">3</TableCell>
                <TableCell className="w-32">2540115465</TableCell>
                <TableCell>
                  <h1 className="w-64 truncate">Kelson Edbert Susilo</h1>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-center">4</TableCell>
                <TableCell className="w-32">2540115465</TableCell>
                <TableCell>
                  <h1 className="w-64 truncate">Kelson Edbert Susilo</h1>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      {showInsertForm && <PopUpInsert setShowInsertForm={setShowInsertForm} />}
    </motion.div>
  );
};

export default page;
