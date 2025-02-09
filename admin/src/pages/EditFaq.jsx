import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "../utils/Axios";

function EditFaq() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [small, setSmall] = useState(window.innerWidth <= 650);
  const { id } = useParams();
  const navigate = useNavigate();

  // Handle screen resize
  const handleResize = useCallback(() => {
    setSmall(window.innerWidth <= 650);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Fetch FAQ data
  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const res = await Axios.get(`/api/admin/faq/${id}`, {
          withCredentials: true,
        });
        setQuestion(res.data.question || "");
        setAnswer(res.data.answer || "");
      } catch (err) {
        console.error("Error fetching FAQ:", err.message);
      }
    };
    fetchFaq();
  }, [id]);

  // Update FAQ
  const updateFaq = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(
        `/api/admin/faq/${id}`,
        { question, answer },
        { withCredentials: true }
      );
      navigate("/faq");
    } catch (err) {
      console.error("Error updating FAQ:", err.message);
    }
  };

  // Delete FAQ
  const handleDelete = async () => {
    if (window.confirm("Do you want to delete this question?")) {
      try {
        await Axios.delete(`/api/admin/faq/${id}`, { withCredentials: true });
        navigate("/faq");
      } catch (err) {
        console.error("Error deleting FAQ:", err.message);
      }
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100">
      <form
        onSubmit={updateFaq}
        className="flex justify-center items-center w-full"
      >
        <div
          className={`flex flex-col items-center justify-center border-2 border-gray-200 rounded-xl shadow-lg shadow-zinc-200 
          ${small ? "w-full max-w-md p-4" : "w-2/4 lg:w-1/4 md:max-w-lg p-8"}`}
        >
          {/* Question Input */}
          <label className="text-lg font-medium text-zinc-400">Question</label>
          <input
            className="w-full p-2 m-2 bg-zinc-200 rounded-lg"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Question"
            required
          />

          {/* Answer Input */}
          <label className="flex text-lg font-medium text-zinc-400">
            Answer (
            <span
              className={
                answer.length <= 350
                  ? "text-green-600"
                  : answer.length <= 450
                  ? "text-yellow-500"
                  : answer.length <= 499
                  ? "text-red-400"
                  : "text-red-600"
              }
            >
              {answer.length}
            </span>
            /500)
          </label>
          <textarea
            className="w-full min-h-16 max-h-32 p-2 m-2 bg-zinc-200 rounded-lg"
            value={answer}
            maxLength={500}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Answer"
            required
          />

          <button type="submit" className="gotoBtn">
            Submit
          </button>
        </div>
      </form>

      <button
        className="text-white text-lg py-2 px-16 bg-red-600 rounded m-4 my-8"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}

export default EditFaq;
