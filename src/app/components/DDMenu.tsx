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

type DDMenuProps = {
  filter: string;
  options: string[];
  icon: React.ReactElement;
};

const DDMenu: React.FC<DDMenuProps> = ({ filter, options, icon }) => {
  const [position, setPosition] = React.useState(filter);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-full w-44 flex justify-between items-center gap-3 py-3"
        >
          <div className="pr-2 border-r h-full flex justify-center items-center">{icon}</div>
          <div className="truncate text-primary-binus hover:text-primary-orange font-poppins font-normal">
            {position}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
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

export default DDMenu;
