import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CiCircleQuestion } from "react-icons/ci";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PopUpInsertProps {
  setShowInsertForm: (value: boolean) => void;
}

function PopUpInsert(props: PopUpInsertProps) {
  return (
    <div
      className="fixed w-full h-full top-0 left-0 bg-black/50 flex justify-center items-center z-50"
      onClick={() => props.setShowInsertForm(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-50 border rounded-md min-w-96 w-[60rem] max-w-[80vw] h-auto max-h-[85vh] flex flex-col px-10 py-7 gap-5 overflow-y-auto"
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-start items-center gap-1">
            <Label htmlFor="project_name">Project Name</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CiCircleQuestion className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>The title of your project.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input type="text" placeholder="Project Name" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-start items-center gap-1">
            <Label htmlFor="project_description">Project Description</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CiCircleQuestion className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Short summary of the project's about, purpose, goals, and
                    features.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Textarea placeholder="Describe Your Project . . ." />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-start items-center gap-1">
            <Label htmlFor="github_link">GitHub Link</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CiCircleQuestion className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    URL that directs users to your project's repository on
                    GitHub
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input type="text" placeholder="GitHub Link" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-start items-center gap-1">
            <Label htmlFor="project_link">Project Link</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CiCircleQuestion className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    URL that directs users to your live project's or
                    <br />
                    downloadable project files
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input type="email" placeholder="Email" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-start items-center gap-1">
            <Label htmlFor="cover">Cover</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CiCircleQuestion className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Image or visual representation that showcases the project's
                    <br />
                    main theme or cover.
                    <br />
                    <span className="text-primary-orange">
                      Recommended (16 : 9) Portrait
                    </span>
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <Input type="file" accept="image/jpeg, image/png" />
            <span className="text-[0.7rem] text-primary-orange">
              * 1 File Only (.jpg .jpeg .png)
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-start items-center gap-1">
            <Label htmlFor="cover">Gallery</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CiCircleQuestion className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Collection of images, screenshots, or media related to the
                    <br />
                    project, providing visual insights into its features,
                    <br />
                    design, and functionality.
                    <br />
                    <span className="text-primary-orange">
                      Recommended (16 : 9) Portrait
                    </span>
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <Input type="file" multiple accept="image/jpeg, image/png" />
            <span className="text-[0.7rem] text-primary-orange">
              * Max 4 File Only (.jpg .jpeg .png)
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-start items-center gap-1">
            <Label htmlFor="cover">Documentation</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CiCircleQuestion className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    comprehensive collection of written materials that explain
                    <br />
                    the project's structure, functionality, and usage.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <Input type="file" accept="application/pdf" />
            <span className="text-[0.7rem] text-primary-orange">
              * 1 File Only (.pdf)
            </span>
          </div>
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
