import React, { useState, useEffect } from "react";
import screenshot from "../assets/Screenshot (124).png";
function useNaturopathy() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const change = document.getElementsByClassName("change");
  // while (change.length > 0) {
  //   const index = 0;
  //   change[index].style.backgroundColor = "black";
  // }
  return (
    <div className="p-8 flex flex-col">
      <div className={`flex ${isSmallScreen ? "flex-col" : ""}`}>
        <div
          className={`flex flex-col justify-center ${
            isSmallScreen ? "w-full leading-[1.4]" : "w-1/2 p-4  leading-[2]"
          } text-xl text-gray-500 text-center`}
        >
          <div
            className={`w-full ${
              isSmallScreen ? "text-2xl" : "text-3xl"
            } text-gray-700`}
          >
            Uses of Naturopathy?
          </div>
          <p className={`${isSmallScreen ? "text-lg" : "text-xl"}`}>
            Naturopathy focuses on the body's natural ability to heal itself by
            using natural remedies like diet, exercise, herbal medicine,
            hydrotherapy, and lifestyle changes. It works on the principle of
            holistic healing, addressing the root cause rather than just
            symptoms.
          </p>
          <br />
          <p
            className={`${
              isSmallScreen ? "text-lg" : "text-2xl"
            } font-medium text-gray-600 `}
          >
            Here’s what naturopathy does to the body:
          </p>
        </div>
        {/* <div
          className={`flex flex-col p-4 ${
            isSmallScreen ? "w-full" : "w-1/2"
          } text-lg font-medium text-gray-100 text-center`}
        >
          <div className="change bg-gray-500 p-4 rounded-3xl m-2">
            Boosts Immunity
          </div>
          <div className="change bg-gray-500 p-4 rounded-3xl m-2">
            Detoxifies the Body
          </div>
          <div className="change bg-gray-500 p-4 rounded-3xl m-2">
            Balances Hormones{" "}
          </div>
          <div className="change bg-gray-500 p-4 rounded-3xl m-2">
            Improves Digestion{" "}
          </div>
          <div className="change bg-gray-500 p-4 rounded-3xl m-2">
            Enhances Energy Levels
          </div>
          <div className="change bg-gray-500 p-4 rounded-3xl m-2">
            Reduces Stress
          </div>
          <div className="change bg-gray-500 p-4 rounded-3xl m-2">
            Manages Chronic Diseases
          </div>
          <div className="change bg-gray-500 p-4 rounded-3xl m-2">
            Promotes Mental Clarity
          </div>
        </div> */}
        <div
          className={`flex gap-[10px] items-end justify-center p-4 ${
            isSmallScreen ? "w-full" : "w-1/2"
          } text-lg font-medium text-gray-100 text-center`}
        >
          <img className="opacity-[.9] w-full h-full" src={screenshot} alt="" />
          {/* <div className="h-[30px] w-[10%] bg-green-200"></div>
          <div className="h-[70px] w-[10%] bg-green-300"></div>
          <div className="h-[150px] w-[10%] bg-green-400"></div>
          <div className="h-[230px] w-[10%] bg-green-500"></div>
          <div className="h-[300px] w-[10%] bg-green-600"></div>
          <div className="h-[350px] w-[10%] bg-green-700"></div>
          <div className="h-[400px] w-[10%] bg-green-800"></div>
          <div className="h-[500px] w-[10%] bg-green-900"></div> */}
        </div>
      </div>
    </div>
  );
}

export default useNaturopathy;
