import Link from "next/link";
import React from "react";
import { BsGlobe2 } from "react-icons/bs";
import { motion } from "framer-motion";
import { IoIosArrowRoundBack } from "react-icons/io";
import { SiGithub } from "react-icons/si";

interface ProjectDetailProps {
  setShowDevelopers: (value: boolean) => void;
  showDevelopers: boolean;
  expand: boolean;
}

function ProjectDetailComponent(props: ProjectDetailProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <motion.div
      className="relative flex justify-center items-start w-auto bg-white h-full mx-9 rounded-md px-5 mb-14 pb-7 pt-3"
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className={`sticky ${
          props.expand ? "top-52" : "top-32"
        } w-[30rem] h-full py-2 opacity-100 flex flex-col gap-5 transition-all ease-in-out duration-500 overflow-hidden`}
        variants={containerVariants}
      >
        {/* <h1 className="text-center py-10 text-gray-500">No Project Selected</h1> */}
        <Link
          href={"/portofolio/123"}
          className="flex justify-start items-center gap-5 border-b pb-5 mr-4 cursor-pointer"
        >
          <img
            src="/images/1.jpg"
            className="rounded-full h-20 w-20 p-1 border object-cover"
          />
          <div className="w-48">
            <h1 className="truncate font-semibold">Kelson Edbert S</h1>
            <h1 className="truncate text-sm text-gray-500">2540115465</h1>
            <h1 className="truncate text-sm text-gray-500">Computer Science</h1>
          </div>
        </Link>
        <Link
          href={"/portofolio/123"}
          className="flex justify-start items-center gap-5 border-b pb-5 mr-4 cursor-pointer"
        >
          <img
            src="/images/3.jpg"
            className="rounded-full h-20 w-20 p-1 border object-cover"
          />
          <div className="w-48">
            <h1 className="truncate font-semibold">Timothy Darren</h1>
            <h1 className="truncate text-sm text-gray-500">2540115465</h1>
            <h1 className="truncate text-sm text-gray-500">Computer Science</h1>
          </div>
        </Link>
      </motion.div>
      <motion.div
        className="relative w-full border-l pl-3 flex h-fit py-3 justify-start items-start transition-all ease-in-out duration-500"
        variants={containerVariants}
      >
        <div
          className="hover:bg-gray-100 p-1.5 cursor-pointer rounded-full"
          onClick={() => props.setShowDevelopers(false)}
        >
          <IoIosArrowRoundBack className="w-7 h-7" />
        </div>
        <div className="w-full flex flex-col pr-5">
          <div className="w-full flex justify-start items-start border-b pb-5">
            <div className="mx-3 flex flex-col gap-1 w-2/3">
              <h1 className="text-3xl font-bold">The Spotify</h1>
              <h3 className="text-sm text-gray-500">
                By Kelson Edbert S, Timothy Darren, Nicholas Chandra
              </h3>
              <div className="h-fit flex-grow my-3 pr-10">
                <h1 className="text-balance text-gray-700">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. At
                  molestias possimus ipsum? Fuga architecto, ipsum nulla
                  explicabo quas corrupti quia labore eum dolor ipsam obcaecati
                  facere odio aliquam aspernatur perferendis. Lorem ipsum, dolor
                  sit amet consectetur adipisicing elit. Veniam corrupti quod
                  eos nulla vero debitis corporis ullam, earum laudantium
                  praesentium asperiores ipsum ab voluptatem molestias atque
                  mollitia quidem sint in!
                </h1>
              </div>
              <Link
                href="https://github.com/Aliux7/gitbee"
                className="flex justify-start items-center gap-2 text-sm my-1 text-primary-binus"
              >
                <SiGithub fill="#EB9327" />
                https://github.com/Aliux7/gitbee
              </Link>
              <Link
                href="https://binusmaya.binus.ac.id/"
                className="flex justify-start items-center gap-2 text-sm my-1 text-primary-binus"
              >
                <BsGlobe2 fill="#EB9327" /> https://binusmaya.binus.ac.id/
              </Link>
            </div>
            <div className="w-1/3">
              {/* <img
                    src="/images/image-1.webp"
                    className="w-full rounded-md"
                    /> */}
              <img src="/images/3.jpg" className="w-full rounded-md border" />
            </div>
          </div>
          <div className="w-full h-96 my-3 flex overflow-auto gap-3">
            <img src="/images/1.jpg" className="h-full rounded-md border" />
            <img src="/images/2.jpg" className="h-full rounded-md border" />
            <img src="/images/3.jpg" className="h-full rounded-md border" />
            <img src="/images/4.jpg" className="h-full rounded-md border" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProjectDetailComponent;
