import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [login, setLogin] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 900);
  const navigate = useNavigate("/");

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    function handleScreen() {
      setIsSmallScreen(window.innerWidth <= 900);
    }
    window.addEventListener("resize", handleScreen);
    return () => window.removeEventListener("resize", handleScreen);
  }, []);

  function handleRegister(e) {
    e.preventDefault();
    const data = {
      name,
      password,
    };
    axios
      .post("https://testing1-backend.onrender.com/api/admin/create", data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(e) {
    e.preventDefault();
    const data = {
      name,
      password,
    };
    axios
      .post("https://testing1-backend.onrender.com/api/admin/login", data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <button onClick={(e) => setLogin(false)} className="gotoBtn">
        Register
      </button>
      {login ? (
        <div className="h-screen w-full flex items-center justify-center bg-gray-100">
          <form
            onSubmit={handleLogin}
            className="flex justify-center items-center w-full"
          >
            <div
              className={`flex flex-col items-center justify-center  border-2 border-gray-200 rounded-xl shadow-lg shadow-zinc-200 ${
                isSmallScreen
                  ? "w-full max-w-md p-4"
                  : "w-2/4 lg:w-1/4 md:max-w-lg p-8"
              }`}
            >
              <p className="text-xl text-gray-500 font-medium my-2 underline">
                Login Admin
              </p>
              <label className="text-lg font-medium text-zinc-400">
                Username:
              </label>
              <input
                className="w-full p-2 m-2 bg-zinc-200 rounded-lg"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Username"
                required
              />
              <label className="flex text-lg font-medium text-zinc-400">
                Password
              </label>
              <input
                className="w-full p-2 m-2 bg-zinc-200 rounded-lg"
                type="password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />

              <button type="submit" className="gotoBtn">
                Submit
              </button>
            </div>
            <div></div>
          </form>
          <button></button>
        </div>
      ) : (
        <div className="h-screen w-full flex items-center justify-center bg-gray-100">
          <button className="gotoBtn" onClick={(e) => setLogin(true)}>
            Go to Login
          </button>
          <form
            onSubmit={handleRegister}
            className="flex justify-center items-center w-full"
          >
            <div
              className={`flex flex-col items-center justify-center  border-2 border-gray-200 rounded-xl shadow-lg shadow-zinc-200 ${
                isSmallScreen
                  ? "w-full max-w-md p-4"
                  : "w-2/4 lg:w-1/4 md:max-w-lg p-8"
              }`}
            >
              <p className="text-xl text-gray-500 font-medium my-2 underline">
                Register Admin
              </p>
              <label className="text-lg font-medium text-zinc-400">
                Username:
              </label>
              <input
                className="w-full p-2 m-2 bg-zinc-200 rounded-lg"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Username"
                required
              />
              <label className="flex text-lg font-medium text-zinc-400">
                Password
              </label>
              <input
                className="w-full p-2 m-2 bg-zinc-200 rounded-lg"
                type="password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />

              <button type="submit" className="gotoBtn">
                Submit
              </button>
            </div>
            <div></div>
          </form>
          <button></button>
        </div>
      )}
    </div>
  );
}

export default AdminLogin;
