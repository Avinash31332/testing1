import React, { useState, useEffect } from "react";
import GotoButton from "./GotoButton";
function About() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [small, setSmall] = useState(window.innerWidth <= 650);
  const windowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    setSmall(window.innerWidth <= 650);
  };

  useEffect(() => {
    window.addEventListener("resize", windowDimensions);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", windowDimensions);
    };
  }, []);
  return (
    <div
      className={
        small
          ? "p-4 py-[25px] flex-col text-center text-lg justify-center"
          : "p-4 flex text-center text-xl py-[60px]"
      }
    >
      <div className={small ? "w-full" : "w-3/4"}>
        <p className="uppercase">About</p>
        <h1 className="font-medium font-sans text-3xl">
          Anything Comes over here
        </h1>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
        molestiae sed porro voluptatem est nulla mollitia facilis aliquam optio.
        Id quasi delectus repudiandae repellendus! Laudantium explicabo suscipit
        quis illo sapiente.
        <br />
        {small ? "" : <GotoButton title="Know More" />}
      </p>
      {small ? <GotoButton title="Know More" /> : ""}
    </div>
  );
}

export default About;
