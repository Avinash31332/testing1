import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditFaq() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [small, setSmall] = useState(window.innerWidth <= 650);
  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    const setDimensions = () => setSmall(window.innerWidth <= 650);
    window.addEventListener("resize", setDimensions);
    return () => {
      window.removeEventListener("resize", setDimensions);
    };
  }, []);

  useEffect(() => {
    axios
      .get(`https://testing1-backend.onrender.com/api/admin/faq/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setQuestion(res.data.question);
        setAnswer(res.data.answer);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const newFaq = (e) => {
    e.preventDefault();
    const data = { question, answer };

    axios
      .put(`https://testing1-backend.onrender.com/api/admin/faq/${id}`, data, {
        withCredentials: true,
      })
      .then(() => {
        navigator("/faq");
      });
  };

  const handleDelete = (e) => {
    const ok = window.confirm("Do you want to delete this question ?");
    if (ok) {
      axios
        .delete(`https://testing1-backend.onrender.com/api/admin/faq/${id}`, {
          withCredentials: true,
        })
        .then(() => {
          navigator("/faq");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100">
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
      <button
        className="text-white text-lg py-2 px-16 bg-red-600 rounded m-4 my-8"
        onClick={(e) => handleDelete()}
      >
        Delete
      </button>
    </div>
  );
}

export default EditFaq;
