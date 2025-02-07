import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faHeartbeat,
  faUserMd,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import Test from "../components/Test";
import HeroSection from "../components/HeroSection";
import About from "../components/About";
import Therapies from "./Therapies";
import TherapiesSlider from "../components/TherapiesSlider";
import UsesNaturopathy from "../components/UsesNaturopathy";
import Facts from "../components/Facts";
import Info from "../components/Info";
import BookComponent from "../components/BookComponent";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <About />
      <hr />
      <TherapiesSlider />
      <hr className="my-8" />
      <UsesNaturopathy />
      <BookComponent />
      <Info />
    </div>
  );
};

export default Home;
