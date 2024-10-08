import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
        className="bg-gray-50 border rounded-md min-w-96 w-auto max-w-[80vw] h-auto max-h-[85vh] flex flex-col px-10 py-7 gap-5 overflow-y-auto"
      >
        <div>
          <Label htmlFor="project_name">Project Name</Label>
          <Input type="text" placeholder="Project Name" />
        </div>
        <div>
          <Label htmlFor="project_description">Project Description</Label>
          <Textarea placeholder="Describe Your Project . . ." />
        </div>
        <div>
          <Label htmlFor="github_link">GitHub Link</Label>
          <Input type="text" placeholder="GitHub Link" />
        </div>
        <div>
          <Label htmlFor="project_link">Project Link</Label>
          <Input type="email" placeholder="Email" />
        </div>
        <div>
          <Label htmlFor="cover">Cover</Label>
          <Input type="file" accept="image/jpeg, image/png" />
          <span className="text-[0.7rem] text-primary-orange">
            * 1 File Only (.jpg .jpeg .png)
          </span>
        </div>
        <div>
          <Label htmlFor="cover">Gallery</Label>
          <Input type="file" multiple accept="image/jpeg, image/png" />
          <span className="text-[0.7rem] text-primary-orange">
            * Max 4 File Only (.jpg .jpeg .png)
          </span>
        </div>
        <div>
          <Label htmlFor="cover">Documentation</Label>
          <Input type="file" accept="application/pdf" />
          <span className="text-[0.7rem] text-primary-orange">
            * 1 File Only (.pdf)
          </span>
        </div>
        <button
          type="submit"
          className="bg-primary-binus text-white px-2 py-1 rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default PopUpInsert;
