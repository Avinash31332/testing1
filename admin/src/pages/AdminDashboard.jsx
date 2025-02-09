import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import AdminAppointments from "./AdminAppointments";

function AdminDashboard() {
  return (
    <div className="bg-gray-300 w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col items-center p-4 px-16 bg-zinc-100 rounded-lg">
        <p className="text-2xl font-medium text-gray-700">Admin Dashboard</p>
        <div className={`m-4 flex flex-col items-center flex-wrap`}>
          <Link to={"/admin/appointments"}>
            <button className="m-2 bg-gray-800 p-4 rounded-lg text-gray-100">
              Appointments
            </button>
          </Link>
          <Link to={"/admin/edit"}>
            <button className="m-2 bg-gray-800 p-4 rounded-lg text-gray-100">
              Edit Homepage
            </button>
          </Link>
          <Link to={"/admin/therapies/create"}>
            <button className="m-2 bg-gray-800 p-4 rounded-lg text-gray-100">
              Add Therapy
            </button>
          </Link>
          <Link to={"/admin/contact/edit"}>
            <button className="m-2 bg-gray-800 p-4 rounded-lg text-gray-100">
              Edit Contact details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
