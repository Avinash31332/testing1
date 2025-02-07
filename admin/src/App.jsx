import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Therapies from "./pages/Therapies";
import TherapyOperations from "./pages/TherapyOperations";
import Navbar from "./components/Navbar";
import CreateTherapy from "./pages/CreateTherapy";
import NewTest from "./pages/NewTest";
import EditData from "./pages/editData";
import UsesNaturopathy from "./components/UsesNaturopathy";
import AdminAppointments from "./pages/AdminAppointments";
import AppointmentOperations from "./pages/AppointmentOperations";
import CreateAppointment from "./pages/createAppointment";
import AdminDashboard from "./pages/AdminDashboard";
import Policies from "./pages/Policies";
import Faq from "./pages/Faq";
import ContactUs from "./components/ContactUs";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Admin from "./pages/Admin";
import CreateFaq from "./pages/createFaq";
import EditFaq from "./pages/EditFaq";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/admin/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/therapies/:id" element={<TherapyOperations />} />
          <Route path="/admin/therapies/create" element={<CreateTherapy />} />
          <Route path="/admin/edit" element={<EditData />} />
          <Route path="/admin/appointments" element={<AdminAppointments />} />
          <Route
            path="/admin/appointments-operations/:id"
            element={<AppointmentOperations />}
          />
          <Route path="/admin/faq/create" element={<CreateFaq />} />
          <Route path="/admin/faq/:id" element={<EditFaq />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/therapies" element={<Therapies />} />
        <Route path="/therapies/test" element={<NewTest />} />
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
