import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Therapies from "./pages/Therapies";
import Navbar from "./components/Navbar";
import UsesNaturopathy from "./components/UsesNaturopathy";
import CreateAppointment from "./pages/CreateAppointment";
import Policies from "./pages/Policies";
import Faq from "./pages/Faq";
import ContactUs from "./components/ContactUs";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/therapies" element={<Therapies />} />
        <Route path="/uses" element={<UsesNaturopathy />} />
        <Route path="/appointments/create" element={<CreateAppointment />} />
        <Route path="/privacy-policy" element={<Policies />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </>
  );
}

export default App;
