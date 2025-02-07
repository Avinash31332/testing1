import axios from "axios";
import React, { useEffect, useState } from "react";

function CardsCarousel() {
  const [data, setData] = useState({});
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 950);
  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth <= 950);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/admin/data/about`)
      .then((res) => {
        setData(res.data[1].uses);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="my-4">
      <p className="mx-4 my-2 text-3xl font-medium text-green-700">
        What Naturopathy does?
      </p>
      <div
        className={`${
          isSmallScreen ? "flex-col" : ""
        }flex p-4 w-full items-center gap-[10px]`}
      >
        {/* container-1 */}
        <div className={`${isSmallScreen ? "w-full" : "w-1/2"} flex  flex-col`}>
          {/* container-1-1 */}
          <div className={`rounded-xl w-[100%] bg-gray-400 h-[500px]`}>
            <img
              src={data.data1}
              alt="image1"
              className="object-cover rounded-lg w-[100%] h-[100%]"
            />
          </div>
          {/* container-1-2 */}
          <div className="flex gap-[10px]">
            <div
              className={`rounded-xl w-1/2 my-2 bg-gray-300 h-[300px]`}
            ></div>
            <div
              className={`rounded-xl w-1/2 my-2 bg-gray-300 h-[300px]`}
            ></div>
          </div>
        </div>

        {/* container-2 */}
        <div className={`${isSmallScreen ? "w-full" : "w-1/2"} flex  flex-col`}>
          {/* container-2-1 */}
          {/* container-2-2 */}
          <div className="flex gap-[10px]">
            <div
              className={`rounded-xl w-1/2 mb-2 bg-gray-300 h-[300px]`}
            ></div>
            <div
              className={`rounded-xl w-1/2 mb-2 bg-gray-300 h-[300px]`}
            ></div>
          </div>
          <div className={`rounded-xl w-[100%] bg-gray-400 h-[500px]`}></div>
        </div>
      </div>
    </div>
  );
}

export default CardsCarousel;
