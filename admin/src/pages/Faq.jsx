import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Axios from "../utils/Axios";

function Faq() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 700);
  const [isMidScreen, setIsMidScreen] = useState(window.innerWidth <= 950);
  const [faqs, setFaqs] = useState([]);

  // Handle screen resize
  const handleScreenResize = useCallback(() => {
    setIsSmallScreen(window.innerWidth <= 700);
    setIsMidScreen(window.innerWidth <= 950);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleScreenResize);
    return () => window.removeEventListener("resize", handleScreenResize);
  }, [handleScreenResize]);

  // Fetch FAQs
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await Axios.get("/api/faq", { withCredentials: true });
        setFaqs(res.data || []);
      } catch (err) {
        console.error("Error fetching FAQs:", err.message);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <div className="flex flex-col justify-center p-4">
      <Link
        className={`hover:bg-transparent border-2 border-green-900 hover:text-green-900 bg-green-900 text-center text-white p-2 px-4 rounded-3xl 
        ${isSmallScreen ? "w-1/2 text-sm" : "text-lg w-1/4"} 
        mb-4`}
        to="/admin/faq/create"
      >
        Add Question
      </Link>

      <div
        className={`flex flex-wrap justify-center p-2 py-8 ${
          !isSmallScreen && isMidScreen ? "" : "gap-2"
        }`}
      >
        {faqs.map((faq, index) => (
          <Link
            to={`/admin/faq/${faq._id}`}
            key={faq._id}
            className={`p-4 hover:bg-gray-100 border-2 rounded-xl 
              ${
                isSmallScreen
                  ? "w-full border-green-200"
                  : isMidScreen
                  ? "w-1/2 border-green-200"
                  : "w-[90%] border-green-700"
              }`}
          >
            <p
              className={`font-medium text-lg text-green-900 ${
                isSmallScreen ? "" : "underline"
              }`}
            >
              {index + 1}.) {faq.question}
            </p>
            {isSmallScreen && (
              <hr className="border-2 border-green-800 w-[95%] my-2" />
            )}
            <p className="text-zinc-700">{faq.answer}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Faq;
