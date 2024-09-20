import React from "react";
import Card from "../Card";
import splitStringUsingRegex from "@/app/utlis/splitStringUsingRegex";
import { motion } from "framer-motion";

const heading = "Discover Our Amazing Projects";
const subHeading = `"Explore our diverse range of projects and find inspiration for you next project"`;

const charVariants = {
  hidden: { opacity: 0 },
  reveal: { opacity: 1 },
};

const Project = () => {
  const headingChars = splitStringUsingRegex(heading);
  const subHeadingChars = splitStringUsingRegex(subHeading);

  return (
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden flex flex-col justify-center items-center gap-10 bg-white mb-10 mx-16 rounded-xl shadow-xl">
      <div className="flex flex-col justify-center items-center gap-2">
        <motion.h1
          initial="hidden"
          whileInView="reveal"
          transition={{ staggerChildren: 0.05 }}
          className="font-bold font-montserrat text-5xl"
        >
          {headingChars.map((char, index) => (
            <motion.span
              key={index}
              transition={{ duration: 0.5 }}
              variants={charVariants}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.h3
          initial="hidden"
          whileInView="reveal"
          transition={{ staggerChildren: 0.03 }}
          className="text-gray-600"
        >
          {subHeadingChars.map((char, index) => (
            <motion.span
              key={index}
              transition={{ duration: 0.5 }}
              variants={charVariants}
            >
              {char}
            </motion.span>
          ))}
        </motion.h3>
      </div>
      <motion.div
        className="flex gap-10"
        initial="hidden"
        whileInView="reveal"
        transition={{ staggerChildren: 0.5 }}
      >
        <Card
          image="/images/1.jpg"
          title="Portashynska"
          developers={["Kelson", "Timothy Darren", "Nicholas Chandra"]}
          delay={0.3}
        />
        <Card
          image="/images/10.jpg"
          title="Gallery Don't know"
          developers={["Kelson", "Timothy Darren", "Nicholas Chandra"]}
          delay={0.6}
        />
        <Card
          image="/images/3.jpg"
          title="Veronique"
          developers={["Kelson", "Timothy Darren", "Nicholas Chandra"]}
          delay={0.9}
        />
      </motion.div>
      <motion.div
        className="flex gap-5 z-10"
        initial="hidden"
        whileInView="reveal"
        transition={{ staggerChildren: 0.75 }}
      >
        <motion.button
          transition={{ duration: 0.5 }}
          variants={charVariants}
          className="w-32 relative border border-gray-800 bg-transparent px-5 py-2.5 hover:text-gray-800 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-bottom-left before:scale-y-100 before:bg-gray-800 before:transition-transform before:duration-300 before:content-[''] text-white before:hover:scale-y-0 rounded-md before:rounded-sm overflow-hidden"
        >
          Explore
        </motion.button>
        <motion.button
          transition={{ duration: 0.5 }}
          variants={charVariants}
          className="w-32 relative border border-gray-800 bg-transparent px-5 py-2.5 text-gray-800 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-y-0 before:bg-gray-800 before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-y-100 rounded-md before:rounded-sm overflow-hidden"
        >
          Contact
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Project;
