import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PiAirplane } from "react-icons/pi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { AiOutlineProduct, AiOutlineSafety } from "react-icons/ai";
import { BsArrowLeftRight, BsTools } from "react-icons/bs";

function FeatureProducts() {
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

  return (
    <div>
      <div className=" w-[80%] mx-auto  mb-9 md:mt-20 relative">
        <h2 className="text-center text-2xl  md:text-3xl font-semibold pollinator mb-8"> <span className=" border border-pink-500 border-l-4 mr-3"></span> Our Featured Products</h2>
        <Slider {...settings} className="cursor-pointer  md:mb-10">
  {slides.map((slide, index) => (
    <div
      key={index}
      className="w-full   gap-2 py-4 px-2 h-full group" 
    >
      <div className="relative bg-white ">
        <img
          src={slide.image}
          alt={slide.offer}
          className="h-auto w-full object-cover"
        />
        
        {/* Eye Icon - Hidden by default, shown on hover */}
        <div className="absolute top-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FaEye size={26} className=" bg-white text-black rounded-lg mr-3 p-1" />
        </div>
        
        <h1 className="absolute bottom-16 bg-pink-500 text-white p-1 w-1/2 text-center text-sm">
          {slide.offer}
        </h1>
        <div className="p-4">
          <p className="text-sm text-gray-600">{slide.description}</p>
        </div>
      </div>

      {/* Content to be displayed on hover */}
      <div className="hidden group-hover:block transition-all duration-500">
        <div className="flex gap-2 bg-white px-4">
          Size:
          {(slide.sizes || []).map((size, i) => (
            <div
              key={i}
              className="border border-gray-400 rounded px-1 text-center text-[12px]"
            >
              {size}
            </div>
          ))}
        </div>
        <div className="bg-white p-4 flex justify-between gap-1">
          <h1 className="border px-2 flex items-center border-gray-300 rounded text-center text-[12px]">
            <span><PiAirplane /></span> Time to Shipping : 10 Days
          </h1>
          <h1 className="border px-2 flex items-center border-gray-300 rounded text-center text-[12px]">
            <span><MdProductionQuantityLimits /></span> Similar Product
          </h1>
        </div>
      </div>
    </div>
  ))}
</Slider>


      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-[80%] mx-auto mb-16">
      <div className="flex items-center gap-3 cursor-pointer p-4 border border-gray-400 hover:scale-105 transition-transform duration-300">
  <div>
    <AiOutlineProduct size={40} color="#AA336A" />
  </div>
  <div>
    <h1 className="text-[17px] my-1 font-semibold">Exclusive Collection</h1>
    <p className="text-gray-600">
      28000+ unique designer Suits & Sarees, Lehenga gives glamorous touch.
    </p>
  </div>
</div>

  <div className="flex items-center gap-3 cursor-pointer p-4 border border-gray-400 hover:scale-105 transition-transform duration-300">
    <div>
      <BsTools size={40} color="#AA336A" />
    </div>
    <div>
      <h1 className="text-[17px] my-1 font-semibold">Perfect Customizations</h1>
      <p className="text-gray-600">
      Experience team of fashion designer to ensure best fitting and finishing.
      </p>
    </div>
  </div>
  <div className="flex items-center gap-3 cursor-pointer p-4 border border-gray-400 hover:scale-105 transition-transform duration-300">
    <div>
      <AiOutlineSafety size={40} color="#AA336A" />
    </div>
    <div>
      <h1 className="text-[17px] my-1 font-semibold">Secure Payment</h1>
      <p className="text-gray-600">
      Secured payment method via Secure Socket Layer(SSL) Technology and PayPal.
      </p>
    </div>
  </div>
  <div className="flex items-center gap-3 cursor-pointer p-4 border border-gray-400 hover:scale-105 transition-transform duration-300">
    <div>
      <BsArrowLeftRight size={40} color="#AA336A" />
    </div>
    <div>
      <h1 className="text-[17px] my-1 font-semibold">
      Easy Returns</h1>
      <p className="text-gray-600">
      We have 7 days easy return. <span className=" font-semibold hover:text-red-500">Read return policy.</span>
      </p>
    </div>
  </div>
</div>


    </div>
  );
}

export default FeatureProducts;
