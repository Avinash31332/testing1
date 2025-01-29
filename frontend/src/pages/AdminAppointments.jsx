import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

function AdminAppointments() {
  const [appointments, setAppointments] = useState([]); // Initialize as an array

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/admin/appointments")
      .then((res) => {
        setAppointments(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr className="bg-green-700 text-gray-200">
            <th className="border border-slate-600 rounded-md">No</th>
            <th className="border border-slate-600 rounded-md">Name</th>
            <th className="border border-slate-600 rounded-md max-md:hidden">
              Age
            </th>
            <th className="border border-slate-600 rounded-md max-md:hidden">
              Phone
            </th>
            <th className="border border-slate-600 rounded-md max-md:hidden">
              Phone
            </th>
            <th className="border border-slate-600 rounded-md">Operations</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={appointment._id} className="h-8 bg-green-100">
              <td className="border border-slate-700 rounded-md text-center">
                {index + 1}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {appointment.name}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {appointment.age}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {appointment.phone}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {appointment.phone}
              </td>
              <td className="border bg-gray-200 hover:bg-gray-300 border-slate-700 rounded-md text-center">
                <Link to={`/admin/appointments-operations/${appointment._id}`}>
                  <div className="flex justify-center gap-x-4">
                    <FontAwesomeIcon
                      className="text-zinc-600"
                      icon={faEllipsis}
                    />
                  </div>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminAppointments;
