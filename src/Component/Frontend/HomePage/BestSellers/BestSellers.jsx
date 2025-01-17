import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaEye, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function BestSellers({ products }) {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    centerPadding: '5px',
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1280, // For devices <= 1024px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024, // For devices <= 768px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640, // For devices <= 480px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };




  return (
    <div className="relative pb-10 sm:pb-0">
      <h2 className="text-center text-2xl  md:text-3xl font-semibold pollinator mb-2 sm:mb-8"> <span className=" border border-pink-500 border-l-4 mr-3"></span> Shop Our <span className=" text-pink-500">Bestsellers</span></h2>
      <Slider {...settings} className="cursor-pointer md:mb-10">

        {products.slice(0, 8).map((product, index) => {
          // Extract the highest and lowest prices from variation_combinations
          const prices = product.variation_combinations.length
            ? product.variation_combinations.map((comb) => comb.price)
            : [product.price]; // Default to the product price if variation_combinations is empty

          const highPrice = Math.max(...prices);
          const lowPrice = Math.min(...prices);

          return (
            <div key={index} className="w-full gap-2 py-4 sm:px-2 h-full group">
              <Link to={`/singleproduct/${product.name}-${product.id}`}>
                <div className="relative bg-white shadow-md rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                  {/* Product Image */}
                  <div className="relative">
                    <img
                      src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/15/image/${product.image}`}
                      alt={product.offer}
                      className=" h-[300px] w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Discount Badge */}
                    {product.discount && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold py-1 px-3 rounded-full">
                        {product.discount}% Off
                      </span>
                    )}
                    {/* Eye Icon on Hover */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <FaEye
                        size={26}
                        className="bg-white text-black p-1 rounded-full shadow-md hover:shadow-lg"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    {/* Product Name */}
                    <h2
                      className="shippori font-semibold text-gray-800 truncate mb-1 group-hover:text-pink-500 transition-colors duration-300"
                    >
                      {product.name}
                    </h2>





                    {/* Pricing */}
                    <div className="flex items-center justify-between">
                      {product.variation_combinations.length > 0 ? (
                        <div className="text-gray-700">
                          {lowPrice === highPrice ? (
                            <span className="text-pink-500 font-bold">
                              {highPrice} <span className="text-2xl">৳</span>
                            </span>
                          ) : (
                            <>
                              <span className="text-pink-500 font-bold">
                                {lowPrice} <span className="text-2xl">৳</span>{" "}
                              </span>
                              -{" "}
                              <span className="text-pink-500 font-bold">
                                {highPrice} <span className="text-2xl">৳</span>{" "}
                              </span>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="text-pink-500 font-bold">{product.price} <span className=" text-2xl">৳</span> </div>
                      )}
                      {/* Add to Cart Button */}
                      <button className="bg-pink-500 text-white text-sm py-1 px-4 rounded-full hover:bg-pink-600 transition duration-300">
                        QUICK VIEW
                      </button>
                    </div>
                  </div>


                </div>
              </Link>

            </div>
          );
        })}






      </Slider>


    </div>
  );
}

export default BestSellers;
