import React, { useEffect, useState } from "react";
import { FaSearch, FaBars, FaTimes,  FaInfoCircle, FaList, FaPlaneArrival } from "react-icons/fa";
import { FaAccusoft, FaCartPlus } from "react-icons/fa6";
import { GiWomanElfFace } from "react-icons/gi";
import azmain from '../../../../assets/azmain.png'
import SwiperBanner from "../../SwiperBanner/SwiperBanner";
import { HiOutlineShoppingCart } from "react-icons/hi";


const Banner = () => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
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
       <div className="relative">
       <SwiperBanner/>
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
       
        {/* Navbar */}
        <div>
          <nav className="navbar absolute top-0 left-0 w-ful bg-transparent z-50">
            <div className="container mx-auto flex items-center justify-between">
              {/* Logo */}
              <div className=" w-20 h-20  md:w-32 ">
              <img src={azmain}  alt="logo" srcSet="" />
              </div>

              {/* Links (hidden on small devices) */}
              <div className="hidden md:flex space-x-4">
                <a href="#Women" className="text-[#C43882] font-sembold text-[20px] hover:text-gray-700">
                  Women
                </a>
                <a href="#Man" className="text-[#C43882] font-sembold text-[20px] hover:text-gray-700">
                  Man
                </a>
                <a href="#content" className="text-[#C43882] font-sembold text-[20px] hover:text-gray-700">
                  Kids
                </a>
                <a href="#Accessories" className="text-[#C43882] font-sembold text-[20px] hover:text-gray-700">
                Accessories
                </a>
                <a href="#New" className="text-[#C43882] font-sembold text-[20px] hover:text-gray-700">
                New Arrival
                </a>
              </div>

              {/* Right icons */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="input bg-transparent border w-32 md:w-full  border-white input-xs  md:input-sm rounded-full text-[#C43882] font-sembold text-[20px] focus:border-white focus:border-2 focus:ring-0"
                  />
                  <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#C43882] font-sembold text-[20px]" />
                </div>
                {/* <div className="relative group cursor-pointer">
  <HiOutlineShoppingCart  className="text-gray-600 font-sembold text-[20px]  text-lg" size={22} />
  <span className="badge badge-sm bg-red-200 text-[#C43882] font-sembold text-[20px] absolute -top-3 -right-4">
    3
  </span>
  <div className="absolute left-1/2 -translate-x-1/2  w-72 mt-2 hidden text-center group-hover:block bg-white text-gray-800 text-sm p-6 rounded shadow-lg">
  <HiOutlineShoppingCart  className=" mx-auto text-lg my-3" size={32} />   Your Whishlist is empty
  </div>
</div> */}



                {/* Menu icon (visible on small devices) */}
                <button
                  className="text-[#C43882] font-sembold text-[20px] md:hidden"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  <FaBars className="text-xl" size={22} />
                </button>
              </div>
            </div>
          </nav>
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
                  <a
                    href="#Women"
                    className="text-gray-800 text-lg hover:text-blue-500"
                  >
                    Women
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <FaInfoCircle className="text-blue-500" />
                  <a
                    href="#Man"
                    className="text-gray-800 text-lg hover:text-blue-500"
                  >
                    Man
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <FaList className="text-blue-500" />
                  <a
                    href="#content"
                    className="text-gray-800 text-lg hover:text-blue-500"
                  >
                    Kids
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <FaAccusoft className="text-blue-500" />
                  <a
                    href="#Accessories"
                    className="text-gray-800 text-lg hover:text-blue-500"
                  >
                    Accessories
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <FaPlaneArrival className="text-blue-500" />
                  <a
                    href="#New"
                    className="text-gray-800 text-lg hover:text-blue-500"
                  >
                    New Arrival
                  </a>
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
