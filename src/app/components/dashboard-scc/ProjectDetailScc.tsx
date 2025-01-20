import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsGlobe2 } from "react-icons/bs";
import { motion } from "framer-motion";
import { IoIosArrowRoundBack, IoIosVideocam } from "react-icons/io";
import { SiGithub } from "react-icons/si";
import { setProjectStatus } from "@/app/(pages)/(scc)/dashboard-scc/actions";

interface ProjectDetailSccProps {
  setShowDevelopers: (value: boolean) => void;
  selectedDetailProject: any;
  showDevelopers: boolean;
  expand: boolean;
  toast: any;
  fetchProjectData: any;
}

function ProjectDetailScc(props: ProjectDetailSccProps) {
  const [toggleStatus, setToggleStatus] = useState(-1);
  const [showConfirmFinalize, setShowConfirmFinalize] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  useEffect(() => {
    console.log(props.selectedDetailProject);
  }, [props.selectedDetailProject]);

  const confirmStatus = async () => {
    const result = await setProjectStatus(
      props.selectedDetailProject?.id,
      toggleStatus
    );
    if (result?.success) {
      props.toast({
        title: "Project has been successfully finalized.",
        description: `${props.selectedDetailProject?.projectDetail?.title} has been successfully finalized`,
      });
    } else {
      props.toast({
        title: "Oops! Something went wrong!",
        description: `${props.selectedDetailProject?.projectDetail?.title} hasn't successfully finalized. You can try again later`,
      });
    }
    setShowConfirmFinalize(false);
    props.setShowDevelopers(false);
    props.fetchProjectData();
  };

  return (
    <motion.div
      className="relative flex justify-center items-start w-auto bg-white h-full mx-9 rounded-md px-5 mb-14 pb-7 pt-3"
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className={`sticky top-32 w-[30rem] h-full py-2 opacity-100 flex flex-col gap-5 transition-all ease-in-out duration-500 overflow-hidden`}
        variants={containerVariants}
      >
        {/* <h1 className="text-center py-10 text-gray-500">No Project Selected</h1> */}

        <div
          className="hover:bg-gray-100 p-1.5 cursor-pointer rounded-md flex justify-start items-center w-fit "
          onClick={() => props.setShowDevelopers(false)}
        >
          <IoIosArrowRoundBack className="w-7 h-7" /> Back to Dashboard
        </div>
        <h1 className="text-2xl border-t pt-5 mr-4">List Developers</h1>
        {props.selectedDetailProject?.projectGroups?.map(
          (projectGroup: any) => (
            <Link
              href={"/portofolio/123"}
              className="flex justify-start items-center gap-5 border-b pb-5 mr-4 cursor-pointer"
            >
              <img
                src="/images/1.jpg"
                className="rounded-full h-20 w-20 p-1 border object-cover"
              />
              <div className="w-48">
                <h1 className="truncate font-semibold capitalize">
                  {projectGroup?.student_name.toLowerCase()}
                </h1>
                <h1 className="truncate text-sm text-gray-500">
                  {projectGroup?.student_binusian_id}
                </h1>
                <h1 className="truncate text-sm text-gray-500">
                  {projectGroup?.student_id}
                </h1>
              </div>
            </Link>
          )
        )}
      </motion.div>
      <motion.div
        className="relative w-full border-l pl-3 flex flex-col h-fit py-3 justify-start items-start transition-all ease-in-out duration-500"
        variants={containerVariants}
      >
        <div className="w-full flex flex-col pr-5">
          <div className="w-full flex justify-start items-start border-b pb-5">
            <div className="mx-3 flex flex-col gap-1 w-2/3">
              <h1 className="text-3xl font-bold">
                {props.selectedDetailProject?.projectDetail?.title}
              </h1>
              <h3 className="text-sm text-gray-500 capitalize">
                By.{" "}
                {props.selectedDetailProject?.projectGroups?.map(
                  (projectGroup: any, index: number) => (
                    <span className="text-gray-500">
                      {projectGroup?.student_name.toLowerCase()}
                      {props.selectedDetailProject?.projectGroups?.length >
                      index + 1
                        ? ", "
                        : ""}{" "}
                    </span>
                  )
                )}
              </h3>
              <div className="h-fit flex-grow my-3 pr-10">
                <h1 className="text-balance text-gray-700">
                  {props.selectedDetailProject?.projectDetail?.description}
                </h1>
              </div>
              <Link
                href={props.selectedDetailProject?.projectDetail?.github_link}
                className="flex justify-start items-center gap-2 text-sm my-1 text-primary-binus"
              >
                <SiGithub fill="#EB9327" />
                {props.selectedDetailProject?.projectDetail?.github_link}
              </Link>
              <Link
                href={props.selectedDetailProject?.projectDetail?.project_link}
                className="flex justify-start items-center gap-2 text-sm my-1 text-primary-binus"
              >
                <BsGlobe2 fill="#EB9327" />{" "}
                {props.selectedDetailProject?.projectDetail?.project_link}
              </Link>

              {props.selectedDetailProject?.projectDetail?.video_link &&
                props.selectedDetailProject?.projectDetail?.video_link !=
                  "" && (
                  <Link
                    href={
                      props.selectedDetailProject?.projectDetail?.video_link
                    }
                    className="flex justify-start items-center gap-2 text-sm my-1 text-primary-binus"
                  >
                    <IoIosVideocam fill="#EB9327" />{" "}
                    {props.selectedDetailProject?.projectDetail?.video_link}
                  </Link>
                )}
            </div>
            <div className="w-1/3">
              <img
                src={props.selectedDetailProject?.projectDetail?.thumbnail}
                className="w-full rounded-md border"
              />
            </div>
          </div>
          <div className="w-full h-96 my-3 flex overflow-auto gap-3">
            {props.selectedDetailProject?.galleries?.map((gallery: any) => (
              <img src={gallery?.image} className="h-full rounded-md border" />
            ))}
          </div>
          <div className="w-full">
            <p className="text-lg">
              <span className="text-primary-binus">Lecturer:</span>{" "}
              <span className="text-primary-orange">
                {props.selectedDetailProject?.lecturer_id} -{" "}
                {props.selectedDetailProject?.lecturer_name}
              </span>
              <br />
              <span className="text-primary-binus">Course:</span>{" "}
              <span className="text-primary-orange">
                {props.selectedDetailProject?.projectDetail?.course_id} -{" "}
                {props.selectedDetailProject?.projectDetail?.course_name} -{" "}
                {props.selectedDetailProject?.projectDetail?.major_name}
              </span>
              <br />
              <span className="text-primary-binus">Status:</span>{" "}
              {props.selectedDetailProject?.is_disable == 1 ? (
                <span className="text-red-500">Hidden</span>
              ) : (
                <span className="text-green-500">Display</span>
              )}
              <br />
              The lecturer gave a rating of{" "}
              <span className="text-primary-orange underline">
                {props.selectedDetailProject?.assessment?.grade}
              </span>{" "}
              out of 5 <br />
              Reason: "
              <span className="text-primary-orange underline">
                {props.selectedDetailProject?.assessment?.reason}
              </span>
              "
            </p>
          </div>
        </div>
        {props.selectedDetailProject?.reviewedProject ? (
          <div className="w-full h-auto flex justify-end items-center gap-5 mt-10 text-lg">
            {props.selectedDetailProject?.reviewedProject?.is_recommended ==
            1 ? (
              <div>
                This Project has been{" "}
                <span className="text-primary-orange underline">
                  recommended
                </span>{" "}
                and been finalized at{" "}
                {new Date(
                  props.selectedDetailProject?.reviewedProject?.created_at
                ).toLocaleDateString([], {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}{" "}
                {new Date(
                  props.selectedDetailProject?.reviewedProject?.created_at
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            ) : (
              <div>
                This Project has been{" "}
                <span className="text-red-600 underline">not recommended</span>{" "}
                and been finalized at{" "}
                {new Date(
                  props.selectedDetailProject?.reviewedProject?.created_at
                ).toLocaleDateString([], {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}{" "}
                {new Date(
                  props.selectedDetailProject?.reviewedProject?.created_at
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-auto flex justify-end items-center gap-5 mt-10">
            <div className="flex justify-center items-center gap-1 bg-white rounded-md border p-1">
              <div
                className={`px-5 py-1 ${
                  toggleStatus == 0
                    ? "bg-red-500 text-white"
                    : "hover:bg-gray-100 text-red-500"
                } cursor-pointer rounded-sm text-lg`}
                onClick={() => setToggleStatus(0)}
              >
                Not Recommended
              </div>
              <div
                className={`px-5 py-1 ${
                  toggleStatus == 1
                    ? "bg-primary-orange text-white"
                    : "hover:bg-gray-100 text-primary-orange"
                } cursor-pointer rounded-sm text-lg`}
                onClick={() => setToggleStatus(1)}
              >
                Recommended
              </div>
            </div>
            <button
              className={`text-white px-10 py-2 rounded-md ${
                toggleStatus == 1 || toggleStatus == 0
                  ? "cursor-pointer bg-primary-binus"
                  : "cursor-not-allowed bg-gray-500"
              }`}
              onClick={() => {
                toggleStatus == 0 || toggleStatus == 1
                  ? setShowConfirmFinalize(true)
                  : null;
              }}
            >
              Finalize
            </button>
          </div>
        )}
      </motion.div>
      {showConfirmFinalize && (
        <div className="fixed top-0 w-screen h-screen bg-black/50 z-[110] flex justify-center items-center">
          <div className="bg-white w-[40rem] h-fit rounded-md p-10">
            <h1 className="text-4xl">
              Are you sure you want to <br />
              {toggleStatus == 0 ? (
                <span className="text-red-500">
                  Not Recommended This Project
                </span>
              ) : (
                <span className="text-primary-orange">
                  Recommended This Project to HOP
                </span>
              )}
              ?
            </h1>
            <div className="flex justify-end items-center gap-5 mt-5 text-xl">
              <button
                className="bg-red-500 text-white px-5 py-1 rounded-md"
                onClick={() => setShowConfirmFinalize(false)}
              >
                Cancel
              </button>
              <button
                className="bg-primary-binus text-white px-5 py-1 rounded-md"
                onClick={confirmStatus}
              >
                Finalize
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default ProjectDetailScc;
