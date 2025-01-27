import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditData() {
  //isAdmin
  const [isAdmin, setAdmin] = useState(false);

  //screens sizes responsive
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 570);
  const [isMidScreen, setIsMidScreen] = useState(
    window.innerWidth >= 570 && window.innerWidth <= 960
  );

  //data operations
  const [data, setData] = useState({});
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutDescription, setAboutDescription] = useState("");
  //navigation
  const navigate = useNavigate();

  //small screen and fetch data
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 570);
    window.addEventListener("resize", handleResize);

    axios.get(`http://localhost:3000/api/admin/data/about`).then((res) => {
      setData(res.data);
      setAboutTitle(res.data[0].about.aboutTitle);
      setAboutDescription(res.data[0].about.aboutDescription);
    });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //mid screen use effect
  useEffect(() => {
    const handleMidScreen = () =>
      setIsMidScreen(window.innerWidth >= 570 && window.innerWidth <= 960);
    window.addEventListener("resize", handleMidScreen);
  }, []);

  const handleUpdate = () => {
    const data = {
      aboutTitle: aboutTitle,
      aboutDescription: aboutDescription,
    };
    axios
      .put(
        `http://localhost:3000/api/admin/data/about/67968600c96441fa12b9f6c7`,
        data
      )
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className={`p-4`}>
        <p
          className={`my-2 font-medium text-zinc-800
          ${isSmallScreen ? "text-xl" : "text-2xl"}`}
        >
          Update About
        </p>
        <hr className="border-border-zinc-100" />
        <div
          className={`flex flex-col 
          ${isSmallScreen ? "items-center" : ""}
          `}
        >
          <div
            className={`flex 
            ${
              isSmallScreen
                ? "w-full flex-col items-center"
                : "w-1/2 items-center"
            }
            `}
          >
            <label
              className={`text-lg font-medium text-zinc-600
              ${isSmallScreen ? "" : ""}`}
            >
              About Title
            </label>
            <input
              type="text"
              className="text-lg w-[100%] p-4 bg-gray-200 rounded m-4"
              value={aboutTitle}
              onChange={(e) => setAboutTitle(e.target.value)}
            />
          </div>
          <div
            className={`flex 
            ${
              isSmallScreen
                ? "flex-col items-center w-full"
                : "w-[90%] items-center"
            }
            `}
          >
            <label
              className={`text-lg font-medium text-zinc-600
              ${isSmallScreen ? "text-center" : ""}`}
            >
              About Description <br />
              <label className="flex">
                (
                <p
                  className={
                    aboutDescription.length <= 150
                      ? "text-green-600"
                      : aboutDescription.length <= 200
                      ? "text-yellow-500"
                      : aboutDescription.length < 250
                      ? "text-red-400"
                      : "text-red-600"
                  }
                >
                  {aboutDescription.length}
                </p>
                /250)
              </label>
            </label>
            <textarea
              type="text"
              className="text-lg w-[100%] p-4 bg-gray-200 rounded m-4 min-h-[50px] max-h-[100px]"
              value={aboutDescription}
              onChange={(e) => setAboutDescription(e.target.value)}
              maxLength={250}
            />
          </div>
        </div>
      </div>
      <button className="gotoBtn">Submit</button>
    </div>
  );
}

export default EditData;
