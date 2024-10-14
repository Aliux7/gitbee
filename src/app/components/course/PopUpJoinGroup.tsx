import React from "react";
import { FaEye } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PopUpJoinGroupProps {
  setShowJoinGroup: (value: boolean) => void;
}

function PopUpJoinGroup(props: PopUpJoinGroupProps) {
  const looping = [1, 2, 3, 4];
  return (
    <div
      className="fixed w-full h-full top-0 left-0 bg-black/50 flex justify-center items-center z-50"
      onClick={() => props.setShowJoinGroup(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-50 border rounded-md min-w-96 w-[60rem] max-w-[80vw] h-auto max-h-[85vh] flex flex-col px-10 py-7 gap-5 overflow-y-auto"
      >
        <div className="bg-primary-binus w-full text-white text-center py-3 rounded-md text-xl">
          Group Class B012
        </div>
        <div className="grid grid-cols-2 gap-5 justify-center items-start w-full place-items-stretch">
          {looping.map((index) => (
            <div className="w-full h-fit overflow-y-auto shadow-xl border rounded-xl p-5">
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
                    <TableCell className="font-medium text-center">1</TableCell>
                    <TableCell className="">2540115465</TableCell>
                    <TableCell className=" truncate">
                      Kelson Edbert Susilo
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-center">2</TableCell>
                    <TableCell className="">2540115465</TableCell>
                    <TableCell>
                      <h1 className=" truncate">Kelson Edbert Susilo</h1>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-center">3</TableCell>
                    <TableCell className="">2540115465</TableCell>
                    <TableCell>
                      <h1 className=" truncate">Kelson Edbert Susilo</h1>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-center">4</TableCell>
                    <TableCell className="">2540115465</TableCell>
                    <TableCell>
                      <h1 className=" truncate">Kelson Edbert Susilo</h1>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-center">5</TableCell>
                    <TableCell className="">2540115465</TableCell>
                    <TableCell>
                      <h1 className=" truncate">Kelson Edbert Susilo</h1>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="w-full flex justify-end items-end gap-5 border-t pt-3 min-h-10">
                <div className="w-1/2 flex flex-col justify-end items-end text-primary-binus  cursor-pointer">
                  <button className="text-white bg-primary-binus px-4 py-1 rounded-md">
                    Join Group
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopUpJoinGroup;
