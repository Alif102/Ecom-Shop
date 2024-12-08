import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PiAirplane } from "react-icons/pi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

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
  const prices = product.variation_combinations.length
    ? product.variation_combinations.map((comb) => comb.price)
    : [product.price]; // Default to the product price if variation_combinations is empty
  
  const highPrice = Math.max(...prices);
  const lowPrice = Math.min(...prices);

  return (
    <div key={index} className="w-full gap-2 py-4 px-2 h-full group">
      <Link to={`/singleproduct/${product.name}-${product.id}`}>
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
          <div className="bg-white text-sm">
  {product.variation_combinations.length > 0 ? (
    <h1 className="px-2 mb-2">
      Price Range: (
      <span className="">{lowPrice}৳</span> - 
      <span className="">{highPrice}৳</span>)
    </h1>
  ) : (
    <h1 className="px-2 mb-2">
      Price: <span className="">{product.price}৳</span>
    </h1>
  )}
</div>

            <div className="flex flex-wrap gap-2">
              {product.product_variation.map((variation) => (
                <div key={variation.id} className="space-x-1 space-y-2">
                  <div className="flex">
                    <h1 className="px-2">{variation.variation.name}:</h1>
                    <div className="flex flex-wrap gap-1">
                      {variation.variaton_values.split(',').map((value, index) => (
                        <button
                          key={index}
                          className="border border-gray-300 rounded p-1 text-center text-[12px]"
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 flex justify-between gap-1">
            <h1 className="border px-2 flex items-center border-gray-300 rounded text-center text-[12px]">
              <span>
                <PiAirplane />
              </span>
              Time to Shipping: 10 Days
            </h1>
            <h1 className="border px-2 flex items-center border-gray-300 rounded text-center text-[12px]">
              <span>
                <MdProductionQuantityLimits />
              </span>
              Similar Product
            </h1>
          </div>
        </div>
      </Link>
    </div>
  );
})}






</Slider>


      </div>

     

    </div>
  );
}

export default BestSellers;
