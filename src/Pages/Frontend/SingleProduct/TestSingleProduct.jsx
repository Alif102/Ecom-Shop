
import {
    useParams,
  } from "react-router-dom";
  
  import { FaCartShopping, FaMinus } from "react-icons/fa6";
  
  import React, { useState, useEffect, useContext } from "react";
  import { Link } from "react-router-dom";
  
  import { FaPlus, FaTimesCircle } from "react-icons/fa";
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
  
  
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
  
    const [currentVariation, setCurrentVariation] = useState([]);
  
    const [currentPrice, setCurrentPrice] = useState("");
    const [oldPrice, setOldPrice] = useState("");
    const [currentDiscount, setCurrentDiscount] = useState('');
  
    const [isToastVisible, setIsToastVisible] = useState(false);
  
    // Modal
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
  
    const { product_info } = useParams();
  
    const lastIndex = product_info.lastIndexOf("-");
    const product_name = product_info.substring(0, lastIndex);
    const product_id = parseInt(product_info.substring(lastIndex + 1), 10);
  
    useEffect(() => {
      if (products.length > 0 && product_id) {
        const filtered = products.filter((p) => p.id === product_id);
        if (filtered.length > 0) {
          setProduct(filtered[0]);
          setSelectedProduct(filtered[0]);
        } else {
          console.log("Product not found");
          setProduct(null);
        }
      }
    }, [products, product_id]);
  
  
    useEffect(() => {
      if (product?.variation_combinations?.length > 0) {
        const prices = product.variation_combinations.map((combination) => {
          const variationDiscountEndDate = new Date(combination.discount_date);
          const isDiscountActive =
            combination.discount > 0 && variationDiscountEndDate >= new Date();
          return isDiscountActive
            ? combination.price - combination.discount
            : combination.price;
        });
  
        const validPrices = prices.filter((price) => price !== undefined); // Ensure no invalid values
        if (validPrices.length > 0) {
          const min = Math.min(...validPrices);
          const max = Math.max(...validPrices);
  
          if (min === max) {
            setCurrentPrice(min);
          } else {
            setMinPrice(min);
            setMaxPrice(max);
          }
        }
      } else if (product) {
        // Handle top-level product pricing without variations
        const discountEndDate = new Date(product?.discount_date);
        const isDiscountActive =
          product?.is_discount && discountEndDate >= new Date();
  
        const finalPrice = isDiscountActive
          ? product?.price - product?.discount_amount
          : product?.price;
  
        setCurrentPrice(finalPrice);
  
        if (isDiscountActive) {
          setOldPrice(product?.price); // Set old price if a discount exists
        }
      }
    }, [product, product_id]);
  
  
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
  
        const newVariation = combination;
        setCurrentVariation(newVariation);
  
        const variationDiscountEndDate = new Date(combination.discount_date);
        const currentDate = new Date();
        const isDiscountActive =
          combination.discount > 0 && variationDiscountEndDate >= currentDate;
  
        if (isDiscountActive) {
          const priceToDisplay = combination.price - combination.discount;
          setOldPrice(combination.price);
          setCurrentPrice(priceToDisplay);
        }
        else {
          const priceToDisplay = combination.price;
          setOldPrice(null);
          setCurrentPrice(priceToDisplay);
        }
  
      } else {
        // Reset variation if no combination is found
        setCurrentVariation(null);
        // If no variation combinations, use default price (from product)
        setCurrentPrice(product.price);
      }
  
      setIsToastVisible(false);
    };
  
  
  
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
          addToCart(product, quantity, currentId, currentVariation, currentPrice);
        }
  
      }
      else {
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
    };
  
    console.log(product)
  
    return (
      <div className="pb-28 md:pb-0 ">
        <Header />
  
        <div className="md:px-10 mx-auto md:p-4">
          <div className="flex flex-col md:flex-row md:space-x-12">
            {/* Product Image Section */}
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              {product ? (
                <img
                  src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/7/image/${product.image}`}
                  alt="Product"
                  className="w-full h-auto object-cover rounded-md"
                />
              ) : (
                <div className="w-full h-64 flex justify-center items-center text-gray-700">
                  <span></span>
                </div>
              )}
            </div>
  
            {/* Add to Cart Product Section */}
            <div className="w-full md:w-1/2 px-4">
              <div className="sticky top-4">
                {product ? (
                  <>
                    <h2 className="text-lg shippori md:text-3xl font-semibold text-gray-800">
                      {product.name}
                    </h2>
                    <div className="flex justify-between items-center md:items-start flex-row md:flex-col">
                      <p className="text-sm md:text-base text-gray-500 mt-0 md:mt-2">
                        SKU: {product.code}
                      </p>
                      <div className="flex items-center space-x-0 md:space-x-4 mt-0 md:mt-4 flex-col md:flex-row">
                        {currentPrice ? (
                          <h2 className="text-lg md:text-2xl font-bold text-[#C43882]">
                            Price: <span className="text-4xl">৳</span> {currentPrice} {oldPrice && <s>{oldPrice}</s>}
                          </h2>
                        ) : (
                          <div className="text-lg md:text-2xl font-bold text-[#C43882]">
                            <h2>
                              <span className="text-4xl">৳</span> {minPrice} - <span className="text-4xl">৳</span> {maxPrice}{" "}
                            </h2>
                          </div>)
                        }
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
                                  onClick={() => handleVariationChange(variation.variation.name, value)}
                                  className={`py-1 px-3  rounded ${selectedVariations[variation.variation.name] === value
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
                  </>
                ) : (
                  <div className="py-10">
                    <span className="loading loading-ring loading-sm"></span>
                  </div>
                )}
              </div>
            </div>
          </div>
  
        </div>
        {/* <RatingSection /> */}
  
        {/* Related Product Start */}
  
        <div className="md:px-10 mx-auto py-10">
          <h2 className="text-center text-xl md:text-3xl font-bold mb-2 md:mb-8 Poppins">
            Related Products
          </h2>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 whitespace-nowrap">
  
  
              {products.slice(8, 15).map((product, index) => {
                const prices = product.variation_combinations.length
                  ? product.variation_combinations.map((comb) => comb.price)
                  : [product.price];
  
                const highPrice = Math.max(...prices);
                const lowPrice = Math.min(...prices);
  
                return (
                  <div key={index} className="w-full gap-2 py-4 px-2 h-full group relative">
                    <Link
                      to={`/singleproduct/${product.name}-${product.id}`}
                    >
                      <div className="relative bg-white shadow-md rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                        <div className="relative">
                          <img
                            src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/7/image/${product.image}`}
                            alt={product.offer}
                            className=" h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
  
  
                        <div className="p-4 flex justify-between items-center">
                          <h2
                            className="shippori font-semibold text-gray-800 truncate mb-1 group-hover:text-pink-500 transition-colors duration-300"
                          >
                            {product.name}
                          </h2>
  
  
  
  
                          <div className="flex items-center justify-between">
                            {product.variation_combinations.length > 0 ? (
                              <div className="text-gray-700">
                                {lowPrice === highPrice ? (
                                  <span className="text-pink-500 font-bold">
                                    {highPrice} <span className="text-2xl"><span className="text-2xl">৳</span></span>
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
  
                        {/* <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-28 right-3 bg-[#C43882] text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg hover:bg-[#a72e6e] transition "
                    title="Add to Cart"
                  >
                    <FaPlus />
                  </button> */}
                      </div>
                    </Link>
  
                    <button className="absolute right-5 bottom-24 bg-[#C43882] rounded-full p-2 text-white hover:text-[#C43882] hover:bg-white duration-500 border border-transparent hover:border-[#C43882]" onClick={() => openModal(product)}>
                      <FaPlus />
                    </button>
                  </div>
                );
              })}
  
              {modalOpen && (() => {
  
                return (
                  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96 relative">
                      <button
                        className="absolute top-2 right-2 py-2 px-4 rounded-md text-pink-500"
                        onClick={closeModal}
                      >
                        <FaTimesCircle size={24} />
                      </button>
  
                      <div className="flex gap-5 mt-4">
                        <div>
                          <img
                            src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/7/image/${product.image}`}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded-lg"
                          />
                        </div>
  
                        <div className="flex-1 space-y-3">
                          <h2 className="text-xl font-semibold">{product.name}</h2>
                          {!currentPrice && (
                            <span className="text-lg md:text-2xl font-bold text-[#C43882]">
                              {product.variation_combinations && product.variation_combinations.length > 0 ? (
                                (() => {
                                  const minPrice = Math.min(
                                    ...product.variation_combinations.map((combination) => combination.price)
                                  );
                                  const maxPrice = Math.max(
                                    ...product.variation_combinations.map((combination) => combination.price)
                                  );
  
                                  return minPrice === maxPrice ? (
                                    <h2>
                                      <span className="text-4xl">৳</span> {maxPrice}
                                    </h2>
                                  ) : (
                                    <h2>
                                      <span className="text-4xl">৳</span> {minPrice} - <span className="text-4xl">৳</span> {maxPrice}
                                    </h2>
                                  );
                                })()
                              ) : (
                                <h2>Price: <span className="text-4xl">৳</span> {product.price}</h2>
                              )}
                            </span>
  
                          )}
  
                          {currentPrice > 0 && (
                            <h2 className="text-lg md:text-2xl font-bold text-[#C43882]">Price: <span className="text-4xl">৳</span> {currentPrice}</h2>
                          )}
  
                          {product.product_variation?.length > 0 ? (
                            product.product_variation.map((variation) => (
                              <div key={variation.id}>
                                <h3 className="text-sm my-1 font-semibold">{variation.variation.name}</h3>
                                <div className="flex flex-wrap gap-3">
                                  {variation.variaton_values.split(",").map((value, i) => (
  
                                    <button
                                      key={i}
                                      onClick={() => handleVariationChange(variation.variation.name, value)}
                                      className={`py-1 px-3  rounded ${selectedVariations[variation.variation.name] === value
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
  
                          {isToastVisible && (
                            <div className="mt-4 text-red-600 flex items-center gap-2 font-medium text-sm">
                              Please choose variant. <BsArrowUpSquare size={23} />
                            </div>
                          )}
  
                          <div className="flex w-20 h-7 bg-gray-200 py-1 rounded-full items-center justify-center space-x-0 md:space-x-2">
                            <button
                              onClick={decrementCount}
                              className="bg-slate-200 text-gray-800 p-1 rounded-full hover:text-white hover:bg-sky-400"
                            >
                              <FaMinus size={10} />
                            </button>
                            <span className="text-sm">{quantity}</span>
                            <button
                              onClick={incrementCount}
                              className="bg-slate-200 text-gray-800 p-1 rounded-full hover:text-white hover:bg-sky-400"
                            >
                              <FaPlus size={10} />
                            </button>
                          </div>
  
                          <div className="mt-3" onClick={handleAddToCart}>
                            <button className=" bg-pink-500 p-3 text-white rounded-lg">
                              অর্ডার করুন
                            </button>
                          </div>
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
      </div>
    );
  };
  
  export default SingleProduct;