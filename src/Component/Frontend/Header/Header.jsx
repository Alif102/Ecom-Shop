import { useState, useEffect, useContext } from "react";
import { RiMenu2Line } from "react-icons/ri";



import {
  FiSearch,
  FiUser,
  FiX,
  FiHome,
  FiShoppingCart,
  FiList,
  FiMenu,
} from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";
import AddToCart from "./AddToCArt";
import azmain from '../../../assets/azmain.png'
import { FaSearch } from "react-icons/fa";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const { cartCount } = useContext(CartContext);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight); // Change header when leaving the hero section
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
        setShowHeader(true);
      } else {
        setIsSticky(false);
        setShowHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // discount latest
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert("Coupon code copied: " + code);
  };

  // const coupons = [
  //   {
  //     icon: <TbRosetteDiscount size={24} color="#C43882" />,
  //     name: "10% Off Orders Over 50৳",
  //     code: "SAVE10",
  //   },
  //   {
  //     icon: <TbRosetteDiscount size={24} color="#C43882" />,
  //     name: "Free Shipping on 100৳ + Orders",
  //     code: "FREESHIP",
  //   },
  //   {
  //     icon: <TbRosetteDiscount size={24} color="#C43882" />,
  //     name: "15% Off for New Users",
  //     code: "WELCOME15",
  //   },
  // ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Sample cart items
  const cartItems = [];

  const [showCouponInput, setShowCouponInput] = useState(false);

  const toggleCouponInput = () => {
    setShowCouponInput(!showCouponInput);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleViewCart = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseCart = () => {
    setIsModalOpen(false); // Close the modal
  };

  // const [products, setProducts] = useState([]); // State to store the products

  // // Fetch products from localStorage when the component mounts
  // useEffect(() => {
  //   const storedProducts = localStorage.getItem("cart");
  //   if (storedProducts) {
  //     const parsedProducts = JSON.parse(storedProducts);
  //     const updatedProducts = parsedProducts.map((product) => {
  //       if (!product.unitPrice) {
  //         product.unitPrice = product.price / product.quantity; // Calculate unit price if not available
  //       }
  //       return product;
  //     });
  //     setProducts(updatedProducts); // Set state with parsed and updated products
  //   }
  // }, []);

  // // Calculate total quantity in the cart
  // const cartCount = products.reduce(
  //   (total, product) => total + product.quantity,
  //   0
  // );

  return (
    <div>
      <header
        className={` transition-all duration-700 bg-white ease-in-out ${isSticky
          ? "w-full backdrop-blur-md fixed top-0 left-0 z-20 shadow-md"
          : "bg-transparent"
          } ${showHeader ? "top-0" : "-top-20"}`}
      >
        <div className="py-2 px-4 md:px-10 mx-auto flex sm:items-center justify-between border-b">
          {/* Left Section: Menu Icon and Search Button */}
          <div className="sm:flex items-center space-x-4 hidden">
            <button
              className="text-gray-600 hover:text-[#C43882] gap-2 sm:flex"
              onClick={toggleMenu}
            >
              <RiMenu2Line size={24} />
              {/* <span className="hidden lg:block">Menu</span> */}
            </button>

            {/* <button
                  className="text-gray-600 hover:text-blue-500 lg:hidden "
                  onClick={toggleSearch}
                >
                  <FiSearch size={24} />
                </button> */}

            {/* Search Bar Toggle */}
            {/* <div className="relative hidden lg:flex items-center">
                  {isSearchOpen ? (
                    <div
                      className={`flex items-center relative overflow-hidden transition-all duration-300 ease-in-out`}
                      style={{ maxWidth: isSearchOpen ? "320px" : "0px" }}
                    >
                      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-12 py-2 rounded-full border border-gray-300 focus:border-blue-500 w-full transition-opacity duration-300"
                        autoFocus
                        style={{ opacity: isSearchOpen ? 1 : 0 }}
                      />
                      <button
                        onClick={toggleSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        <FiX size={24} />
                      </button>
                    </div>
                  ) : (
                    <button onClick={toggleSearch} className="text-gray-600">
                      <FiSearch size={24} />
                    </button>
                  )}
                </div> */}
          </div>

          {/* Middle Section: Company Logo */}
          <div className="sm:flex-1 sm:items-center sm:justify-between sm:text-center">
            <Link to="/" className="">
              <div className="sm:w-80 h-10 md:w-[5%]  md:h-[2%] mx-auto overflow-hidden">
                <img
                  src={azmain}
                  alt="MyCompany Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Right Section: Profile and Cart Icons */}
          <div className="flex justify-around items-center space-x-6">
            <Link to="/collection">
              <FiSearch className="text-gray-600 hover:text-[#C43882]" size={26} />
            </Link>
            <Link
              className="text-gray-600 hover:text-[#C43882]"
            >
              <FiUser size={24} />
            </Link>
            <button
              className="relative text-gray-600 hover:text-[#C43882] z-50"
              onClick={handleViewCart}
            >
              <BsCart3 size={24} />
              {/* Badge for item count */}
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount ?? 0}                  </span>
            </button>

            {/* AddToCart Component - Rendered conditionally */}
          </div>
        </div>

        {/* Side Menu */}
        <div
          className={`fixed h-screen top-0 left-0 w-64 bg-white shadow-lg p-6 text-white z-50 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          onClick={closeMenu}
        >
          <div
            className="w-full h-full flex flex-col"
            onClick={(e) => e.stopPropagation()} // Prevents menu close on click inside
          >
            <button
              onClick={closeMenu}
              className="absolute top-4 right-4 text-black hover:text-[#C43882]"
            >
              <FiX size={24} />
            </button>

            {/* Profile Icon / Placeholder */}
            <div className="flex flex-col items-center mt-8 mb-6">
              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mb-2">
                <FiUser size={32} className="text-[#C43882]" />
              </div>
              <span className="text-lg font-semibold">Hello, User!</span>
            </div>

            <ul className="space-y-6 mt-8">
              <li>
                <Link to="/" className="flex items-center text-lg font-se text-black mibold hover:bg-[#C43882] rounded-lg p-3 transition-colors group">
                  <FiHome size={20} className="mr-3  group-hover:text-white" />
                  <span className="group-hover:text-white">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/collection/" className="flex items-center text-lg font-se text-black mibold hover:bg-[#C43882] rounded-lg p-3 transition-colors group">
                  <FiShoppingCart
                    size={20}
                    className="mr-3  group-hover:text-white"
                  />
                  <span className="group-hover:text-white">Shop</span>
                </Link>
              </li>
              <li className="flex items-center text-lg text-black  font-semibold hover:bg-[#C43882] rounded-lg p-3 transition-colors group">
                <FiList size={20} className="mr-3  group-hover:text-white" />
                <span className="group-hover:text-white">Orders</span>
              </li>
              <li className="flex items-center text-lg text-black  font-semibold hover:bg-[#C43882] rounded-lg p-3 transition-colors group">
                <FiUser size={20} className="mr-3  group-hover:text-white" />
                <span className="group-hover:text-white">Profile</span>
              </li>
              <li className="flex items-center text-lg text-black font-semibold hover:bg-[#C43882]  rounded-lg p-3 transition-colors group">
                <FiMenu size={20} className="mr-3 group-hover:text-white" />
                <span className="group-hover:text-white">More</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Background overlay when menu is open */}
        {isMenuOpen && (
          <div
            onClick={closeMenu}
            className="fixed h-screen inset-0 bg-black opacity-50 z-40"
          ></div>
        )}

        {/* Background overlay when menu is open */}
        {isMenuOpen && (
          <div
            onClick={closeMenu}
            className="fixed inset-0 bg-black opacity-50 z-40"
          ></div>
        )}
        {isModalOpen && <AddToCart onClose={handleCloseCart} />}

        {/* Cart Component will come here*/}
      </header>
    </div>
  );
};

export default Header;

