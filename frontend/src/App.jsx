import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Therapies from "./pages/Therapies";
import TherapyOperations from "./pages/TherapyOperations";
import Navbar from "./components/Navbar";
import CreateTherapy from "./pages/CreateTherapy";
import NewTest from "./pages/NewTest";
import EditData from "./pages/editData";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/therapies" element={<Therapies />} />
        <Route path="/therapies/:id" element={<TherapyOperations />} />
        <Route path="/therapies/create" element={<CreateTherapy />} />
        <Route path="/therapies/test" element={<NewTest />} />
        <Route path="/edit" element={<EditData />} />
        <Route />
      </Routes>
    </>
  );
}

export default App;
