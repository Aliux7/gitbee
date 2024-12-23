"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "../Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { propTypesPlacement } from "@material-tailwind/react/types/components/menu";

interface DashboardSccProps {
  setShowDevelopers: (value: boolean) => void;
  setSelectedDetailProject: (value: any) => void;
  showDevelopers: boolean;
  expand: boolean;
  projects: any;
  handleScrollToTop: () => void;
}

function DashboardSccComponent(props: DashboardSccProps) {
  const [currentStatus, setCurrentStatus] = useState(0);
  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  useEffect(() => {
    console.log(props.projects);
  }, [props.projects]);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1 },
      }}
      initial="hidden"
      animate="show"
      className="relative h-full bg-white mx-9 rounded-md flex flex-col mb-14 pb-7"
    >
      <div
        className={`w-full h-auto bg-white sticky z-10 px-5 transition-all ease-in-out duration-0 visible ${
          props.expand ? "top-[12.25rem]" : "top-28"
        }`}
      >
        <div className="p-1 rounded-md my-4 border flex justify-around items-center gap-3">
          <div
            className={`w-1/2  ${
              currentStatus == 1
                ? "bg-primary-binus text-white"
                : "bg-transparent hover:bg-gray-100"
            }  rounded-sm text-center py-1 cursor-pointer`}
            onClick={() => setCurrentStatus(1)}
          >
            Reviewed{" "}
            <span
              className={`${
                currentStatus == 1
                  ? " bg-white text-primary-binus"
                  : "bg-primary-binus text-white"
              } ml-1 px-1 rounded-sm text-sm`}
            >
              {props.projects?.["count reviewed"]}
            </span>
          </div>
          <div
            className={`w-1/2  rounded-sm text-center py-1 cursor-pointer ${
              currentStatus == 0
                ? "bg-primary-binus text-white"
                : "bg-transparent hover:bg-gray-100"
            }`}
            onClick={() => setCurrentStatus(0)}
          >
            Not Yet Review{" "}
            <span
              className={`${
                currentStatus == 0
                  ? " bg-white text-primary-binus"
                  : "bg-primary-binus text-white"
              } ml-1 px-1 rounded-sm text-sm`}
            >
              {props.projects?.["count not reviewed"]}
            </span>
          </div>
        </div>
      </div>

      <div className="p-2 rounded-md mb-4 border mx-5">
        {/* {props.projects.length} Results Found */}
      </div>
      <motion.div
        className={`grid grid-cols-3 flex-grow h-fit gap-7 justify-center items-start transition-all ease-in-out duration-500 pt-3`}
        initial="hidden"
        whileInView="reveal"
        variants={charVariants}
        transition={{ staggerChildren: 0.5, duration: 1 }}
      >
        {currentStatus === 1
          ? props.projects?.["reviewed"]?.map((project: any, index: number) => (
              <div
                key={index}
                className="flex justify-center items-center"
                onClick={() => {
                  props.setShowDevelopers(!props.showDevelopers);
                  props.setSelectedDetailProject(project);
                  props.handleScrollToTop();
                }}
              >
                <Card
                  image={project?.projectDetail?.thumbnail}
                  delay={0}
                  title={project?.projectDetail?.title}
                  developers={project?.projectGroups}
                />
              </div>
            ))
          : props.projects?.["not reviewed"]?.map(
              (project: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-center items-center"
                  onClick={() => {
                    props.setShowDevelopers(!props.showDevelopers);
                    props.setSelectedDetailProject(project);
                    props.handleScrollToTop();
                  }}
                >
                  <Card
                    image={project?.projectDetail?.thumbnail}
                    delay={0}
                    title={project?.projectDetail?.title}
                    developers={project?.projectGroups}
                  />
                </div>
              )
            )}
      </motion.div>
    </motion.div>
  );
}

export default DashboardSccComponent;