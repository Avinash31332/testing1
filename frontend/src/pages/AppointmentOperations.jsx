import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Therapies from "./Therapies";

function AppointmentOperations() {
  const [appointment, setAppointment] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [custom, setCustom] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/api/admin/appointments/${id}`)
      .then((res) => {
        setAppointment(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch appointment details.");
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => timeString?.replace(/['"]+/g, ""); // Removes escaped quotes

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = {
      appointment,
    };
    axios
      .put(`http://localhost:3000/api/admin/appointments/${id}`, updatedData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <form onSubmit={(e) => handleUpdate(e)}>
      <div className="text-zinc-500 gap-[10px] flex flex-col m-2 p-4 border-2 border-zinc-200 rounded-xl w-[97%]">
        {/* User Details */}
        <div>
          <p className="text-zinc-600 font-medium text-lg">User Details</p>
          <div className="flex gap-[10px]">
            <label className="font-medium">Name:</label>
            <p>{appointment.name}</p>
          </div>
          <div className="flex gap-[10px]">
            <label className="font-medium">Age:</label>
            <p>{appointment.age}</p>
          </div>
        </div>
        <hr className="text-zinc-900" />

        {/* Contact Details */}
        <div>
          <p className="text-zinc-600 font-medium text-lg">Contact Details</p>
          <div className="flex gap-[10px]">
            <label className="font-medium">Phone:</label>
            <p>{appointment.phone}</p>
          </div>
          <div className="flex gap-[10px]">
            <label className="font-medium">Email:</label>
            <p>{appointment.email}</p>
          </div>
        </div>
        <hr />

        {/* Requested Timings */}
        <div>
          <p className="text-zinc-600 font-medium text-lg">Requested Timings</p>
          <div className="flex gap-[10px]">
            <label className="font-medium">Date:</label>
            {/* <p>{formatDate(appointment.date)}</p> */}
            <input
              type="date"
              className="rounded-lg border-2 m-4 text-medium p-4"
              value={
                appointment.date
                  ? new Date(appointment.date).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setAppointment({ ...appointment, date: e.target.value })
              }
            />
          </div>
          <div className="flex gap-[10px]">
            <label className="font-medium">Time:</label>
            <p>{formatTime(appointment.time)}</p>
            <input
              type="time"
              className="rounded-lg border-2 m-4 text-medium p-4"
              value={appointment.time || ""}
              onChange={(e) =>
                setAppointment({ ...appointment, time: e.target.value })
              }
            />
          </div>
        </div>
        <hr />

        {/* Reason and Preferences */}
        <div>
          <p className="text-zinc-600 font-medium text-lg">
            Reason and Preferences
          </p>
          <div className="flex gap-[10px]">
            <label className="font-medium">Needed Therapies:</label>
            <div>
              {appointment.therapies &&
                appointment.therapies.map((therapy, index) => (
                  <p key={index}>{therapy}</p>
                ))}
            </div>
          </div>
          <div className="flex gap-[10px]">
            <label className="font-medium">Reason:</label>
            <p>{appointment.reason}</p>
          </div>
        </div>
      </div>
      {/* email */}
      <hr />
      <div className="p-4">
        <p className="text-zinc-600 my-2 font-medium text-lg">
          Email status type
        </p>
        <hr />
        <button className="p-4 m-2 text-lg rounded bg-green-400 py-2 px-8 text-white">
          Accept
        </button>
        <button className="p-4 m-2 text-lg rounded bg-orange-400 py-2 px-8 text-white">
          Re-schedule
        </button>
        <button className="p-4 m-2 text-lg rounded bg-red-400 py-2 px-8 text-white">
          Cancel
        </button>
        <button className="p-4 m-2 text-lg rounded bg-gray-300 py-2 px-8 text-white">
          Custom
        </button>
      </div>
      <div className="p-4 flex items-center justify-center w-full h-32">
        <button className="text-xl bg-green-900 text-white p-4 px-8 rounded-xl border-2 border-green-900 hover:text-green-900 hover:bg-transparent">
          Submit
        </button>
      </div>
    </form>
  );
}

export default AppointmentOperations;
