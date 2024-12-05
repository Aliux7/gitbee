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
  options: any;
  icon: React.ReactElement;
  className?: string;
  currentSemester: any;
};

const DDMenuSemester: React.FC<DDMenuSemesterProps> = ({
  filter,
  options,
  icon,
  className,
  currentSemester,
}) => {
  const [position, setPosition] = React.useState("");

  React.useEffect(() => {
    setPosition(currentSemester?.data?.Description);
    console.log(currentSemester?.data?.Description);
  }, [currentSemester])
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`h-full w-72 flex justify-between items-center gap-3 py-3 ${
            className == null ? "max-h-10" : ""
          }`}
        >
          <div className="pr-2 border-r h-full flex justify-center items-center">
            {icon}
          </div>
          <div className="truncate text-primary-binus hover:text-primary-orange font-poppins font-normal">
            {position}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {options?.data?.map((option: any, index: number) => (
            <DropdownMenuRadioItem key={option?.SemesterId ? option.SemesterId : index} value={option.Description}>
              {option.Description}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DDMenuSemester;
