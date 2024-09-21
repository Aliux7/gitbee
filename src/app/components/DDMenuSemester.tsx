"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DDMenuSemesterProps = {
  filter: string;
  options: string[];
  icon: React.ReactElement;
};

const DDMenuSemester: React.FC<DDMenuSemesterProps> = ({ filter, options, icon }) => {
  const [position, setPosition] = React.useState(filter);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-10 w-72 flex justify-between items-center gap-3 py-3"
        >
          <div className="pr-2 border-r h-full flex justify-center items-center">{icon}</div>
          <div className="truncate text-gray-500 hover:text-[#1f2937] font-poppins font-normal">
            {position}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {options.map((option, index) => (
            <DropdownMenuRadioItem key={index} value={option}>
              {option}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DDMenuSemester;
