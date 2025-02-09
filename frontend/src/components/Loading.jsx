import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaTint,
  FaBrain,
  FaLeaf,
  FaRunning,
  FaAppleAlt,
  FaSun,
} from "react-icons/fa"; // Importing icons

function Loading() {
  const tips = [
    {
      icon: <FaTint />,
      text: "Stay hydrated! Drinking water helps detoxify your body naturally.",
    },
    {
      icon: <FaBrain />,
      text: "A 5-minute meditation can reduce stress and improve focus.",
    },
    {
      icon: <FaLeaf />,
      text: "Fresh air and deep breathing boost oxygen levels and energy.",
    },
    {
      icon: <FaRunning />,
      text: "Regular stretching improves flexibility and relieves tension.",
    },
    {
      icon: <FaAppleAlt />,
      text: "Eat seasonal fruits for better digestion and overall health.",
    },
    {
      icon: <FaSun />,
      text: "Spend at least 15 minutes in sunlight for a natural Vitamin D boost.",
    },
  ];

  const [tipIndex, setTipIndex] = useState(
    Math.floor(Math.random() * tips.length)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 3000); // Change tip every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <motion.div
        key={tipIndex}
        className="flex items-center space-x-2 text-lg font-medium text-green-700 px-6 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {tips[tipIndex].icon}
        <span>{tips[tipIndex].text}</span>
      </motion.div>
    </div>
  );
}

export default Loading;
