import React, { useEffect, useContext } from "react";
import { IoClose } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { CartContext } from "../CartContext";


const AddToCart = ({ onClose }) => {
  const { cart, removeFromCart, updateCartItem, handleDecreaseQuantity ,handleIncreaseQuantity  } = useContext(CartContext);

  console.log(cart);
  useEffect(() => {
    // Disable scrolling when cart opens
    document.body.classList.add("overflow-hidden");

    // Enable scrolling when cart closes
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);


  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div
        className="relative flex ml-auto flex-col md:w-96 h-screen bg-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 flex absolute w-full justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-[#C43882]"
          >
            <IoClose className="text-[25px]" />
          </button>
        </div>

        {/* Scrollable Product List */}
        <div className="flex-1 p-4 mt-16 overflow-y-auto">
          <ul className="space-y-4">
            {cart.map((product) => (
              <li key={product.id} className="flex items-center space-x-4">
                <img
                  src={`https://admin.ezicalc.com/public/storage/product/${product.image}`}
                  alt={product.name || "Product"}
                  className="w-16 h-20 rounded-sm shadow-sm"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{product.name}</p>
                  <p className="text-gray-600">{product.variation_values || ""}</p>
                  <p className="text-[#C43882]">৳{product.unitPrice}</p>

                  {/* <p className="text-[#C43882]">৳{product.price}</p> */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center mt-1 border border-gray-300 rounded-md w-fit">
                      <button
                        onClick={() => handleDecreaseQuantity(product.id)}
                        className="w-7 h-7 flex items-center justify-center border-r text-gray-800 rounded-sm hover:bg-gray-100 transition text-sm"
                      >
                        -
                      </button>
                      <span className="px-3 text-gray-700">{product.quantity}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(product.id)}
                        className="w-7 h-7 flex items-center justify-center border-l text-gray-800 rounded-sm hover:bg-gray-100 transition text-sm"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeFromCart(product.id)}
                    >
                      <RiDeleteBin6Line className="text-[20px]" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="border-t p-4 sticky bottom-0 bg-white shadow-lg">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Subtotal:</p>
            <p className="text-lg font-semibold">
              ৳ {cart.reduce((acc, product) => acc + product.price, 0)}
            </p>
          </div>
          <Link
            onClick={onClose}
            to="/checkout"
            className="mt-4 text-center py-3 md:py-2 bg-[#C43882] text-white flex gap-3 justify-center items-center shadow-lg text-[18px] font-normal"
          >
            এগিয়ে যান
            <span className="animate-icon ml-2">
              <MdKeyboardDoubleArrowRight size={26} color="white" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;