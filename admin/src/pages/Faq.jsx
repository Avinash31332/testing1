import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Faq() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 700);
  const [isMidScreen, setIsMidScreen] = useState(window.innerWidth <= 950);
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    function handleScreen() {
      setIsSmallScreen(window.innerWidth <= 700);
      setIsMidScreen(window.innerWidth <= 950);
    }

    window.addEventListener("resize", handleScreen);
    return () => window.removeEventListener("resize", handleScreen);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/faq", { withCredentials: true })
      .then((res) => {
        setDatas(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <Link className="gotoBtn w-1/4" to={"/admin/faq/create"}>
        Add Question
      </Link>
      <div
        className={`${
          isSmallScreen ? "" : isMidScreen ? "" : "gap-[5px]"
        } flex flex-wrap justify-center p-2 py-8`}
      >
        {datas.map((data, index) => (
          <Link
            to={`/admin/faq/${data._id}`}
            key={data._id}
            className={`${
              isSmallScreen
                ? "w-full border-2 border-green-200 rounded-xl"
                : isMidScreen
                ? "w-1/2 border-2 border-green-200 rounded-xl"
                : "w-[90%] border-2 border-green-700 rounded-xl"
            } p-4 hover:bg-gray-100`}
          >
            <p
              className={`${
                isSmallScreen ? "" : "underline"
              } font-medium text-lg text-green-900 `}
            >
              {index + 1}.)<span> </span>
              {data.question}
            </p>
            {isSmallScreen ? (
              <hr className="border-2 border-green-800 w-[95%] my-2" />
            ) : (
              ""
            )}
            <p className="text-zinc-700">{data.answer}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Faq;
