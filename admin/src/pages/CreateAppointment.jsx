import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import Loading from "../components/Loading";

const CreateAppointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    therapies: "",
    description: "",
    date: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, age, therapies, description, date } = formData;

    if (!name || !email || !phone || !age || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    const formattedData = {
      ...formData,
      phone: phone.trim(),
      age: Number(age),
      therapies: therapies ? therapies.split(",").map((t) => t.trim()) : [],
    };

    setLoading(true);
    try {
      await Axios.post("/api/appointments/book", formattedData);
      navigate("/");
    } catch (err) {
      console.log("Error booking appointment:", err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="mt-8 flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Book Appointment
        </h2>

        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone", name: "phone", type: "tel" },
          { label: "Age", name: "age", type: "number" },
          {
            label: "Therapies Needed (comma-separated)",
            name: "therapies",
            type: "text",
          },
          {
            label: "Description (optional)",
            name: "description",
            type: "textarea",
          },
          { label: "Date", name: "date", type: "date" },
        ].map(({ label, name, type }) => (
          <div className="mb-3" key={name}>
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            {type === "textarea" ? (
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="max-h-32 mt-1 p-2 w-full border rounded"
              />
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                required={name !== "description"}
              />
            )}
          </div>
        ))}

        <div className="w-full flex justify-center">
          <button type="submit" className="gotoBtn" disabled={loading}>
            {loading ? "Booking..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAppointment;
