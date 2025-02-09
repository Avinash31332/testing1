import axios from "axios";
import { Outlet, Navigate } from "react-router-dom";

async function ProtectedRoutes() {
  const response = await axios.get("http://localhost:3000", {
    withCredentials: true,
  });
  return response ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectedRoutes;
