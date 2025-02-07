import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAppointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    therapies: "",
    reason: "",
    date: "",
    time: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, age, therapies, description, date } = formData;

    if (!name || !email || !phone || !age || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    const formattedData = {
      ...formData,
      phone, // Keeping it as a string to avoid number truncation
      age: Number(age) || "",
      therapies: therapies ? therapies.split(",").map((t) => t.trim()) : [],
    };

    axios
      .post("http://localhost:3000/api/appointments/book", formattedData)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="m-2 flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Book Appointment
        </h2>

        {/* Name */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>

        {/* Age */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>

        {/* Therapies */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Therapies Needed(comma-separated)
          </label>
          <input
            type="text"
            name="therapies"
            value={formData.therapies}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Description(optional)
          </label>
          <textarea
            name="reason"
            value={formData.description}
            onChange={handleChange}
            className="max-h-32 mt-1 p-2 w-full border rounded"
          />
        </div>

        {/* Date */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-center">
          <button type="submit" className="gotoBtn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAppointment;
