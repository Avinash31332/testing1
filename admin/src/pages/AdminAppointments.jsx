import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Axios from "../utils/Axios";

function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 570);

  // Handle screen resizing
  const handleResize = useCallback(() => {
    setIsSmallScreen(window.innerWidth <= 570);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await Axios.get("/api/admin/appointments", {
          withCredentials: true,
        });
        setAppointments(res.data.data || []);
      } catch (err) {
        console.error("Error fetching appointments:", err.message);
      }
    };
    fetchAppointments();
  }, []);

  // Filtered Appointments
  const filteredAppointments =
    filter === "All"
      ? appointments
      : appointments.filter((a) => a.status === filter);

  // Status Colors
  const statusColors = {
    Accepted: "bg-green-300",
    Rescheduled: "bg-orange-300",
    Pending: "bg-yellow-200",
    Cancelled: "bg-red-300",
  };

  return (
    <div className="p-4">
      <p
        className={`${
          isSmallScreen ? "mt-32" : "mt-16"
        } p-4 text-xl font-medium text-zinc-700`}
      >
        Appointments
      </p>

      {/* Filter Dropdown and Status Indicators */}
      <div className="fixed left-0 top-[70px] w-full flex flex-wrap gap-4 items-center bg-gray-100 p-4 rounded-md">
        <select
          className="p-2 px-4 outline-0 rounded-lg border"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {["All", "Pending", "Rescheduled", "Accepted", "Cancelled"].map(
            (option) => (
              <option key={option} value={option}>
                {option}
              </option>
            )
          )}
        </select>

        <div className="flex flex-wrap gap-2">
          {Object.entries(statusColors).map(([status, color]) => (
            <span
              key={status}
              className={`rounded border p-2 ${color} text-sm`}
            >
              {status}
            </span>
          ))}
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr className="bg-green-700 text-gray-200">
              <th className="border border-slate-600 rounded-md p-2">No</th>
              <th className="border border-slate-600 rounded-md p-2">Name</th>
              {!isSmallScreen && (
                <>
                  <th className="border border-slate-600 rounded-md p-2">
                    Status
                  </th>
                  <th className="border border-slate-600 rounded-md p-2">
                    Phone
                  </th>
                </>
              )}
              <th className="border border-slate-600 rounded-md p-2">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment, index) => (
              <tr
                key={appointment._id}
                className={`h-8 ${statusColors[appointment.status] || ""}`}
              >
                <td className="border border-slate-700 rounded-md text-center p-2">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center p-2">
                  {appointment.name}
                </td>
                {!isSmallScreen && (
                  <>
                    <td className="border border-slate-700 rounded-md text-center p-2">
                      {appointment.status}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center p-2">
                      {appointment.phone}
                    </td>
                  </>
                )}
                <td className="border bg-gray-200 hover:bg-gray-300 border-slate-700 rounded-md text-center p-2">
                  <Link
                    to={`/admin/appointments-operations/${appointment._id}`}
                  >
                    <FontAwesomeIcon
                      className="text-zinc-600"
                      icon={faEllipsis}
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminAppointments;
