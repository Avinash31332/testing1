import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// social media icons -> fontawesome
import {
  faFacebook,
  faWhatsapp,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Contact() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 900);

  useEffect(() => {
    function handleScreen() {
      setIsSmallScreen(window.innerWidth <= 900);
    }
    window.addEventListener("resize", handleScreen);
    return () => window.removeEventListener("resize", handleScreen);
  }, []);

  return (
    <div>
      <p></p>
      <div
        className={`${
          isSmallScreen ? "h-[300px]" : "h-[400px]"
        } flex flex-col items-center justify-center p-4 py-8 w-full bg-gray-600 text-gray-200`}
      >
        {/* Information Section */}
        <div className="flex w-full h-[80%]">
          <section
            className={`${
              isSmallScreen ? "text-sm w-1/2" : "text-lg w-1/3"
            } flex flex-col items-center h-full justify-evenly`}
          >
            <p
              className={`${
                isSmallScreen ? "text-base" : "text-xl"
              } uppercase font-medium`}
            >
              Information
            </p>
            <hr className="border-t-2 border-gray-400 w-[90%]" />
            <Link
              to="/privacy-policy"
              className="hover:bg-gray-400 w-[90%] flex justify-center items-center p-4 rounded-lg"
            >
              Privacy & Policies
            </Link>
            <Link
              to="/faq"
              className="hover:bg-gray-400 w-[90%] flex justify-center items-center p-4 rounded-lg"
            >
              FAQ
            </Link>
            <Link
              to="/contact-us"
              className="hover:bg-gray-400 w-[90%] flex justify-center items-center p-4 rounded-lg"
            >
              Contact Us
            </Link>
          </section>

          {/* Social Media Section */}
          <section
            className={`${
              isSmallScreen ? "text-sm w-1/2" : "text-lg w-1/3"
            } flex flex-col items-center  h-full justify-evenly`}
          >
            <p
              className={`${
                isSmallScreen ? "text-base" : "text-xl"
              } uppercase font-medium`}
            >
              Social Media
            </p>
            <hr className="border-t-2 border-gray-400 w-[90%]" />
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-green-600 w-[90%] flex justify-center items-center p-4 rounded-lg"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="mx-2 text-xl" />
              WhatsApp
            </a>
            <a
              href="https://instagram.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="insatgram w-[90%] flex justify-center items-center p-4 rounded-lg"
            >
              <FontAwesomeIcon icon={faInstagram} className="mx-2 text-xl" />
              Instagram
            </a>
            <a
              href="https://facebook.com/your-page"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-[#119BB6] w-[90%] flex justify-center items-center p-4 rounded-lg"
            >
              <FontAwesomeIcon icon={faFacebook} className="mx-2 text-xl" />
              Facebook
            </a>
          </section>
          {isSmallScreen ? (
            ""
          ) : (
            <section className="border-2 border-gray-500 w-1/3 h-[50%] flex items-center justify-center rounded m-2">
              Our Email address : email address
            </section>
          )}
        </div>

        {isSmallScreen ? (
          <section className="bg-gray-500 w-full h-full flex items-center justify-center rounded m-2">
            Our Email address : email address
          </section>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Contact;
