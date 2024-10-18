"use client";
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PopUpJoinGroupProps {
  setShowJoinGroup: (value: boolean) => void;
}

const students = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

function PopUpJoinGroup(props: PopUpJoinGroupProps) {
  const looping = [1, 2, 3, 4];

  const [totalMember, setTotalMember] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <div
      className="fixed w-full h-full top-0 left-0 bg-black/50 flex justify-center items-center z-50"
      onClick={() => props.setShowJoinGroup(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-50 border rounded-md min-w-96 w-[60rem] max-w-[80vw] h-auto max-h-[85vh] flex flex-col px-10 py-7 gap-5 overflow-y-auto"
      >
        <div className="w-full flex justify-between items-center">
          <div className="text-center py-3 rounded-md text-xl">
            Group Class B012
          </div>
          <div
            className="text-end text-primary-orange cursor-pointer"
            onClick={() => setTotalMember(totalMember + 1)}
          >
            + Add member
          </div>
        </div>
        <div className="w-full h-fit flex flex-col gap-5">
          {[...Array(totalMember)].map((_, i) => (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {value
                    ? students.find((student) => student.value === value)?.label
                    : "Select student..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="min-w-96 w-[50rem] max-w-[80vw] p-0">
                <Command>
                  <CommandInput placeholder="Search student..." />
                  <CommandList>
                    <CommandEmpty>No student found.</CommandEmpty>
                    <CommandGroup>
                      {students.map((student) => (
                        <CommandItem
                          key={student.value}
                          value={student.value}
                          onSelect={(currentValue: string) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === student.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {student.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          ))}
        </div>
        {/* <div className="grid grid-cols-2 gap-5 justify-center items-start w-full place-items-stretch">
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
        </div> */}
        <div className="bg-primary-binus w-full text-white text-center py-2 rounded-md text-xl">
          Submit
        </div>
      </div>
    </div>
  );
}

export default PopUpJoinGroup;
