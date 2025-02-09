import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";

function EditData() {
  // Responsive state
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 570);
  const [isMidScreen, setIsMidScreen] = useState(
    window.innerWidth >= 570 && window.innerWidth <= 960
  );

  // Data state
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutDescription, setAboutDescription] = useState("");

  // Navigation
  const navigate = useNavigate();

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 570);
      setIsMidScreen(window.innerWidth >= 570 && window.innerWidth <= 960);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get("/api/data");
        if (res.data?.about) {
          setAboutTitle(res.data.about.aboutTitle || "");
          setAboutDescription(res.data.about.aboutDescription || "");
        }
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };
    fetchData();
  }, []);

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const newData = { aboutTitle, aboutDescription };

    try {
      await Axios.put("/api/admin/data", newData, { withCredentials: true });
      navigate("/");
    } catch (err) {
      console.error("Error updating data:", err.message);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="p-4">
      <p
        className={`my-2 font-medium text-zinc-800 ${
          isSmallScreen ? "text-xl" : "text-2xl"
        }`}
      >
        Update About
      </p>
      <hr className="border-border-zinc-100" />

      <div className={`flex flex-col ${isSmallScreen ? "items-center" : ""}`}>
        {/* About Title */}
        <div
          className={`flex ${
            isSmallScreen
              ? "w-full flex-col items-center"
              : "w-1/2 items-center"
          }`}
        >
          <label className="text-lg font-medium text-zinc-600">
            About Title
          </label>
          <input
            type="text"
            className="text-lg w-full p-4 bg-gray-200 rounded m-4"
            value={aboutTitle}
            onChange={(e) => setAboutTitle(e.target.value)}
          />
        </div>

        {/* About Description */}
        <div
          className={`flex ${
            isSmallScreen
              ? "flex-col items-center w-full"
              : "w-[90%] items-center"
          }`}
        >
          <label className="text-lg font-medium text-zinc-600 flex gap-2">
            About Description
            <span className={`flex ${isSmallScreen ? "text-center" : ""}`}>
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
            </span>
          </label>
          <textarea
            className="text-lg w-full p-4 bg-gray-200 rounded m-4 min-h-[50px] max-h-[100px]"
            value={aboutDescription}
            onChange={(e) => setAboutDescription(e.target.value)}
            maxLength={250}
          />
        </div>
      </div>

      <button className="gotoBtn">Submit</button>
    </form>
  );
}

export default EditData;
