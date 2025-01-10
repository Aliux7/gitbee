import { UpdateTechnologies } from "@/app/(pages)/(admin)/manage-categories/actions";
import {
  getAllMajor,
  updateUserRole,
} from "@/app/(pages)/(admin)/manage-users/actions";
import React, { useEffect, useState } from "react";

interface PopUpTechnologiesProps {
  setOpenPopUpTechnologies: (value: boolean) => void;
  selectedTechnologiesToUpdate: any;
  fetchData: any;
}

function PopUpTechnologies(props: PopUpTechnologiesProps) {
  const [name, setName] = useState(props.selectedTechnologiesToUpdate?.name || "");

  const handleSave = async () => {
    if (name == "") {
      console.error("User ID is required to update");
      return;
    }
    try {
      const resultUpdate = await UpdateTechnologies(
        props.selectedTechnologiesToUpdate.id.toString(),
        name
      );
      props.fetchData();
      props.setOpenPopUpTechnologies(false);
      console.log("Update Result:", resultUpdate);
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  useEffect(() => {
    console.log(props.selectedTechnologiesToUpdate);
  }, []);

  return (
    <div
      className="fixed bg-black/50 w-full h-screen top-0 left-0 z-50 flex justify-center items-center py-10 px-20"
      onClick={() => props.setOpenPopUpTechnologies(false)}
    >
      <div
        className="bg-white w-full max-h-full h-fit overflow-y-auto rounded-md p-10 flex flex-col max-w-[30rem] gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col justify-start items-start">
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className="block w-full text-lg border-b focus:outline-none"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </div>

        <button
          onClick={handleSave}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
}
export default PopUpTechnologies;
