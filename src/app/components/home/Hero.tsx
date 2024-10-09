"use client";
import { useEffect, useState } from "react";
import {
  animate,
  useMotionValue,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import useMeasure from "react-use-measure";
import splitStringUsingRegex from "../../utlis/splitStringUsingRegex";

const heading = "BINUS Project Gallery";
const subHeadingStart = "Show the ";
const subHeadingHighlighted = "Best";
const subHeadingEnd = " in Innovation";
const description =
  "Discover the innovation of BINUS SOCS students through our curated platform, showcasing the best projects that highlight creativity, technical skills, and problem-solving. Explore works that shape the future of technology at BINUS.";

const charVariants = {
  hidden: { opacity: 0 },
  reveal: { opacity: 1 },
};

export const Hero = () => {
  const { scrollYProgress } = useScroll();
  const yTranslationUp = useMotionValue(0);
  const yTranslationDown = useMotionValue(0);
  let [ref1, { height: height1 }] = useMeasure({ debounce: 100 });
  let [ref2, { height: height2 }] = useMeasure({ debounce: 100 });
  const headingChars = splitStringUsingRegex(heading);
  const subHeadingStartChars = splitStringUsingRegex(subHeadingStart);
  const subHeadingHighlightedChars = splitStringUsingRegex(
    subHeadingHighlighted
  );
  const subHeadingEndChars = splitStringUsingRegex(subHeadingEnd);
  const descriptionChars = splitStringUsingRegex(description);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  useEffect(() => {
    let controlsUp;
    let finalPositionUp = -height1 / 2 - 5;

    controlsUp = animate(yTranslationUp, [0, finalPositionUp], {
      ease: "linear",
      duration: 40,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    let controlsDown;
    let initialPositionDown = -height2 + (height1 / 2 - 5);
    let finalPositionDown = 0;

    controlsDown = animate(
      yTranslationDown,
      [initialPositionDown, finalPositionDown],
      {
        ease: "linear",
        duration: 50,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      }
    );

    return () => {
      controlsUp.stop();
      controlsDown.stop();
    };
  }, [yTranslationUp, yTranslationDown, height1, height2]);

  return (
    <motion.div
      style={{ opacity }}
      className="sticky top-0 max-h-screen overflow-hidden flex gap-10"
    >
      <div className="w-1/2 flex flex-col justify-center items-start ps-[6.5rem] gap-5">
        <motion.h1
          className="font-bold font-montserrat text-5xl"
          initial="hidden"
          whileInView="reveal"
          transition={{ staggerChildren: 0.02 }}
        >
          {headingChars.map((char, index) => (
            <motion.span
              key={index}
              transition={{ duration: 1 }}
              variants={charVariants}
            >
              {char}
            </motion.span>
          ))}
          <br />
          <span className="font-semibold font-montserrat text-4xl">
            {subHeadingStartChars.map((char, index) => (
              <motion.span
                key={index}
                transition={{ duration: 0.5 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              transition={{ duration: 0.5 }}
              variants={charVariants}
              className="relative after:bg-primary-orange after:absolute after:h-[0.15rem] after:w-full after:bottom-0 after:left-0"
            >
              {subHeadingHighlightedChars.map((char, index) => (
                <motion.span
                  className=""
                  key={index}
                  transition={{ duration: 0.5 }}
                  variants={charVariants}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
            {subHeadingEndChars.map((char, index) => (
              <motion.span
                key={index}
                transition={{ duration: 0.5 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}{" "}
          </span>
        </motion.h1>
        <motion.h3
          initial="hidden"
          whileInView="reveal"
          transition={{ staggerChildren: 0.015 }}
        >
          {descriptionChars.map((char, index) => (
            <motion.span
              key={index}
              transition={{ duration: 0.5 }}
              variants={charVariants}
            >
              {char}
            </motion.span>
          ))}{" "}
        </motion.h3>

        <div className="flex gap-5">
          <motion.a
            href="/explore"
            variants={{
              hidden: { opacity: 0, x: -75 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 1 }}
            className="relative cursor-pointer border border-primary-orange bg-transparent px-5 py-2.5 text-primary-orange transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-bottom-left before:scale-y-0 before:scale-x-0 before:bg-primary-orange before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-y-100 before:hover:scale-x-100 rounded-md before:rounded-sm overflow-hidden"
          >
            Explore
          </motion.a>
          <motion.a
            href="/classes"
            variants={{
              hidden: { opacity: 0, x: -175 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 1.5 }}
            className="cursor-pointer py-2 px-1 relative after:absolute after:w-0 hover:after:w-full after:h-[1px] after:bottom-0 after:left-0 after:bg-primary-binus flex justify-center items-center after:transition-all after:ease-in-out after:duration-300"
          >
            Submit a project
          </motion.a>
        </div>
      </div>
      <div className="relative w-1/2 flex gap-7 h-full overflow-hidden rotate-3 justify-end items-end pe-[13rem] ">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 0.5 }}
          style={{ y: yTranslationUp }}
          className="flex flex-col gap-5 h-auto"
          ref={ref1}
        >
          <img
            src="/images/image-3.webp"
            className="w-[240px] h-[320px] rounded-md relative overflow-hidden object-cover shadow-xl"
          />
          <img
            src="/images/image-5.webp"
            className="w-[240px] h-[320px] rounded-md relative overflow-hidden object-cover shadow-xl"
          />
          <img
            src="/images/image-1.webp"
            className="w-[240px] h-[320px] rounded-md relative overflow-hidden object-cover shadow-xl"
          />
          <img
            src="/images/image-2.webp"
            className="w-[240px] h-[320px] rounded-md relative overflow-hidden object-cover shadow-xl"
          />
          <img
            src="/images/image-4.webp"
            className="w-[240px] h-[320px] rounded-md relative overflow-hidden object-cover shadow-xl"
          />
          <img
            src="/images/image-3.webp"
            className="w-[240px] h-[320px] rounded-md relative overflow-hidden object-cover shadow-xl"
          />
          <img
            src="/images/image-5.webp"
            className="w-[240px] h-[320px] rounded-md relative overflow-hidden object-cover shadow-xl"
          />
          <img
            src="/images/image-1.webp"
            className="w-[240px] h-[320px] rounded-md relative overflow-hidden object-cover shadow-xl"
          />
          <img
            src="/images/image-2.webp"
            className="w-[240px] h-[320px] rounded-md relative overflow-hidden object-cover shadow-xl"
          />
          <img
            src="/images/image-4.webp"
            className="w-[240px] h-[320px] rounded-md relative overflow-hidden object-cover shadow-xl"
          />
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 1 }}
          style={{ y: yTranslationDown }}
          className="flex flex-col gap-5 h-auto"
          ref={ref2}
        >
          <img
            src="/images/image-5.webp"
            className="w-[240px] h-[320px] rounded-md relative overflow-hidden object-cover shadow-xl"
          />
          <img
            src="/images/image-3.webp"
            className="w-[240px] h-[320px] rounded-md relative overflow-hidden object-cover shadow-xl"
          />
          <img
            src="/images/image-2.webp"
            className="w-[240px] h-[320px] rounded-md relative overflow-hidden object-cover shadow-xl"
          />
          <img
            src="/images/image-1.webp"
            className="w-[240px] h-[320px] rounded-md relative overflow-hidden object-cover shadow-xl"
          />
          <img
            src="/images/image-4.webp"
            className="w-[240px] h-[320px] rounded-md relative overflow-hidden object-cover shadow-xl"
          />
          <img
            src="/images/image-3.webp"
            className="w-[240px] h-[320px] rounded-md relative overflow-hidden object-cover shadow-xl"
          />
          <img
            src="/images/image-5.webp"
            className="w-[240px] h-[320px] rounded-md relative overflow-hidden object-cover shadow-xl"
          />
          <img
            src="/images/image-1.webp"
            className="w-[240px] h-[320px] rounded-md relative overflow-hidden object-cover shadow-xl"
          />
          <img
            src="/images/image-2.webp"
            className="w-[240px] h-[320px] rounded-md relative overflow-hidden object-cover shadow-xl"
          />
          <img
            src="/images/image-4.webp"
            className="w-[240px] h-[320px] rounded-md relative overflow-hidden object-cover shadow-xl"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
