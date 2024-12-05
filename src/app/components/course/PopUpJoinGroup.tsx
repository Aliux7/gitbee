"use client";
import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { createGroup } from "@/app/(pages)/(student)/course/actions";

interface PopUpJoinGroupProps {
  fetchData: any;
  setShowJoinGroup: (value: boolean) => void;
  toast: (options: {
    title: string;
    description: string;
    variant?: "default" | "destructive" | null;
  }) => void;
  userId?: string;
}

const students = [
  { value: "2540115465", label: "Kelson Susilo" },
  { value: "2602570812", label: "Wilbert" },
  { value: "2540121465", label: "Edbert" },
  { value: "2141253221", label: "Susilo" },
  { value: "1253423523", label: "Budi" },
  { value: "3253423523", label: "Testing" },
  { value: "2540124980", label: "Nicholas Chandra" },
  { value: "2501959296", label: "Timothy Darren" },
  { value: "2501970166", label: "Roger Laurent" },
  { value: "2602118912", label: "Ryan Rafael" },
];

function PopUpJoinGroup(props: PopUpJoinGroupProps) {
  const [totalMember, setTotalMember] = useState(2);
  const [loading, setLoading] = useState(false);
  const [openStates, setOpenStates] = useState<boolean[]>([false]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([
    props.userId || "",
  ]);

  const handleSelect = (index: number, value: string) => {
    const newSelection = [...selectedStudents];
    newSelection[index] = value;
    setSelectedStudents(newSelection);
  };

  const togglePopover = (index: number, isOpen: boolean) => {
    const updatedOpenStates = [...openStates];
    updatedOpenStates[index] = isOpen;
    setOpenStates(updatedOpenStates);
  };

  const addMember = () => {
    setTotalMember(totalMember + 1);
    setOpenStates([...openStates, false]);
    setSelectedStudents([...selectedStudents, ""]);
  };

  const handleCreate = async () => {
    setLoading(true);
    console.log(selectedStudents);
    const result = await createGroup({
      semester_id: "be992b30-4b38-4361-8404-25f2d6912754",
      course_id: "COMP6100001",
      student_ids: selectedStudents,
      class_id: "BG01",
    });
    if (result?.success) {
      props.toast({
        title: "Successfully created.",
        description: `Your Group has been successfully created`,
      });
    } else {
      props.toast({
        title: "Oops! Something went wrong!",
        description: `Your Group hasn't been successfully created. You can try again later`,
      });
    }
    props.fetchData();
    setLoading(false);
    props.setShowJoinGroup(false);
  };

  return (
    <div
      className="fixed w-full h-full top-0 left-0 bg-black/50 flex justify-center items-center z-50"
      onClick={() => props.setShowJoinGroup(false)}
    >
      {!loading ? (
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
              onClick={addMember}
            >
              + Add member
            </div>
          </div>
          <div className="w-full h-fit flex flex-col gap-5">
            {Array.from({ length: totalMember }).map((_, i) => (
              <Popover
                key={i}
                open={openStates[i]}
                onOpenChange={(isOpen) => togglePopover(i, isOpen)}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openStates[i]}
                    className="w-full justify-between"
                    disabled={i === 0}
                  >
                    {selectedStudents[i]
                      ? `${
                          students.find(
                            (student) => student.value === selectedStudents[i]
                          )?.value
                        } - ${
                          students.find(
                            (student) => student.value === selectedStudents[i]
                          )?.label
                        }`
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
                              handleSelect(
                                i,
                                currentValue === selectedStudents[i]
                                  ? ""
                                  : currentValue
                              );
                              togglePopover(i, false);
                            }}
                            disabled={selectedStudents.includes(student.value)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedStudents[i] === student.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {student.value} - {student.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            ))}
          </div>
          <div
            className="bg-primary-binus w-full text-white text-center py-2 rounded-md text-xl cursor-pointer"
            onClick={handleCreate}
          >
            Create Group
          </div>
        </div>
      ) : (
        <div>
          <div className="w-36 h-36 border-8 text-primary-orange text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-primary-orange rounded-full"></div>
        </div>
      )}
    </div>
  );
}

export default PopUpJoinGroup;
