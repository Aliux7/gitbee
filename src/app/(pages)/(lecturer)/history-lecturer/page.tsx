"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import DDMenu from "@/app/components/DDMenu";
import { BsCalendar4Range, BsGlobe2 } from "react-icons/bs";
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
import { SiGithub } from "react-icons/si";
import { getAllSemester, getCurrentSemester } from "./action";

const page = () => {
  const { scrollYProgress } = useScroll();
  const prevScrollY = useRef(0);
  const [expand, setExpand] = useState(true);
  const [previewGroup, setPreviewGroup] = useState(false);
  const [listSemester, setListSemester] = useState<any>([]);
  const [currentSemester, setCurrentSemester] = useState<any>();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

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

  useEffect(() => {
    fetchData();
  }, []);

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
              My Outstanding Review History
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
            <DDMenuSemester
              options={listSemester}
              filter="Semester"
              icon={<BsCalendar4Range className="w-4 h-4" />}
              currentSemester={currentSemester}
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-44 bg-white shadow-md rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-start">Class ID</TableHead>
              <TableHead className="text-center">Course ID</TableHead>
              <TableHead className="text-center">Course Name</TableHead>
              <TableHead className="text-center">Group ID</TableHead>
              <TableHead className="text-center">Project Title</TableHead>
              <TableHead className="text-center">Rating</TableHead>
              <TableHead className="text-center">Finalized Date</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-start font-medium">BG01</TableCell>
              <TableCell className="text-center">COMP6100001</TableCell>
              <TableCell className="text-center">
                Software Engineering
              </TableCell>
              <TableCell className="text-center">1</TableCell>
              <TableCell className="text-center">
                The Spotify The Spotify
              </TableCell>
              <TableCell className="text-center">5</TableCell>
              <TableCell className="text-center">20 Sept 2024</TableCell>
              <TableCell className="text-center">
                <div
                  onClick={() => setPreviewGroup(true)}
                  className="bg-primary-binus py-0.5 text-white rounded-md"
                >
                  Preview
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-start font-medium">BK01</TableCell>
              <TableCell className="text-center">COMP6100001</TableCell>
              <TableCell className="text-center">
                Software Engineering
              </TableCell>
              <TableCell className="text-center">1</TableCell>
              <TableCell className="text-center">
                The Spotify The Spotify
              </TableCell>
              <TableCell className="text-center">5</TableCell>
              <TableCell className="text-center">20 Sept 2024</TableCell>
              <TableCell className="text-center">
                <div
                  onClick={() => setPreviewGroup(true)}
                  className="bg-primary-binus py-0.5 text-white rounded-md"
                >
                  Preview
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-start font-medium">BB01</TableCell>
              <TableCell className="text-center">COMP6100001</TableCell>
              <TableCell className="text-center">
                Software Engineering
              </TableCell>
              <TableCell className="text-center">1</TableCell>
              <TableCell className="text-center">
                The Spotify The Spotify
              </TableCell>
              <TableCell className="text-center">5</TableCell>
              <TableCell className="text-center">20 Sept 2024</TableCell>
              <TableCell className="text-center">
                <div
                  onClick={() => setPreviewGroup(true)}
                  className="bg-primary-binus py-0.5 text-white rounded-md"
                >
                  Preview
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {previewGroup && (
        <div
          className="fixed w-full h-full top-0 left-0 bg-black/50 flex justify-center items-center z-50"
          onClick={() => setPreviewGroup(false)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-50 border rounded-md min-w-96 w-[60rem] max-w-[80vw] h-auto max-h-[85vh] flex flex-col px-10 py-7 gap-5 overflow-y-auto"
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="relative w-full pl-3 flex h-fit py-3 justify-start items-start transition-all ease-in-out duration-500"
              variants={containerVariants}
            >
              <div className="w-full flex flex-col pr-5">
                <div className="w-full flex justify-start items-start border-b pb-5">
                  <div className="mx-3 flex flex-col gap-1 w-2/3">
                    <h1 className="text-3xl font-bold">The Spotify</h1>
                    <h3 className="text-sm text-gray-500">
                      By Kelson Edbert S, Timothy Darren, Nicholas Chandra
                    </h3>
                    <div className="h-fit flex-grow my-3 pr-10">
                      <h1 className="text-balance text-gray-700">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. At molestias possimus ipsum? Fuga architecto,
                        ipsum nulla explicabo quas corrupti quia labore eum
                        dolor ipsam obcaecati facere odio aliquam aspernatur
                        perferendis. Lorem ipsum, dolor sit amet consectetur
                        adipisicing elit. Veniam corrupti quod eos nulla vero
                        debitis corporis ullam, earum laudantium praesentium
                        asperiores ipsum ab voluptatem molestias atque mollitia
                        quidem sint in!
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
                    <img
                      src="/images/3.jpg"
                      className="w-full rounded-md border"
                    />
                  </div>
                </div>
                <div className="w-full h-96 my-3 flex overflow-auto gap-3">
                  <img
                    src="/images/1.jpg"
                    className="h-full rounded-md border"
                  />
                  <img
                    src="/images/2.jpg"
                    className="h-full rounded-md border"
                  />
                  <img
                    src="/images/3.jpg"
                    className="h-full rounded-md border"
                  />
                  <img
                    src="/images/4.jpg"
                    className="h-full rounded-md border"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default page;