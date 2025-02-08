import React, { useState, useEffect } from "react";
import GotoButton from "./GotoButton";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

function About() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [small, setSmall] = useState(window.innerWidth <= 650);

  const { id } = useParams();

  const windowDimensions = () => {
    setWidth(window.innerWidth);
    setSmall(window.innerWidth <= 650);
  };

  useEffect(() => {
    window.addEventListener("resize", windowDimensions);

    return () => {
      window.removeEventListener("resize", windowDimensions);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://testing1-backend.onrender.com/api/data"
        );
        setData(response.data.about || {});
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className={`${
        small
          ? "about-container py-16 p-7 flex-col text-center text-lg justify-center"
          : "h-[100vh] about-container p-7 flex items-center text-center text-xl py-[60px]"
      }`}
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center h-full">
          {/* Loading Animation */}
          <motion.div
            className="flex space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <motion.div
              className="w-5 h-5 bg-blue-500 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="w-5 h-5 bg-green-500 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                ease: "easeInOut",
                delay: 0.2,
              }}
            />
            <motion.div
              className="w-5 h-5 bg-red-500 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />
          </motion.div>
          <p className="mt-4 text-gray-500 text-lg">Fetching details...</p>
        </div>
      ) : (
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={
              small
                ? "w-full"
                : "flex flex-col items-start px-4 w-1/2 justify-center"
            }
          >
            <p className="uppercase">About</p>
            <h1
              className={`font-sans ${
                small
                  ? "text-2xl font-medium"
                  : "text-4xl font-medium italic text-zinc-700"
              }`}
            >
              {data?.aboutTitle || "Title Unavailable"}
            </h1>
          </div>
          <p
            className={
              small
                ? "py-2"
                : "px-8 leading-[40px] w-1/2 font-medium text-2xl text-gray-700"
            }
          >
            {data?.aboutDescription || "Description not available."}
            <br />
            {small ? "" : <GotoButton title="Know More" />}
          </p>
          {small ? <GotoButton title="Know More" /> : ""}
        </motion.div>
      )}
    </div>
  );
}

export default About;
