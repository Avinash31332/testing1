import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import AdminAppointments from "./AdminAppointments";

function AdminDashboard() {
  //   return (
  //     <div className="flex h-screen">
  //       <div className="w-1/4 flex flex-col items-center h-full z-[999] shadow-[5px_0px_10px_rgba(0,0,0,0.1)]">
  //         {/* heading */}
  //         <div className="w-full p-4 text-xl font-bold text-center shadow-[0px_0px_5px_rgba(0,0,0,0.1)]">
  //           Admin Dashboard
  //         </div>
  //         <div className="w-full flex flex-col gap-[2px]">
  //           <Link
  //             to={"/admin/appointments"}
  //             className="w-full p-4 bg-gray-100 text-center border-0 border-zinc-500"
  //           >
  //             Appointments
  //           </Link>
  //           <Link
  //             to={"/edit"}
  //             className="w-full p-4 bg-gray-100 text-center border-0 border-zinc-500"
  //           >
  //             Edit Homepage
  //           </Link>
  //           <Link
  //             to={"/therapies/create"}
  //             className="w-full p-4 bg-gray-100 text-center border-0 border-zinc-500"
  //           >
  //             Add Therapy
  //           </Link>
  //           <Link
  //             to={"/contact"}
  //             className="w-full p-4 bg-gray-100 text-center border-0 border-zinc-500"
  //           >
  //             Edit Contact Details
  //           </Link>
  //         </div>
  //       </div>
  //       <div className="w-full h-full  bg-red-100"></div>
  //     </div>
  //   );
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
