import axios from "axios";

const Axios = axios.create({
  baseURL: "https://testing1-backend.onrender.com", // Replace with your actual API URL
  headers: {
    "Content-Type": "application/json",
  },
});

//https://testing1-backend.onrender.com

export default Axios;
