import React from "react";
import { motion } from "framer-motion";
import Card from "../Card";

interface ExploreProps {
  setShowDevelopers: (value: boolean) => void;
  showDevelopers: boolean;
  expand: boolean;
  handleScrollToTop: () => void;
}

function ExploreComponent(props: ExploreProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1 },
      }}
      initial="hidden"
      animate="show"
      className="relative h-full bg-white mx-9 rounded-md flex flex-col mb-14 pb-7"
    >
      <div
        className={`w-full h-auto bg-white sticky z-10 px-5 transition-all ease-in-out duration-300 visible ${
          props.expand ? "top-[12.25rem]" : "top-28"
        }`}
      >
        <div className="p-2 rounded-md my-4 border ">1705 Results Found</div>
      </div>

      <motion.div
        className={`grid grid-cols-3 flex-grow h-fit gap-7 justify-center items-start transition-all ease-in-out duration-500 pt-3`}
        initial="hidden"
        whileInView="reveal"
        transition={{ staggerChildren: 0.5 }}
      >
        <div
          className="flex justify-center items-center"
          onClick={() => {
            props.setShowDevelopers(!props.showDevelopers);
            props.handleScrollToTop();
          }}
        >
          <Card
            image="/images/1.jpg"
            delay={0}
            title="This Co"
            developers={["Kelson Edbert Susilo"]}
          />
        </div>
        <div
          className="flex justify-center items-center"
          onClick={() => {
            props.setShowDevelopers(!props.showDevelopers);
            props.handleScrollToTop();
          }}
        >
          <Card
            image="/images/2.jpg"
            delay={0}
            title="This Co"
            developers={["Kelson Edbert Susilo"]}
          />
        </div>
        <div
          className="flex justify-center items-center"
          onClick={() => {
            props.setShowDevelopers(!props.showDevelopers);
            props.handleScrollToTop();
          }}
        >
          <Card
            image="/images/3.jpg"
            delay={0}
            title="This Co"
            developers={["Kelson Edbert Susilo"]}
          />
        </div>
        <div
          className="flex justify-center items-center"
          onClick={() => {
            props.setShowDevelopers(!props.showDevelopers);
            props.handleScrollToTop();
          }}
        >
          <Card
            image="/images/4.jpg"
            delay={0}
            title="This Co"
            developers={["Kelson Edbert Susilo"]}
          />
        </div>
        <div
          className="flex justify-center items-center"
          onClick={() => {
            props.setShowDevelopers(!props.showDevelopers);
            props.handleScrollToTop();
          }}
        >
          <Card
            image="/images/5.jpg"
            delay={0}
            title="This Co"
            developers={["Kelson Edbert Susilo"]}
          />
        </div>
        <div
          className="flex justify-center items-center"
          onClick={() => {
            props.setShowDevelopers(!props.showDevelopers);
            props.handleScrollToTop();
          }}
        >
          <Card
            image="/images/6.jpg"
            delay={0}
            title="This Co"
            developers={["Kelson Edbert Susilo"]}
          />
        </div>
        <div
          className="flex justify-center items-center"
          onClick={() => {
            props.setShowDevelopers(!props.showDevelopers);
            props.handleScrollToTop();
          }}
        >
          <Card
            image="/images/7.jpg"
            delay={0}
            title="This Co"
            developers={["Kelson Edbert Susilo"]}
          />
        </div>
        <div
          className="flex justify-center items-center"
          onClick={() => {
            props.setShowDevelopers(!props.showDevelopers);
            props.handleScrollToTop();
          }}
        >
          <Card
            image="/images/8.jpg"
            delay={0}
            title="This Co"
            developers={["Kelson Edbert Susilo"]}
          />
        </div>
        <div
          className="flex justify-center items-center"
          onClick={() => {
            props.setShowDevelopers(!props.showDevelopers);
            props.handleScrollToTop();
          }}
        >
          <Card
            image="/images/9.jpg"
            delay={0}
            title="This Co"
            developers={["Kelson Edbert Susilo"]}
          />
        </div>
        <div
          className="flex justify-center items-center"
          onClick={() => {
            props.setShowDevelopers(!props.showDevelopers);
            props.handleScrollToTop();
          }}
        >
          <Card
            image="/images/10.jpg"
            delay={0}
            title="This Co"
            developers={["Kelson Edbert Susilo"]}
          />
        </div>
        <div
          className="flex justify-center items-center"
          onClick={() => {
            props.setShowDevelopers(!props.showDevelopers);
            props.handleScrollToTop();
          }}
        >
          <Card
            image="/images/11.jpg"
            delay={0}
            title="This Co"
            developers={["Kelson Edbert Susilo"]}
          />
        </div>
        <div
          className="flex justify-center items-center"
          onClick={() => {
            props.setShowDevelopers(!props.showDevelopers);
            props.handleScrollToTop();
          }}
        >
          <Card
            image="/images/12.jpg"
            delay={0}
            title="This Co"
            developers={["Kelson Edbert Susilo"]}
          />
        </div>
        <div
          className="flex justify-center items-center"
          onClick={() => {
            props.setShowDevelopers(!props.showDevelopers);
            props.handleScrollToTop();
          }}
        >
          <Card
            image="/images/1.jpg"
            delay={0}
            title="This Co"
            developers={["Kelson Edbert Susilo"]}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ExploreComponent;
