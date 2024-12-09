// import RatingSection from "../../../Component/Frontend/SingleProduct/RatingSection/RatingSection";
// import RelatedProduct from "../../../Component/Frontend/SingleProduct/RelatedProduct/RelatedProduct";
// import RecentlyViewed from "../../../Component/Frontend/SingleProduct/RecentlyViewed/RecentlyViewed";
// import SinglePageOrder from "../../../Component/Frontend/SinglePageOrder";
// import ScrollTop from "./ScrollTop/ScrollTop";
// import PopUp from "./PopUp/PopUp";

import { FaCartShopping, FaMinus } from "react-icons/fa6";




import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
// Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import {  FaPlus } from "react-icons/fa"; // Import the icon

// import "../../../Component/Frontend/SingleProduct/TopSection/TopSection.css";


import { CartContext } from "../../../Component/Frontend/CartContext";
import Header from "../../../Component/Frontend/Header/Header";
// import toast from "react-hot-toast";

const SingleProduct = ({products}) => {
  const { addToCart } = useContext(CartContext);

  const { cartCount } = useContext(CartContext);


  const [product, setProduct] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [selectedVariations, setSelectedVariations] = useState({});
  const [currentId, setCurrentId] = useState("");

  const [currentVariation, setCurrentVariation] = useState([]);

  const [currentPrice, setCurrentPrice] = useState("");
  const [currentStock, setCurrentStock] = useState(0);

  const { product_info } = useParams();

  const lastIndex = product_info.lastIndexOf("-");
  const product_name = product_info.substring(0, lastIndex);
  const product_id = parseInt(product_info.substring(lastIndex + 1), 10);

  useEffect(() => {
    if (products.length > 0 && product_id) {
      const filtered = products.filter((p) => p.id === product_id);
      if (filtered.length > 0) {
        setProduct(filtered[0]);
      } else {
        console.log("Product not found");
        setProduct(null);
      }
    }
  }, [products, product_id]);


  console.log(product);

  useEffect(() => {
    if (product) {
      const relatedProducts = products
        .filter((p) => p.category_id === product.category_id && p.id !== product.id)
        .slice(0, 4); // Limit to the first 4 related products
      setCategoryProducts(relatedProducts);
    }
  }, [product, products]);




 

  useEffect(() => {
    console.log("Updated products state:", products);
  }, [products]);

  useEffect(() => {
    if (product) {
      const filtered = products
        .filter((p) => p.category_id === product_id)
        .slice(0, 4); // Limit to the first 4 products
      setCategoryProducts(filtered);
    }
  }, [products, product_id]);

  

 
  const [quantity, setQuantity] = useState(1);


  const [productCount, setProductCount] = useState(1);

  const incrementCount = () => setProductCount(productCount + 1);
  const decrementCount = () =>
    setProductCount(productCount > 1 ? productCount - 1 : 1);

  const [isCartOpen, setIsCartOpen] = useState(false); // State to toggle the cart sidebar

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


  console.log(productCount)
  console.log(product)
  const handleVariationChange = (variationType, value) => {
    const updatedVariations = { ...selectedVariations, [variationType]: value };
    setSelectedVariations(updatedVariations);

    const sortedSelectedValues = Object.values(updatedVariations).sort().join(",");

    const combination = product.variation_combinations.find(
      (combo) =>
        combo.values.split(",").sort().join(",") === sortedSelectedValues
    );

    if (combination) {
      const newId = `v${combination.id}`;
      setCurrentId(newId);

      const newVariation = combination;
      setCurrentVariation(newVariation);

      const variationDiscountEndDate = new Date(combination.discount_date);
      const currentDate = new Date();
      const isDiscountActive =
        combination.discount > 0 && variationDiscountEndDate >= currentDate;

      const priceToDisplay = isDiscountActive
        ? combination.price - combination.discount
        : combination.price;

      setCurrentPrice(priceToDisplay);
      setCurrentStock(combination.stock);
    } else {
      const prices = product.variation_combinations.map((variation) => {
        const variationDiscountEndDate = new Date(variation.discount_date);
        const isDiscountActive =
          variation.discount > 0 && variationDiscountEndDate >= new Date();
        return isDiscountActive
          ? variation.price - variation.discount
          : variation.price;
      });

      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      setCurrentPrice(minPrice === maxPrice ? minPrice : `${minPrice} - ${maxPrice}`);
      setCurrentStock(0);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  return (
    <div className="pb-28 md:pb-0 ">
      <Header />

      <div className="md:px-10 mx-auto md:p-4">
        <div className="flex flex-col md:flex-row md:space-x-12">
        

        <div className="w-full md:w-1/2 mb-6 md:mb-0">
  {product ? (
    <img
      src={`https://admin.ezicalc.com/public/storage/product/${product.image}`}
      alt="Product"
      className="w-full h-auto object-cover rounded-md" // Restrict the max height and maintain aspect ratio
    />
  ) : (
    <div className="w-full h-64  flex justify-center items-center text-gray-700">
     <span></span>
    </div>
  )}
</div>

<div className="w-full md:w-1/2 px-4">
  {product ? (
    <>
      <h2 className="text-lg md:text-3xl font-semibold text-gray-800">
        {product.name}
      </h2>
      <div className="flex justify-between items-center md:items-start flex-row md:flex-col">
        <p className="text-sm md:text-base text-gray-500 mt-0 md:mt-2">
          SKU: {product.code}
        </p>
        <div className="flex items-center space-x-0 md:space-x-4 mt-0 md:mt-4 flex-col md:flex-row">
          {product.is_discount === 1 && (
            <span className="text-md md:text-lg text-gray-400 line-through">
              ৳{product.discount_amount}
            </span>
          )}
          <span className="text-lg md:text-2xl font-bold text-[#C43882]">
         <h2>Price:     ৳   {currentPrice}</h2>
          </span>
        </div>
      </div>

      <div>

        <ul className=" space-y-4 mt-3">
          {product.product_variation?.length > 0 ? (
            product.product_variation.map((variation) => (
              <div key={variation.id}>
                <h3 className="text-sm my-1 font-semibold">{variation.variation.name}</h3>
                <div className="grid grid-cols-2 gap-1">
                  {variation.variaton_values.split(",").map((value, i) => (
                    <button
                      key={i}
                      onClick={() => handleVariationChange(variation.variation.name, value)}
                      className={`py-1 px-3 rounded ${
                        selectedVariations[variation.variation.name] === value
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
        {/* <div className="flex w-20 h-7 bg-gray-200 py-1 rounded-full items-center justify-center space-x-0 md:space-x-2">
            <button
              onClick={handleDecreaseQuantity}
              className="bg-slate-200 text-gray-800 p-1 rounded-full hover:text-white hover:bg-sky-400"
            >
              <FaMinus size={10} />
            </button>
            <span className="text-sm">{quantity}</span>
            <button
              onClick={handleIncreaseQuantity}
              className="bg-slate-200 text-gray-800 p-1 rounded-full hover:text-white hover:bg-sky-400"
            > 
              <FaPlus size={10} />
            </button>
          </div> */}

     
      </div>

      {/* Color Selection Start */}
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
            <span className="text-xl font-bold">{productCount}</span>
            <button
              onClick={incrementCount}
              className="w-10 h-10 flex items-center justify-center border-l text-gray-800 rounded-md hover:bg-gray-100 transition text-lg font-semibold"
            >
              +
            </button>
          </div>
        </div>
     
      </div>
      {/* Action Buttons */}
      <div className="hidden md:block mt-6 space-y-4">
        <button
          onClick={() => addToCart(product, productCount ,currentId , currentVariation ,currentPrice)}
          className="w-full py-2 md:py-3 bg-[#C43882] text-white font-semibold rounded hover:bg-[#db549c] transition"
        >
          কিনতে চাই
        </button>

        <Link
          onClick={() => addToCart(product, productCount ,currentId , currentVariation ,currentPrice)}
          to="/checkout"
          // state={{ product }}
          className="w-full py-2 md:py-3 bg-[#C43882] text-white font-semibold rounded hover:bg-[#db549c] transition text-center block"
        >
          অর্ডার করুন
        </Link>
      </div>

      {/* Simplified Sections */}
      <div className="mt-4 border-t border-gray-200">
        <p className="py-3 text-left text-gray-800 text-lg">
          Description :
        </p>
        <p className="text-sm md:text-base text-gray-600 ">
          {product.short_desc}
        </p>
      </div>
    </>
  ) : (
    <div className=" py-10">
      <span className="loading loading-ring loading-sm"></span>
    </div>
  )}
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
            {/* First Category Block */}

            
            {products.slice(0, 4).map((product) => (
              <div
                
                className="group overflow-hidden relative"
              >
                <Link 
                to={`/singleproduct/${product.name}-${product.id}`}  className="w-full flex items-center justify-center">
                  <img
                    src={`https://admin.ezicalc.com/public/storage/product/${product.image}`}
                    alt="Product 1"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link >
                <button
                  onClick={() => addToCart(product)}
                  className="absolute bottom-28 right-3 bg-[#C43882] text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg hover:bg-[#a72e6e] transition "
                  title="Add to Cart"
                >
                  <FaPlus />
                </button>
                <Link to={`/singleproduct/${product.name}-${product.id}`}  className="p-4 bg-white">
                  <p className="font-normal md:font-medium Poppins text-sm text-gray-800 pb-1">
                    {product.name}
                  </p>
                  <p className="font-normal md:font-medium Poppins text-sm text-gray-600 flex items-center pb-1">
                    {product.is_discount == 1 && (
                      <span className="text-md md:text-lg text-gray-400 line-through ">
                        ৳{product.discount_amount}
                      </span>
                    )}
                    <span className="text-lg mb-3 font-bold text-[#C43882]">
                      ৳{product.price - product.discount_amount}
                    </span>
                  </p>

                  {product.product_variation &&
                  product.product_variation.length > 0 ? (
                    product.product_variation.map((variation) => (
                      <p
                        key={variation.id}
                        className="font-normal md:font-medium Poppins text-sm text-gray-600"
                      >
                        {variation.variation.name}: {variation.variaton_values}
                      </p>
                    ))
                  ) : (
                    <p className="font-normal Poppins text-sm text-gray-600">
                    </p>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Product End */}

      {/* <RecentlyViewed /> */}
      {/* RecentlyViewed Page Start */}
      <div>
        <div className="md:px-10 mx-auto ">
          <h2 className="text-center text-xl md:text-3xl font-bold mb-2 md:mb-8 Poppins">
            Recently Viewed
          </h2>
          <div className="overflow-x-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              
            {products.slice(0, 8).map((product) => (
              <div
                
                className="group overflow-hidden relative"
              >
                <Link 
                to={`/singleproduct/${product.name}-${product.id}`}  className="w-full flex items-center justify-center">
                  <img
                    src={`https://admin.ezicalc.com/public/storage/product/${product.image}`}
                    alt="Product 1"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link >
                <button
                  onClick={() => addToCart(product)}
                  className="absolute bottom-28 right-3 bg-[#C43882] text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg hover:bg-[#a72e6e] transition "
                  title="Add to Cart"
                >
                  <FaPlus />
                </button>
                <Link to={`/singleproduct/${product.name}-${product.id}`}  className="p-4 bg-white">
                  <p className="font-normal md:font-medium Poppins text-sm text-gray-800 pb-1">
                    {product.name}
                  </p>
                  <p className="font-normal md:font-medium Poppins text-sm text-gray-600 flex items-center pb-1">
                    {product.is_discount == 1 && (
                      <span className="text-md md:text-lg text-gray-400 line-through ">
                        ৳{product.discount_amount}
                      </span>
                    )}
                    <span className="text-lg mb-3 font-bold text-[#C43882]">
                      ৳{product.price - product.discount_amount}
                    </span>
                  </p>

                  {product.product_variation &&
                  product.product_variation.length > 0 ? (
                    product.product_variation.map((variation) => (
                      <p
                        key={variation.id}
                        className="font-normal md:font-medium Poppins text-sm text-gray-600"
                      >
                        {variation.variation.name}: {variation.variaton_values}
                      </p>
                    ))
                  ) : (
                    <p className="font-normal Poppins text-sm text-gray-600">
                    </p>
                  )}
                </Link>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
      {/* RecentlyViewed Page End */}

      {/* <PopUp/> */}
      {/* <SinglePageOrder /> */}

      <div>
        <div className="gap-2 md:hidden fixed flex flex-row items-center justify-between bottom-0 w-full bg-gradient-to-t from-gray-50 to-white shadow-lg z-20 px-6 py-4">
          {/* Add to Cart Button */}
          <Link
          onClick={() => addToCart(product, productCount ,currentId , currentVariation ,currentPrice)}
          className="flex-1 bg-[#C43882] text-white font-medium text-lg py-2 rounded-full shadow-lg text-center"
          >
            অর্ডার করুন
          </Link>

          {/* Cart Button */}
      
            <button
            onClick={handleCartToggle}
            className={`w-12 h-12 rounded-full bg-[#f0acd0] flex items-center justify-center ${cartAnimation}`}
          >
            <FaCartShopping size={26} className="" />
            <span className="absolute top-0 right-0 bg-orange-500 text-white text-md font-semibold w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}{" "}
            </span>
          </button>

          {/* Cart Sidebar */}
          {/* {isCartOpen && <AddToCart productCount={productCount} onClose={() => setIsCartOpen(false)} />} */}
        </div>
      </div>
      {/* <ScrollTop/> */}
      {/* <Footer />
      <ScrollToTopButton /> */}
    </div>
  );
};

export default SingleProduct;