import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AppointmentBooking = () => {
  return (
    <div className="relative flex flex-col justify-center items-center h-screen text-center p-6 overflow-hidden bg-contain about-container">
      {/* Animated Background Elements */}

      {/* Main Content */}
      <motion.h2
        className="text-3xl font-bold mb-4 relative text-zinc-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Experience the Best Naturopathy Therapies
      </motion.h2>
      <p className="text-xl font-medium text-green-900">Want to join today?</p>
      <motion.p
        className="text-lg text-gray-600 mb-6 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Restore your mind and body naturally. Book your appointment today and
        start your journey to wellness.
      </motion.p>
      <Link to="/appointments/create">
        <motion.button
          className="gotoBtn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Book an Appointment
        </motion.button>
      </Link>
    </div>
  );
};

export default AppointmentBooking;
