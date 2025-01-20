import React, { useState } from "react";
import Card from "../Card";
import splitStringUsingRegex from "@/app/utlis/splitStringUsingRegex";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const heading = "Discover Our Amazing Projects";
const subHeading = `"Explore our diverse range of projects and find inspiration for you next project"`;

const charVariants = {
  hidden: { opacity: 0 },
  reveal: { opacity: 1 },
};

const Project = () => {
  const [showCard, setShowCard] = useState(3);
  const headingChars = splitStringUsingRegex(heading);
  const subHeadingChars = splitStringUsingRegex(subHeading);
  const router = useRouter();

  const allCards = [
    {
      image: "/images/1.jpg",
      title: "Portashynska",
      developers: [
        { student_name: "Kelson" },
        { student_name: "Timothy Darren" },
        { student_name: "Nicholas Chandra" },
      ],
      delay: 0.3,
    },
    {
      image: "/images/2.jpg",
      title: "Innovative Space",
      developers: [
        { student_name: "Alice" },
        { student_name: "Bob" },
        { student_name: "Charlie" },
      ],
      delay: 0.6,
    },
    {
      image: "/images/10.jpg",
      title: "Gallery Don't know",
      developers: [
        { student_name: "Kelson" },
        { student_name: "Timothy Darren" },
        { student_name: "Nicholas Chandra" },
      ],
      delay: 0.9,
    },
    {
      image: "/images/3.jpg",
      title: "Veronique",
      developers: [
        { student_name: "Kelson" },
        { student_name: "Timothy Darren" },
        { student_name: "Nicholas Chandra" },
      ],
      delay: 1.2,
    },
    {
      image: "/images/4.jpg",
      title: "Creative Hub",
      developers: [
        { student_name: "Diana" },
        { student_name: "Eve" },
        { student_name: "Frank" },
      ],
      delay: 1.5,
    },
    {
      image: "/images/5.jpg",
      title: "Design Studio",
      developers: [
        { student_name: "Grace" },
        { student_name: "Hank" },
        { student_name: "Ivy" },
      ],
      delay: 1.8,
    },
    {
      image: "/images/6.jpg",
      title: "Tech Haven",
      developers: [
        { student_name: "Jack" },
        { student_name: "Karen" },
        { student_name: "Leo" },
      ],
      delay: 2.1,
    },
    {
      image: "/images/7.jpg",
      title: "Future Vision",
      developers: [
        { student_name: "Mike" },
        { student_name: "Nina" },
        { student_name: "Oscar" },
      ],
      delay: 2.4,
    },
    {
      image: "/images/8.jpg",
      title: "Digital Dreams",
      developers: [
        { student_name: "Paul" },
        { student_name: "Quinn" },
        { student_name: "Ruth" },
      ],
      delay: 2.7,
    },
  ];

  const handleShowMore = () => {
    if (showCard == 9) {
      router.push("/explore");
    } else {
      setShowCard(showCard + 3); // Show more cards
    }
  };

  return (
    <div className="relative min-h-[42.5rem] overflow-hidden flex flex-col justify-center items-center gap-10 bg-white mb-10 mx-5 md:mx-10 rounded-xl shadow-xl py-10 px-5 md:p-10">
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
        >
          {subHeadingChars.map((char, index) => (
            <motion.span
              className="text-primary-orange"
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-10"
        initial="hidden"
        whileInView="reveal"
        transition={{ staggerChildren: 0.5 }}
      >
        {allCards.slice(0, showCard).map((card, index) => (
          <Card
            key={index}
            image={card.image}
            title={card.title}
            developers={card.developers}
            delay={card.delay}
          />
        ))}
      </motion.div>
      <motion.div
        className="flex gap-5 z-10"
        initial="hidden"
        whileInView="reveal"
        transition={{ staggerChildren: 0.75 }}
      >
        <motion.button
          onClick={handleShowMore}
          transition={{ duration: 0.5 }}
          variants={charVariants}
          className="w-32 cursor-pointer relative flex justify-center items-center border border-primary-binus bg-transparent px-5 py-2.5 hover:text-primary-binus transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-bottom-left before:scale-y-100 before:bg-primary-binus before:transition-transform before:duration-300 before:content-[''] text-white before:hover:scale-y-0 rounded-md before:rounded-sm overflow-hidden"
        >
          {showCard >= allCards?.length ? "Explore" : "Show More"}
        </motion.button>
        <motion.button
          transition={{ duration: 0.5 }}
          variants={charVariants}
          className="w-32 relative border border-primary-binus bg-transparent px-5 py-2.5 text-primary-binus transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-y-0 before:bg-primary-binus before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-y-100 rounded-md before:rounded-sm overflow-hidden"
        >
          Contact
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Project;
