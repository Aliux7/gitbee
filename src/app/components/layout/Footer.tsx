import React from "react";

const Footer = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center px-16">
      <div className="h-px w-full bg-gray-200" />
      <div className="w-full flex justify-between items-center my-7">
        <ul className="flex gap-4">
          <li className="relative text-sm text-gray-600 font-montserrat cursor-pointer py-1 px-px after:absolute after:w-0 hover:after:w-full after:h-px after:bg-gray-400 after:bottom-0 after:left-0 after:transition-all after:duration-300 after:ease-in-out">
            Privacy Policy
          </li>
          <li className="relative text-sm text-gray-600 font-montserrat cursor-pointer py-1 px-px after:absolute after:w-0 hover:after:w-full after:h-px after:bg-gray-400 after:bottom-0 after:left-0 after:transition-all after:duration-300 after:ease-in-out">
            Terms of Service
          </li>
          <li className="relative text-sm text-gray-600 font-montserrat cursor-pointer py-1 px-px after:absolute after:w-0 hover:after:w-full after:h-px after:bg-gray-400 after:bottom-0 after:left-0 after:transition-all after:duration-300 after:ease-in-out">
            Contact Us
          </li>
        </ul>
        <p className="relative text-sm text-gray-600 font-montserrat py-1 px-px">
          Copyright &copy; BINUS University. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
