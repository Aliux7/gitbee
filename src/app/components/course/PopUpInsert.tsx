import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PopUpInsertProps {
  setShowInsertForm: (value: boolean) => void;
}

function PopUpInsert(props: PopUpInsertProps) {
  return (
    <div
      className="fixed w-screen h-screen top-0 left-0 bg-black/50 flex justify-center items-center z-50"
      onClick={() => props.setShowInsertForm(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-50 border rounded-md min-w-96 w-auto max-w-[80vw] h-auto max-h-[85vh] flex flex-col px-10 py-7 gap-5"
      >
        <div>
          <Label htmlFor="email">Your email address</Label>
          <Input type="email" placeholder="Email" />
        </div>
        <div>
          <Label htmlFor="email">Your email address</Label>
          <Input type="email" placeholder="Email" />
        </div>
        <div>
          <Label htmlFor="email">Your email address</Label>
          <Input type="email" placeholder="Email" />
        </div>
        <div>
          <Label htmlFor="email">Your email address</Label>
          <Input type="email" placeholder="Email" />
        </div>
        <button type="submit" className="bg-primary-binus text-white px-2 py-1 rounded-md">
          Submit
        </button>
      </div>
    </div>
  );
}

export default PopUpInsert;
