import React, { useEffect, useState } from "react";
import { FaSearch, FaBars, FaTimes, FaInfoCircle, FaList, FaPlaneArrival } from "react-icons/fa";
import { FaAccusoft, FaCartPlus } from "react-icons/fa6";
import { GiWomanElfFace } from "react-icons/gi";
import azmain from '../../../../assets/azmain.png'
import SwiperBanner from "../../SwiperBanner/SwiperBanner";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import Header from "../../Header/Header";


const Banner = () => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const images = [
    "../../../../../src/assets/ba4.png",
    "../../../../../src/assets/ba2.jpg",
    "../../../../../src/assets/ba3.jpg",
    "../../../../../src/assets/ba1.jpg",
  ];

  // Change the background image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);
  return (
    <div>
      <div className="relative">

        {/* Navbar */}
        <div>
          <Header />
        </div>
        
        <div className="relative">
          <SwiperBanner />
          {/* <div className=" flex justify-around w-full absolute  md:-bottom-20 gap-2">
          <div>
            <img src="../../../../../src/assets/ca1.jpg" alt="picccc"  />
          </div>
          <div>
            <img src="../../../../../src/assets/ca2.jpg" alt="picccc"  />
          </div>
          <div>
            <img src="../../../../../src/assets/ca3.jpg" alt="picccc"  />
          </div>
          <div>
            <img src="../../../../../src/assets/ca4.jpg" alt="picccc"  />
          </div>
        </div> */}

        </div>




        {/* Drawer */}
        {isDrawerOpen && (
          <div className="fixed inset-0  z-50">
            <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg flex flex-col">
              {/* Close icon */}
              <button
                className="text-gray-600 self-end m-4"
                onClick={() => setIsDrawerOpen(false)}
              >
                <FaTimes className="text-xl" />
              </button>

              {/* Links */}
              <ul className=" flex flex-col justify-center items-center space-y-6">
                <li className="flex items-center space-x-2">
                  <GiWomanElfFace className="text-blue-500" />
                  <Link to="/collection/man" className="text-[#C43882] font-sembold text-[20px] hover:text-gray-700">
                    Women
                  </Link>
                </li>
                <li className="flex items-center space-x-2">
                  <FaInfoCircle className="text-blue-500" />
                  <Link to="/collection/women" className="text-[#C43882] font-sembold text-[20px] hover:text-gray-700">
                    Man
                  </Link>
                </li>
                <li className="flex items-center space-x-2">
                  <FaList className="text-blue-500" />
                  <Link to="/collection/kids" className="text-[#C43882] font-sembold text-[20px] hover:text-gray-700">
                    Kids
                  </Link>
                </li>
                <li className="flex items-center space-x-2">
                  <FaAccusoft className="text-blue-500" />
                  <Link to="/collection/accessories" className="text-[#C43882] font-sembold text-[20px] hover:text-gray-700">
                    Accessories
                  </Link>
                </li>
                <li className="flex items-center space-x-2">
                  <FaPlaneArrival className="text-blue-500" />
                  <Link to="/collection" className="text-[#C43882] font-sembold text-[20px] hover:text-gray-700">
                    New Arrival
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Banner
