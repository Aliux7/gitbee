import React from "react";

interface ConfirmationFinalzedProps {
  setShowConfirmationFinalized: (value: boolean) => void;
  ratings: any;
}

const ConfirmationFinalized = (props: ConfirmationFinalzedProps) => {
  return (
    <div
      className="fixed w-full h-full top-0 left-0 bg-black/50 flex justify-center items-center z-50"
      onClick={() => props.setShowConfirmationFinalized(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-50 border rounded-md min-w-96 w-[50rem] max-w-[80vw] h-auto max-h-[85vh] flex flex-col px-10 py-7 gap-5 overflow-y-auto"
      >
        <h1 className="text-5xl">Are you sure you want to finalized?</h1>
        <ul>
          <li className="border-b-2 w-full">
            <div className="flex justify-between items-center">
              <h3 className="text-lg">Group 1 - The Spotify</h3>
              <h3 className="text-lg">
                Rating{" "}
                <span className="text-primary-orange">{props.ratings[1]}</span>{" "}
                of 5
              </h3>
            </div>
          </li>
          <li className="border-b-2 w-full">
            <div className="flex justify-between items-center">
              <h3 className="text-lg">Group 2 - The Spotify</h3>
              <h3 className="text-lg">
                Rating{" "}
                <span className="text-primary-orange">{props.ratings[2]}</span>{" "}
                of 5
              </h3>
            </div>
          </li>
          <li className="border-b-2 w-full">
            <div className="flex justify-between items-center">
              <h3 className="text-lg">Group 3 - The Spotify</h3>
              <h3 className="text-lg">
                Rating{" "}
                <span className="text-primary-orange">{props.ratings[3]}</span>{" "}
                of 5
              </h3>
            </div>
          </li>
          <li className="border-b-2 w-full">
            <div className="flex justify-between items-center">
              <h3 className="text-lg">Group 4 - The Spotify</h3>
              <h3 className="text-lg">
                Rating{" "}
                <span className="text-primary-orange">{props.ratings[4]}</span>{" "}
                of 5
              </h3>
            </div>
          </li>
          <li className="border-b-2 w-full">
            <div className="flex justify-between items-center">
              <h3 className="text-lg">Group 5 - The Spotify</h3>
              <h3 className="text-lg">
                Rating{" "}
                <span className="text-primary-orange">{props.ratings[5]}</span>{" "}
                of 5
              </h3>
            </div>
          </li>
        </ul>
        <div className="text-xl">
          There are no group that's above{" "}
          <span className="text-primary-orange">4 stars</span>.{" "}
          <span className="underline">Are You Sure?</span>
        </div>
        <button
          type="submit"
          className="bg-purple-600 text-white px-2 py-2 rounded-md"
        >
          Finalized
        </button>
      </div>
    </div>
  );
};

export default ConfirmationFinalized;
