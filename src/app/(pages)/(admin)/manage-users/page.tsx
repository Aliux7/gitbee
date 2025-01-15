"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { deleteAllUser, getAllUsers } from "./actions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import ImportExcel from "@/app/components/manage-users/ImportExcel";
import PopUpUsers from "@/app/components/manage-users/PopUpUsers";
import Loading from "@/app/components/Loading";
import PopUpConfirmation from "@/app/components/manage-users/PopUpConfirmation";

const page = () => {
  const listRoleUser = ["admin", "hop", "scc", "lecturer"];
  const [selectedRole, setSelectedRole] = useState(0);
  const { scrollYProgress } = useScroll();
  const prevScrollY = useRef(0);
  const [expand, setExpand] = useState(true);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<any>([]);
  const [openImportExcel, setOpenImportExcel] = useState(false);
  const [openPopUpUsers, setOpenPopUpUsers] = useState(false);
  const [selectedUserToUpdate, setSelectedUserToUpdate] = useState<any>();
  const [openPopUpConfirmation, setOpenPopUpConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const resultUsers = await getAllUsers(search);
    console.log(resultUsers?.data);
    setUsers(resultUsers?.data);
    setLoading(false);
  };

  const handleDeleteAllLecturer = async () => {
    setLoading(true);
    const resultDeleteAllLecturer = await deleteAllUser();
    console.log(resultDeleteAllLecturer?.data);
    setOpenPopUpConfirmation(false);
    fetchData();
    setLoading(false);
  };

  useEffect(() => {
    scrollYProgress.onChange((currentScrollY) => {
      if (currentScrollY < 0.1) setExpand(true);
      else if (currentScrollY > prevScrollY.current) setExpand(false);
      else if (currentScrollY < prevScrollY.current) setExpand(false);

      if (
        currentScrollY - prevScrollY.current > 0.15 ||
        currentScrollY - prevScrollY.current < -0.15
      ) {
        prevScrollY.current = currentScrollY;
      }
    });
  }, [scrollYProgress]);

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <motion.div className="relative min-h-screen flex flex-col pt-28 px-16 pb-10 bg-gray-50">
      <div
        className={`bg-gray-50 fixed top-0 ${
          expand ? "h-[12.25rem]" : "h-[7rem]"
        } w-full left-0 z-10`}
      ></div>
      <div
        className={`sticky ${
          expand ? "top-28" : "top-7"
        } z-10 w-full flex justify-between items-center gap-5 px-9 h-[5.25rem] transition-all ease-in-out duration-300 bg-gray-50 pb-7`}
      >
        <div className="relative w-full flex justify-start items-center h-full">
          <CiSearch
            className="absolute ml-3 w-7 h-7 pr-2 border-r"
            fill="#6B7280"
          />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`border ${
              expand ? "w-full" : "w-[35.5rem]"
            } h-full p-3 px-12 rounded-md`}
          />
        </div>
        <div className="relative min-w-fit flex justify-end items-center h-full bg-white border rounded-md px-2 gap-2">
          <button
            className={`w-full whitespace-nowrap cursor-pointer py-2 px-4 relative ${
              selectedRole == 0
                ? "bg-primary-binus text-white"
                : "bg-transparent text-primary-binus hover:bg-gray-50"
            } rounded-sm`}
            onClick={() => setSelectedRole(0)}
          >
            Admin
          </button>
          <button
            className={`w-full whitespace-nowrap cursor-pointer py-2 px-4 relative ${
              selectedRole == 1
                ? "bg-primary-binus text-white"
                : "bg-transparent text-primary-binus hover:bg-gray-50"
            } rounded-sm`}
            onClick={() => setSelectedRole(1)}
          >
            HoP
          </button>
          <button
            className={`w-full whitespace-nowrap cursor-pointer py-2 px-4 relative ${
              selectedRole == 2
                ? "bg-primary-binus text-white"
                : "bg-transparent text-primary-binus hover:bg-gray-50"
            } rounded-sm`}
            onClick={() => setSelectedRole(2)}
          >
            SCC
          </button>
          <button
            className={`w-full whitespace-nowrap cursor-pointer py-2 px-4 relative ${
              selectedRole == 3
                ? "bg-primary-binus text-white"
                : "bg-transparent text-primary-binus hover:bg-gray-50"
            } rounded-sm`}
            onClick={() => setSelectedRole(3)}
          >
            Lecturer
          </button>
        </div>
        <div className="relative min-w-fit flex justify-end items-center h-full bg-white border rounded-md px-2 gap-2">
          <button
            className="w-full whitespace-nowrap cursor-pointer py-2 px-3 relative text-primary-binus rounded-sm"
            onClick={() => setOpenImportExcel(true)}
          >
            Import Excel Lecturer
          </button>
        </div>
      </div>

      {selectedRole == 2 && (
        <div className="mx-9 text-end mb-2">
          <span
            onClick={() => setOpenPopUpConfirmation(true)}
            className="text-red-500 cursor-pointer"
          >
            Delete All Lecturer
          </span>
        </div>
      )}
      <div className="w-auto bg-white shadow-md rounded-md mx-9 ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-start">No.</TableHead>
              <TableHead className="text-center">User Code</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Role</TableHead>
              {selectedRole == 0 && (
                <TableHead className="text-center">Major</TableHead>
              )}
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.[listRoleUser[selectedRole]]?.map(
              (user: any, index: number) => (
                <TableRow>
                  <TableCell className="text-start font-medium">
                    {index + 1}.
                  </TableCell>
                  <TableCell className="text-center">
                    {user?.lecturer_code}
                  </TableCell>
                  <TableCell className="text-center">{user?.email}</TableCell>
                  <TableCell className="text-center">{user?.role}</TableCell>
                  {selectedRole == 0 && (
                    <TableCell className="text-center">
                      {user?.hop_major?.map((major: any, index: number) => (
                        <span>
                          {major?.name}
                          {index + 1 < user?.hop_major?.length && ", "}
                        </span>
                      ))}
                    </TableCell>
                  )}
                  <TableCell className="text-center">
                    <button
                      className="bg-primary-binus px-2 py-1 text-white rounded-md"
                      onClick={() => {
                        setOpenPopUpUsers(true), setSelectedUserToUpdate(user);
                      }}
                    >
                      Update
                    </button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
      {openImportExcel && (
        <ImportExcel
          setOpenImportExcel={setOpenImportExcel}
          fetchData={fetchData}
        />
      )}
      {openPopUpUsers && (
        <PopUpUsers
          fetchData={fetchData}
          setOpenPopUpUsers={setOpenPopUpUsers}
          selectedUserToUpdate={selectedUserToUpdate}
        />
      )}

      {openPopUpConfirmation && (
        <PopUpConfirmation
          setOpenPopUpConfirmation={setOpenPopUpConfirmation}
          handleDeleteAllLecturer={handleDeleteAllLecturer}
        />
      )}
      {loading && <Loading />}
    </motion.div>
  );
};

export default page;
