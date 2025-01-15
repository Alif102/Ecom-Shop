import React, { useState, useEffect, useContext } from "react";
import { TbShoppingCartCopy } from "react-icons/tb";
// import CheckOutOrder from "../../../Component/Frontend/CheckOutOrder";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import Header from "../../../Component/Frontend/Header";
import axios from "axios";
import Swal from "sweetalert2";
import { CartContext } from "../../../Component/Frontend/CartContext";
import Header from "../../../Component/Frontend/Header/Header";
// import Footer from "../../../Component/Frontend/Footer";


const CheckOut = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const { cart, totalPrice } = useContext(CartContext);

  const cod_amount = cart.reduce((acc, product) => acc + product.price, 0)
  // console.log(ttt)
  const [errors, setErrors] = useState({});

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [productIds, setProductIds] = useState("");

  const [productQty, setProductQty] = useState("");

  const [loading, setLoading] = useState(false);

  // console.log(name);

  // console.log(phone);
  // console.log(address);
  // console.log(codAmount);

  const [deliveryCharge, setDeliveryCharge] = useState(0);


  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Size Selection state
  const [selectedSize, setSelectedSize] = useState(null);


  // Delivery Charge Logic Start
  const [deliveryFee, setDeliveryFee] = useState(0);

  const handleDeliveryChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "inside-dhaka") {
      setDeliveryFee(80);
    } else if (selectedValue === "outside-dhaka") {
      setDeliveryFee(150);
    } else {
      setDeliveryFee(0);
    }
  };

  // Delivery Charge Logic End

  const total = totalPrice + deliveryFee;


  const closePopup = () => {
    // Hide the popup
    setIsPopupVisible(false);
  };


  const sProductQty = cart
    .filter((product) => product.has_variation === 0)
    .map((product) => product.quantity);

  const vProductQty = cart
    .filter((product) => product.has_variation === 1)
    .map((product) => product.quantity);
  // Create an axios instance for common configuration

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();


    formData.append("client_id", 15);
    formData.append("product_ids", cart.map((product) => product.id));
    // formData.append( "s_product_qty", cart.map((product) => product.quantity));
    // formData.append( "v_product_qty", cart.map((product) => product.quantity));

    formData.append("s_product_qty", sProductQty.length > 0 ? sProductQty : null);
    formData.append(
      "v_product_qty",
      vProductQty.length > 0 ? vProductQty.join(",") : null
    ); formData.append("business_id", cart[0]?.businesses[0]?.id || "");
    formData.append("name", name);
    formData.append("phone", phone);

    formData.append("address", address);
    formData.append("delivery_charge", deliveryFee);
    formData.append("cod_amount", total);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "https://admin.beta.ezicalc.com/api/public/order/create",
        formData,
        {}
      );

      console.log(response);
      if (response.data.status) {

        console.log(response.data.data.id);

        // Reset form fields
        setName("");
        setPhone("");
        setAddress("");
        setErrors({});
        setDeliveryCharge("");

        localStorage.removeItem("cart");

        navigate(`/thankyou/${response.data.data.id}`);
      }

      //  else if (response.data.type === 'invalid') {
      //     toast.error(response.data.message);
      //   }
      else {
        const newErrors = response.data.error || {};

        console.log(newErrors);
        setErrors(newErrors);
        // handleErrors(newErrors);

        // toast.error(Object.keys(response.data.error).map((field) => ` ${response.data.error[field][0]}`));
      }
    } catch (error) {
      console.error(
        "Error saving Order:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />

      <form onSubmit={handleSave}>
        <div className="min-h-screen bg-white p-0 sm:p-5 pb-28">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Right Side: Order Summary */}

            <div className="col-span-1 rounded-md order-1 md:bg-white md:shadow-[0_3px_5px_rgb(0,0,0,0.1)] md:order-2 space-y-3">
              <div className="w-full bg-white rounded p-2  shadow-[0_3px_5px_rgb(0,0,0,0.1)] md:shadow-none ">
                অর্ডার কনফার্ম করতে আপনার নাম, ঠিকানা, মোবাইল নাম্বার লিখে
                অর্ডার কনফার্ম করুন বাটনে ক্লিক করুন
              </div>
              <div className="w-full bg-white rounded px-2 shadow-[0_3px_5px_rgb(0,0,0,0.1)] md:shadow-none">
                <label htmlFor="name" className="block text-sm font-bold ">
                  আপনার নাম
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  id="name"
                  className="w-full p-2 border my-2 rounded-md"
                  placeholder="Enter your name"
                />

                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name[0]}</p>
                )}
              </div>

              <div className="w-full bg-white rounded px-2 shadow-[0_3px_5px_rgb(0,0,0,0.1)] md:shadow-none">
                <label htmlFor="phone" className="block text-sm font-bold ">
                  আপনার ফোন নম্বর
                </label>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  type="number"
                  id="phone"
                  className="w-full p-2 border my-2 rounded-md"
                  placeholder="Enter your phone number"
                  value={phone}
                />

                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone[0]}</p>
                )}
              </div>

              <div className="w-full bg-white rounded px-2 shadow-[0_3px_5px_rgb(0,0,0,0.1)] md:shadow-none">
                <label
                  htmlFor="delivery-address"
                  className="block text-sm font-bold "
                >
                  আপনার ডেলিভারি ঠিকানা দিন
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  id="delivery-address"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your delivery address"
                ></textarea>
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address[0]}</p>
                )}
              </div>

              <div className="w-full bg-white rounded px-2 shadow-[0_3px_5px_rgb(0,0,0,0.1)] md:shadow-none">
                <label
                  htmlFor="delivery-area"
                  className="block text-sm font-bold "
                >
                  আপনার ডেলিভারি এলাকা
                </label>

                <select
                  id="delivery-area"
                  className="w-full p-2 border my-2 rounded-md"
                  onChange={handleDeliveryChange}
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    ডেলিভারি এলাকা নির্বাচন করুন
                  </option>
                  <option value="inside-dhaka">ঢাকার ভিতরে (৮০৳)</option>
                  <option value="outside-dhaka">ঢাকার বাইরে (১৫০৳)</option>
                </select>
              </div>
              <div className="w-full bg-white rounded px-2 shadow-[0_3px_5px_rgb(0,0,0,0.1)] md:shadow-none">
                <label
                  htmlFor="customer-note"
                  className="block text-sm my-2 font-bold "
                >
                  গ্রাহক নোট
                </label>
                <textarea
                  id="customer-note"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your note"
                ></textarea>
              </div>

              <div className="w-full bg-white rounded p-2 shadow-[0_3px_5px_rgb(0,0,0,0.1)] md:shadow-none">
                <h2 className="text-xl font-semibold text-[#C43882] mb-2">
                  Order Summary
                </h2>

                <div className="mb-4 border-b block md:hidden opacity-50">
                  {cart.map((product, index) => (
                    <div className="flex justify-between" key={index}>
                      <p className="flex shippori gap-2">
                        {product.name} <p> X {product.quantity}</p>
                      </p>

                      <p className="font-medium">{product.price}৳</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p>Subtotal:</p>
                    <p className="font-medium">৳{cod_amount}</p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <p>Delivery fee:</p>
                    <p className="font-medium">৳{deliveryFee}</p>
                  </div>
                  {/* <div className="flex justify-between">
                  <p>Discount:</p>
                  <p className="font-medium">৳</p>
                </div> */}
                  <hr />
                  <div className="flex justify-between font-semibold text-lg">
                    <p>Total:</p>
                    <p>৳{total}</p>
                  </div>
                </div>
                <button className="hidden md:block w-full mt-5 py-2 font-medium rounded-md bg-[#C43882] text-white">
                  নিশ্চিত করুন
                </button>
              </div>
            </div>

            {/* Left Side: Product List */}
            <div className="hidden md:block col-span-1 md:col-span-2 bg-white p-5 rounded-md shadow-md order-2 md:order-1">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#C43882" }}
              >
                Your Products
              </h2>
              <div className="space-y-4">
                {cart.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between border-b pb-3"
                  >
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/15/image/${product.image}`}
                          alt="Product Image"
                          className="w-16 h-20 rounded-md mr-4"
                        />
                        {product.quantity > 0 && (
                          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            {product.quantity}
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg font-medium">{product.name}</h3>

                        <h3 className="text-md font-medium">
                          {product.variation_values || ""}
                        </h3>

                        <p className="text-gray-600">
                          product price: {product.price} ৳
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-800 flex items-center gap-1 text-[20px]">
                      <span className="text-[20px]">
                        ৳ {product.unitPrice * product.quantity}
                      </span>
                    </p>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>

        <div>
          <div
            className="gap-2  md:hidden fixed flex flex-col items-center justify-between bottom-0 w-full bg-gradient-to-t from-gray-50 to-white shadow-lg z-40 
       px-6 py-4"
          >
            <p className="flex gap-2 font-semibold">
              Total: <p>৳{total}</p>
            </p>
            <button
              type="submit"
              className="w-full bg-[#C43882] text-white font-medium text-lg py-2 rounded-full shadow-lg"
            >
              নিশ্চিত করুন
            </button>
          </div>
        </div>
      </form>

      {/* <Footer /> */}
    </div>
  );
};

export default CheckOut;