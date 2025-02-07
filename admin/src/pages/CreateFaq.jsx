import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateFaq() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [small, setSmall] = useState(window.innerWidth <= 650);
  const navigator = useNavigate();

  useEffect(() => {
    const setDimensions = () => setSmall(window.innerWidth <= 650);
    window.addEventListener("resize", setDimensions);
    return () => {
      window.removeEventListener("resize", setDimensions);
    };
  }, []);

  const newFaq = (e) => {
    e.preventDefault();
    const data = { question, answer };

    axios
      .post("http://localhost:3000/api/admin/faq", data, {
        withCredentials: true,
      })
      .then(() => {
        navigator("/faq");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <form
        onSubmit={newFaq}
        className="flex justify-center items-center w-full"
      >
        <div
          className={`flex flex-col items-center justify-center  border-2 border-gray-200 rounded-xl shadow-lg shadow-zinc-200 ${
            small ? "w-full max-w-md p-4" : "w-2/4 lg:w-1/4 md:max-w-lg p-8"
          }`}
        >
          <label className="text-lg font-medium text-zinc-400">Question</label>
          <input
            className="w-full p-2 m-2 bg-zinc-200 rounded-lg"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Question"
            required
          />
          <label className="flex text-lg font-medium text-zinc-400">
            Answer (
            <label className="flex text-lg font-medium text-zinc-400">
              <p
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
              </p>
              /500)
            </label>
          </label>
          <textarea
            className="w-full min-h-16 max-h-32 p-2 m-2 bg-zinc-200 rounded-lg"
            type="text"
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
      <button></button>
    </div>
  );
}

export default CreateFaq;
