import React, { useState, useEffect } from "react";
import GotoButton from "./GotoButton";
import Axios from "../utils/Axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion"; // Import animation library

function About() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [small, setSmall] = useState(window.innerWidth <= 650);

  const { id } = useParams();

  const windowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
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
        const response = await Axios.get("/api/data");
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
          {/* Spinning Loader Animation */}
          <motion.div
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
          <p className="mt-4 text-gray-500 text-lg">Loading...</p>
        </div>
      ) : (
        <>
          <div
            className={
              small
                ? "w-full"
                : "flex flex-col items-start px-4 w-1/2 justify-center"
            }
          >
            <p className="uppercase">About</p>
            <h1
              className={` font-sans 
              ${
                small
                  ? "text-2xl font-medium"
                  : "text-4xl font-medium italic text-zinc-700"
              }`}
            >
              {data.aboutTitle}
            </h1>
          </div>
          <p
            className={
              small
                ? "py-2"
                : `px-8 leading-[40px] w-1/2 font-medium text-2xl text-gray-700`
            }
          >
            {data.aboutDescription}
            <br />
            {small ? "" : <GotoButton title="Know More" />}
          </p>
          {small ? <GotoButton title="Know More" /> : ""}
        </>
      )}
    </div>
  );
}

export default About;
