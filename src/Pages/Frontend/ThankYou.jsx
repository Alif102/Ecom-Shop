import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { IoBagHandleOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
// import Footer from "../Footer";
import { Link } from "react-router-dom";
import Header from "../../Component/Frontend/Header/Header";

const ThankYou = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/landing-page"); // Link to the LandingPage
  };

  const handleGoBack = () => {
    navigate("/single-product"); // Link to the SingleProduct page
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white  rounded-lg p-8  w-full text-center">
          {/* Icon */}
          <div className="mb-4 md:mb-8 text-5xl flex justify-center text-[#C43882]">
            <IoBagHandleOutline />
          </div>
          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-8">
            ধন্যবাদ! আপনার অর্ডারটি সম্পন্ন হয়েছে।
          </h1>
          {/* Confirmation Text */}
          <p className="text-gray-600 mb-8">
            আমাদের একজন কাস্টমার কেয়ার এক্সিকিউটিভ খুব শীঘ্রই আপনার সাথে যোগাযোগ
            করে <br /> অর্ডারটি কনফার্ম করে নিবে। <span className="text-2xl font-bold text-[#C43882]">Azmain Fashion</span> এ অর্ডার করার
            জন্য অসংখ্য ধন্যবাদ
          </p>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <Link
              to="/"
              className="px-6 py-2 rounded-full bg-[#C43882] text-white font-medium inline-block text-center"
            >
              Continue Shopping
            </Link>
            <button
              onClick={() => navigate(-2)}
              className="px-6 py-2 rounded-full bg-gray-500 text-white font-medium hover:bg-gray-600 transition"
            >
              Go Back
            </button>
          </div>

          {/* Footer */}
          <footer className="mt-8">
            {/* <p className="text-gray-700 mb-4">Let's Be Friends!</p> */}
            <div className="flex justify-center gap-4">
              <a href="#" className="hover:scale-110 transition">
                <FaWhatsapp className="w-8 text-4xl text-[#25D366]" />
              </a>
              <a href="#" className="hover:scale-110 transition">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                  alt="Twitter"
                  className="w-8"
                />
              </a>
              <a href="#" className="hover:scale-110 transition">
                <FaInstagram className="w-8 text-4xl text-pink-500" />
              </a>
            </div>
          </footer>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ThankYou;