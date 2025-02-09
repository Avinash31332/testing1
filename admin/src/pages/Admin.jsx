import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";

function AdminLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 900);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle screen resize
  const handleScreenResize = useCallback(() => {
    setIsSmallScreen(window.innerWidth <= 900);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleScreenResize);
    return () => window.removeEventListener("resize", handleScreenResize);
  }, [handleScreenResize]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/api/admin/login" : "/api/admin/create";
    const data = { name, password };

    try {
      const res = await Axios.post(endpoint, data, { withCredentials: true });
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <div className="overflow-x-hidden h-screen w-[100%] flex flex-col items-center justify-center bg-gray-100">
      <button onClick={() => setIsLogin(!isLogin)} className="gotoBtn mb-4">
        {isLogin ? "Register" : "Go to Login"}
      </button>

      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center w-full"
      >
        <div
          className={`flex flex-col items-center justify-center border-2 border-gray-200 rounded-xl shadow-lg shadow-zinc-200 
            ${
              isSmallScreen
                ? "w-full max-w-md p-4"
                : "w-2/4 lg:w-1/4 md:max-w-lg p-8"
            }`}
        >
          <p className="text-xl text-gray-500 font-medium my-2 underline">
            {isLogin ? "Login Admin" : "Register Admin"}
          </p>
          <label className="text-lg font-medium text-zinc-400">Username:</label>
          <input
            className="w-full p-2 m-2 bg-zinc-200 rounded-lg"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Username"
            required
          />
          <label className="text-lg font-medium text-zinc-400">Password:</label>
          <input
            className="w-full p-2 m-2 bg-zinc-200 rounded-lg"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <button type="submit" className="gotoBtn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;
