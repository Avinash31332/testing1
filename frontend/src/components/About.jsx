import React, { useState, useEffect } from "react";
import GotoButton from "./GotoButton";
import axios from "axios";
import { useParams } from "react-router-dom";
function About() {
  const [data, setData] = useState({});
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [small, setSmall] = useState(window.innerWidth <= 650);
  const windowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    setSmall(window.innerWidth <= 650);
  };

  const { id } = useParams();

  useEffect(() => {
    window.addEventListener("resize", windowDimensions);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", windowDimensions);
    };
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/admin/data/about`).then((res) => {
      setData(res.data[0].about);
    });
  }, []);
  return (
    <div
      className={
        small
          ? "about-container p-7 py-[25px] flex-col text-center text-lg justify-center"
          : "about-container p-7 flex text-center text-xl py-[60px]"
      }
    >
      <div className={small ? "w-full" : "w-3/4"}>
        <p className="uppercase">About</p>
        <h1 className="font-medium font-sans text-3xl">{data.aboutTitle}</h1>
      </div>
      <p>
        {data.aboutDescription}
        <br />
        {small ? "" : <GotoButton title="Know More" />}
      </p>
      {small ? <GotoButton title="Know More" /> : ""}
    </div>
  );
}

export default About;
