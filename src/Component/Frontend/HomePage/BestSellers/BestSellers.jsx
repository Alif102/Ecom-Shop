import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PiAirplane } from "react-icons/pi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaEye } from "react-icons/fa";

function BestSellers({products}) {
  console.log(products)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    centerPadding: '5px', 
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024, // For devices <= 1024px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 898, // For devices <= 768px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480, // For devices <= 480px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const slides = [
    {
      image: "/src/assets/b1.jpg",
      offer: "Flat 70% Off",
      description: "Enjoy flat 70% off on .",
      sizes: [30, 34, 36 , 40 ,42],
    },
    {
      image: "/src/assets/b2.jpg",
      offer: "Flat 20% Off",
      sizes: [32, 34, 35],
      description: "Limited time offer on ...",
    },
    {
      image: "/src/assets/b4.jpg",
      offer: "Flat 25% Off",
      sizes: [28, 34, 35],
      description: "Grab the best deals !",
    },
    {
      image: "/src/assets/b5.jpg",
      offer: "Flat 60% Off",
      sizes: [33, 34, 35 , 40],
      description: "Check out the latest ...",
    },
    {
      image: "/src/assets/b6.jpg",
      offer: "Flat 40% Off",
      sizes: [33, 34, 35],
      description: "Stay warm with our ....",
    },
    {
      image: "/src/assets/b3.jpg",
      offer: "Flat 80% Off",
      sizes: [33, 34, 35],
      description: "Beat the heat with cool...",
    },
    {
      image: "/src/assets/b8.jpg",
      offer: "Flat 70% Off",
      sizes: [33, 34, 35],
      description: "Celebrate with amazing ",
    },
  ];


const handleVariationSelect = (productId, value) => {
  setSelectedVariations((prevState) => ({
    ...prevState,
    [productId]: prevState[productId] === value ? null : value, // Toggle selection
  }));
};
const [selectedVariations, setSelectedVariations] = useState([]);
const [selectedCombination, setSelectedCombination] = useState(null);


  
  return (
    <div>
      <div className="p-2 w-[80%] mx-auto  md:mb-9 md:mt-20 relative">
        <h2 className="text-center text-2xl  md:text-3xl font-semibold pollinator mb-8"> <span className=" border border-pink-500 border-l-4 mr-3"></span> Shop Our Bestsellers</h2>
        <Slider {...settings} className="cursor-pointer  md:mb-10">

        {products.slice(0, 8).map((product, index) => {
  // Extract the highest and lowest prices from variation_combinations
  const prices = product.variation_combinations.map((comb) => comb.price);
  const highPrice = Math.max(...prices);
  const lowPrice = Math.min(...prices);

  // State to track the selected combination

  return (
    <div key={index} className="w-full gap-2 py-4 px-2 h-full group">
      <div className="relative bg-white">
        <img
          src={`https://admin.ezicalc.com/public/storage/product/${product.image}`}
          alt={product.offer}
          className="h-auto w-full object-cover"
        />

        <div className="absolute top-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FaEye size={26} className="bg-white text-black rounded-lg mr-3 p-1" />
        </div>

        <h1 className="absolute bottom-16 bg-pink-500 text-white p-1 w-1/2 text-center text-sm">
          {product.name}
        </h1>
        <div className="p-4">
          <p className="text-sm text-gray-600">{product.short_desc}</p>
        </div>
      </div>

      <div className="hidden group-hover:block transition-all duration-500">
        <div className="bg-white px-4">
          {/* High and Low Prices Display */}
          <div className="bg-white mt-2">
            <h1>
            (  <span className="">{highPrice}৳</span> - 
              <span className="">{lowPrice}৳</span> )
            </h1>
          </div>

          {/* Selected Price Display */}
          <div className="bg-white mt-2">
            {selectedCombination !== null && (
              <div>
                <h2 className="text-md font-semibold">
               Price:{" "}
                  {
                    product.variation_combinations.find(
                      (comb) => comb.id === selectedCombination
                    )?.price
                  }{" "}
                  <span className="text-2xl font-bold">৳</span>
                </h2>
              </div>
            )}
          </div>

          {/* Variation Buttons */}
          {/* <h1 className="text-lg font-semibold mb-2">Variation Values</h1> */}
          <div className="flex flex-wrap gap-2">
            {product.variation_combinations.map((combination) => (
              <button
                key={combination.id}
                className={`px-4 py-2 border rounded ${
                  selectedCombination === combination.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setSelectedCombination(combination.id)}
              >
                {combination.values}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 flex justify-between gap-1">
          <h1 className="border px-2 flex items-center border-gray-300 rounded text-center text-[12px]">
            <span>
              <PiAirplane />
            </span>{" "}
            Time to Shipping: 10 Days
          </h1>
          <h1 className="border px-2 flex items-center border-gray-300 rounded text-center text-[12px]">
            <span>
              <MdProductionQuantityLimits />
            </span>{" "}
            Similar Product
          </h1>
        </div>
      </div>
    </div>
  );
})}





</Slider>


      </div>

     

    </div>
  );
}

export default BestSellers;
