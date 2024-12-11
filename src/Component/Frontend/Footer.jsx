import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Importing social media icons
import azmain from '../../assets/azmain.png'
const Footer = () => {
  return (
    <div>
      <div className="bg-gray-800 text-white py-10 hidden md:block">
        <div className="md:px-20 mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Left Section: Contact Info */}
            {/* Left Section: Contact Info */}
            <div className="flex items-center justify-center md:justify-start">
              <img
                src={azmain}
                alt="Logo"
                className="w-40 md:w-[200px]"
              />
            </div>

            {/* Center Section: Explore More & Client Experience */}
            {/* <div className="grid grid-cols-2 gap-6"> */}
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Explore More</h3>
              <ul>
                <li className="text-sm mb-2"></li>
                <li className="text-sm mb-2">New Arrivals</li>
                <li className="text-sm mb-2">Best Sellers</li>
                <li className="text-sm mb-2">Sale</li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Client Experience</h3>
              <ul>
                <li className="text-sm mb-2">Track Your Order</li>
                <li className="text-sm mb-2">Returns & Exchanges</li>
                <li className="text-sm mb-2">Customer Reviews</li>
                <li className="text-sm mb-2">FAQ</li>
              </ul>
            </div>
            {/* </div> */}

            {/* Right Section: Follow Us */}
            <div className="text-center md:text-right">
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex justify-center md:justify-end space-x-6">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400"
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-500"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-700"
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="text-center mt-10 border-t border-gray-600 pt-4">
            <p className="text-sm text-gray-400">
              &copy; Designed and developed by ExpressITbd team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;