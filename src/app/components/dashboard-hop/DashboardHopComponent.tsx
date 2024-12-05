"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Card from "../Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardHopProps {
  setShowDevelopers: (value: boolean) => void;
  showDevelopers: boolean;
  expand: boolean;
  projects: any;
  handleScrollToTop: () => void;
}

function DashboardHopComponent(props: DashboardHopProps) {
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
          <div className="w-1/2 bg-primary-binus hover:bg-gray-100 text-white rounded-sm text-center py-1 cursor-pointer">
            Reviewed <span className="bg-white text-primary-binus ml-1 px-1 rounded-sm text-sm">10</span>
          </div>
          <div className="w-1/2 bg-transparent hover:bg-gray-100 rounded-sm text-center py-1 cursor-pointer">
            Not Yet Review <span className="bg-primary-binus text-white ml-1 px-1 rounded-sm text-sm">10</span>
          </div>
        </div>
      </div>

      <div className="p-2 rounded-md mb-4 border mx-5">
        {props.projects.length} Results Found
      </div>
      <motion.div
        className={`grid grid-cols-3 flex-grow h-fit gap-7 justify-center items-start transition-all ease-in-out duration-500 pt-3`}
        initial="hidden"
        whileInView="reveal"
        variants={charVariants}
        transition={{ staggerChildren: 0.5, duration: 1 }}
      >
        {props.projects.map((project: any, index: number) => (
          <div
            className="flex justify-center items-center"
            onClick={() => {
              props.setShowDevelopers(!props.showDevelopers);
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
        ))}
        {props.projects.map((project: any, index: number) => (
          <div
            className="flex justify-center items-center"
            onClick={() => {
              props.setShowDevelopers(!props.showDevelopers);
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
        ))}
        {props.projects.map((project: any, index: number) => (
          <div
            className="flex justify-center items-center"
            onClick={() => {
              props.setShowDevelopers(!props.showDevelopers);
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
        ))}
        {props.projects.map((project: any, index: number) => (
          <div
            className="flex justify-center items-center"
            onClick={() => {
              props.setShowDevelopers(!props.showDevelopers);
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
        ))}
        {props.projects.map((project: any, index: number) => (
          <div
            className="flex justify-center items-center"
            onClick={() => {
              props.setShowDevelopers(!props.showDevelopers);
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
        ))}
      </motion.div>
    </motion.div>
  );
}

export default DashboardHopComponent;
