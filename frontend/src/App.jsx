import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Therapies from "./pages/Therapies";
import Navbar from "./components/Navbar";
import UsesNaturopathy from "./components/UsesNaturopathy";
import CreateAppointment from "./pages/createAppointment";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/therapies" element={<Therapies />} />
        <Route path="/uses" element={<UsesNaturopathy />} />
        <Route path="/appointments/create" element={<CreateAppointment />} />
      </Routes>
    </>
  );
}

export default App;
