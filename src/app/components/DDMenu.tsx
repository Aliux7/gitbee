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
  options: { id: number; name: string }[];
  icon: React.ReactElement;
};

const DDMenu: React.FC<DDMenuProps> = ({ filter, options, icon }) => {
  const [position, setPosition] = React.useState(filter);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-full w-44 flex justify-between items-center gap-3 py-3 group"
        >
          <div className="pr-2 border-r h-full flex justify-center items-center">
            {React.cloneElement(icon, {
              className:
                "w-4 h-4 group-hover:stroke-primary-orange group-hover:fill-primary-orange group-hover:border-primary-orange",
            })}
          </div>
          <div className="truncate text-primary-binus group-hover:text-primary-orange font-poppins font-normal">
            {options.find((option) => option.id === Number(position))?.name ||
              filter}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {options.map((option, index) => (
            <DropdownMenuRadioItem key={index} value={option.id.toString()}>
              {option.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DDMenu;
