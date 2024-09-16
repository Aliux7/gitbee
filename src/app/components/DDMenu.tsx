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
  // title: string;
  options: string[];
  // delay: number;
};

const DDMenu: React.FC<DDMenuProps> = ({
  filter,
  options,
  // title,
  // developers,
  // delay,
}) => {
  const [position, setPosition] = React.useState(filter);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-full w-44 text-gray-500 font-poppins font-normal"
        >
          {position}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value={filter} disabled>
            {filter}
          </DropdownMenuRadioItem>
          <DropdownMenuSeparator />
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
