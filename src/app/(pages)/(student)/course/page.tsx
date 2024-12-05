"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
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
import PopUpJoinGroup from "@/app/components/course/PopUpJoinGroup";
import { getGroupDetail, getProjectDetail } from "./actions";
import { useAuth } from "@/app/context/AuthContext";
import Loading from "@/app/components/Loading";

const page = () => {
  const { userData } = useAuth();
  const { scrollYProgress } = useScroll();
  const prevScrollY = useRef(0);
  const { toast } = useToast();
  const [expand, setExpand] = useState(true);
  const [showInsertForm, setShowInsertForm] = useState(false);
  const [showJoinGroup, setShowJoinGroup] = useState(false);
  const [groupDetail, setGroupDetail] = useState<any>([]);
  const [projectDetail, setProjectDetail] = useState<any>([]);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    const resultProjectDetail = await getProjectDetail(
      "be992b30-4b38-4361-8404-25f2d6912754",
      "COMP6100001",
      "BG01",
      userData?.nim ? userData?.nim : ""
    );
    setProjectDetail(resultProjectDetail?.data);
    console.log(resultProjectDetail?.data);

    if (resultProjectDetail?.data?.length > 0) {
      setGroupDetail(resultProjectDetail?.data[0]?.projectGroups);
      console.log(resultProjectDetail?.data[0]?.projectGroups);
    } else if (projectDetail?.length == 0) {
      const resultDetailGroup = await getGroupDetail(
        "be992b30-4b38-4361-8404-25f2d6912754",
        "COMP6100001",
        "BG01",
        userData?.nim ? userData?.nim : ""
      );
      setGroupDetail(resultDetailGroup?.data);
      console.log(resultDetailGroup?.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    console.log(userData);
  }, []);

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
              {projectDetail?.length > 0 ? (
                projectDetail?.map((project: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-center">
                      Project-1
                    </TableCell>
                    <TableCell className="text-center">
                      10 December 2024, 18:17:12
                    </TableCell>
                    <TableCell className="text-center">
                      {project?.student_leader_id}
                    </TableCell>
                    <TableCell className="text-center">
                      {new Date(project?.created_at)
                        .toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: false,
                        })
                        .replace(" at ", ", ")}
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      {project?.projectDetail?.status_id == 1 ? (
                        <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md">
                          Submitted
                        </span>
                      ) : project?.projectDetail?.status_id == 2 ? (
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md">
                          Graded
                        </span>
                      ) : (
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md">
                          Review
                        </span>
                      )}
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
                ))
              ) : (
                <TableRow>
                  <TableCell className="font-medium text-center">
                    Project-1
                  </TableCell>
                  <TableCell className="text-center">
                    10 December 2024, 18:17:12
                  </TableCell>
                  <TableCell className="text-center">-</TableCell>
                  <TableCell className="text-center">-</TableCell>
                  <TableCell className="font-medium text-center">-</TableCell>
                  <TableCell className="font-medium text-center">
                    <button
                      disabled={groupDetail?.length < 1}
                      className={`${
                        groupDetail?.length >= 1
                          ? "bg-primary-binus hover:bg-primary-orange"
                          : "bg-gray-500 cursor-not-allowed"
                      } text-white px-2 py-1 rounded-md `}
                      onClick={() => setShowInsertForm(true)}
                    >
                      Upload
                    </button>
                  </TableCell>
                </TableRow>
              )}
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
            {groupDetail?.length >= 1 ? (
              <TableBody>
                {groupDetail.map((row: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-center">
                      {index + 1}
                    </TableCell>
                    <TableCell className="w-32">{row?.student_id}</TableCell>
                    <TableCell className="w-96 truncate">
                      {row?.student_name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableCaption className="">
                <br />
                <button
                  className="px-3 py-1 rounded-xl bg-primary-orange text-white"
                  onClick={() => setShowJoinGroup(true)}
                >
                  Create a group +
                </button>
                <br />
                <br />
              </TableCaption>
            )}
          </Table>
        </div>
      </div>
      <Toaster />
      {showInsertForm && (
        <PopUpInsert
          groupMembers={groupDetail}
          group={projectDetail[0]?.projectDetail?.group}
          fetchData={fetchData}
          setShowInsertForm={setShowInsertForm}
          toast={toast}
        />
      )}
      {showJoinGroup && (
        <PopUpJoinGroup
          fetchData={fetchData}
          setShowJoinGroup={setShowJoinGroup}
          toast={toast}
          userId={userData?.nim}
        />
      )}
      {loading && <Loading />}
    </motion.div>
  );
};

export default page;
