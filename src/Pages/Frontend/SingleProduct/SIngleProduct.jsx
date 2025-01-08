
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { FaCartShopping, FaMinus } from "react-icons/fa6";

import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";

import { FaEye, FaPlus, FaTimesCircle } from "react-icons/fa";
import { CartContext } from "../../../Component/Frontend/CartContext";
import Header from "../../../Component/Frontend/Header/Header";
import ScrollToTop from "../../../Component/Frontend/ScrollToTop";
import AddToCart from "../../../Component/Frontend/Header/AddToCArt";
import { BsArrowUpSquare } from "react-icons/bs";
// import toast from "react-hot-toast";

const SingleProduct = ({ products }) => {
  const { addToCart } = useContext(CartContext);

  const { cartCount } = useContext(CartContext);


  const [product, setProduct] = useState(null);

  const [isCartOpen, setIsCartOpen] = useState(false); // State to toggle the cart sidebar
  const [quantity, setQuantity] = useState(1);
  const [selectedVariations, setSelectedVariations] = useState({});
  const [currentId, setCurrentId] = useState("");

  const [min, setMin] = useState('');


  const [currentVariation, setCurrentVariation] = useState([]);

  const [currentPrice, setCurrentPrice] = useState(null);
  const [oldPrice, setOldPrice] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(null);

  const [isToastVisible, setIsToastVisible] = useState(false);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { product_info } = useParams();

  const lastIndex = product_info.lastIndexOf("-");
  const product_name = product_info.substring(0, lastIndex);
  const product_id = parseInt(product_info.substring(lastIndex + 1), 10);

  const [viewImage, setViewImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0 && product_id) {
      const filtered = products.filter((p) => p.id == product_id);
      if (filtered.length > 0) {
        setProduct(filtered[0]);
        setSelectedProduct(filtered[0]);
        // Reset ALL 
        setSelectedVariations({})
        setCurrentId("")
        setQuantity(1)
        setCurrentVariation([])
        setViewImage(filtered[0].image)
        setIsToastVisible(false);
        setCurrentPrice('')
      } else {
        navigate(`/`);
      }
    }
  }, [products, product_id]);

  const incrementCount = () => setQuantity(quantity + 1);
  const decrementCount = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleCartToggle = () => {
    if (cartCount < 1) {
      toast("Your cart is empty", {
        icon: "⚠️",
        style: {
          border: "1px solid #CA3433",
          padding: "16px",
          color: "#CA3433",
        },
      });
    } else {
      setIsCartOpen((prevState) => !prevState);
    }
  };
  const cartAnimation = cartCount >= 0 ? "animate-bubble" : "";


  const handleVariationChange = (variationType, value) => {
    // If there are no variations, we don't need to update the selected variations
    if (product.has_variation === 0) {
      setIsToastVisible(true); // Show a toast if no variations are available
      return; // Exit early if there are no variations to handle
    }

    // Update the selected variations
    const updatedVariations = { ...selectedVariations, [variationType]: value };
    setSelectedVariations(updatedVariations);

    // Combine selected values in sorted order
    const sortedSelectedValues = Object.values(updatedVariations).sort().join(",");

    // Look for a matching combination in the variation_combinations
    const combination = product.variation_combinations.find(
      (combo) => combo.values.split(",").sort().join(",") === sortedSelectedValues
    );

    if (combination) {
      const newId = `v${combination.id}`;
      setCurrentId(newId);
      setCurrentVariation(combination);

      // Handle discount logic
      const now = new Date();
      const discountEndDate = combination.discount_date ? new Date(combination.discount_date) : null;
      const isDiscountActive =
        combination.discount > 0 &&
        (discountEndDate === null || discountEndDate >= now);

      if (isDiscountActive) {
        const discountedPrice = combination.price - combination.discount;
        setCurrentPrice(discountedPrice);
        setOldPrice(combination.price);
        setDiscountAmount(combination.discount);
      } else {
        setCurrentPrice(combination.price);
        setOldPrice(null);
        setDiscountAmount(null);
      }

    } else {
      // Reset variation if no combination is found
      setCurrentVariation(null);

      // If no variation combinations, use default price (from product)
      setCurrentPrice(product.price);
    }

    setIsToastVisible(false);
  };


  const [imageFly, setimageFly] = useState(false);

  const varientErr = document.getElementById("error");

  const handleAddToCart = (e) => {

    e.preventDefault();

    if (product.has_variation == 1) {

      if (Object.keys(selectedVariations).length < Object.keys(product.product_variation).length) {
        setIsToastVisible(true);
        if (varientErr && !modalOpen) {
          varientErr.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else {
        setIsToastVisible(false);
        // image fly animation 
        setimageFly(false);
        requestAnimationFrame(() => {
          setimageFly(true);
        });
        addToCart(product, quantity, currentId, currentVariation, currentPrice);
      }
    }
    else {
      // image fly animation 
      setimageFly(false);
      requestAnimationFrame(() => {
        setimageFly(true);
      });
      addToCart(product, quantity, currentId, currentVariation, currentPrice);
    }
  };




  // Modal..............

  const openModal = (product) => {
    setProduct(product);
    setModalOpen(true);
    setSelectedVariations({})
    setCurrentId("")
    setQuantity(1)
    setCurrentVariation([])
    setIsToastVisible(false);
    setCurrentPrice('')
  };

  const closeModal = () => {
    setModalOpen(false);
    setProduct(selectedProduct)
    setQuantity(1)
    setSelectedVariations({})
    setCurrentId("")
    setCurrentVariation([])
    setIsToastVisible(false);
    setCurrentPrice('')
    setimageFly(false);
  };

  const modalRef = useRef();
  const outerRef = useRef();

  useEffect(() => {
    // Close modal if clicked outside
    const handleClickOutside = (event) => {
      if (outerRef.current && !outerRef.current.contains(event.target) && !modalRef.current.contains(event.target)) {
        closeModal(); // Close modal
      }
    };

    if (openModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openModal, closeModal]);

  return (
    <div className="relative">
      <Header />
      <div className="container mx-auto">


        <div className="md:px-10 mx-auto md:p-4">
          {product ? (
            <div className="flex flex-col md:flex-row md:space-x-12 relative">
              {/* Product Image Section */}
              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                <div className="flex justify-between items-start flex-col-reverse lg:flex-row gap-5">
                  <div className="h-full flex flex-row lg:flex-col gap-4 flex-wrap">
                    {
                      selectedProduct?.product_images.map((pdt, index) => (
                        <div
                          key={index}>
                          <img
                            src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/15/image/${pdt.name}`}
                            alt="Product"
                            onClick={() => setViewImage(pdt.name)}
                            className={`w-[120px] h-[150px] lg:w-[200px] lg:h-auto xl:w-[150px] border-2 cursor-pointer rounded ${pdt.name == viewImage ? 'border-pink-500' : ''}`}
                          />
                        </div>
                      ))
                    }
                  </div>
                  <div className="">
                    <img
                      src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/15/image/${viewImage}`}
                      alt="Product"
                      className="w-full h-auto object-cover rounded-md"
                    />
                    < img
                      src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/15/image/${viewImage}`}
                      alt="Product" className={`w-[300px] fixed h-[400px] hidden opacity-0 invisible z-50 ${(imageFly && !modalOpen) && 'single-mobile-flying-div  single-flying-div'}`}
                      onAnimationEnd={() => setimageFly(false)}
                    />
                  </div>
                </div>
              </div>
              {/* Add to Cart Product Section */}
              <div className="w-full sticky md:w-1/2 px-4">
                <div className="top-4">
                  <h2 className="text-lg shippori md:text-3xl font-semibold text-gray-800">
                    {product.name}
                  </h2>
                  <div className="flex justify-between items-center md:items-start flex-row md:flex-col">
                    <p className="text-sm md:text-base text-gray-500 mt-0 md:mt-2">
                      SKU: {product.code}
                    </p>
                    <div className="flex flex-col items-center space-x-0 md:space-x-4 mt-0 md:mt-4  md:flex-row">
                      {currentPrice ? (
                        <>
                          <span className="text-lg md:text-2xl font-bold text-[#C43882]">
                            Price: <span className="md:text-2xl">৳</span> {currentPrice}
                          </span>
                          {discountAmount && (
                            <>
                              <span className="text-lg text-black relative strike">৳{oldPrice}</span>
                              <span className="bg-pink-500 rounded-lg text-white text-xl font-bold py-2 px-4 mt-1 sm:mt-0">
                                Save ৳ {discountAmount}
                              </span>
                            </>
                          )}
                        </>
                      ) : (
                        (() => {
                          const now = new Date();
                          const prices = product?.variation_combinations?.length
                            ? product.variation_combinations.map((comb) => comb.price)
                            : [product.price];

                          const lowPrice = Math.min(...prices);
                          const highPrice = Math.max(...prices);

                          const discountAmount = product?.variation_combinations?.length
                            ? product.variation_combinations.map((comb) => comb.discount)
                            : product.discount_amount || 0;

                          const maxDiscount = Math.max(...discountAmount)

                          const discountDate = product?.variation_combinations?.length
                            ? product.variation_combinations[0].discount_date
                            : product.discount_date;

                          const isDiscountValid = discountDate == null || new Date(discountDate) >= now;

                          return (
                            <div className="flex flex-col sm:flex-row items-center md:space-x-4 space-y-2 sm:space-y-0">
                              <div className="text-lg md:text-2xl font-bold text-[#C43882]">
                                Price: {lowPrice == highPrice ? <span>৳ {lowPrice}</span> : <span>৳ {lowPrice} - ৳ {highPrice}</span>}
                              </div>
                              {isDiscountValid && maxDiscount > 0 && (
                                <span className="bg-pink-500 rounded-lg text-white text-xl font-bold py-2 px-4">
                                  Save ৳ {maxDiscount}
                                </span>
                              )}
                            </div>
                          );
                        })()
                      )}
                    </div>
                  </div>
                </div>

                <ul className="space-y-4 mt-3">
                  {product.product_variation?.length > 0 ? (
                    product.product_variation.map((variation) => (
                      <div key={variation.id}>
                        <h3 className="text-sm my-1 font-semibold">{variation.variation.name}</h3>
                        <div className="flex flex-wrap gap-3">
                          {variation.variaton_values.split(",").map((value, i) => (
                            <button
                              key={i}
                              onClick={() => handleVariationChange(variation.variation.name, value, i)}
                              className={`py-1 px-3  rounded uppercase ${selectedVariations[variation.variation.name] === value
                                ? "bg-[#C43882] text-white"
                                : "bg-gray-200 hover:bg-[#C43882] hover:text-white"
                                }`}
                            >
                              {value}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <li>No variations available</li>
                  )}
                </ul>

                <div id="error">
                  {isToastVisible && (
                    <span className="mt-4 text-red-600 flex items-center gap-2 font-medium text-sm">
                      Please choose variant. <BsArrowUpSquare size={23} />
                    </span>
                  )}
                </div>


                <div className="py-2 flex md:flex-col flex-row items-center md:items-start justify-between">
                  <div className="mt-2 md:mt-4">
                    <p className="font-medium text-gray-800 hidden md:block">Quantity:</p>
                    <div className="flex items-center gap-4 mt-0 md:mt-2 border border-gray-300 rounded-md w-fit">
                      <button
                        onClick={decrementCount}
                        className="w-10 h-10 flex items-center justify-center border-r text-gray-800 rounded-md hover:bg-gray-100 transition text-lg font-semibold"
                      >
                        -
                      </button>
                      <span className="text-xl font-bold">{quantity}</span>
                      <button
                        onClick={incrementCount}
                        className="w-10 h-10 flex items-center justify-center border-l text-gray-800 rounded-md hover:bg-gray-100 transition text-lg font-semibold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block mt-6 space-y-4">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-2 md:py-3 bg-gradient-to-r from-[#C43882] to-[#F06191] hover:from-[#F06191] hover:to-[#C43882] text-white font-semibold rounded hover:bg-[#db549c] transition"
                  >
                    কার্টে যোগ করুন
                  </button>

                  <Link to="/checkout">
                    <button
                      onClick={(e) => handleAddToCart(e)}
                      className="w-full py-2 mt-3 md:py-3 bg-gradient-to-l from-[#C43882] to-[#F06191] hover:from-[#F06191] hover:to-[#C43882] text-white font-semibold rounded hover:bg-[#db549c] transition text-center block"
                    >
                      অর্ডার করুন
                    </button>
                  </Link>

                </div>

                <div className="mt-4 border-t border-gray-200">
                  <p className="py-3 text-left text-gray-800 text-lg">
                    Description :
                  </p>
                  <p className="text-sm md:text-base text-gray-600">
                    {product.short_desc}
                  </p>
                </div>
              </div>
            </div>
          ) :
            (<div className="flex sm:flex-row flex-col gap-12 border-gray-300 mx-auto px-4 py-5 sm:py-[100px] border rounded animate-pulse">
              <div className="bg-slate-200 p-4 rounded sm:w-1/2 hidden sm:block"></div>
              <div className="flex-1 space-y-6 py-1 sm:w-1/2">
                <div className="bg-slate-200 rounded h-40"></div>
                <div className="space-y-3">
                  <div className="gap-4 grid grid-cols-3">
                    <div className="col-span-2 bg-slate-200 rounded h-20"></div>
                    <div className="col-span-1 bg-slate-200 rounded h-20"></div>
                  </div>
                  <div className="bg-slate-200 rounded h-40"></div>
                </div>
              </div>
            </div>
            )}
        </div>
        {/* <RatingSection /> */}

        {/* Related Product Start */}

        <div className="md:px-10 mx-auto py-10">
          <h2 className="text-center text-xl md:text-3xl font-bold mb-2 md:mb-8 Poppins">
            Related Products
          </h2>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-5 md:gap-4 whitespace-nowrap">
              {
                products
                  .filter((item) => item.category_id === selectedProduct?.category_id && item.id != selectedProduct?.id)
                  .slice(0, 8) // Limit to the first 9 items
                  .map((product, index) => {
                    const prices = product.variation_combinations?.length > 0 // Check for variations
                      ? product.variation_combinations.map((comb) => comb.price) // Map combination prices
                      : [product.price]; // Fallback to base price if no variations

                    const highPrice = Math.max(...prices); // Get maximum price
                    const lowPrice = Math.min(...prices); // Get minimum price

                    return (
                      <div key={index} className="w-full h-full group relative">
                        <Link to={`/singleproduct/${product.name}-${product.id}`}>
                          <div className="relative bg-white shadow-md rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                            <div className="relative">
                              <img
                                src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/15/image/${product.image}`}
                                alt={product.offer}
                                className=" h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <Link
                              to={`/singleproduct/${product.name}-${product.id}`}
                            >
                              <div className="p-2 sm:p-4 flex justify-between items-center">
                                <h2
                                  className="shippori font-semibold text-gray-800 truncate group-hover:text-pink-500 transition-colors duration-300"
                                >
                                  {product.name}
                                </h2>
                                <div className="flex items-center justify-between">
                                  {product.variation_combinations.length > 0 ? (
                                    <div className="text-gray-700">
                                      {lowPrice === highPrice ? (
                                        <span className="text-pink-500">
                                          {lowPrice} <span className="text-2xl"><span className="text-2xl">৳</span></span>
                                        </span>
                                      ) : (
                                        <>
                                          <span className="text-pink-500 font-bold">
                                            {lowPrice} <span className="text-2xl"><span className="text-2xl">৳</span></span>{" "}
                                          </span>
                                          -{" "}
                                          <span className="text-red-500 font-bold">
                                            {highPrice} <span className="text-2xl"><span className="text-2xl">৳</span></span>{" "}
                                          </span>
                                        </>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="text-pink-500 font-bold">{product.price} <span className=" text-2xl"><span className="text-2xl">৳</span></span> </div>
                                  )}
                                </div>
                              </div>
                            </Link>
                          </div>
                        </Link>

                        <button onClick={() => openModal(product)}
                          className="absolute right-5 bottom-16 sm:bottom-20 bg-[#C43882] rounded-full p-2 text-white hover:text-[#C43882] hover:bg-white duration-500 border border-transparent hover:border-[#C43882]"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    );
                  })}

              {modalOpen && (() => {
                return (
                  <div ref={outerRef} className="fixed inset-0 flex justify-center z-50 items-center bg-black bg-opacity-50">
                    <div ref={modalRef} className="relative w-full px-5 sm:px-0 h-full flex justify-center items-center">
                      <div className="bg-white p-2 md:p-5 rounded shadow-lg w-96 sm:w-[500px]">
                        <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-3">
                          <div>
                            <img
                              src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/15/image/${product.image}`}
                              alt={product.name}
                              className="w-full h-auto rounded-lg"
                            />
                            <img
                              src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/15/image/${product.image}`}
                              alt="Product" className={`md:left-10 w-[100px] h-[120px] md:absolute hidden opacity-0 invisible z-50 ${imageFly && 'popup-flying-div popup-mobile-flying-div'}`}
                              onAnimationEnd={() => setimageFly(false)}
                            />
                          </div>

                          <div className="md:col-span-2 flex-1 sm:space-y-2">
                            <div>
                              <h2 className="text-xl font-semibold text-wrap capitalize">{product.name}</h2>
                            </div>
                            {currentPrice ? (
                              <p className="space-y-2">
                                <span className="text-lg font-bold text-[#C43882]">
                                  Price: ৳{currentPrice}{" "}
                                </span>
                                {discountAmount && (
                                  <span className="text-lg text-black relative strike">৳{oldPrice}</span>
                                )}
                                <br />
                                {discountAmount && (
                                  <p className="bg-pink-500 rounded-lg text-white text-center font-bold py-1 px-2">
                                    Save ৳ {discountAmount}
                                  </p>
                                )}
                              </p>
                            ) : (
                              (() => {
                                const now = new Date();
                                const prices = product?.variation_combinations?.length
                                  ? product.variation_combinations.map((comb) => comb.price)
                                  : [product.price];

                                const lowPrice = Math.min(...prices);
                                const highPrice = Math.max(...prices);

                                const discountAmount = product?.variation_combinations?.length
                                  ? product.variation_combinations.map((comb) => comb.discount)
                                  : product.discount_amount || 0;

                                const maxDiscount = Math.max(...discountAmount)

                                const discountDate = product?.variation_combinations?.length
                                  ? product.variation_combinations[0].discount_date
                                  : product.discount_date;

                                const isDiscountValid = discountDate == null || new Date(discountDate) >= now;

                                return (
                                  <div className="space-y-2 font-bold">
                                    <p>Price: <span className="text-[#C43882]">{lowPrice == highPrice ? <span>৳ {lowPrice}</span> : <span>৳{lowPrice} - ৳{highPrice}</span>}
                                    </span></p>
                                    {isDiscountValid && (maxDiscount > 0) && (
                                      <p className="bg-pink-500 rounded-lg text-white text-center font-bold py-1 px-2">
                                        Save ৳ {maxDiscount}
                                      </p>
                                    )}
                                  </div>
                                );
                              })()
                            )}
                            {product.product_variation?.length > 0 ? (
                              product.product_variation.map((variation) => (
                                <div key={variation.id}>
                                  <h3 className="text-sm my-1 font-semibold">{variation.variation.name}</h3>
                                  <div className="grid grid-cols-2 gap-1">
                                    {variation.variaton_values.split(",").map((value, i) => (

                                      <button
                                        key={i}
                                        onClick={() => handleVariationChange(variation.variation.name, value)}
                                        className={`py-1 text-sm rounded ${selectedVariations[variation.variation.name] === value
                                          ? "bg-pink-500 text-white"
                                          : "bg-gray-200 hover:bg-[#C43882] hover:text-white"
                                          }`}
                                      >
                                        {value}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <span>No variations available</span>
                            )}

                            {isToastVisible && (
                              <div className="mt-4 text-red-600 flex items-center gap-2 font-medium text-sm">
                                Please choose variant. <BsArrowUpSquare size={23} />
                              </div>
                            )}

                            <div className="flex justify-around bg-gray-200 py-1.5 rounded-full items-center mt-3 md:mt-5 md:my-5">
                              <button
                                onClick={decrementCount}
                                className="bg-slate-200 text-gray-800 rounded-full hover:text-white hover:bg-sky-400"
                              >
                                <FaMinus size={10} />
                              </button>
                              <span className="text-sm">{quantity}</span>
                              <button
                                onClick={incrementCount}
                                className="bg-slate-200 text-gray-800 rounded-full hover:text-white hover:bg-sky-400"
                              >
                                <FaPlus size={10} />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-center mt-2 sm:mt-5">
                          <button
                            className=" bg-red-500 py-2 w-full text-white rounded-lg flex items-center justify-center"
                            onClick={closeModal}
                          >
                            {/* <FaTimesCircle className="md:mr-2" size={24} /> <span>ক্যান্সেল করুন</span> */}
                            <span>এড়িয়ে চলুন</span>
                          </button>
                          <button className=" bg-pink-500 py-2 w-full text-white rounded-lg" onClick={handleAddToCart}>
                            অর্ডার করুন
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>




        <div>
          <div className="gap-2 md:hidden fixed flex flex-row items-center justify-between bottom-0 w-full bg-gradient-to-t from-gray-50 to-white shadow-lg z-20 px-6 py-4">
            <Link
              onClick={(e) => handleAddToCart(e)}
              className="flex-1 bg-gradient-to-r from-[#C43882] to-[#F06191] hover:from-[#F06191] hover:to-[#C43882] text-white font-medium text-lg py-2 rounded-full shadow-lg text-center " disabled={!currentPrice}
            >
              অর্ডার করুন
            </Link>


            <button
              onClick={handleCartToggle}
              className={`w-12 h-12 rounded-full bg-[#f0acd0] flex items-center justify-center ${cartAnimation}`}
            >
              <FaCartShopping size={26} className="" />
              <span className="absolute top-3 right-5 bg-orange-500 p-1 text-white text-md font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}{" "}
              </span>
            </button>

            {isCartOpen && <AddToCart quantity={quantity} onClose={() => setIsCartOpen(false)} />}
          </div>
        </div>
        <ScrollToTop />
        {/* <Footer />
      <ScrollToTopButton /> */}
      </div >
    </div>
  );
};

export default SingleProduct;