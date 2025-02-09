import React, { useEffect, useState, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Axios from "../utils/Axios";
import Therapy from "./Therapy";

const TherapiesSlider = () => {
  // Screen size state
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 650);

  // Therapy data state
  const [therapies, setTherapies] = useState([]);
  const [visibleDots, setVisibleDots] = useState(5);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Handle screen resize
  const handleResize = useCallback(() => {
    setIsSmallScreen(window.innerWidth <= 650);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Fetch therapy data
  useEffect(() => {
    const fetchTherapies = async () => {
      try {
        const res = await Axios.get("/api/therapies");
        setTherapies(res.data.data || []);
      } catch (err) {
        console.error("Error fetching therapies:", err.message);
      }
    };
    fetchTherapies();
  }, []);

  // Update visible dots dynamically
  useEffect(() => {
    if (
      currentSlide >= visibleDots - 1 &&
      currentSlide + 1 >= therapies.length
    ) {
      setVisibleDots((prev) => prev + 5);
    }
  }, [currentSlide, visibleDots, therapies.length]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dotsClass: "slick-dots custom-dots",
    beforeChange: (_, next) => setCurrentSlide(next),
  };

  return (
    <div className="p-4">
      <div className="flex items-center w-[95%] justify-between">
        <h2
          className={`text-zinc-800 font-bold mb-4 ${
            isSmallScreen ? "mx-2 text-xl" : "mx-16 text-3xl"
          }`}
        >
          Our Therapies
        </h2>
        <Link to="/therapies">
          <button className="gotoBtn">Show All</button>
        </Link>
      </div>
      <Slider {...settings} className="h-[500px]">
        {therapies.map((therapy) => (
          <Therapy key={therapy._id} therapy={therapy} />
        ))}
      </Slider>
    </div>
  );
};

export default TherapiesSlider;
