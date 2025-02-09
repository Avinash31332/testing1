import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import Loading from "../components/Loading";
import { motion } from "framer-motion";

function AppointmentOperations() {
  const [appointment, setAppointment] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailType, setEmailType] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch appointment details
  useEffect(() => {
    const fetchAppointment = async () => {
      setLoading(true);
      try {
        const res = await Axios.get(`/api/admin/appointments/${id}`, {
          withCredentials: true,
        });
        setAppointment(res.data);
      } catch (err) {
        console.error("Error fetching appointment:", err.message);
        setError("Failed to fetch appointment details.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
  }, [id]);

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(
        `/api/admin/appointments/${id}`,
        { ...appointment, emailType },
        { withCredentials: true }
      );
      navigate("/admin/appointments");
    } catch (err) {
      console.error("Error updating appointment:", err.message);
    }
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <form onSubmit={handleUpdate}>
      <motion.div
        className="text-zinc-500 gap-[10px] flex flex-col m-2 p-4 border-2 border-zinc-200 rounded-xl w-[97%]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* User Details */}
        <div>
          <p className="text-zinc-600 font-medium text-lg">User Details</p>
          <p>
            <span className="font-medium">Name:</span> {appointment.name}
          </p>
          <p>
            <span className="font-medium">Age:</span> {appointment.age}
          </p>
        </div>
        <hr className="text-zinc-900" />

        {/* Contact Details */}
        <div>
          <p className="text-zinc-600 font-medium text-lg">Contact Details</p>
          <p>
            <span className="font-medium">Phone:</span> {appointment.phone}
          </p>
          <p>
            <span className="font-medium">Email:</span> {appointment.email}
          </p>
        </div>
        <hr />

        {/* Requested Date */}
        <div>
          <p className="text-zinc-600 font-medium text-lg">Requested Date</p>
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
        <hr />

        {/* Reason and Preferences */}
        <div>
          <p className="text-zinc-600 font-medium text-lg">
            Reason and Preferences
          </p>
          <p>
            <span className="font-medium">Needed Therapies:</span>{" "}
            {appointment.therapies?.join(", ")}
          </p>
          <p>
            <span className="font-medium">Description:</span>{" "}
            {appointment.reason}
          </p>
        </div>

        {/* Status Selection */}
        <div>
          <p>Status:</p>
          <select
            value={appointment.status}
            className="m-2 p-4 bg-gray-100 border-2 border-gray-300 rounded-xl"
            onChange={(e) =>
              setAppointment({ ...appointment, status: e.target.value })
            }
          >
            {["Pending", "Rescheduled", "Accepted", "Cancelled"].map(
              (status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              )
            )}
          </select>
        </div>
      </motion.div>

      {/* Email Selection */}
      <hr />
      <div className="p-4">
        <p className="font-medium text-lg text-gray-600 m-2">Send Email</p>
        {["Yes", "No"].map((option) => (
          <div key={option} className="flex gap-[10px] text-lg">
            <input
              type="radio"
              name="emailType"
              value={option}
              checked={emailType === option}
              onChange={(e) => setEmailType(e.target.value)}
            />
            <label className="text-gray-600">{option}</label>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="p-4 flex items-center justify-center w-full h-32">
        <motion.button
          className="text-xl bg-green-900 text-white p-4 px-8 rounded-xl border-2 border-green-900 hover:text-green-900 hover:bg-transparent"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </div>
    </form>
  );
}

export default AppointmentOperations;
