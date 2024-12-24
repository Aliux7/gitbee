"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import { RiStarSFill } from "react-icons/ri";
import { Rating } from "@material-tailwind/react";
import { LiaStarSolid } from "react-icons/lia";
import { RiStarSLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiGithub } from "react-icons/si";
import { BsGlobe2 } from "react-icons/bs";
import PreviewDetailComponent from "@/app/components/course-lecturer/PreviewDetailComponent";
import { StarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import ConfirmationFinalized from "@/app/components/course-lecturer/ConfirmationFinalized";
import {
  deleteGroup,
  finalizeClassProject,
  getAllGroupByClass,
} from "../actions";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Loading from "@/app/components/Loading";

interface Status {
  id: number;
  created_at: string;
}

const page: React.FC<{ params: { id: string } }> = ({ params: { id } }) => {
  const { scrollYProgress } = useScroll();
  const prevScrollY = useRef(0);
  const { toast } = useToast();
  const [expand, setExpand] = useState(true);
  const [loading, setLoading] = useState(false);
  const [groupsClassData, setGroupsClassData] = useState<any>([]);
  const [ratings, setRatings] = useState(Array(0).fill(0));
  const [reasons, setReasons] = useState(Array(0).fill(""));
  const [status, setStatus] = useState<Status>({ id: 0, created_at: "" });
  const [showPreviewDetailProject, setShowPreviewDetailProject] =
    useState(false);
  const [showConfirmationFinalized, setShowConfirmationFinalized] =
    useState(false);

  const [selectedPreviewProject, setSelectedPreviewProject] = useState<any>();

  const handleRatingChange = (newRating: number, index: number) => {
    const updatedRatings = [...ratings];
    updatedRatings[index] = newRating;
    setRatings(updatedRatings);
  };

  const handleReasonChange = (newReason: string, index: number) => {
    const updatedReasons = [...reasons];
    updatedReasons[index] = newReason;
    setReasons(updatedReasons);
  };

  const fetchData = async () => {
    setLoading(true);
    const resultAllGroupsData = await getAllGroupByClass(
      "be992b30-4b38-4361-8404-25f2d6912754",
      "COMP6100001",
      id
    );
    setGroupsClassData(resultAllGroupsData?.data);
    setRatings(
      Array(resultAllGroupsData?.data?.updatedProjects?.length).fill(1)
    );
    setReasons(
      Array(resultAllGroupsData?.data?.updatedProjects?.length).fill("")
    );
    console.log(resultAllGroupsData?.data);

    setStatus({
      id: resultAllGroupsData?.data?.updatedProjects[0]?.projectDetail
        ?.status_id,
      created_at:
        resultAllGroupsData?.data?.updatedProjects[0]?.assessment?.created_at,
    });

    setLoading(false);
  };

  const handleFinalize = async () => {
    setLoading(true);
    const assessments = groupsClassData?.updatedProjects?.map(
      (project: any, index: number) => ({
        project_id: String(project.id),
        grade: Number(ratings[index]),
        reason: reasons[index],
      })
    );

    const payloadData = {
      semester_id: "be992b30-4b38-4361-8404-25f2d6912754",
      course_id: "COMP6100001",
      class: id,
      lecturer_id: "KS23-1",
      assessments: assessments,
    };

    const resultFinalize = await finalizeClassProject(
      payloadData.semester_id,
      payloadData.course_id,
      payloadData.class,
      payloadData.lecturer_id,
      payloadData.assessments
    );

    if (resultFinalize?.success) {
      toast({
        title: "Your Class has been successfully finalized.",
        description: `${payloadData.class} has been successfully finalized`,
      });
    } else {
      toast({
        title: "Oops! Something went wrong!",
        description: `${payloadData.class} hasn't successfully finalized. You can try again later`,
      });
    }

    fetchData();
    setLoading(false);
    setShowConfirmationFinalized(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleDeleteGroup = async (group: string) => {
    const resultDeleteGroup = await deleteGroup(
      "be992b30-4b38-4361-8404-25f2d6912754",
      "COMP6100001",
      id,
      group
    );

    fetchData();
    console.log(resultDeleteGroup);
  };

  return (
    <motion.div className="relative min-h-screen flex flex-col justify-start items-center px-[6.25rem] ">
      <div
        className={`fixed top-0 w-full flex justify-center items-center transition-all ease-in-out duration-300 px-24 z-10 pb-5 ${
          expand ? "pt-24" : "pt-10"
        } bg-gray-50`}
      >
        <div className="w-full border-b flex justify-between items-center pb-3">
          <div className={`px-1 ${expand ? "w-1/2" : "w-[calc(50%-5rem)]"}`}>
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
                    {id.toUpperCase()} - Software Engineering
                  </BreadcrumbPage>
                </BreadcrumbItem>
                {showPreviewDetailProject && <BreadcrumbSeparator />}
                {showPreviewDetailProject && (
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-primary-orange">
                      Preview Group
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
                {id.toUpperCase()}
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
                  Group Created:
                </span>{" "}
                20/30 Student
              </h1>
              <h1 className="">
                <span className="text-primary-binus font-semibold">
                  Project Submitted:
                </span>{" "}
                3/7 Submitted
              </h1>
              <h1 className="">
                <span className="text-primary-binus font-semibold">
                  Status:
                </span>{" "}
                {status.id == 1 ? (
                  <span className="text-red-500 font-semibold">
                    Not Yet Graded
                  </span>
                ) : status.id == 2 ? (
                  <span className="text-purple-500 font-semibold">
                    Finalized
                  </span>
                ) : status.id == 3 ? (
                  <span className="text-primary-binus font-semibold">
                    Reviewed By HOP
                  </span>
                ) : null}
              </h1>
            </div>
            <div>
              {status.id == 1 ? (
                <button
                  className="bg-purple-600 text-white px-4 py-2 rounded-md flex justify-center items-center gap-2"
                  onClick={() => setShowConfirmationFinalized(true)}
                >
                  <FaCheck fill="white" /> Finalized
                </button>
              ) : status.id == 2 ? (
                <p>
                  Finalized At:{" "}
                  {status?.created_at
                    ? new Date(status.created_at).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })
                    : "N/A"}
                </p>
              ) : null}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5 justify-center items-start w-full place-items-stretch">
            {groupsClassData?.updatedProjects?.map(
              (groupDetail: any, index: number) => (
                <div
                  className="w-full h-fit overflow-y-auto shadow-xl border rounded-xl p-5"
                  key={index}
                >
                  <div className="w-full flex justify-between items-center">
                    <h1 className="text-xl">
                      Group {groupDetail?.projectDetail?.group}
                    </h1>
                    <button
                      className="bg-primary-binus text-white px-2 py-1 rounded-md flex justify-center items-center gap-1"
                      onClick={() => {
                        setShowPreviewDetailProject(true),
                          setSelectedPreviewProject(groupDetail);
                      }}
                    >
                      <FaEye fill="white" /> Preview
                    </button>
                  </div>
                  <div className="h-52 flex flex-col justify-start items-start mt-2">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="">NO</TableHead>
                          <TableHead className="">NIM</TableHead>
                          <TableHead className="">NAME</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {groupDetail?.projectGroups?.map(
                          (student: any, index: number) => (
                            <TableRow>
                              <TableCell className="font-medium text-center">
                                {index + 1}
                              </TableCell>
                              <TableCell className="">
                                {student?.student_id}
                              </TableCell>
                              <TableCell className=" truncate">
                                {student?.student_name}
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  {groupDetail?.assessment ? (
                    <div className="w-full flex justify-between items-end gap-5 border-t pt-3 min-h-[6rem] ">
                      <div className="w-1/2 self-center flex flex-col">
                        <Label className="text-lg font-normal">Reason:</Label>
                        {groupDetail?.assessment?.grade > 3 && (
                          <Label className="text-lg underline">
                            {groupDetail?.assessment?.reason}
                          </Label>
                        )}
                        {groupDetail?.assessment?.grade <= 3 && (
                          <Label className="text-lg font-normal underline">
                            Not Outstanding
                          </Label>
                        )}
                      </div>
                      <div className="w-1/2 flex flex-col justify-end items-end text-primary-binus  cursor-pointer">
                        <Rating
                          value={groupDetail?.assessment?.grade}
                          ratedIcon={
                            <LiaStarSolid className="fill-purple-500 w-6 h-6" />
                          }
                          unratedIcon={
                            <RiStarSLine className="fill-purple-500 w-6 h-6" />
                          }
                          ratedColor="yellow"
                          unratedColor="gray"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                          readonly
                        />
                        {groupDetail?.assessment?.grade} of 5
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex justify-between items-end gap-5 border-t pt-3 min-h-[6rem]">
                      <div className="w-1/2">
                        {ratings[index] > 3 && (
                          <Label className="text-lg">Reason:</Label>
                        )}
                        {ratings[index] > 3 && (
                          <Textarea
                            onChange={(event) =>
                              handleReasonChange(event.target.value, index)
                            }
                            value={reasons[index]}
                            className="w-auto"
                            placeholder="Reason will be deliver to HOP"
                          />
                        )}
                      </div>
                      <div className="w-1/2 flex flex-col justify-end items-end text-primary-binus  cursor-pointer">
                        <Rating
                          value={ratings[index]}
                          ratedIcon={
                            <LiaStarSolid className="fill-yellow-500 w-6 h-6" />
                          }
                          unratedIcon={
                            <RiStarSLine className="fill-yellow-500 w-6 h-6" />
                          }
                          ratedColor="yellow"
                          unratedColor="gray"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                          onChange={(newRating) =>
                            handleRatingChange(newRating, index)
                          }
                        />
                        {ratings[index]} of 5
                      </div>
                    </div>
                  )}
                </div>
              )
            )}
            {groupsClassData?.sortedGroups?.map(
              (groupDetail: any, index: number) => (
                <div
                  className="w-full h-fit overflow-y-auto shadow-xl border rounded-xl p-5"
                  key={index}
                >
                  <div className="w-full flex justify-between items-center">
                    <h1 className="text-xl">Group {groupDetail?.group}</h1>
                    <button className="text-red-500 px-2 py-1 rounded-md flex justify-center items-center gap-1 cursor-default">
                      <FaEyeSlash className="fill-red-500" /> Not Yet Submitted
                    </button>
                  </div>
                  <div className="h-52 flex flex-col justify-start items-start mt-2">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="">NO</TableHead>
                          <TableHead className="">NIM</TableHead>
                          <TableHead className="">NAME</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {groupDetail?.students?.map(
                          (student: any, index: number) => (
                            <TableRow>
                              <TableCell className="font-medium text-center">
                                {index + 1}
                              </TableCell>
                              <TableCell className="">
                                {student?.student_id}
                              </TableCell>
                              <TableCell className=" truncate">
                                {student?.student_name}
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="w-full flex justify-between items-end gap-5 border-t pt-3 min-h-[6rem]">
                    <div className="w-1/2"></div>
                    <div className="w-1/2 flex flex-col justify-end items-end text-primary-binus  cursor-pointer">
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to delete Group " +
                                groupDetail?.group +
                                "?"
                            )
                          ) {
                            handleDeleteGroup(groupDetail.group);
                          }
                        }}
                        className="text-white bg-red-500 px-3 py-1 rounded-md flex justify-center items-center gap-2"
                      >
                        <MdDelete className="text-white fill-white w-4 h-4" />
                        Delete Group
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          {groupsClassData?.sortedGroups?.length < 1 &&
            groupsClassData?.updatedProjects?.length < 1 && (
              <div className="w-full text-center py-5 shadow-sm rounded-md">
                No Group Has Been Created
              </div>
            )}
        </div>
      )}
      {showPreviewDetailProject && (
        <div className="h-fit w-full pt-40 pb-10 flex flex-col gap-5">
          <PreviewDetailComponent
            setShowPreviewDetailProject={setShowPreviewDetailProject}
            expand={expand}
            selectedPreviewProject={selectedPreviewProject}
          />
        </div>
      )}
      {showConfirmationFinalized && (
        <ConfirmationFinalized
          groupsClassData={groupsClassData}
          setShowConfirmationFinalized={setShowConfirmationFinalized}
          ratings={ratings}
          handleFinalize={handleFinalize}
        />
      )}
      {loading && <Loading />}
      <Toaster />
    </motion.div>
  );
};

export default page;
